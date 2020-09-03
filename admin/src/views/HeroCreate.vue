<template>
	<div>
		<h1>{{id ? '编辑' : '新建'}}英雄</h1>
		<el-form label-width="80px" @submit.native.prevent="save">
			
			<el-tabs type="border-card">
				<el-tab-pane label="基本信息">
					
					<el-form-item label="名称">
						<el-input v-model="model.name"></el-input>
					</el-form-item>
					
					<el-form-item label="称号">
						<el-input v-model="model.title"></el-input>
					</el-form-item>
					
					<el-form-item label="图标">
						<el-upload
						class="avatar-uploader"
						:action="uploadUrl"
						:headers="getAuthHeaders()"
						:show-file-list="false"
						:on-success="res => $set(model, 'avatar', res.url)">   <!-- :action给后端接口发起请求 -->
							<img v-if="model.avatar" :src="model.avatar" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					
					<el-form-item label="海报">
						<el-upload
						class="avatar-uploader"
						:action="uploadUrl"
						:headers="getAuthHeaders()"
						:show-file-list="false"
						:on-success="res => $set(model, 'banner', res.url)">   <!-- :action给后端接口发起请求 -->
							<img v-if="model.banner" :src="model.banner" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					
					<el-form-item label="定位">
						<el-select v-model="model.categories" multiple ><!-- multiple多选 -->
							<el-option v-for="item of categories" :label="item.name" :value="item._id" :key="item._id"></el-option>
						</el-select>
					</el-form-item>
					
					<el-form-item label="难度">
						<el-rate style="margin-top: 0.6rem;" :max="10" show-score v-model="model.scores.difficult"></el-rate>
					</el-form-item>
					<el-form-item label="技能">
						<el-rate style="margin-top: 0.6rem;" :max="10" show-score v-model="model.scores.skills"></el-rate>
					</el-form-item>
					<el-form-item label="攻击">
						<el-rate style="margin-top: 0.6rem;" :max="10" show-score v-model="model.scores.attack"></el-rate>
					</el-form-item>
					<el-form-item label="生存">
						<el-rate style="margin-top: 0.6rem;" :max="10" show-score v-model="model.scores.survive"></el-rate>
					</el-form-item>
					
					<el-form-item label="顺风出装">
						<el-select v-model="model.items1" multiple ><!-- multiple多选 -->
							<el-option v-for="item of items" :label="item.name" :value="item._id" :key="item._id"></el-option>
						</el-select>
					</el-form-item>
					
					<el-form-item label="逆风出装">
						<el-select v-model="model.items2" multiple ><!-- multiple多选 -->
							<el-option v-for="item of items" :label="item.name" :value="item._id" :key="item._id"></el-option>
						</el-select>
					</el-form-item>
					
					<el-form-item label="使用技巧">
						<el-input v-model="model.usageTips" type="textarea"></el-input>
					</el-form-item>
					<el-form-item label="对抗技巧">
						<el-input v-model="model.battleTips" type="textarea"></el-input>
					</el-form-item>
					<el-form-item label="团战思路">
						<el-input v-model="model.teamTips" type="textarea"></el-input>
					</el-form-item>
					
				</el-tab-pane>
				
				
				
				<el-tab-pane label="技能信息" name="skills">
					
					<el-button type="text" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
					
					<el-row type="flex" style="flex-wrap: wrap;">
						
						<el-col :md="9" v-for="(item, index) in model.skills" :key="index" style="margin: 2rem 4rem 3rem 4rem;" >	<!-- 宽度12 -->
							
							<el-form-item :label="index ? '技能' + index : '被动'">
								<el-input  v-model="item.name"></el-input>
							</el-form-item>
							
							<el-form-item label="图标">
								<el-upload
								class="avatar-uploader"
								:action="uploadUrl"
								:headers="getAuthHeaders()"
								:show-file-list="false"
								:on-success="res => $set(item, 'icon', res.url)">   <!-- :action给后端接口发起请求 -->
									<img v-if="item.icon" :src="item.icon" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</el-form-item>
							
							<el-form-item label="冷却值">
								<el-input v-model="item.delay"></el-input>
							</el-form-item>
							
							<el-form-item label="消耗">
								<el-input v-model="item.cost"></el-input>
							</el-form-item>
							
							<el-form-item label="技能介绍">
								<el-input v-model="item.description"  type="textarea"></el-input>
							</el-form-item>
							
							<el-form-item label="技能提示">
								<el-input v-model="item.tips"  type="textarea"></el-input>
							</el-form-item>
							
							<el-form-item>
								<el-button @click="model.skills.splice(index, 1)" type="danger" native-type="button" size="small" >删除</el-button>
							</el-form-item>
						
						</el-col>
					</el-row>
					
				</el-tab-pane>
				
				
				
				<el-tab-pane label="最佳搭档" name="partners">
					
					<el-button type="text" @click="model.partners.push({})"><i class="el-icon-plus"></i>添加搭档</el-button>
					
					<el-row type="flex" style="flex-wrap: wrap;">
						
						<el-col v-for="(item, index) in model.partners" :key="index" style="margin: 2rem 4rem 3rem 4rem;" >	<!-- 宽度12 -->
							
							<el-form-item :label="'搭档' + (index + 1)">
								<el-select filterable v-model="item.hero"><!-- filterable可以筛选 -->
									<el-option v-for="hero in heroes" :label="hero.name" :value="hero._id" :key="hero._id"></el-option>
								</el-select>
							</el-form-item>
							
							<el-form-item label="搭档描述">
								<el-input v-model="item.description"  type="textarea"></el-input>
							</el-form-item>
							
							<el-form-item>
								<el-button @click="model.partners.splice(index, 1)" type="danger" native-type="button" size="small" >删除</el-button>
							</el-form-item>
						
						</el-col>
					</el-row>
					
				</el-tab-pane>
				
				
				
			</el-tabs>
			
			<el-form-item>
				<el-button type="primary" native-type="submit" style="width: 7rem; margin-top: 1rem;">保存</el-button>
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
				items: [],
				heroes: [],
				categories: [],
				model: {
					name: '',
					avatar: '',
					scores: {},
					skills: [],
					partners: []
				}
			}
		},
		
		methods: {
			async save(){
				if (this.id){
					await this.$http.put(`rest/heroes/${this.id}`, this.model)
				}else{
					await this.$http.post('rest/heroes', this.model)
				}
				this.$router.push('/heroes/list')
				this.$message({
					type: 'success',
					message: '保存成功'
				})
			},
			
			async fetch(){
				const res = await this.$http.get(`rest/heroes/${this.id}`)
				this.model = Object.assign({}, this.model, res.data)/* 两个对象属性的合并，这种赋值方式防止新数据覆盖掉老数据 */
			},
			
			async fetchCategories(){
				const res = await this.$http.get(`rest/categories`)
				this.categories = res.data
			},
			
			async fetchItems(){
				const res = await this.$http.get(`rest/items`)
				this.items = res.data
			},
			
			async fetchHeroes(){
				const res = await this.$http.get(`rest/heroes`)
				this.heroes = res.data
			}
		},
		created(){
			this.fetchCategories()
			this.fetchItems()
			this.fetchHeroes()
			
			/* 有id时才执行this.fetch() */
			this.id && this.fetch()
		}
	}
</script>

<style>

</style>
