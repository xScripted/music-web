<template>
  <div id="Exports">
    <a 
      :href="'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(songs))"
      :download="songs.length + '-songs.json'"
    > 
      <button>
        Export songs
      </button>
    </a>

    <a 
      :href="'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tags))"
      :download="tags.length + '-tags.json'"
    > 
      <button>
        Export tags
      </button>
    </a>
  </div>
</template>



<script setup>
	import { computed } from 'vue';
	import { useStore } from 'vuex';

	const store = useStore();
  const songs = computed( () => store.getters['music/songList']);
  const tags = computed( () => store.getters['music/tagList']);

</script>

<style lang="scss" scoped>
  #Exports {
    margin: 20px;
    display: grid;

    button {
      cursor: pointer;
      margin: 5px;
      width: 100%;
      max-width: 400px;
      padding: 10px 20px;
    }
  }
</style>