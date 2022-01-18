<template>
  <div id="nav-settings" :class="{ displayed }">

    <div id="settings-mobile-btn" @click="displayed = !displayed"> 
      <h4 class="menu-opener"> 
        <span> SETTINGS </span> <br>
        <i class="fas fa-angle-down" :class=" { rotate: displayed } "></i> 
      </h4>
    </div>

    <NavSearcher/>
    <NavTags/>
    <Volume/>
  </div>
</template>

<script setup>

  import NavSearcher from '@/modules/shared/NavSearcher.vue';
  import NavTags from '../components/NavTags.vue';
  import Volume from '../components/Volume.vue';
  import { ref } from 'vue';

  const displayed = ref(false);

</script>

<style scoped lang="scss">
  #nav-settings {
    transition: .3s ease;
    position: absolute;
    width: 100%;
    height: 70px;
    text-align: center;
    background-color: $dark-color;
    overflow: hidden;
    z-index: 1;

    display: grid;
    grid-template-rows: 70px 70px 500px 50px;


    &.displayed {
      width: 100%;
      height: 100%;
      transition: .3s ease;
    }

    #settings-mobile-btn {
      cursor: pointer;
      transition: .3s ease;
      position: relative;
      width: 100%;
      height: 80px;
      overflow: hidden;

      box-shadow: $box-shadow-material;
      background: $dark-color;
    }

  }

  @include large {
    #nav-settings {
      display: grid;
      grid-template-rows: 70px 1fr;
      overflow: hidden;
      height: 100%;
      position: relative;

      
      &.displayed {
        height: 100%
      }

      #settings-mobile-btn {
        display: none;
      }
    }
  }

</style>