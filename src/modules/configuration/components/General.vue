<template>
  <div id="General">
    <h2> General </h2>

    <div class="setting">
      <div class="name"> Song Base URL </div>
      <input 
        type="text"
        class="input-cool"
        placeholder="http://www.songlocationexample.com/"
        :value="settings.baseURL"
        @input="setSetting( $event.target.value, 'baseURL' )"
      >
    </div>

    <div class="setting">
      <div class="name"> Nightcore {{ settings.nightcore }} </div>
      <input 
        type="range" 
        min="1" 
        max="100"
        :value="settings.nightcore" 
        @input="setSetting( +$event.target.value, 'nightcore' )">
    </div>

    <div class="setting">
      <div class="name"> Lowcore {{ settings.lowcore }} </div>
      <input 
        type="range" 
        min="1" 
        max="99"
        :value="settings.lowcore" 
        @input="setSetting( +$event.target.value, 'lowcore' )">
    </div>

    <div class="setting">
      <div class="name"> DJ MODE </div>
      Songs starts at: 
        <input 
          type="number" 
          @input="setSetting( +$event.target.value, 'DJstart' )" 
          class="dj input-cool" 
          :value="settings.DJstart"
        > 
        %<br>
      Songs duration are: 
        <input type="number" 
        @input="setSetting( +$event.target.value, 'DJduration' )"
        class="dj input-cool" 
        :value="settings.DJduration"
      > 
      %
    </div>

    <div class="setting">
      <div class="name"> MIX MODE </div>
      Delay: 
      <input 
        type="number" 
        @input="setSetting( +$event.target.value, 'MIXduration' )" 
        class="dj input-cool" 
        :value="settings.MIXduration"
      > 
      seconds.
    </div>

  </div>
</template>

<script setup>
  import { useStore } from 'vuex';
  import { computed } from 'vue';

  const store = useStore();
  const settings = computed( () => store.getters['music/settings'] );

  function setSetting( value, type ) {
    store.commit('music/settings', { value, type } );
  }

</script>

<style scoped lang="scss"> 
  #General {
    padding: 20px 30px;
    overflow-y: scroll;

    h2 {
      text-align: center;
    }

    .setting {
      margin: 20px 0px;

      .name {
        margin-top: 30px;
        font-weight: bold;
        color: $second-darker-color;
      }

      input[type="range"] {
        cursor: pointer;
        width: 250px;
      }

      .input-cool {
        margin: 10px 0px;
      }

      .dj {
        width: 50px;
      }
    }
  }
</style>