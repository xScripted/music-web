<template>
  <div id="menu" :class="{ displayed }">

    <h4 class="menu-opener" @click="displayed = !displayed"> 
      <span> MENU </span> <br>
      <i class="fas fa-angle-down" :class=" { rotate: displayed } "></i> 
    </h4>

    <div v-for="{ name, path } in menuItems" :key="name" @click="autoClose()">

      <router-link :to="`/configuration/${path}`">
        <div class="element"> {{ name }} </div>
      </router-link>

    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const menuItems = [
    {
      name: 'General',
      path: ''
    },
    {
      name: 'Edit Playlist',
      path: 'playlist-editor'
    },
    {
      name: 'Tag Creator',
      path: 'tag-creator'
    },
    {
      name: 'Imports',
      path: 'imports'
    },
    {
      name: 'Exports',
      path: 'exports'
    }
  ]

  function autoClose() {
    setTimeout( () => displayed.value = false, 500 )
  }

  const displayed = ref(false)

</script>

<style scoped lang="scss">
  #menu {
    transition: .3s ease;
    position: absolute;
    width: 100%;
    height: $conf-menu-height;
    overflow: hidden;
    z-index: 1;

    box-shadow: $box-shadow-material;
    background: $dark-color;

    &.displayed {
      transition: .3s ease;
      height: 100%;
    }

    .router-link-exact-active {
      color: $second-darker-color;
    }

    .element {
      padding: 20px;
    }

    @include large {
      position: relative;
      height: 100%;

      .menu-opener {
        display: none;
      }

    }
  }
</style>