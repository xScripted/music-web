<template>
  <div id="PlaylistEditor">
    <div id="showcase">

      <div id="tag-list">

        <div class="tag-item tag" 
          v-for="tag in tags" 
          :key="tag.id"
          :style="{ backgroundColor: tag.bgColor, color: tag.textColor }"
          :tag-state="selectedTags.includes(tag.id) ? 'selected' : ''"
          @click="selectTag( tag.id )"
        > 
          {{ tag.name }}
        </div>

      </div>

      <div class="buttons">
        <button class="btn-cool" @click="addTags()"> ADD </button>
        <button class="btn-cool" @click="removeTags()"> REMOVE </button>
      </div>

		</div>

    <div id="tools">
      <EditButtons/>
      <NavSearcher/>
    </div>

    <div id="directory">
      <Directory :config="true"/>
    </div>
  </div>
</template>

<script setup>
import Directory from '@/modules/shared/Directory.vue';
import NavSearcher from '@/modules/shared/NavSearcher.vue';
import EditButtons from '@/modules/configuration/components/EditButtons.vue';

import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { inject } from 'vue';


const emitter = inject('emitter');
emitter.on('clear-tags', () => {
  selectedTags.value = [];
  removeTags();
})

const store = useStore();
const tags = computed( () => store.getters['music/tagList'] );

const selectedTags = ref([]);


function selectTag(id) {
  if( selectedTags.value.includes(id) ) {
    const i = selectedTags.value.indexOf(id);
    selectedTags.value.splice(i, 1);
  } else {
    selectedTags.value.push(id);
  }
}

function addTags() {
  store.commit('music/addTagsToSongs', selectedTags.value);
}

function removeTags() {
  store.commit('music/removeTagsToSongs', selectedTags.value);
}

</script>

<style scoped lang="scss">
  #PlaylistEditor {
    display: grid;
    grid-template-rows: 150px 80px calc(100vh - (150px + 80px + $topbar-height) );
    overflow: hidden;

    @include large {
      grid-template-rows: 150px 80px calc(100vh - (150px + 80px + $topbar-height) );
    }

    #showcase {
      display: grid;
      grid-template-columns: 1fr 100px;
      overflow-y: scroll;

      margin: 10px;

      .tag {
        float: left;
        margin: 5px;
      }

      .buttons {
        display: grid;
        grid-template-rows: 1fr 1fr;
        
        button {
          margin: 10px;
        }
      }
    }

    #tools {
      display: flex;
      border-bottom: 2px solid black;
    }
  }

</style>