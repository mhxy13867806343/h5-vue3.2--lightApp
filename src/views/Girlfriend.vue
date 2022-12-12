<script setup>
import {ref,defineProps} from "vue";
import {useRoute} from 'vue-router'
const route=useRoute()
const props = defineProps({
	title:{
		type:String,
		default:'机器人'
	}
})
</script>
<template>
	<div class="wrapper">
		<div class="top">
			<van-nav-bar :title="title" left-arrow fixed placeholder>
				<template #right>
					<p @click="$router.push({path:'/groupDetails',query:{type:route.query.type||'group'}})">
						...
					</p>
				</template>
			</van-nav-bar>
		</div>
		<div class="content">
			<slot name="content"></slot>
		</div>
		<div class="bot">
			<div class="input-box" contenteditable="true" spellcheck="false" id="inputBox"
					 placeholder="这一刻的想法..."
					 ref="divInputBox"
			></div>
		</div>
	</div>
</template>



<style scoped>
.wrapper {
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	/* 父元素一定要给高度 */
	height: 100vh;
}

.top {
	width: 100%;
}

.content {
	width: 100%;
	flex: 1;
	background: yellow;
}

.bot {
	width: 100%;
	height: 45px;
	background: red;
}
</style>
