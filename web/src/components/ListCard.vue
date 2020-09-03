<template>
	<m-card :sprite='sprite' :title='title'>
		<template #hero>
			<!-- 插槽 -->
			<slot name="hero"></slot>
		</template>
		
		<div class="nav fs-md jc-between mr-2 mt-4">
			<div class="nav-item" :class="{active: active === i}"
			v-for="(category, i) in categories" :key="i"
			@click="$refs.list.$swiper.slideTo(i)">
				<div class="nav-link">{{category.name}}</div>
			</div>
		</div>
		
		
		
		
		<div class="pb-4">
			<!-- options="{autoHeight: true}"会让卡片根据卡片的内容改变高度，而不是按照最高的那个来 -->
			<swiper ref="list" :options="{autoHeight: true}"
			@slide-change="() => active = $refs.list.$swiper.realIndex">
				<swiper-slide v-for="(category, i) in categories" :key="i">
					
					<!-- 插槽 -->
					<slot name="items" :category="category"></slot>
					
				</swiper-slide>
			</swiper>
		</div>
		
	</m-card>
</template>

<script>
	export default{
		props: {
			sprite: { type: String, required: true },
			title: { type: String, required: true },
			categories: {type: Array, required: true },
		},
		
		data(){
			return {
				active: 0
			}
		}
	}
</script>

<style>
</style>
