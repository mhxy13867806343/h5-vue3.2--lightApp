<script setup>
import {useRouter,useRoute} from 'vue-router';
import {getDictChildList,getDictListHot} from '@/api/dict'
import {onMounted,ref} from 'vue'
import useList from '@/hooks/useList'
const { paramsRef, onRefresh, ongetList, onClearRead }=useList()
const [router,route]=[useRouter(),useRoute()]
const active=ref(0)
const hot=ref([])
const hotList=ref([])
onMounted(()=>{
	getDictChildList('hot').then(res=>{
		hot.value=res.data
		const index=hot.value.findIndex(item=>item.key_value===route.query.key_value)||0
		const _index=index<0?0:index
		active.value=_index
		firstRouter(_index)
	})
})
const getDictListHot1=(type)=>{
	ongetList(getDictListHot,{type})
}
const firstRouter=index=>{
	hotList.value=[]
	const _index=index||0
	const _hot=route.path
	const key_value=hot.value[_index].key_value
	getDictListHot1(key_value)
	router.push({
		path:_hot,
		query:{
			key_value
		}
	})
}
const onTabChanged=(index,item)=>{
	paramsRef.isLoading=false
	paramsRef.isFinished=false
	paramsRef.page=1
	paramsRef.list=[]
	active.value=index
	firstRouter(index)
}
const onClickHot=item=>{
	window.location.href=item.hot_url
}
const onLoad=()=>{
	paramsRef.page++
	ongetList(getDictListHot,{type:hot.value[active.value].key_value})

}
</script>
<template>
	<van-tabs v-model:active="active" sticky animated swipeable @click="onTabChanged">
		<van-tab v-for="(item,index) in hot" :title="item.key_name" :key="item.key_value">
			<van-list
					:immediate-check="false"
					v-model:loading="paramsRef.isLoading"
					:finished="paramsRef.isFinished"
					finished-text="没有更多了"
					@load="onLoad"
			>
			<ul>
				<li v-for="(a,b) in paramsRef.list" :key="a.hot_cid" @click="onClickHot(a)">
					<div class="content">
						<div class="left">
							<p>{{a.hot_name}}</p>
						</div>
						<div class="right">
							<div><p class="iconfont icon-shijian1"></p>{{a.hot_time}}</div>
							<div><p class="iconfont icon-fangwenliang"></p>{{a.hot_count}}</div>
						</div>
					</div>
				</li>
			</ul>
			</van-list>
		</van-tab>
	</van-tabs>
</template>



<style scoped>
ul{
	padding: 12px;
	background-color: #f5f6f7;
}
ul li{
	background: #fff;
	margin: 12px;
	padding: 15px 12px;
	border-radius: 8px;
}
ul li .content{}
ul li .content .left{}
ul li .content .left p{
	padding-left: 12px;
}
ul li .content .right{
	display:flex;
	flex: 1;
	justify-content: flex-end;
}
ul li .content .right div{
	display:flex;
	align-items:center;
	padding:10px;
}
ul li .content .right div p{}
</style>
