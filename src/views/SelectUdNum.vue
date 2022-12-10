<script setup>
import {getHotid,getHotidList,postUserSave} from '@/api/user'
import {Dialog, Toast} from 'vant';
import {useRouter}from 'vue-router'
import {ref, onMounted, onUpdated} from 'vue'
const user = ref({})
const search=ref('')
const currentPage=ref('')
const hotListId=ref([])
const hotListTotal=ref(0)
const hotList=ref([])//热门搜索列表
const hotIndex=ref(-1) // 热门搜索的索引
const router=useRouter()
onMounted(()=>{
	user.value=JSON.parse(localStorage.getItem('user'))
	if(user.value.user_type_num!=='0'){
		Toast('您已有用户唯一标识,不用请求啦')
		router.push('/home')
		return
	}
	getHotid().then(res=>{
		hotListId.value=res.data
	})
	getHotidList1()

})
const getHotidList1=({current=1}={current:1})=>{
	getHotidList({current,page_size:100,key:search.value}).then(res=>{
		hotList.value=res.data.list
		hotListTotal.value=res.data.total
	})
}
// 点击热门内容
const onclickHot=(val,index)=>{
	hotIndex.value=index
	search.value=val
	onPaginationChange(1)
}
const onPaginationChange=(val)=>{
	hotList.value=[]
	getHotidList1({current:val})
}
const onClearSearch=(val)=>{
	hotList.value=[]
	hotIndex.value=-1
	search.value=val
	getHotidList1({current:1})
}
const onSelectHotUserId=({n_type_num,n_is_delte,n_is_usage})=>{
	if(user.value.user_type_num!=='0'){
		Toast('您已有用户唯一标识,不用请求啦')
		return
	}
	if(n_is_delte===1){
		Toast('该用户标识已被删除，请重新选择')
		return
	}
	if(n_is_usage===1){
		Toast('该用户标识已被其他用户所选择，请重新选择')
		return
	}
	Dialog.confirm({
		title: '提示',
		message:
				`您是否选择${n_type_num}号用户？一旦选择，将无法更改`,
	})
			.then(() => {
				const formData=new FormData()
				formData.append('id',+user.value.id)
				formData.append('avatar',user.value.avatar)
				formData.append('nickname',user.value.nickname)
				formData.append('user_num',`${n_type_num}`)
				Toast.loading({
					duration: 0,
					forbidClick: true,
					message: '提交中...',
				});
				postUserSave(formData).then(res=>{
					Toast.clear();
					const {code,data,msg}=res
					if(code===200){
						Toast.success(msg)
						localStorage.setItem('user',JSON.stringify(data))
						router.push('/home')
					}else {
						Toast.fail(msg)
					}
				}).catch(e=>{
					Toast.clear();
				})
			})
			.catch(() => {
				// on cancel
				Toast(`您已取消选择${n_type_num}号用户,请重新选择`);
			});
}
</script>
<template>
	<van-cell-group inset>
		<van-cell value="欢迎登录本系统" title=" "/>
		<van-cell  title="请选择一个您的用户唯一标识"/>
	</van-cell-group>
	<van-cell-group inset>
		<van-search v-model="search" placeholder="请搜索如100,1201,11111等号码"
								label="搜    索："
								clearable  background="#4fc08d"
								maxlength="15" show-action
								@search="onClearSearch"
								@clear="onClearSearch('')"
								@cancel="onClearSearch('')"
		/>
		<van-cell title="热门搜索：" center>
			<template #extra>
				 <div class="hot-search">
					 <p v-for="(k,v) in hotListId" :key="v" class="hot-id"
							:class="[hotIndex===v?'hot-id-active':'']" @click="onclickHot(k.hot_id_num,v)"
					 >
						 <span>{{k.hot_id_num}}</span>
					 </p>

				 </div>
			</template>
		</van-cell>
		<van-cell title=" " center :value="`共搜索到${hotList.length}个编号`"></van-cell>
		<van-space wrap :size="10" align="start">
			<p v-for="(a,b) in hotList" :key="b" class="hot-list-item"
			@click="onSelectHotUserId(a)">
				{{a.n_type_num}}
			<span class="dot" v-if="a.n_is_usage===1"></span>
			<span class="del-disabled" v-if="a.n_is_delte===1"></span>
			</p>

		</van-space>
		<p v-if="!hotList.length" class="not-hot-id">
			很抱歉，系统暂时没有{{search}}的相关数据
		</p>
		<van-pagination
				@change="onPaginationChange"
				v-model="currentPage"
				:items-per-page="100"
				:show-page-size="hotListTotal<100?1:5"
				:total-items="hotListTotal"
				:page-count="hotListTotal"
				:force-ellipses="hotListTotal<100?false:true"
		/>
	</van-cell-group>
</template>

<style scoped>
.hot-refresh-text{
	display: flex;
	align-items: center;
	flex: 1;
	justify-content: flex-end;
	font-size: 14px;
	line-height: 14px;
	color: #626675;
	margin: 12px;
}
.van-space{
	margin-top: 20px;
	max-height: 400px;
	overflow: hidden;
	overflow-y: scroll;
}
.hot-id{
	color: #535353;
	padding: 0 6px;
	border-right: 1px dotted #d3d3d3;
	margin-left: -1px;
	line-height: 20px;
	display: inline-block;
	font-size: 12px;
}
.hot-id span{
	color: #fe5c1c;
	border: 0;
	line-height: 20px;
	display: inline-block;
}
.hot-id-active span{
	background-color: #ffc600;
	font-weight: 700;
	text-decoration: none;
	transform: scale(1.2);
}
.hot-list-item{
	line-height: 34px;
	font-size: 14px;
	color: #5b5b5b;
	padding: 0 4px;
}
/deep/ .van-space-item{
	background-color: #f6f4e8;
	padding: 4px;
	position:relative;
}
.van-space-item-active{
	border-color: #7c7c7c #c3c3c3 #ddd;
	border-style: solid;
	border-width: 1px;
}
/deep/ .van-cell__title{
	white-space: nowrap;
}
.hot-search{
	overflow: hidden;
	overflow-x: scroll;
	/* width: 100px; */
	height: 50px;
	white-space: nowrap;
	display: inline-block;
}
.hot-search::-webkit-scrollbar {
	display: none;
}
/deep/ .van-pagination__item--prev, /deep/ .van-pagination__item--next {
	white-space: nowrap;
}
.not-hot-id{
	line-height: 22px;
	font-size: 14px;
	color: #5b5b5b;
	text-align: center;
	background-color: #f6f4e8;
	padding: 12px;
	border-radius: 5px;
}
.dot{
	width: var(--van-badge-dot-size);
	min-width: 0;
	height: var(--van-badge-dot-size);
	background: var(--van-badge-dot-color);
	border-radius: 100%;
	border: none;
	padding: 0;

}
.dot,.del-disabled{
	position:absolute;
	top:0;
	right:0;
}
.del-disabled {
	padding: var(--van-address-list-item-padding);
	background-color: var(--van-background-color-light);
	border-radius: var(--van-border-radius-lg);
}
</style>
