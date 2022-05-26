import type {
  GetLyric
} from '~/interface'

const apiList = {
  // 获取歌曲的歌词
  getLyric: '/lyric'
}

export interface apiKeyDataType {
  getLyric: GetLyric
}

export type apiKeyType = keyof typeof apiList

export default apiList
