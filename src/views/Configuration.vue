<template>
  <div id="Configuration">
    <Menu/>
    <div class="router-views">
      <router-view/>
    </div>
  </div>
</template>

<script setup>
  import Menu from '@/modules/configuration/layouts/Menu'

</script>

<style scoped lang="scss">

  #Configuration {
    height: 100%;

    .router-views {
      padding-top: $conf-menu-height;
    }

    @include large {
      display: grid;
      grid-template-columns: 13% 87%;

      .router-views {
        padding-top: 0;
      }

    }


  }
</style>