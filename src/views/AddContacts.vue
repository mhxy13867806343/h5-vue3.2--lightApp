<script setup>
import {ref}from 'vue'
const search=ref('')//搜索框
const contacList=ref([
	{
		avater:'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
		nickname:'abcdef',

	},
	{
		avater:'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
		nickname:'abcdef',

	},
	{
		avater:'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
		nickname:'abcdef',

	}
])
</script>
<template>
	<van-cell-group inset title="搜索">
	<van-search v-model="search" placeholder="请输入昵称或编号进行搜索"  clearable/>
	</van-cell-group>
	<van-cell-group inset title="推荐">
		<ul class="recommend-ul">
			<li v-for="(a,b) in contacList" :key="b" class="recommend-item-li">
				<div class="left">
					<van-image
							round
							width="40px"
							height="40px"
							:src="a.avater"
					/>
				</div>
				<div class="right">
					<p class="recommend-item-li-nickname">{{a.nickname}}</p>
					<p class="iconfont icon-fabu recommend-item-li-fabu"></p>
				</div>
			</li>
		</ul>
	</van-cell-group>
	<van-cell-group inset :title="`已搜索好友${contacList.length}位`">
		<ul class="recommend-ul">
			<li v-for="(a,b) in contacList" :key="b" class="recommend-item-li">
				<div class="left">
					<van-image
							round
							width="40px"
							height="40px"
							:src="a.avater"
					/>
				</div>
				<div class="right">
					<p class="recommend-item-li-nickname">{{a.nickname}}</p>
					<p class="iconfont icon-fabu recommend-item-li-fabu"></p>
				</div>
			</li>
		</ul>
	</van-cell-group>
</template>


<style scoped>
.recommend-ul{
	display: flex;
	flex-wrap: wrap;
}
.recommend-item-li{
	flex-basis: 50%;
	display: flex;
	align-items: center;
	padding: 13px;
	box-sizing: border-box;
	position: relative;
}
.recommend-item-li:before{
	content: '';
	display: block;
	width: 80%;
	border-bottom: 1px solid #eee;
	position: absolute;
  bottom:0;
}
.recommend-item-li .left{
	width:40%
}
.recommend-item-li .right{
	padding-left: 10px;
	width: 60%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.recommend-item-li-nickname{
	font-size: 16px;
	color: #999;
}
.recommend-item-li-fabu{
	text-align: right;
	font-weight: 700;
}
</style>
