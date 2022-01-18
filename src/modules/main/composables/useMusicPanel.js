import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { Howl, Howler } from 'howler';

import formatTime from '../helpers/formatTime';
import getRandNum from '../helpers/getRandNum';


const useMusicPanel = () => {

  const store = useStore();

  // Getters
  const songListFilter = computed( () => store.getters['music/songListFilter']);
  const playPauseClass = computed( () => store.getters['music/playPauseClass']);
  const indexSong = computed( () => store.getters['music/indexSong']);
  const settings = computed( () => store.getters['music/settings']);
  
  // Buttons Class
  const isShuffling = ref(false);
  const isNightcore = ref(false);
  const isLooping = ref(false);
  const isLowcore = ref(false);

  const ICONS = {
    PLAY: 'fa-play-circle',
    PAUSE: 'fa-pause-circle'
  }

  const timers = ref({
    total: '00:00',
    current: '00:00'
  });

  const dynamicWidth = ref('0%');

  let _song = {};
  let globalRate = 1;

  function swapLowcore() {
    isLowcore.value = !isLowcore.value;

    if(isLowcore.value) {
      isNightcore.value = false;
      globalRate = settings.value.lowcore / 100;
    } else {
      globalRate = 1;
    }


    _song.rate(globalRate);

  }

  function shuffle() {
    isShuffling.value = !isShuffling.value
  }

  function prevSong() {

    // If it's the first song restart the queue
    let newIndexSong = indexSong.value === 0 ? 0 : indexSong.value - 1

    if(isLooping.value) newIndexSong = indexSong.value

    store.commit( 'music/setIndexSong', newIndexSong )
    playPause( songListFilter.value[indexSong.value].url )
  }

  function playPause( mp3Name, onend = false ) {

    //New Song
    if(mp3Name) {

      _song = buildHowlSong(mp3Name, onend);
      _song.play();

      const { title, artist } = songListFilter.value[indexSong.value];
      
      store.commit('music/songTitle', title);
      store.commit('music/songArtist', artist);

      return;
    }


    if(playPauseClass.value === ICONS.PAUSE) {
      _song.pause();
      store.commit('music/playPauseClass', ICONS.PLAY );
    } else {

      if(Howler._howls.length == 0) {
        store.commit('music/setIndexSong', 0);
        playPause(songListFilter.value[0].url);
        return;
      }

      _song.play();
      store.commit('music/playPauseClass', ICONS.PAUSE );
    }
      
  }

  function nextSong(onend = false) {

    // If it's the last song restart the queue
    const isLastSong = songListFilter.value.length <= indexSong.value;
    let newIndexSong = isLastSong ? 0 : indexSong.value + 1;

    if(isShuffling.value) newIndexSong = getRandNum( songListFilter.value.length - 1 );
    if(isLooping.value) newIndexSong = indexSong.value;

    store.commit( 'music/setIndexSong', newIndexSong );
    
    playPause( songListFilter.value[indexSong.value].url, onend );
  }

  function loop() {
    isLooping.value = !isLooping.value
  }

  function swapNightcore() {
    isNightcore.value = !isNightcore.value;

    if(isNightcore.value) {
      isLowcore.value = false;
      globalRate = settings.value.nightcore / 100 + 1;
    } else {
      globalRate = 1;
    }

    console.log(globalRate);

    _song.rate(globalRate);
  }

  function swapDJMode() {
    settings.value.DJ = !settings.value.DJ;
    store.commit('music/settings', { value: settings.value.DJ, type: 'DJ' });
  }

  /// Extra functions
  const buildHowlSong = (mp3Name, onend) => {
    if(!onend) {
      for(let old of Howler._howls) old.unload();
    } else {
      setTimeout( () => {
        if(Howler._howls.length == 2) {
          Howler._howls[0].unload();
        }
      }, settings.value.MIXduration * 1000);
    }

    store.commit('music/loading', true);

    return new Howl({
      src: [ settings.value.baseURL + mp3Name ],
      rate: globalRate,
      html5: false,
      volume: settings.value.volume,
      onplay: () => onplay(),
      onend: () => {
        if(!settings.value.MIXduration) nextSong(true);
      },
      onloaderror: () => console.warn('The song could not be loaded!\n' +  settings.value.baseURL + mp3Name),
      onplayerror: () => console.warn('The song could not be played!\n' +  settings.value.baseURL + mp3Name)
    })
  }


  const onplay = () => {
    store.commit('music/playPauseClass', ICONS.PAUSE );
    timers.value.total = formatTime(_song.duration());

    const initSec = Math.round(_song.duration() / 100 * settings.value.DJstart);
    if(settings.value.DJ) {
      _song.seek(initSec);
      _song.fade(0, settings.value.volume, settings.value.MIXduration * 1000);
    }
    
    const stepFunction = () => {
      const nextWidth = _song.seek() / _song.duration() * 100;

      store.commit('music/dynamicWidth', nextWidth + '%'); 
      timers.value.current = formatTime( _song.seek() ); // Segundo actual de la canción


      if(playPauseClass.value === ICONS.PAUSE) {
        window.requestAnimationFrame( () => stepFunction() );
      }
    }

    window.requestAnimationFrame( () => stepFunction());
    store.commit('music/loading', false);
  }


  //MODES
  const DJMode = () => {
    const finalSec = Math.round(_song.duration() / 100 * settings.value.DJduration);
    const currentSec = Math.round(_song.seek());

    if(currentSec == finalSec && finalSec > 0) {
      _song.fade(settings.value.volume, 0, settings.value.MIXduration * 1000);
      nextSong(true);
    }
    
  }

  const MIXMode = () => {
    if(!settings.value.DJ) {
      const timeLeft = Math.round(_song.duration() - _song.seek());

      if(timeLeft == settings.value.MIXduration) {
        _song.fade(settings.value.volume, 0, settings.value.MIXduration * 1000);
        nextSong(true);
      }
    }
  }


  setInterval( () => {
    if(Object.keys(_song).length > 0) {
      if(settings.value.DJ) DJMode();
      if(settings.value.MIXduration) MIXMode();
    }
  }, 100);


  return {
    // Music Panel Button Functions
    swapLowcore,
    shuffle,
    prevSong,
    playPause,
    nextSong,
    loop,
    swapNightcore,
    swapDJMode,

    // Classes
    isShuffling,
    isLooping,
    isNightcore,
    isLowcore,
    settings,

    timers,
    dynamicWidth,
    playPauseClass
  }
}

export default useMusicPanel;