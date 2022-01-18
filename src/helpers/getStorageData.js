export const getTagList = () => {
  const tagList = window.localStorage.getItem('scripted-music-tags');

  if(tagList) {
    return JSON.parse(tagList);
  }

  return [];
}

export const getSongList = () => {
  const songList = window.localStorage.getItem('scripted-music-songs');

  if(songList) {
    return JSON.parse(songList);
  }

  return [];
}


export const getSettings = () => {
  const settings = window.localStorage.getItem('scripted-music-settings');

  if(settings) {
    return JSON.parse(settings);
  }

  // Default
  return {
    nightcore: 20,
    lowcore: 90,
    DJ: false,
    DJstart: 30,
    DJduration: 60,
    MIXduration: 5,
    volume: 0.5,
    baseURL: 'http://scripted.ddns.net/MUSIC/'
  }
}