<template>
	<div class="card card-border bg-white mt-4 px-4 pt-1">
		<div>
			<div class="d-flex ai-center pb-1">
				<i class="sprite mr-2" :class="sprite"></i>
				<h2 class="fs-xl flex-1">{{title}}</h2>
			</div>
		</div>
		
		<div class="pb-3 card-body">
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
	.card-border{
		border-bottom: 1px solid #d4d9de;
	}
</style>
