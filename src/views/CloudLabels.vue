<script setup>
import tagsLables from "@/components/TagsLables.vue";
import { useRouter } from "vue-router";
const router = useRouter();
import {getUsersCloud} from '@/api/user'
import {onMounted, ref} from "vue";
const cloudList = ref([])
onMounted( () => {
	getUsersCloud().then(res => {
		const c=[]
		res.data.map(item=>{
			c.push({
				name:item.tag_name,
				id:item.tag_id,
				tag_name_id:item.tag_name_id,
				tag_name_type:item.tag_name_type,
				tag_name_count:item.tag_name_count,
			})
		})
		cloudList.value = c
	})

})
const clickTagItem=item=>{
	//tag_name_type    0用户  1动态  其他类型后面再加
	// 2 话题  3 话题动态
	//4 话题评论  5 话题评论回复


	console.log(item.tag_name_type)
	router.push({
		path:'/tag',
		query:{
			name:item.name,
		}
	})
}
</script>
<template>
<tagsLables :data='cloudList' @clickTag="clickTagItem"/>
</template>




<style scoped>
div {
	margin-top: 20px;
	font-size: 15px;
	padding: 5px;
	border-radius: 5px;
	text-align: center;
}
</style>
