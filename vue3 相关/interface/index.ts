// interface Common {
//   code?: number
//   hasMore?: boolean
// }
// interface GetLyric extends Common {
//   sgc: boolean
//   sfy: boolean
//   qfy: boolean
//   lrc: {
//     version: number
//     lyric: string
//   }
//   klyric: {
//     version: number
//     lyric: string
//   }
//   tlyric: {
//     version: number
//     lyric: string
//   }
// }

interface Common {
  code?: number
  hasMore?: boolean
}

type GetLyric = Common & {
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
  GetLyric
}
