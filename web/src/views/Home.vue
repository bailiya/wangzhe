<template>
  <div class="home">
		<!-- 幻灯片 -->
		<swiper :options="swiperOptions">
			<swiper-slide>
				<img class="w-100" src="../assets/images/f6f003b0972e00469ed2345f3b49d10b.jpeg">
			</swiper-slide>
			<swiper-slide>
				<img class="w-100" src="../assets/images/b4906f97448327141e2c75ed5bad39da.jpeg">
			</swiper-slide>
			<swiper-slide>
				<img class="w-100" src="../assets/images/922fe009ec9e234dae40efe6f10cd83b.jpeg">
			</swiper-slide>
			<div class="swiper-pagination pagination-home text-right px-4 pb-2" slot="pagination"></div>
		</swiper>
		
		
		
		
		<!-- 图标导航，精灵图片 -->
		<div class="nav-icons bg-white mt-4 text-center">
			<div class="d-flex flex-wrap">
				<div class="nav-item my-5">
					<i class="sprite sprite-news"></i>
					<span class="fs-sm">爆料站</span>
				</div>
				<div class="nav-item my-5">
					<i class="sprite sprite-story"></i>
					<span class="fs-sm">故事站</span>
				</div>
				<div class="nav-item my-5">
					<i class="sprite sprite-store"></i>
					<span class="fs-sm">周边商城</span>
				</div>
				<div class="nav-item my-5">
					<i class="sprite sprite-dnf"></i>
					<span class="fs-sm">体验服</span>
				</div>
				<div class="nav-item my-5">
					<i class="sprite sprite-numans"></i>
					<span class="fs-sm">新人专区</span>
				</div>
				<div class="nav-item my-5">
					<i class="sprite sprite-glory"></i>
					<span class="fs-sm">荣耀·传承</span>
				</div>
				<div class="nav-item my-5">
					<i class="sprite sprite-campsite"></i>
					<span class="fs-sm">王者营地</span>
				</div>
				<div class="nav-item my-5">
					<i class="sprite sprite-bjnews"></i>
					<span class="fs-sm">公众号</span>
				</div>
				<div class="nav-item my-5">
					<i class="sprite sprite-versions"></i>
					<span class="fs-sm">版本介绍</span>
				</div>
				<div class="nav-item my-5">
					<i class="sprite sprite-game"></i>
					<span class="fs-sm">对局环境</span>
				</div>
				<div class="nav-item my-5">
					<i class="sprite sprite-kgroup"></i>
					<span class="fs-sm">无限王者团</span>
				</div>
				<div class="nav-item my-5">
					<i class="sprite sprite-creative"></i>
					<span class="fs-sm">创意互动营</span>
				</div>
			</div>
			
			<div class="bg-grey py-2 fs-sm">
				<i class="sprite sprite-arrow mr-1"></i>
				<span>收起</span>
			</div>
		</div>
		
		
		
		
		<!-- 新闻资讯 -->
		<m-list-card sprite='sprite-journalism' title='新闻资讯' :categories="newsCats">
			
			<template #items="{category}">
				<div v-for="(news, i) in category.newsList" :key="i"
				@click="$router.push(`/articles/${news._id}`)"
				class="d-flex ai-center mt-6">
					<span class="small-label fs-xs mr-2" :class="newsClass(news.categoryName)">{{news.categoryName}}</span>
					<span class="fs-lg flex-1 text-ellipse pr-4">{{news.title}}</span>
					<span class="time fs-sm">{{news.createdAt | date}}</span>
				</div>
			
			</template>
		</m-list-card>
		
		
		
		<!-- 英雄列表 -->
		<m-list-card sprite='sprite-hero' title='英雄列表' :categories="heroCats">
			<template #hero>
				<div class="w-100 pb-2">
					<img src="../assets/images/910041372175223.jpg" class="w-100">
				</div>
			</template>
			
			<template #items="{category}">
				<div class="d-flex flex-wrap pt-3" style="margin: 0 -0.5rem;">
					<div class="text-center p-2"
					style="width: 20%;"
					v-for="(hero, i) in category.heroList" :key="i"
					@click="$router.push(`/heroes/${hero._id}`)">
						<img :src="hero.avatar" class="w-100">
						<div>{{hero.name}}</div>
					</div>
				</div>
			</template>
			
		</m-list-card>
		
		
		
		
		
		<!-- 精彩视频 -->
		<m-list-card sprite='sprite-video' title='精彩视频' :categories="videoCats">
			
		</m-list-card>
		
		
		
  </div>
</template>

<script>
	import dayjs from 'dayjs'
	
	export default {
		filters: {
			date(val){
				return dayjs(val).format('MM/DD')
			}
		},
		data() {
			return {
				swiperOptions: {
					loop: true,//设置图片循环
					autoplay: true,//设置可自动播放
					speed: 500,//自动播放速度
					pagination: {
						el: '.pagination-home',
					}
				},
				newsCats: [],
				heroCats: [],
				videoCats: [],
				
			}
		},
		
		methods: {
			//获取新闻分类
			async fetchNewsCats(){
				const res = await this.$http.get('news/list')
				this.newsCats = res.data
			},
			
			//获取英雄分类
			async fetchHeroCats(){
				const res = await this.$http.get('heroes/list')
				this.heroCats = res.data
			},
			
			//给新闻前面的分类加上颜色class
			newsClass(cname){
				if(cname == '新闻'){
					return "label-news"
				}else if(cname == '公告'){
					return "label-notice"
				}else if(cname == '活动'){
					return "label-activity"
				}else{
					return "label-match"
				}
			}
			
		},
		
		created(){
			this.fetchNewsCats()
			this.fetchHeroCats()
		}
		
	}
</script>


<style lang="scss">
	@import '../assets/scss/variables.scss';
	
	.pagination-home{
		.swiper-pagination-bullet{
			opacity: 1;
			border-radius: 2px;
			background: map-get($colors, 'white' );
			&.swiper-pagination-bullet-active{
				background: map-get($colors, 'info' );
			}
		}
	}
	
	.nav-icons{
		border-top: 1px solid $border-color;
		border-bottom: 1px solid $border-color;
		
		.nav-item{
			width: 25%;
			height: 40px;
			color: map-get($colors, "dark-1" );
			border-left: 1px solid $border-color;
			&:nth-child(4n+1){//指定元素不要边框
				border-left: none;
			}
			position: relative;
			
			span{
				//font-size: .24rem;
				position: absolute;
				top: 2rem;
				left: 0;
				width: 100%;
				text-align: center;
				display: block;
			}
		}
	}
	
	
	.card-header{
		border-bottom: 1px solid map-get($colors, 'grey-1');
	}
	
	
	.small-label{
		display: inline-block;
		border-radius: 2px;
		padding: 0 2px;
		margin-left: 1px;
		&.label-news{//新闻
			color: map-get($colors, 'news');
			border: 1px solid map-get($colors, 'news');
		}
		&.label-notice{//公告
			color: map-get($colors, 'primary');
			border: 1px solid map-get($colors, 'primary');
		}
		&.label-activity{//活动
			color: map-get($colors, 'activity');
			border: 1px solid map-get($colors, 'activity');
		}
		&.label-match{//赛事
			color: map-get($colors, 'match');
			border: 1px solid map-get($colors, 'match');
		}
	}
	
	.time{
		color: map-get($colors, 'grey-2');
	}
</style>