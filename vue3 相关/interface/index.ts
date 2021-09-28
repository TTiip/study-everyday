interface StoreProps {
  isLoading: boolean
  isLogin: boolean
  userInfo: {
    avatarUrl: string
  }
}
interface Common {
  code?: number
  hasMore?: boolean
}

interface SearchHotItemProps {
  first: string
  iconType: number
  second: number
  third?: null
}
interface SearchHotProps extends Common {
  result: {
    hots: SearchHotItemProps[]
  }
}
interface Album {
  id: number
  name: string
  artist: any
  publishTime: number
  size: number
  copyrightId: number
  status: number
  picId: number
  mark: number
}
interface SuggestInfoResultProps {
  albums: Album[]
  artists: any[]
  songs: any[]
  playlists: any[]
  order: any[]
}
interface SuggestInfoProps extends Common {
  result: SuggestInfoResultProps
}

interface LoginQRProps extends Common {
  data: {
    qrimg: string
    qrurl: string
  }
}

interface BannerItemProps {
  imageUrl: string
  targetId?: number
  adid?: string | null
  targetType?: number
  titleColor?: string
  typeTitle?: string
  url?: string
  exclusive?: boolean
  monitorImpress?: string | null
  monitorClick?: string | null
  monitorType?: string | null
  monitorImpressList?: string | null
  monitorClickList?: string | null
  monitorBlackList?: string | null
  extMonitor?: string | null
  extMonitorInfo?: string | null
  adSource?: string | null
  adLocation?: string | null
  adDispatchJson?: string | null
  encodeId: string
  program?: string | null
  event?: string | null
  video?: string | null
  song?: string | null
  scm?: string
}

interface BannerProps extends Common {
  banners: BannerItemProps[]
}

interface PlaylistTagProps {
  id: number
  name: string
  category: number
  usedCount: number
  type: number
  position: number
  createTime: number
  highQuality: number
  highQualityPos: number
  officialPos: number
}
interface PlaylistHotItem {
  playlistTag?: PlaylistTagProps
  activity?: boolean
  hot?: boolean
  usedCount?: number
  position?: number
  category?: number
  createTime?: number
  name: string
  id?: number
  type?: number
}

interface PlaylistHotProps extends Common {
  tags: PlaylistHotItem[]
}

interface GetTopListItem {
  name?: string
  id?: number
  trackNumberUpdateTime?: number,
  status?: number
  userId?: number
  createTime?: number
  updateTime?: number
  subscribedCount?: number
  trackCount?: number
  cloudTrackCount?: number
  coverImgUrl?: string
  coverImgId?: number
  description?: string
  playCount?: number
  tags?: any[]
}

interface GetTopListProps extends Common {
  playlists: GetTopListItem[],
  total: number,
  more: boolean,
  cat: string
}

interface GetTopAlbumItem {
  songs: []
  paid: boolean
  onSale: boolean
  blurPicUrl: string
  commentThreadId: string
  publishTime: number
  picUrl: string
  briefDesc: ''
  picId: number
  artist: {
    img1v1Id: number
    topicPerson: number
    albumSize: number
    img1v1Url: string
    picUrl: string
    trans: string
    briefDesc: string
    picId: number
    followed: boolean
    musicSize: number
    alias: []
    name: string
    id: number
    'picId_str': string
    'img1v1Id_str': string
  }
  companyId: number
  company: string
  pic: number
  description: string
  tags: string
  status: number
  subType: string
  alias: []
  copyrightId: number
  artists: {
    img1v1Id: number
    topicPerson: number
    albumSize: number
    img1v1Url: string
    picUrl: string
    trans: string
    briefDesc: string
    picId: number
    followed: boolean
    musicSize: number
    alias: []
    name: string
    id: number
    'img1v1Id_str': string
    }[]
  name: string
  id: number
  type: string
  size: number
  'picId_str': string
  areaId: number
  exclusive: boolean
  isSub: boolean
}

interface GetTopAlbumProps extends Common {
  monthData: GetTopAlbumItem[]
}

interface GetTopListPropItem {
  id: string
  coverImgUrl: string
  name: string
  [props: string]: any
}

interface GetTopList extends Common {
  list: GetTopListPropItem[],
  artistToplist: any
}

interface GetTopListDetailItem {
  id: number,
  name: string,
  coverImgId: number,
  coverImgUrl: string,
  'coverImgId_str': string,
  adType: number,
  userId: number,
  createTime: number,
  status: number,
  opRecommend: boolean,
  highQuality: boolean,
  newImported: boolean,
  updateTime: number,
  trackCount: number,
  specialType: number,
  privacy: number,
  trackUpdateTime: number,
  commentThreadId: string,
  playCount: number,
  trackNumberUpdateTime: number,
  subscribedCount: number,
  cloudTrackCount: number,
  ordered: boolean,
  description: string,
  tags: any[],
  updateFrequency: null,
  backgroundCoverId: number,
  backgroundCoverUrl: null,
  titleImage: number,
  titleImageUrl: null,
  englishTitle: null,
  officialPlaylistType: null,
  subscribers: any[],
  subscribed: boolean,
  creator: any,
  tracks: any[],
  videoIds: null,
  videos: null,
  trackIds: any[],
  shareCount: number,
  commentCount: number,
  remixVideo: null,
  sharedUsers: null,
  historySharedUsers: null,
  ToplistType: string
}

interface GetTopListDetail {
  relatedVideos: any,
  playlist: GetTopListDetailItem,
  urls: any,
  privileges: [],
  sharedPrivilege: any,
  resEntrance: any
}

interface GetMvFirstDataItem {
  id: number
  cover: string
  imgurl?: string
  publishTime?: string
  name: string
  playCount: number
  briefDesc: null
  desc: null
  artistName: string
  artistId: number
  duration: number
  mark: number
  subed: boolean
  artists: {
    id: number
    name: string
  }[]
}

interface GetMvFirst extends Common {
  data: GetMvFirstDataItem[]
}

interface GetArtists {
  name: string,
  id: number,
  picId: number,
  img1v1Id: number,
  briefDesc: string
  picUrl: string
  img1v1Url: string
  albumSize: number,
  alias: string[]
  trans: string
  musicSize: number,
  topicPerson: number,
  showPrivateMsg: null,
  isSubed: null,
  accountId: number,
  'picId_str': string
  'img1v1Id_str': string
  transNames: null,
  followed: boolean,
  mvSize: null,
  publishTime: null,
  identifyTag: null,
  alg: null,
  fansCount: null
  }

interface GetTopArtists extends Common {
  artists: GetArtists[]
  more: boolean

}
interface GetLyric extends Common {
  sgc: boolean
  sfy: boolean
  qfy: boolean
  lrc: {
    version: number
    lyric: string
  }
  klyric: {
    version: number
    lyric: string
  }
  tlyric: {
    version: number
    lyric: string
  }

}

// interface
export {
  StoreProps,
  SearchHotItemProps,
  SearchHotProps,
  SuggestInfoProps,
  SuggestInfoResultProps,
  LoginQRProps,
  BannerItemProps,
  BannerProps,
  PlaylistTagProps,
  PlaylistHotItem,
  PlaylistHotProps,
  GetTopListItem,
  GetTopListProps,
  GetTopAlbumItem,
  GetTopAlbumProps,
  GetTopListPropItem,
  GetTopList,
  GetTopListDetailItem,
  GetTopListDetail,
  GetMvFirstDataItem,
  GetMvFirst,
  GetArtists,
  GetTopArtists,
  GetLyric
}
