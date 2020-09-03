<template>
	<div class="page-article" v-if="model">
		<div class="info-title d-flex ai-center px-2">
			<img src="../assets/images/backBg.png" class="icon-back mr-3">
			<strong class="flex-1">{{model.title}}</strong>
			<div class="text-grey-2 fs-xs">{{model.createdAt | date}}</div>
		</div>
		
		<div v-html="model.body" class="px-5 article-body"></div>
	</div>
</template>

<script>
	import dayjs from 'dayjs'
	
	export default{
		filters: {
			date(val){
				return dayjs(val).format('YYYY-MM-DD')
			}
		},
		props: {
			id: {require: true}
		},
		data(){
			return {
				model:null
			}
		},
		
		methods:{
			async fetch(){
				const res = await this.$http.get(`articles/${this.id}`)
				this.model = res.data
			}
		},
		
		created(){
			this.fetch()
		}
	}
</script>

<style lang="scss">
	@import '../assets/scss/variables.scss';
	
	.info-title{
		border-bottom: 1px solid map-get($colors, 'grey-1');
		height: 37.5px;
		.icon-back{
			height: 46%;
		}
		strong{
			color: map-get($colors, 'info-1');
		}
	}
	
	.article-body{
		p{
			font-size: 16px;
			color: map-get($colors, 'dark-1' );
			line-height: 28px;
			text-align: center;
		}
		img{
			width: 100%;
			height: auto;
		}
		a{
			font-size: 14px;
		}
	}
</style>
