<script setup>

</script>
<template>
	<van-cell-group inset>
		<van-cell value="欢迎登录本系统" title=" "/>
		<van-cell  title="请选择一个您的用户唯一标识"/>
	</van-cell-group>
	<span class="hot-refresh-text iconfont icon-shuaxin">换一换</span>
	<van-grid   :gutter="10" :column-num="4">
		<van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="文字" />
	</van-grid>
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
</style>
