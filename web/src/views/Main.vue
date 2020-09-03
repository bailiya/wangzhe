<template>
	<div>
		<div class="topbar bg-black pt-3 pb-2 px-5 d-flex ai-center">
			<div class="logo_img"></div>
			<div class="px-3 flex-1">
				<div class="text-white">王者荣耀</div>
				<div class="text-dark fs-xxs">团队成就更多</div>
			</div>
			<a href="#" class="logo-a"></a>
		</div>
		
		
		
		<div class="bg-primary pt-4 pb-3">
			<div class="nav nav-inverse jc-around fs-lg">
				<div class="nav-item active">
					<router-link tag="div" to="/" class="nav-link">首页</router-link>
				</div>
				<div class="nav-item">
					<router-link tag="div" to="/" class="nav-link">攻略中心</router-link>
				</div>
				<div class="nav-item">
					<router-link tag="div" to="/" class="nav-link">赛事中心</router-link>
				</div>
			</div>
		</div>
		
		
		
		<router-view></router-view>
	</div>
</template>

<script>

</script>

<style lang="scss">
	.topbar{
		position: sticky;//粘性定位，依赖于用户的滚动
		top: 0;//一直在顶上
		z-index: 999;//层级变高
	}
	
	.logo_img{
		background: url(../assets/images/index.png) no-repeat 0 72.588%;
		background-size: 375px 455px;
		width: 30px;
		height: 30px;
	}
	.logo-a{
		display: block;
		background: url(../assets/images/index.png) no-repeat 18.73% 71.694%;
		background-size: 375px 455px;
		width: 60px;
		height: 24px;
	}
</style>
