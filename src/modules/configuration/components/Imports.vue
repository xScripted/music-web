<template>

	<div class="setting">
		<h3> Add new songs <i class="fas fa-music"></i> </h3>
		<input 
			type="file" 
			@change="newSongs($event)" 
			multiple
			accept=".mp3,audio/*"
		/>
	</div>

	<div class="setting">
		<h3> Import songs [JSON] </h3>
		<input type="file" @change="loadSongs($event)">
	</div>

	<div class="setting">
		<h3> Import tags [JSON] </h3>
		<input type="file" @change="loadTags($event)">
	</div>
</template>

<script setup>
	import { v4 as uuid} from 'uuid';
	import { useStore } from 'vuex';
	import { computed } from 'vue';
	import { setSongList } from '@/helpers/setStorageData';
	
	const store = useStore()
	
	function newSongs(ev) {
		const songs = computed( () => store.getters['music/songList'] ); 

		for(let file of ev.target.files) {
			const names = file.name.split('.mp3')[0].split('-');

			store.commit('music/addNewSong', {
				id: 'song-' + uuid(),
				url: file.name,
				title: names[1],
				artist: names[0],
				tags: [],
				selected: false,
				cover: '',
			});
		}

		setSongList(songs.value);
	}

	async function loadSongs(ev) {
		const data = await new Response( ev.target.files[0] ).json();
    store.commit('music/songList', data);
	}

	async function loadTags(ev) {
		const data = await new Response( ev.target.files[0] ).json();
    store.commit('music/tagList', data);
	}
</script>

<style scoped lang="scss">
	.setting {
		margin: 20px;
	}
</style>