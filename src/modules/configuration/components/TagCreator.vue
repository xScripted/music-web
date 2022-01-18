<template>
  <div id="TagCreator">

    <div id="tag-list">
      <h2>TAG LIST</h2>

      <div class="tags">
        <div class="tag-item tag" 
          v-for="tag in tags" 
          :key="tag.id" 
          @click="updatePreview(tag)"
          :style="{ backgroundColor: tag.bgColor, color: tag.textColor }"
        > 
          {{ tag.name }}
        </div>
      </div>

    </div>

    <div id="tag-editor">

      <h2> TAG EDITOR 
        <i class="fas fa-plus-square" @click="createNewTag()"></i> 
      </h2>

      <div class="preview">
        <div class="tag-item tag" 
          :style="{ backgroundColor: preview.bgColor, color: preview.textColor, cursor: 'inherit' }"
        >
         {{ preview.name }} 
        </div>
      </div>

      <label> Tag Name</label>
      <input type="text" v-model="preview.name">

      <label> Background Color</label>
      <input type="color" v-model="preview.bgColor">

      <label> Text Color</label>
      <input type="color" v-model="preview.textColor">

      <button @click="saveTag()"> 
        <i class="fas fa-save"></i> 
        Save 
      </button>

      <button @click="removeTag()"> 
        <i class="far fa-trash-alt"></i> 
        Remove 
      </button>

    </div>
  </div>
</template>

<script setup>
  import { reactive, computed } from 'vue';
  import { useStore } from 'vuex';
  import { setTagList } from '@/helpers/setStorageData';

  const store = useStore();

  const tags = computed( () => store.getters['music/tagList']);

  const preview = reactive({
    id: '',
    bgColor: '#CCCCCC',
    textColor: '#000000',
    name: 'new tag'
  });

  function createNewTag() {
    preview.id = ''
    preview.name = 'new tag'
    preview.bgColor = '#CCCCCC'
    preview.textColor = '#000000'
  }

  function updatePreview(tag) {
    preview.id = tag.id
    preview.name = tag.name
    preview.bgColor = tag.bgColor
    preview.textColor = tag.textColor
  }

  function saveTag() {
    store.commit('music/saveTag', { 
      id: preview.id,
      name: preview.name,
      bgColor: preview.bgColor,
      textColor: preview.textColor
    });

    createNewTag();
    setTagList(tags.value);
  }

  function removeTag() {
    store.commit('music/removeTag', preview.id); 
    setTagList(tags.value);
  }

</script>

<style scoped lang="scss"> 
  #TagCreator {

    display: grid;
    grid-template-rows: 1fr 500px;

    #tag-list {
      margin: 10px;
      padding: 10px;
      border-radius: 5px;
      text-align: center;
      color: $main-color;
      background-color: $second-color;

      .tag {
        margin: 5px;
        float: left;
      }
    }

    #tag-editor {
      margin: 10px;
      padding: 10px;
      border-radius: 5px;
      color: $main-color;
      text-align: center;
      background-color: $second-color;

      display: grid;
      justify-content: center;

      label {
        margin-top: 20px;
        margin-bottom: 10px;
      }

      input {
        width: 100%;
      }

      button {
        cursor: pointer;
        font-size: 16px;
        margin-top: 20px;
        padding: 10px;
        border: 0;
      }
    }

    @include large {
      display: grid;
      grid-template-columns: 1fr 250px;
      grid-template-rows: 1fr;
    }
  }


</style>