import Button from '@components/Button'
import haptics from '@components/haptics'
import { ParseHTML } from '@components/Parse'
import RelativeTime from '@components/RelativeTime'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import {
  useAnnouncementMutation,
  useAnnouncementQuery
} from '@utils/queryHooks/announcement'
import { StyleConstants } from '@utils/styles/constants'
import { useTheme } from '@utils/styles/ThemeManager'
import React, { useCallback, useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Chase } from 'react-native-animated-spinkit'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SharedAnnouncementsProp } from './sharedScreens'

const ScreenSharedAnnouncements: React.FC<SharedAnnouncementsProp> = ({
  route: {
    params: { showAll = false }
  },
  navigation
}) => {
  const { theme } = useTheme()
  const bottomTabBarHeight = useBottomTabBarHeight()
  const [index, setIndex] = useState(0)
  const { t } = useTranslation('sharedAnnouncements')

  const query = useAnnouncementQuery({
    showAll,
    options: {
      select: announcements =>
        announcements.filter(announcement =>
          showAll ? announcement : !announcement.read
        )
    }
  })
  const mutation = useAnnouncementMutation({
    onSettled: () => {
      haptics('Success')
      query.refetch()
    }
  })

  useEffect(() => {
    if (!showAll && query.data?.length === 0) {
      navigation.goBack()
    }
  }, [query.data])

  const renderItem = useCallback(
    ({ item, index }: { item: Mastodon.Announcement; index: number }) => (
      <View
        key={index}
        style={[
          styles.announcementContainer,
          { backgroundColor: theme.background }
        ]}
      >
        <Pressable
          style={styles.pressable}
          onPress={() => navigation.goBack()}
        />
        <View
          style={[
            styles.announcement,
            {
              borderColor: theme.primary,
              backgroundColor: theme.background
            }
          ]}
        >
          <Text style={[styles.published, { color: theme.secondary }]}>
            <Trans
              i18nKey='sharedAnnouncements:content.published'
              components={[<RelativeTime date={item.published_at} />]}
            />
          </Text>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator>
            <ParseHTML
              content={item.content}
              size='M'
              emojis={item.emojis}
              mentions={item.mentions}
              numberOfLines={999}
            />
          </ScrollView>
          {item.reactions?.length ? (
            <View style={styles.reactions}>
              {item.reactions?.map(reaction => (
                <Pressable
                  key={reaction.name}
                  style={[
                    styles.reaction,
                    {
                      borderColor: reaction.me ? theme.disabled : theme.primary,
                      backgroundColor: reaction.me
                        ? theme.disabled
                        : theme.background
                    }
                  ]}
                  onPress={() =>
                    mutation.mutate({
                      id: item.id,
                      type: 'reaction',
                      name: reaction.name,
                      me: reaction.me
                    })
                  }
                >
                  {reaction.url ? (
                    <Image
                      source={{ uri: reaction.url }}
                      style={[styles.reactionImage]}
                    />
                  ) : (
                    <Text style={[styles.reactionText]}>{reaction.name}</Text>
                  )}
                  {reaction.count ? (
                    <Text
                      style={[styles.reactionCount, { color: theme.primary }]}
                    >
                      {reaction.count}
                    </Text>
                  ) : null}
                </Pressable>
              ))}
              {/* <Pressable
                style={[styles.reaction, { borderColor: theme.primary }]}
                onPress={() => invisibleTextInputRef.current?.focus()}
              >
                <Icon
                  name='Plus'
                  size={StyleConstants.Font.Size.M}
                  color={theme.primary}
                />
              </Pressable> */}
            </View>
          ) : null}
          <Button
            type='text'
            content={
              item.read ? t('content.button.read') : t('content.button.unread')
            }
            loading={mutation.isLoading}
            disabled={item.read}
            onPress={() =>
              !item.read &&
              mutation.mutate({
                id: item.id,
                type: 'dismiss'
              })
            }
          />
        </View>
      </View>
    ),
    [theme]
  )

  const onMomentumScrollEnd = useCallback(
    ({
      nativeEvent: {
        contentOffset: { x },
        layoutMeasurement: { width }
      }
    }) => {
      setIndex(Math.floor(x / width))
    },
    []
  )

  const ListEmptyComponent = useCallback(() => {
    return (
      <View
        style={{
          width: Dimensions.get('screen').width,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Chase size={StyleConstants.Font.Size.L} color={theme.secondary} />
      </View>
    )
  }, [])

  return (
    <SafeAreaView style={[styles.base, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { height: bottomTabBarHeight }]}>
        <Text style={[styles.headerText, { color: theme.primary }]}>公告</Text>
      </View>
      <FlatList
        horizontal
        data={query.data}
        pagingEnabled
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        ListEmptyComponent={ListEmptyComponent}
      />
      <View style={[styles.indicators, { height: bottomTabBarHeight }]}>
        {query.data && query.data.length > 1 ? (
          <>
            {query.data.map((d, i) => (
              <View
                key={i}
                style={[
                  styles.indicator,
                  {
                    borderColor: theme.primary,
                    backgroundColor: i === index ? theme.primary : undefined,
                    marginLeft:
                      i === query.data.length ? 0 : StyleConstants.Spacing.S
                  }
                ]}
              />
            ))}
          </>
        ) : null}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  base: {
    flex: 1
  },
  invisibleTextInput: { ...StyleSheet.absoluteFillObject },
  header: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    ...StyleConstants.FontStyle.L,
    fontWeight: StyleConstants.Font.Weight.Bold
  },
  announcementContainer: {
    width: Dimensions.get('screen').width,
    padding: StyleConstants.Spacing.Global.PagePadding,
    justifyContent: 'center'
  },
  published: {
    ...StyleConstants.FontStyle.S,
    marginBottom: StyleConstants.Spacing.S
  },
  pressable: { ...StyleSheet.absoluteFillObject },
  announcement: {
    flexShrink: 1,
    padding: StyleConstants.Spacing.Global.PagePadding,
    marginTop: StyleConstants.Spacing.Global.PagePadding,
    borderWidth: 1,
    borderRadius: 6
  },
  scrollView: {
    marginBottom: StyleConstants.Spacing.Global.PagePadding / 2
  },
  reactions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: StyleConstants.Spacing.Global.PagePadding / 2
  },
  reaction: {
    borderWidth: 1,
    padding: StyleConstants.Spacing.Global.PagePadding / 2,
    marginTop: StyleConstants.Spacing.Global.PagePadding / 2,
    marginBottom: StyleConstants.Spacing.Global.PagePadding / 2,
    marginRight: StyleConstants.Spacing.M,
    borderRadius: 6,
    flexDirection: 'row'
  },
  reactionImage: {
    width: StyleConstants.Font.LineHeight.M + 3,
    height: StyleConstants.Font.LineHeight.M
  },
  reactionText: {
    ...StyleConstants.FontStyle.M
  },
  reactionCount: {
    ...StyleConstants.FontStyle.S,
    marginLeft: StyleConstants.Spacing.S
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  indicator: {
    width: StyleConstants.Spacing.S,
    height: StyleConstants.Spacing.S,
    borderRadius: StyleConstants.Spacing.S,
    borderWidth: 1
  }
})

export default ScreenSharedAnnouncements
