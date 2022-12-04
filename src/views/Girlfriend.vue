<script setup>

</script>
<template>
	<div class="wrapper">
		<div class="top">
			<van-nav-bar title="聊天" left-arrow fixed placeholder>
				<template #right>
					<van-icon name="search" size="18" />
				</template>
			</van-nav-bar>
		</div>
		<div class="content"></div>
		<div class="bot"></div>
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
	height: 70px;
	background: red;
}
</style>
