<script setup>
import {ref}from 'vue'
const indexList=ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
const showPopover=ref(false)
const actionsList=ref([
	{ text: '添加好友',icon:'iconfont icon-fabu' },
])
const onActionsSelect=item=>{

}
</script>
<template>
	<van-nav-bar title="通讯录列表">
		<template #left>
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
</style>
