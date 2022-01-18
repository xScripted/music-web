export const setTagList = (tags) => {
  window.localStorage.setItem('scripted-music-tags', JSON.stringify(tags))
}

export const setSongList = (songs) => {
  window.localStorage.setItem('scripted-music-songs', JSON.stringify(songs))
}

export const setSettings = (settings) => {
  window.localStorage.setItem('scripted-music-settings', JSON.stringify(settings))
}
