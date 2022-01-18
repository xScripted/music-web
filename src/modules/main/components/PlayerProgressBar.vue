<template>
  <div id="progress-bar-parent" @click="selectSongMoment( $event )">
    <div id="progress-bar-sound" :style="{ width: dynamicWidth }"></div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import { Howler } from 'howler'

  const store = useStore()
  const dynamicWidth = computed( () => store.getters['music/dynamicWidth'] )


  function selectSongMoment(ev) {

    if(Howler._howls.length > 0) {
      const songMoment = (ev.clientX / window.innerWidth * 100) * Howler._howls[0].duration() / 100
      Howler._howls[0].seek(songMoment)
    }
    
  }
                
</script>

<style scoped lang="scss">
  #progress-bar-parent {
    cursor: pointer;
    position: absolute;
    width: 100%;
    height: 100%;

    #progress-bar-sound{
      transition: 0.1s;
      position: absolute;
      width: 0%;
      height: 100%;
      background: $second-darker-color;
      opacity: 0.3;
    }

  }
</style>