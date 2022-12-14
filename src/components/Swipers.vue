<script setup>
import {defineProps}from 'vue'
const props =defineProps({
	list:{
		type:Array,
		default:[]
	}
})
</script>
<template>
	<van-swipe>
		<van-swipe-item v-for="(item,index) in list" :key="index">
			<div class="swipe-item-cls" v-for="(item1,index1) in item.list" :key="index1">
				<p class="iconfont" :class="item1.className"></p>
				<p class="title">{{item1.title}}</p>
			</div>
		</van-swipe-item>
	</van-swipe>
</template>


<style scoped>
.van-swipe-item{
	display: flex;
	flex-wrap: wrap;
  justify-content: center;
}
.swipe-item-cls {
	width: 25%;
	text-align: center;
	margin: 10px 0;
}
p{
	padding: 0;
	margin:0;
}
/deep/.van-swipe__indicators{
	bottom: 25px;
}
</style>
