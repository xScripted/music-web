<template>
  <div id="player">
    <PlayerSongTitles/>
    <PlayerProgressBar/>
    <PlayerMusicPanel/>
  </div>
</template>

<script setup>

  import PlayerSongTitles from '../components/PlayerSongTitles.vue'
  import PlayerMusicPanel from '../components/PlayerMusicPanel.vue'
  import PlayerProgressBar from '../components/PlayerProgressBar.vue'
  
</script>

<style scoped lang="scss">
  #player {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: $dark-color; 
    box-shadow: $box-shadow-material;
  }
</style>