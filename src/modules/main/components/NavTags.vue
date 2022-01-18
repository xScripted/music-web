<template>
	<div id="nav-tags">

		<div class="tag-title" @click="selectAll()"> Tags </div>

		<div id="tag-list">
			<div class="tag-item tag" 
				v-for="tag in tags" 
				:key="tag.id" 
				tag-state="unselected"
				@click="activeTagFilter($event.target, tag.id)"
				:style="{ backgroundColor: tag.bgColor, color: tag.textColor }"
			> 
				{{ tag.name }}
			</div>
		</div>

		<div class="switch-container">

			<i class="fas fa-plus"></i>

			<label class="switch">
				<input type="checkbox" @input="swapTagAndOr()">
				<span class="slider round"></span>
			</label>

			<i class="fas fa-divide"></i>

		</div>

	</div>
</template>

<script setup>
	import { computed, ref } from 'vue'
	import { useStore } from 'vuex'

	const store = useStore()
	const tags = computed( () => store.getters['music/tagList'] )
	const tagAndOr = computed( () => store.getters['music/tagAndOr'] )
	const isAllTags = ref(false)

	function swapTagAndOr() {
		store.commit('music/tagAndOr', !tagAndOr.value )
		store.commit('music/filterSongs')
	}

	function activeTagFilter(domTag, idTag) {

		const type = domTag.getAttribute('tag-state');

		const tagFunctions = {
			selected() {
				domTag.setAttribute('tag-state', 'negative');
				store.commit('music/addTagListNegative', idTag);
				store.commit('music/removeTagListFilter', idTag);
			},
			negative() {
				domTag.setAttribute('tag-state', 'unselected');
				store.commit('music/removeTagListNegative', idTag);
			},
			unselected() {
				domTag.setAttribute('tag-state', 'selected');
				store.commit('music/addTagListFilter', idTag);
			}
		}

		tagFunctions[type]();

		store.commit('music/filterSongs');
	}


	function selectAll() {
		if(!isAllTags.value) {
			tags.value.map( tag => {
				store.commit('music/addTagListFilter', tag.id);
			})
		} else {
			tags.value.map( tag => {
				store.commit('music/removeTagListFilter', tag.id);
			})
		}

		isAllTags.value = !isAllTags.value;
		store.commit('music/filterSongs');
	}

</script>

<style scoped lang="scss">
	#nav-tags {
		position: relative;
		height: calc(100% - $topbar-height);
		display: grid;
		grid-template-rows: 40px 1fr 60px;
		min-height: 0;

		@include large {
			height: 100%;
		}

		.tag-title {
			cursor: pointer;
			margin-top: 5px;
		}

		#tag-list{
			position: relative;
			padding: 0px 15px;
			height: 100%;
			overflow-y: scroll;

			&::-webkit-scrollbar { display: none; }

			.tag-item {
				transition: .3s;
				float: left;
				margin: 5px;
				display: flex;
			}
		}
		
		.switch-container {
			display: flex;
			justify-content: center;
			align-items: center;

			i {
				font-size: 20px;
				padding: 5px 15px;
			}
		}
	}

</style>