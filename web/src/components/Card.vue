<template>
	<div class="card bg-white mt-5 px-5 pt-5">
		<div class="card-header">
			<div class="d-flex ai-center pb-5">
				<i class="sprite mr-2" :class="sprite"></i>
				<div class="fs-xl flex-1">{{title}}</div>
				<i class="sprite sprite-spot"></i>
			</div>
			<!-- 插槽 -->
			<slot name="hero"></slot>
		</div>
		
		<div class="card-body">
			<slot></slot><!-- 外面调用组件时，写的内容都会放在<slot></slot>里 -->
		</div>
	</div>
</template>

<script>
	export default{
		props: {
			title: { type: String, required: true },/* required:true 必填 */
			sprite: { type: String, required: true }
		}
	}
</script>

<style>
</style>
