import client from '@api/client'

export const instanceFetch = async (
  key: string,
  { instanceDomain }: { instanceDomain: string }
): Promise<Mastodon.Instance> => {
  const res = await client({
    method: 'get',
    instance: 'remote',
    instanceDomain,
    url: `instance`
  })
  return Promise.resolve(res.body)
}
