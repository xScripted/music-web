<template>
  <div id="loading-spinner" v-show="loading">
    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  </div>
</template>

<script setup>
  import { useStore } from 'vuex';
  import { computed } from 'vue';

  const store = useStore();

  const loading = computed( () => store.getters['music/loading']);

</script>

<style scoped>
  #loading-spinner {
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    height: 50px;
    align-items: center;
    justify-content: right;
    margin-right: 50px;
  }

  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }


</style>