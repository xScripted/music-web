<template>
	<div id="main">
		<div class="container-nav-settings">
			<NavSettings />
		</div>
		<div class="container-playlist">
			<Playlist/>
		</div>
		<div class="container-player">
			<Player/>
		</div>
	</div>
</template>

<script setup>

	import Player from '@/modules/main/layouts/Player.vue'
	import Playlist from '@/modules/main/layouts/Playlist.vue'
	import NavSettings from '@/modules/main/layouts/NavSettings.vue'

</script>

<style scoped lang="scss">
	#main {
		transition: .3s ease;
		height: 100%;
		display: grid;
		grid-template-rows: 70px 1fr 140px;
		align-items: stretch;

		.container-playlist {
			overflow-y: scroll;
		}

		@include large {
			grid-template-columns: 350px 1fr;
			grid-template-rows: 90% 10%;

			.container-player {
				grid-column: 1 / 3;
			}
		}
	}
</style>