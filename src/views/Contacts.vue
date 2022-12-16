<script setup>
import {useRouter}from 'vue-router'
import {getDictChildList} from '@/api/dict'
import {ref,onMounted}from 'vue'
const indexList=ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
const showPopover=ref(false)
const actionsList=ref([])
const router = useRouter()
onMounted(()=>{
	getDictChildList('contacts').then(res=>{
		res.data.map(item=>{
			item.router=item.key_url
			item.text=item.key_name
			item.icon=item.key_args
		})
		actionsList.value=res.data
	})
})
const onActionsSelect=item=>{
	if(item.router){
		router.push(item.router)
	}
}
</script>
<template>
	<van-nav-bar title="通讯录列表"  left-arrow>
		<template #left>
			<van-icon name="arrow-left" @click="$router.go(-1)" />
			<van-popover v-model:show="showPopover" placement="right-start" >
				<template #reference>


					<p>

						...
					</p>
				</template>
				<van-cell v-for="(a,b) in actionsList" :key="b" :title="a.text"
									@click="onActionsSelect(a)"
				>
					<template #icon>
						<p :class="a.icon"></p>
					</template>
				</van-cell>
			</van-popover>

		</template>
	</van-nav-bar>
	<van-index-bar :index-list="indexList">
		<van-index-anchor index="1">标题1</van-index-anchor>
		<van-cell title="文本" />
		<van-cell title="文本" />
		<van-cell title="文本" />

		<van-index-anchor index="2">标题2</van-index-anchor>
		<van-cell title="文本" />
		<van-cell title="文本" />
		<van-cell title="文本" />
	</van-index-bar>
</template>



<style scoped>
p{
	margin: 0;
	padding: 0;
}
.van-icon-arrow-left{
	top: 3px;
	transform: translate(0,0%);
	display: flex;
}
</style>
