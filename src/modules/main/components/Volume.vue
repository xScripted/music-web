<template>
  <div id="volume">
    <i class="fas fa-volume-mute"></i>  
    <input 
      type="range" 
      min="1" 
      max="100"
      :value="settings.volume * 100" 
      @input="setVolume( +$event.target.value, 'volume' )"
    />
    <i class="fas fa-volume-up"></i>
  </div>
</template>

<script setup>
  import { useStore } from 'vuex';
  import { computed } from 'vue';
  import { Howler } from 'howler';

  const store = useStore();
  const settings = computed( () => store.getters['music/settings'] );

  function setVolume( value, type ) {
    value = value / 100;
    store.commit('music/settings', { value, type } );
    Howler._howls.map( howl => howl.volume(value));
  }

</script>


<style lang="scss" scoped>
  #volume {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;

    i {
      margin: 10px;
    }
  }
</style>