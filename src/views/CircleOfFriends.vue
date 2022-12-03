<script setup>
import useUpload from "@/hooks/useUpload";
const {onAfterRead}=useUpload()
import{ref} from 'vue'
import {useRouter} from 'vue-router'
import { Toast } from 'vant';
const uploadFile=ref([])
const router=useRouter()
function getBase64(file) {
	return new Promise((resolve, reject) => {
		///FileReader类就是专门用来读文件的
		const reader = new FileReader()
		//开始读文件
		//readAsDataURL: dataurl它的本质就是图片的二进制数据， 进行base64加密后形成的一个字符串，
		reader.readAsDataURL(file)
		// 成功和失败返回对应的信息，reader.result一个base64，可以直接使用
		reader.onload = () => resolve(reader.result)
		// 失败返回失败的信息
		reader.onerror = error => reject(error)
	})
}
const fileJoin=file=>{
	const {size,type}=file
	if(size>(1024*1024*2)){
		Toast('上传图片大小不能超过2M')
		return false
	}
	if(type!=='image/jpeg'&&type!=='image/png'){
		Toast('上传图片格式必须是jpg或png格式！')
		return false
	}
	return true
}
const onBeforeRead=file=>{
	const len=onAfterRead(file,uploadFile.value)
	if(len){
		router.push({
			path:'/circlesend'
		})
	}
}
</script>
<template>
	<van-nav-bar placeholder fixed>
		<template #right>
			 <div class="v-right">
				 <p class="iconfont icon-shuaxin"></p>
				 <van-uploader multiple   max-count="9"
											 v-model="uploadFile"
											 :after-read="onBeforeRead"
				 >
				 <p class="iconfont icon-xiangji"></p>
				 </van-uploader>
			 </div>
		</template>
	</van-nav-bar>
	<ul>
		<li class="li1">
			<div class="left">
				<van-image
						width="50"
						height="50"
						src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
				/>
			</div>
			<div class="right">
				<p class="nickname">abcdef</p>
				<p class="content">
					“当前全国疫情总体呈较快发展态势，疫情波及面广，部分地方出现了疫情规模性反弹的风险，
					一些地方面临抗疫三年以来最复杂、最严峻的形势。”国家疾控局监督一司司长程有全11月29日
					在国务院联防联控机制新闻发布会上说，二十条优
					化措施中的每条措施都有充分的科学依据和证据支撑，要坚持第九版防控方案，落实二十条优化措施。
					<span>全文</span>
				</p>
				<ul class="ul1">
					<li v-for="(item,index) in 9" :key="index">
						<van-image
								width="100"
								height="100"
								src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
						/>
					</li>
				</ul>
				<p class="time">
					1小时前
				</p>
			</div>
		</li>
	</ul>
</template>

<style scoped>
/deep/.van-nav-bar__content{
	background: #f7f7fa;
}
.v-right{
display: flex;
}
.v-right p{
	padding: 0 10px;
}
ul .li1{
	display: flex;
	padding:16px;

}
.left /deep/.van-image img{
	border-radius: 6px;
}
.right{
	margin-left: 8px;
}
.nickname{
	font-size: 16px;
	font-weight: 700;
	color: #61affe;
	margin-bottom: 3px;
}
.ul1{
	display: flex;
  justify-content: space-between;
  align-items: center;
	flex-wrap: wrap;
	margin:5px 0;
}
.ul1 li{
	width: 31%;
}
p{
	margin: 0;
	padding: 0;
}
.content{
	font-size: 15px;
	color: #666;
	font-weight: 700;
}
.content span{
	font-weight: 400;
	color: #61affe;
	display: block;
	margin: 4px 0;
}
.time{
	font-size: 12px;
	color: #999;
}
</style>
