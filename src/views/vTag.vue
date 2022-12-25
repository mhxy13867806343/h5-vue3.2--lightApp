<script setup>
import vtabRecommend from '@/components/VtabRecommend.vue'
import {getUsersCloudDetails}from '@/api/user'
import useDict from '@/hooks/useDict'
const {getDictChildListType}=useDict()
import {onMounted, ref, computed, reactive} from "vue";
import {useRoute} from 'vue-router'
const route = useRoute()
const details =ref({})
const tab=reactive({
	active:0,
	list:[
		{title:'新冠药口'},
		{title:'新冠药口'},
		{title:'新冠药口'},
		{title:'新冠药口'},
	]
})
const defaultKey =ref([])
const optionsList =ref([
	{
		label: '分享',
		value: 'share',
		type:0,
		cls:'icon-20'
	},
])
const tagNameTypeCom=computed(()=>{
	return defaultKey.value.filter(item=>{
		if(+item.key_value===details.value.tag_name_type){
			return item.key_name
		}
	})
})
onMounted( () => {
	getDictChildListType().replaceItem('cloud').then(res=>{
		defaultKey.value=res
	})
	getUsersCloudDetails(route.query.name).then(res => {
		details.value=res.data
	})
})
</script>
<template>
	<van-cell-group inset title="标签只读">
		<van-cell title="标签名称" :value="details.tag_name||'暂无类型'"  center/>
		<van-cell title="标签类型" :value="tagNameTypeCom?.[0]?.key_name??'暂无类型'"  center/>
		<van-cell title="标签使用次数" :value="`${details.tag_name_count||0}次`"  center/>
		<van-cell title="标签使用者(大于0才可以点击跳新页面)" is-link :value="`${details.tag_name_count||0}次`" center/>
		<van-cell title="标签唯一id号" is-link :value="`${details.tag_name_id||'null'}`" center/>
		<van-cell title="标签详情"   :value="`${details.tag_name_desc||'暂无详情'}`" center/>
		<van-cell title="标签外部链接"   value="暂无链接" center/>
	</van-cell-group>
	<van-cell-group inset title="标签其他">
		<van-tabs v-model:active="tab.active" sticky swipeable animated>
			<van-tab title="评价">
				评价
			</van-tab>
			<van-tab title="推荐">
				<vtab-recommend :item="item" v-for="(item,index) in tab.list" :key="index"/>
			</van-tab>
		</van-tabs>
	</van-cell-group>
	<van-cell-group inset title="标签操作">
		<van-cell   center class="van-cell-list">
			<template #title>
				<div class="options"
				v-for="(a,b) in optionsList" :key="b"
				><i class="iconfont icon-20" :class="a.cls"></i><span>{{a.label}}</span></div>
			</template>
		</van-cell>
	</van-cell-group>

</template>



<style scoped>
/deep/.van-cell__title{
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
}
.van-cell-list .van-cell__title .options{
	padding: 10px;
}
.van-cell-list .van-cell__title .options span{
	font-size:13px;
	padding-left: 10px;
}
</style>
