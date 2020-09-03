<template>
	<div>
		<h1>{{id ? '编辑' : '新建'}}广告位</h1>
		<el-form label-width="80px" @submit.native.prevent="save">
			
			<el-form-item label="名称">
				<el-input v-model="model.name"></el-input>
			</el-form-item>
				
			
					
			<el-form-item label="广告">
				<el-button @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告</el-button>
				<el-row type="flex" style="flex-wrap: wrap;">
					<el-col v-for="(item, index) in model.items" :key="index" style="margin: 2rem 0 3rem 0;" >
						
						<!-- <el-form-item :label="'广告' + (index + 1)">
							<el-input  v-model="item.name"></el-input>
						</el-form-item> -->
						
						<el-form-item label="跳转链接">
							<el-input v-model="item.url"></el-input>
						</el-form-item>
						
						<el-form-item label="广告图" style="margin-top: 0.5rem;">
							<el-upload
							class="avatar-uploader"
							:action="uploadUrl"
							:headers="getAuthHeaders()"
							:show-file-list="false"
							:on-success="res => $set(item, 'image', res.url)">   <!-- :action给后端接口发起请求 -->
								<img v-if="item.image" :src="item.image" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						
						<el-form-item>
							<el-button @click="model.items.splice(index, 1)" type="danger" native-type="button" size="small" >删除</el-button>
						</el-form-item>
					
					</el-col>
				</el-row>
			</el-form-item>
			
			
			
			<el-form-item>
				<el-button type="primary" native-type="submit">保存</el-button>
			</el-form-item>
			
		</el-form>
	</div>
</template>

<script>
	export default{
		props: {
			id: {}
		},
		data(){
			return{
				model: {
					items: []
				},
			}
		},
		methods: {
			async save(){
				if (this.id){
					await this.$http.put(`rest/ads/${this.id}`, this.model)
				}else{
					await this.$http.post('rest/ads', this.model)
				}
				this.$router.push('/ads/list')
				this.$message({
					type: 'success',
					message: '保存成功'
				})
			},
			async fetch(){
				const res = await this.$http.get(`rest/ads/${this.id}`)
				this.model = Object.assign({}, this.model, res.data)
			},
		},
		created(){
			/* 有id时才执行this.fetch() */
			this.id && this.fetch()
		}
	}
</script>

<style>

</style>
