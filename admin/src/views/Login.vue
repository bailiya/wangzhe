<template>
	<div class="login-container">
		<el-card header="请先登录" class="login-card">
			
			<el-form @submit.native.prevent="login">
				<el-form-item label="用户名">
					<el-input v-model="model.username"></el-input>
				</el-form-item>
				
				<el-form-item label="密码">
					<el-input v-model="model.password" type="password"></el-input>
				</el-form-item>
				
				<el-form-item>
					<el-button type="primary" native-type="submit" style="width: 100%;">登录</el-button>
				</el-form-item>
			</el-form>
			
		</el-card>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				model:{}
			}
		},
		
		methods:{
			async login(){
				const res = await this.$http.post('login', this.model)/* 把数据传给服务端需要第二个参数 */
				//把服务器传过来的token保存下来
				localStorage.token = res.data.token/* 关掉浏览器再打开还有 */
				this.$router.push("/")
				this.$message({
					type: 'success',
					message: "登录成功"
				})
			},
		}
	}
</script>

<style>
	.login-card{
		width: 30rem;
		margin: 8rem auto;
		font-weight: bold;
	}
</style>
