<script setup>
import {useRouter,useRoute} from 'vue-router';
import {getDictChildList} from '@/api/dict'
import {onMounted,ref} from 'vue'
const [router,route]=[useRouter(),useRoute()]
const active=ref(0)
const hot=ref([])
onMounted(()=>{
	console.log();
	getDictChildList('hot').then(res=>{
		hot.value=res.data
		const index=hot.value.findIndex(item=>item.key_value===route.query.key_value)||0
		const _index=index<0?0:index
		active.value=_index
		firstRouter(_index)
	})
})
const firstRouter=index=>{
	const _index=index||0
	const _hot=route.path
	router.push({
		path:_hot,
		query:{
			key_value:hot.value[_index].key_value
		}
	})
}
const onTabChanged=(index,item)=>{
	active.value=index
	firstRouter(index)
}
</script>
<template>
	<van-tabs v-model:active="active" sticky animated swipeable @change="onTabChanged">
		<van-tab v-for="(item,index) in hot" :title="item.key_name" :key="item.key_value">
			内容 {{ item.key_name }}
		</van-tab>
	</van-tabs>
</template>



<style scoped>

</style>
