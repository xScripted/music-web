<template>
  <div id="Searcher">
    <input class="input-cool" 
      type="text" 
      placeholder="Searcher" 
      @input="filterSongs($event.target.value)"
    >
  </div>
</template>

<script setup>

  import { useStore } from 'vuex';

  const store = useStore();

  function filterSongs(searchText) {
    store.commit('music/searchText', searchText );
    store.commit('music/filterSongs');
  }

</script>

<style scoped lang="scss">

  #Searcher {
    display: flex;

    .input-cool {
      margin: 20px;
    }
  }

</style>