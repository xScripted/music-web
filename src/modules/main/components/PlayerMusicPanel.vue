<template>
  <div id="MusicPanel">
    <div class="current-duration"> {{ timers.current }} </div>
    <i @click="swapLowcore()"   class="icon far fa-frown" :class="{ active: isLowcore }"></i>
    <i @click="shuffle()"       class="icon fas fa-random" :class="{ active: isShuffling }"></i>
    <i @click="prevSong()"      class="icon fas fa-chevron-left"></i>
    <i @click="playPause()"     class="icon far" :class="[playPauseClass]"></i>
    <i @click="nextSong()"      class="icon fas fa-chevron-right"></i>
    <i @click="loop()"          class="icon fas fa-sync-alt" :class="{ active: isLooping }"></i>
    <i @click="swapNightcore()" class="icon far fa-smile" :class="{ active: isNightcore }"></i>
    <div class="total-duration"> {{ timers.total }} </div>
  </div>
  <i @click="swapDJMode()" id="dj-mode" class="icon fas fa-compact-disc" :class="{ active: settings.DJ }"></i>
</template>

<script setup>
  import { inject } from 'vue';
  import useMusicPanel from '../composables/useMusicPanel'
  
  
  const emitter = inject('emitter')

  emitter.on('play-song', ( url ) => playPause(url) )


  const {

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
    playPauseClass

  } = useMusicPanel()

</script>

<style scoped lang="scss">
  #MusicPanel {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10px;
    margin: auto;
    width: 320px;
    height: 60px;

    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(9, 1fr);

    @include large {
      width: 500px;
      bottom: 0px;
    }

    .total-duration, .current-duration {
      user-select: none;
      color: $second-color;
      font-size: 11px;
    }

    .fa-chevron-left, .fa-chevron-right {
      height: 20px;
      width: 20px;
      text-align: center;
    }

    .fa-play-circle, .fa-pause-circle {
      font-size: 30px;

      @include large {
        font-size: 35px;
      }
    }
  }

  .icon {
    user-select: none;
    transition: .3s ease;
    cursor: pointer;
    font-size: 20px;
    color: $second-color;
    padding: 5px;
    border-radius: 100%;

    @include large {
      font-size: 20px;
    }

    &:hover {
      transition: .3s ease;
      background-color: $second-darker-color;
      color: $main-color;
    }

    &.active {
      transition: .3s ease;
      background-color: $second-color;
      color: $main-color;
    }

  }

  #dj-mode {
    position: absolute;
    top: 20px;
    right: 10px;
    font-size: 25px;

    @include large {
      top: 45px;
    }
  }

</style>