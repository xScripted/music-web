<template>
  <div id="EditButtons"> 
    <button class="btn-cool" @click="reset()"> Reset </button>
    <div
      class="custom-checkbox"
      :class=" { active: areSelected } "
      @click="selectAllSongs()"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { inject } from 'vue';

  const emitter = inject('emitter');

  const store = useStore();
  const areSelected = ref(false);

  function selectAllSongs() {
    areSelected.value = !areSelected.value;
    store.commit('music/selectAllSongs', areSelected.value);
  }

  function reset() {
    areSelected.value = false;
    store.commit('music/selectAllSongs', false);
    emitter.emit('clear-tags');
  }

</script>

<style scoped lang="scss">
  #EditButtons {
    display: grid;

    button {
      cursor: pointer;
      height: 30px;
      margin: 5px;
      font-size: 10px;
    }

    .custom-checkbox{

      margin-left: 13px;
      margin-top: 5px;
    }
  }
</style>