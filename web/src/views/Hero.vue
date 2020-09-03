<template>
	<div>
<!-- 顶部 -->
		<div class="topbar bg-black pt-3 pb-2 px-5 d-flex ai-center">
			<div class="logo_img"></div>
			<div class="px-3 flex-1">
				<span class="text-white mr-4">王者荣耀</span>
				<span class="text-white">攻略站</span>
			</div>
			<router-link to="/" tag="div" class="text-white d-flex ai-center">
				<span class="fs-sm mr-2">更多英雄</span>
				<span style="font-size: 20px;">&gt;</span>
			</router-link>
		</div>
		
		
		
<!-- 海报部分 -->
		<div class="hero-top" v-if="model" :style="{'background-image':`url(${model.banner})`}">
			
			<div class="text-white top-info flex-column jc-end d-flex">
				<div class="fs-ls">{{model.title}}</div>
				<h3 class="fs-xl mt-1">{{model.name}}</h3>
				<div class="fs-ls mt-1" v-if="categories">{{categories.join('/')}}</div>
				<div class="mt-1 d-flex ai-center hero-scores jc-between">
					<div class="d-flex ai-center" v-if="model.scores">
						<span>难度</span>
						<span class="hero-icon" :class="`difficult-${model.scores.difficult}`"></span>
						<span>技能</span>
						<span class="hero-icon" :class="`skills-${model.scores.skills}`"></span>
						<span>攻击</span>
						<span class="hero-icon" :class="`attack-${model.scores.attack}`"></span>
						<span>生存</span>
						<span class="hero-icon" :class="`survive-${model.scores.survive}`"></span>
					</div>
					<router-link to="/" tag="div" class="text-grey-1 fs-ls">
						皮肤：3 &gt;
					</router-link>
				</div>
			</div>
			
		</div>
		
		
		
		
		
<!-- 底部 -->
		<div class="" v-if="model">
			<div class="px-4 bg-white">
				<div class="nav d-flex jc-around pt-4 pb-2 hero-nav">
					<div class="nav-item active">
						<div class="nav-link">英雄初识</div>
					</div>
					<div class="nav-item">
						<div class="nav-link">进阶攻略</div>
					</div>
				</div>
			</div>
			
<!-- swiper -->
			<swiper>
				<swiper-slide>
					<div class="bg-white px-4 pt-3 d-flex jc-between">
						<a href="#" class="d-flex ai-center jc-between hero-btn">
							<img src="../assets/images/icon_06.png">
							<span>英雄介绍视频</span>
						</a>
						<a href="#" class="d-flex ai-center jc-between hero-btn">
							<img src="../assets/images/icon_07.png">
							<span>一图识英雄</span>
						</a>
					</div>
					
					
					
<!-- 技能 -->
					<div class="d-flex jc-between px-8 pt-8 bg-white">
						<img :src="item.icon" v-for="(item,i) in model.skills" :key="i"
						width="65"
						class="skills-icon"
						@click="currentSkill = i"
						:class="{active: currentSkill === i}">
					</div>
					
					<div v-if="cSkill" class="skills px-4 pb-4 bg-white">
						<div class="d-flex ai-center pt-8 pb-6">
							<h3 class="mr-10">{{cSkill.name}}</h3>
							<span class="delay">(冷却值：{{cSkill.delay}}&nbsp;消耗：{{cSkill.cost}})</span>
						</div>
						<p class="text-dark-1" style="line-height: 20px;">{{cSkill.description}}</p>
					</div>
					
	
					
<!-- 出装推荐 -->					
					<m-card-1 sprite="sprite-recommend" title="出装推荐" class="hero-items">
						<div class="fs-xl mb-1">顺风出装</div>
						<div class=" d-flex jc-around text-center tailwind">
							<div v-for="(item,i) in model.items1" :key="i">
								<img :src="item.icon" class="img-icon my-2">
								<div class="fs-xs">{{item.name}}</div>
							</div>
						</div>
						<div class="fs-xl mb-1 mt-4">逆风出装</div>
						<div class="d-flex jc-around text-center ">
							<div v-for="(item,i) in model.items2" :key="i">
								<img :src="item.icon" class="img-icon my-2">
								<div class="fs-xs">{{item.name}}</div>
							</div>
						</div>
					</m-card-1>
					
					
					
<!-- 使用技巧 -->					
					<m-card-1 sprite="sprite-Skill" title="使用技巧">
						<p style="line-height: 20px;">{{model.usageTips}}</p>
					</m-card-1>
					
					
					
<!-- 对抗技巧 -->					
					<m-card-1 sprite="sprite-confront" title="对抗技巧">
						<p style="line-height: 20px;">{{model.battleTips}}</p>
					</m-card-1>
					
					
					
<!-- 团战思路 -->					
					<m-card-1 sprite="sprite-team" title="团战思路">
						<p style="line-height: 20px;">{{model.teamTips}}</p>
					</m-card-1>
					
					
					
<!-- 英雄关系 -->					
					<m-card-1 sprite="sprite-relationship" title="英雄关系">
						<div class="fs-xl">最佳搭档</div>
						<div v-for="(item,i) in model.partners" :key="i">
							<div class="d-flex relation mt-4">
								<img :src="item.hero.avatar" class="mr-3">
								<p style="line-height: 20px;">{{item.description}}</p>
							</div>
						</div>
					</m-card-1>
					
					
					
				</swiper-slide>
				
				<swiper-slide></swiper-slide>
			</swiper>
			
		</div>
	</div>
</template>

<script>
	export default{
		props: {
			id: {require: true}
		},
		data(){
			return {
				model: null,
				categories: null,
				currentSkill: 0,
			}
		},
		
		computed:{
			cSkill(){
				return this.model.skills[this.currentSkill]
			}
		},
		
		methods:{
			async fetch(){
				const res = await this.$http.get(`heroes/${this.id}`)
				this.model = res.data
			},
			
			async fetchCat(){
				const res = await this.$http.get(`herocat/${this.id}`)
				this.categories = res.data
			}
		},
		
		created(){
			this.fetch()
			this.fetchCat()
		}
	}
</script>

<style lang="scss">
	@import '../assets/scss/variables.scss';
	
	h3{
		margin: 0;
	}
	
	.hero-top{
		height: 191px;
		background: no-repeat top center #FFFFFF;
		background-size: 100% 100%;
	}
	
	.top-info{
		height: 100%;
		padding: 15px;
		background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1));//从全透明纯黑渐变到不透明纯黑
		.hero-scores{
			span{
				margin-right: 6.5px;
				font-size: 12px;
			}
		}
	}
	
	.hero-nav{
		border-bottom: 1px solid map-get($colors, 'grey-1' ) ;
	}
	
	.hero-btn{
		width: 49%;
		padding: 8px 30px;
		background-color: #fcfcfc;
		border: 1px solid #eceef0;
		border-radius: 5px;
		img{
			width: 20px;
		}
		span{
			color: #111111;
		}
	}
	
	.skills{
		border-bottom: 1px solid #d4d9de;
		.delay{
			font-size: 11.5px;
			color: #7a7a80;
		}
	}
	
	.skills-icon{
		border: 2px solid map-get($colors, 'white');
		border-radius: 45%;
		&.active{
			border: 2px solid map-get($colors, 'primary');
		}
	}
	
	.hero-items{
		.img-icon{
			border-radius: 50%;
			width: 47px;
			height: 47px;
		}
		.tailwind{
			border-bottom: 1px solid map-get($colors, 'grey-1');
		}
	}
	
	.relation{
		img{
			width: 47px;
			height: 47px;
		}
	}
</style>
