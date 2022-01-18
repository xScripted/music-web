<template>
  <div id="song-data">
    <div class="song-title"> {{ song.title }}</div>
    <div class="song-artist"> {{ song.artist }}</div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const song = computed( () => store.getters['music/song'] )

</script>

<style scoped lang="scss">
  #song-data {
    position: absolute;
    text-align: center;
    width: 100%;
    height: 0;
    margin-top: 20px;

    .song-artist {
      font-weight: bold;
      padding: 10px 0px;
      font-size: 14px;
    }

    @include large {

      text-align: left;
      margin: 20px 30px;

    }

  }
</style>