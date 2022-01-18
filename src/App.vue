<template>
  <transition name="fade">
    <div id="preloader" v-show="preloader">
      <div>
        <img src="favicon.ico" alt="">
      </div>
    </div>
  </transition>
  
  <div id="topbar">

    <h1> Scripted Music App - {{ songListFilter.length }} </h1>

    <i class="fas" 
      :class=" currentName === 'main' ? 'fa-cog' : 'fa-home'" 
      @click="changeView()"
    >
    </i>

    <Loading/>

  </div>

  <div id="router-content">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>

  import { computed, provide, ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute, useRouter } from 'vue-router';
  import { getTagList, getSongList, getSettings } from './helpers/getStorageData';
  import mitt from 'mitt';
  import dataSongs from '../public/json/songs.json';
  import dataTags from '../public/json/tags.json';
  import Loading from './modules/shared/Loading.vue';


  const route = useRoute();
  const router = useRouter();
  const store = useStore();
  const emitter = mitt();

  const currentName = computed( () => route.name );

  // Providers
  provide('emitter', emitter);

  // Routes
  const songListFilter = computed( () => store.getters['music/songListFilter'] );

  const changeView = () => {
    const nextRouteName = currentName.value === 'main' ? 'configuration-general' : 'main' ;
    router.push( { name: nextRouteName } );
  }

  //Preloader
  const preloader = ref(true);
  const interval = setInterval( () => {
    const directory = document.querySelector('#PlaylistDirectory');
    const rows = document.querySelectorAll('.row');
    if(rows.length === songListFilter.value.length || !directory) {
      preloader.value = false;
      clearInterval(interval);
    }
  }, 200);


  // Get LocalStorage Data
  const tagList = getTagList();
  const songList = getSongList();
  const settings = getSettings();

  store.commit('music/tagList', tagList );
  store.commit('music/songList', songList );
  store.commit('music/allSettings', settings );

  if(songList.length == 0) {
    store.commit('music/songList', dataSongs);
  }
    
  if(tagList.length == 0) {
    store.commit('music/tagList', dataTags);
  }

  function reportWindowSize() {
    // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  reportWindowSize();

  window.onresize = reportWindowSize;

</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat&family=Rouge+Script&display=swap");


#preloader {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: $main-color;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
  }

  p {
    text-align: center;
  }

}

body {
  margin: 0;
  background: $main-color;
  color: $second-color;
  font-family: Montserrat;
  overflow: hidden;
  // test -> background-image: url('https://i.ibb.co/tHGDJ8d/pexels-veeterzy-114979.jpg');
  background-size: cover;

  height: 100vh; /* Use vh as a fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);

  #app {
    height: 100%;

    * {
      user-select: none;
    }
  }
}

#topbar {
  height: $topbar-height;
  background: $dark-color;
  box-shadow: $box-shadow-material;

  h1 {
    position: absolute;
    margin: 13px 20px;
    font-family: "Rouge Script";
    color: $second-darker-color;
    font-size: 20px;
  }

  i {
    cursor: pointer;
    position: absolute;
    font-size: 17px;
    right: 20px;
    top: 15px;
  }
}

#router-content {
  height: calc(100% - $topbar-height);
}

a {
  transition: 0.3s ease;
  text-decoration: none !important;
  color: $second-color;

  &:hover {
    transition: 0.3s ease;
    color: $second-darker-color;
  }

  &.router-link-exact-active {
    font-weight: bold;
  }
}

.tag {
  transition: 0.2s;
  cursor: pointer;
  font-size: 15px;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 2px 7px;
  user-select: none;
  height: 22px;
  overflow: hidden;
  white-space: nowrap;
  font-weight: bold;

  &:hover {
    transition: 0.2s;
    transform: scale(0.8, 1.2);
  }

  &[tag-state=selected] {
    transition: 0.2s;
    transform: skew(0deg, -7deg);
    border: 2px solid black;
  }

  &[tag-state=negative] {
    transition: 0.2s;
    transform: scale(.8);
    filter: brightness(.5);
  }
}

.custom-checkbox {
  cursor: pointer;
  transition: 0.3s ease;
  margin: 10px;
  width: 20px;
  height: 20px;
  border: 2px solid $second-color;
  border-radius: 100%;

  &.active {
    transition: 0.3s ease;
    background-color: $second-darker-color;
    box-shadow: inset 0px 0px 3px 4px $main-color;
  }
}

.menu-opener {
  text-align: center;

  i {
    transition: 0.3s ease;
    transform: translateY(1px);

    &.rotate {
      transition: 0.3s ease;
      transform: translateY(1px) rotateX(180deg);
    }
  }
}

// SWITCH
.switch {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 26px;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider {
      background-color: $second-darker-color;
    }

    &:focus + .slider {
      box-shadow: 0 0 1px $second-darker-color;
    }

    &:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;

    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    /* Rounded sliders */
    &.round {
      border-radius: 20px;

      &:before {
        border-radius: 50%;
      }
    }
  }
}

// Input Cool
.input-cool {
  transition: 0.3s ease;
  padding: 5px;
  width: 100%;
  background: transparent;
  border: 0px;
  color: $second-color;
  font-size: 20px;
  border-bottom: 2px solid transparent;

  &:focus {
    outline: none;
    transition: 0.3s ease;
    border-bottom: 2px solid $second-darker-color;
  }
}

// Button Cool
.btn-cool {
  cursor: pointer;
  transition: .3s ease;
  border: 0;
  border-radius: 2px;
  background: $second-color;

  &:hover {
    transition: .2s ease;
    background: $second-darker-color;
  }

  &:active {
    box-shadow: inset 0 0 10px 0px rgb(0, 0, 0);
  }


}

//SCROLLBAR
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px rgb(197, 197, 197);
  border-radius: 3px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(70, 70, 70);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(95, 95, 95);
}

// Fade
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
