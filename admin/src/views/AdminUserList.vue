<template>
	<div>
		<h1>管理员列表</h1>
		<el-table :data="items">
			<el-table-column prop="_id" label="ID" width="300">
			</el-table-column>
			<el-table-column prop="username" label="管理员">
			</el-table-column>
			

			<el-table-column fixed="right" label="操作" width="180">
				<template slot-scope="scope">
					<!-- scope.row表示当前这一行 -->
					<el-button @click="$router.push(`/admin_users/edit/${scope.row._id}`)" type="primary" native-type="button" size="small" plain>编辑</el-button>
					<el-button @click="remove(scope.row)" type="danger" native-type="button" size="small" plain>删除</el-button>
				</template>
			</el-table-column>

		</el-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				items: []
			}
		},
		methods: {
			
			async fetch() {
				const res = await this.$http.get('rest/admin_users')
				this.items = res.data
			},
			
			remove(row) {
				this.$confirm(`是否要删除管理员“${row.name}”?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(async () => {
					await this.$http.delete(`rest/admin_users/${row._id}`)
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this.fetch()
				})
			}
			
		},
		
		created() {
			this.fetch()
		}
		
	}
</script>

<style>
</style>
