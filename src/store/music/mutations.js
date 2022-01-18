import { 
  setSettings, 
  setSongList, 
} from '@/helpers/setStorageData';

export const songTitle      = ( state, value ) => state.song.title = value;
export const songArtist     = ( state, value ) => state.song.artist = value;
export const songPortada    = ( state, value ) => state.song.portada = value;
export const setIndexSong   = ( state, value ) => state.indexSong = value;
export const dynamicWidth   = ( state, value ) => state.dynamicWidth = value;
export const playPauseClass = ( state, value ) => state.playPauseClass = value;
export const searchText     = ( state, value ) => state.searchText = value;
export const loading        = ( state, value ) => state.loading = value;

export const allSettings = ( state, value ) => {
  state.settings = value;
  setSettings(state.settings);
}

export const settings = ( state, { value, type } ) => {
  state.settings[type] = value;
  setSettings(state.settings);
}

export const songList = ( state, value ) => {
  state.songList = state.songListFilter = value;
  setSongList(value);
}

export const deleteSong = ( state, id) => {
  const index = state.songList.findIndex( song => song.id == id);
  if(index) state.songList.splice(index, 1);
  state.songListFilter = state.songList;
  state.searchText = '';
  setSongList(state.songList);
}

export const addNewSong = ( state, newSong ) => {
  
  const isRepeated = state.songList.some( song => song.id == newSong.id || song.url == newSong.url );

  if(!isRepeated) {
    state.songList.push(newSong);

    //Reorder
    state.songList.sort((a, b) => {
      if (a.artist > b.artist) return 1;
      if (a.artist < b.artist) return -1;
      else {
        if (a.title > b.title) return 1;
        else if (a.title < b.title) return -1;
        return 0;
      }
    })
  }
} 

export const swapSelectSong = ( state, id) => {
  const index = state.songList.findIndex( song => song.id == id );

  state.songList[index].selected = !state.songList[index].selected;
  state.songListFilter = state.songList;
}

export const selectAllSongs = ( state, isSelected ) => {
  state.songListFilter.map( song => song.selected = isSelected);
}

export const resetAllSongs = ( state ) => {
  state.songList.map(song => song.selected = false);
  state.searchText = '';
  setSongList(state.songList);
}

export const filterSongs = ( state ) => {
  state.songListFilter = state.songList.filter( (song) => {
    
    if(song.title && song.artist) {
      const hasTitle = song.title.toLowerCase().includes( state.searchText.toLowerCase() );
      const hasArtist = song.artist.toLowerCase().includes( state.searchText.toLowerCase() );

      let exists = true;

      if(state.tagListFilter.length > 0) {
        if(state.tagAndOr) { 
          exists = state.tagListFilter.find( (songTag) => song.tags.includes(songTag)) ? true : false;
        } else { 
          exists = state.tagListFilter.every( (songTag) => song.tags.includes(songTag));
        }    
      }

      const negative = song.tags.some( tag => state.tagListNegative.includes(tag) );

      return (hasTitle || hasArtist) && exists && !negative;
    }

  })
}

export const editSongTitle = ( state, song ) => {
  const i = state.songList.findIndex( _ => _.id === song.id);
  state.songList[i].title = song.title;
  setSongList(state.songList);
} 

export const editSongArtist = ( state, song ) => {
  const i = state.songList.findIndex( _ => _.id === song.id);
  state.songList[i].artist = song.artist;
  setSongList(state.songList);
} 


/// TAGS
import { v4 as uuid} from 'uuid';
import { setTagList } from '@/helpers/setStorageData';

export const tagAndOr = ( state, value ) => state.tagAndOr = value;

export const tagList = ( state, value ) => {
  state.tagList = value;
  setTagList(value);
}

export const addTagListFilter = ( state, tagID ) => {
  if( !state.tagListFilter.includes(tagID) ) {
    state.tagListFilter.push(tagID);
  }
}

export const removeTagListFilter = ( state, tagID ) => {
  if( state.tagListFilter.includes(tagID) ) {
    const index = state.tagListFilter.indexOf(tagID);
    state.tagListFilter.splice( index, 1 );
  }
}

export const addTagListNegative = ( state, tagID ) => {     
  if( !state.tagListNegative.includes(tagID) ) {
    state.tagListNegative.push(tagID);
  }
}

export const removeTagListNegative = ( state, tagID ) => {
  if( state.tagListNegative.includes(tagID) ) {
    const index = state.tagListNegative.indexOf(tagID);
    state.tagListNegative.splice( index, 1 );
  }
}

export const addTagsToSongs = ( state, tags ) => {
  state.songList.map( song => {
    if(song.selected) {
      tags.map( id => {
        if(!song.tags.includes(id)) {
          song.tags.push(id);
        }
      }); 
    }
  });
  setSongList(state.songList);
}

export const removeTagsToSongs = ( state, tags ) => {
  state.songList.map( song => {
    if(song.selected) {
      song.tags = song.tags.filter( tag => {
        return !tags.includes(tag);
      })
    }
  })
  setSongList(state.songList);
}

export const saveTag = ( state, newTag ) => {

  const index = state.tagList.findIndex( tag => tag.id == newTag.id )

  if(index != -1) {
    state.tagList[index] = newTag
  } else {
    newTag.id = 'tag-' + uuid()
    state.tagList.push(newTag)
  }
 
}

export const removeTag = ( state, id ) => {
  const i = state.tagList.findIndex( tag => tag.id == id);

  if(i > -1) {
    state.songList.map( song => {
      if(song.tags.includes(id)) {
        const itag = song.tags.indexOf(id);
        song.tags.splice(itag, 1);
      }
    })

    state.tagList.splice(i, 1);

    setSongList(state.songList);
    setTagList(state.tagList);
  }
}
