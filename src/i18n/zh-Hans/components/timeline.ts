export default {
  empty: {
    error: {
      message: '加载错误',
      button: '重试'
    },
    success: {
      message: '空无一物'
    }
  },
  end: {
    message: '居然刷到底了，喝杯 <0 /> 吧'
  },
  header: {
    explanation:
      '围观的社区可能不属于已经登录的社区的已知连结，因此只可围观嘟文，不能进行操作。设置里可以切换想要围观的社区。',
    button: '前往设置'
  },
  shared: {
    actioned: {
      pinned: '置顶',
      favourite: '{{name}} 喜欢了你的嘟嘟',
      status: '{{name}} 刚刚发嘟',
      follow: '{{name}} 开始关注你',
      follow_request: '{{name}} 请求关注',
      poll: '您参与的投票已结束',
      reblog: {
        default: '{{name}} 转嘟了',
        notification: '{{name}} 转嘟了您的嘟文'
      }
    },
    actions: {
      favourited: {
        function: '喜欢嘟文'
      },
      reblogged: {
        function: '转嘟'
      },
      bookmarked: {
        function: '收藏嘟文'
      }
    },
    attachment: {
      sensitive: {
        button: '显示敏感内容'
      },
      unsupported: {
        text: '附件读取错误',
        button: '尝试远程链接'
      }
    },
    content: {
      expandHint: '隐藏内容'
    },
    header: {
      shared: {
        application: '发自于 {{application}}'
      },
      conversation: {
        delete: {
          function: '删除私信'
        }
      },
      actions: {
        account: {
          heading: '关于用户',
          mute: {
            function: '隐藏 @{{acct}} 的嘟文',
            button: '隐藏 @{{acct}} 的嘟文'
          },
          block: {
            function: '屏蔽 @{{acct}}',
            button: '屏蔽 @{{acct}}'
          },
          reports: {
            function: '举报 @{{acct}}',
            button: '举报 @{{acct}}'
          }
        },
        domain: {
          heading: '关于社区',
          block: {
            function: '屏蔽社区',
            button: '屏蔽社区 {{domain}}'
          },
          alert: {
            title: '确定要屏蔽 {{domain}} 吗？',
            message:
              '多数情况下，隐藏或屏蔽特定用户即可。\n\n屏蔽之后，来自此社区的所有内容将不再出现在你的时间轴里。同时，来自该社区的关注者将被移除。请谨慎使用。',
            buttons: {
              confirm: '确定屏蔽整个社区',
              cancel: '$t(common:buttons.cancel)'
            }
          }
        },
        share: {
          status: { heading: '分享嘟文', button: '分享此条嘟文的链接' },
          account: { heading: '分享用户', button: '分享此用户的链接' }
        },
        status: {
          heading: '关于嘟文',
          delete: {
            function: '删除',
            button: '删除此条嘟文'
          },
          edit: {
            function: '删除',
            button: '删除并重新编辑此条嘟文',
            alert: {
              title: '确认删除嘟文？',
              message:
                '确定要删除这条嘟文并重新编辑它吗？所有相关的转嘟和喜欢都会被清除，回复将会失去关联。',
              buttons: {
                confirm: '删除并重新编辑',
                cancel: '$t(common:buttons.cancel)'
              }
            }
          },
          mute: {
            function: '静音',
            button: {
              positive: '静音此条嘟文及对话',
              negative: '取消静音此条嘟文及对话'
            }
          },
          pin: {
            function: '置顶',
            button: {
              positive: '置顶此条嘟文',
              negative: '取消置顶此条嘟文'
            }
          }
        }
      }
    },
    poll: {
      meta: {
        button: {
          vote: '投票',
          refresh: '刷新'
        },
        count: {
          voters: '已投{{count}}人 • ',
          votes: '{{count}}票 • '
        },
        expiration: {
          expired: '投票已结束',
          until: '<0 />截止'
        }
      }
    }
  }
}
