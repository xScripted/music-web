export default () => ({

  playPauseClass: 'fa-play-circle',
  dynamicWidth: '0%',
  tagAndOr: false,
  searchText: '',
  loading: false,
  
  song: {
    title: '',
    artist: '',
    portada: '',
    tags: []
  },

  settings: {
    nightcore: 20,
    lowcore: 90,
    DJ: false,
    DJstart: 20,
    DJduration: 50,
    MIXduration: 5,
    volume: 0.5,
    baseURL: 'http://scripted.ddns.net/MUSIC/'
  },
  
  indexSong: -1,

  songList: [],
  songListFilter: [],
  
  tagList: [],
  tagListFilter: [],
  tagListNegative: []
})