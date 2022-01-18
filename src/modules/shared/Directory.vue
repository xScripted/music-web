<template>
  <div
    id="PlaylistDirectory"
    ref="PlaylistDirectory"
    :style="{ 'overflow-y': config ? 'scroll' : 'none' }"
  >
    <div class="songs">
      <div
        class="row"
        :class="{ config }"
        v-for="(song, index) in songListFilter"
        :key="index"
        @click="emitSong(song.url, index)"
      >
        <div class="playing">
          <i
            v-show="playingSong.title == song.title && !config"
            class="fas fa-volume-up"
          ></i>
          <div
            class="custom-checkbox"
            :class="{ active: song.selected }"
            v-show="config"
            @click="selectSong(song.id)"
          />
        </div>

        <div class="title-artist">
          <input
            class="title"
            :class="{ 'no-input': !config }"
            type="text"
            :value="song.title"
            :readonly="!config"
            @input="editSongTitle($event, song.id)"
          />

          <input
            class="artist"
            :class="{ 'no-input': !config }"
            type="text"
            :value="song.artist"
            :readonly="!config"
            @input="editSongArtist($event, song.id)"
          />
        </div>

        <div class="tags">
          <div
            v-for="id in song.tags"
            :key="id"
            class="tag"
            :style="{
              backgroundColor: getTag(id).bgColor,
              color: getTag(id).textColor,
            }"
          >
            {{ getTag(id).name }}
          </div>
        </div>

        <div v-show="config" class="remove-song">
          <i class="fas fa-times" @click="store.commit('music/deleteSong', song.id)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, defineProps, toRefs, ref } from "vue";

import { useStore } from "vuex";

const emitter = inject("emitter");
const store = useStore();
const PlaylistDirectory = ref();

const songListFilter = computed(() => store.getters["music/songListFilter"]);
const playingSong = computed(() => store.getters["music/song"]);
const tagList = computed(() => store.getters["music/tagList"]);

const props = defineProps({
  config: Boolean,
});

const { config } = toRefs(props);

function selectSong(id) {
  store.commit("music/swapSelectSong", id);
}

function getTag(id) {
  const tag = tagList.value.find((tag) => tag.id === id);
  return tag ? tag : {};
}

function editSongTitle(ev, id) {
  store.commit("music/editSongTitle", { id, title: ev.target.value });
}

function editSongArtist(ev, id) {
  store.commit("music/editSongArtist", { id, artist: ev.target.value });
}

function emitSong(url, index) {
  if (!config.value) {
    store.commit("music/setIndexSong", index);
    emitter.emit("play-song", url);
  }
}
</script>

<style scoped lang="scss">
#PlaylistDirectory {
  height: 100%;

  .songs {
    margin-top: 10px;

    .playing {
      display: flex;
      justify-content: center;
      grid-row: 1 / 4;
    }

    .row {
      transition: 0.2s ease;
      cursor: pointer;
      display: grid;
      grid-template-columns: 50px 1fr 1fr;
      grid-template-rows: 1fr;
      align-items: center;
      height: 50px;

      &.config{
        grid-template-columns: 50px 1fr 1fr 30px;
      }

      @include large {
        grid-template-columns: 50px 2fr 3fr;
      }

      &:hover {
        transition: 0.2s ease;
        color: $second-darker-color;
        box-shadow: $box-shadow-material;
      }

      input {
        transition: 0.3s ease;
        background-color: transparent;
        border: 0;
        font-size: 16px;
        color: inherit;
        display: block;
        width: 100%;

        &.no-input {
          cursor: pointer;
        }

        &:focus {
          transition: 0.3s ease;
          outline: none;
          color: $hard-contrast;
        }
      }

      .artist {
        grid-column: 2 / 3;
        font-size: 12px;
        color: rgb(148, 148, 148);
        margin-left: 5px;
      }

      .tags {
        overflow-y: hidden;

        .tag {
          margin: 5px;
          height: 12px;
          font-size: 11px;
          padding: 0px 2px 2px 2px;
          float: left;
        }
      }

      .remove-song{
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
