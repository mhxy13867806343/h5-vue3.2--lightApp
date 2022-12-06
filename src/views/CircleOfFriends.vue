<script setup>
import useList from "@/hooks/useList";
import {getPyclist}from '@/api/user'
import moment from 'moment'
const { paramsRef, onRefresh, ongetList, onClearRead }=useList()
moment.locale('zh-cn')
import useUpload from "@/hooks/useUpload";
const {onAfterRead}=useUpload()
import {ref, onMounted, computed, getCurrentInstance} from 'vue'
import {useRouter} from 'vue-router'
import { Dialog,Toast } from 'vant';

const host1=getCurrentInstance ().appContext.config.globalProperties.$host1
const uploadFile=ref([])//临时使用的上传
const router=useRouter()
const contentIf=ref(false)
const creationTime=ref([])
onMounted(()=>{
	const _suploadPromiseTask=localStorage.getItem('suploadPromiseTask')
	if(_suploadPromiseTask){
		const suploadPromiseTask=JSON.parse(localStorage.getItem('suploadPromiseTask'))
		if(suploadPromiseTask.length){
			Dialog.confirm({
				title: '提示',
				message:
						`已存在您之前上传的图片缓存数据，共${suploadPromiseTask.length}张，是否清空？清空后，得重新上传`,
			})
					.then(() => {
						// on confirm
						localStorage.removeItem('suploadPromiseTask')
						Toast.success('清空成功')
					})
					.catch(() => {
						// on cancel
						router.push({
							path:'/circlesend'
						})
					});


		}
	}
	setInterval(()=>{
		contentIfChangeComputed()
	},1000)

})
onMounted(()=>{
	ongetList(getPyclist,{})

})
const onLoad=()=>{
	paramsRef.page++
	ongetList(getPyclist,{})
	setInterval(()=>{
		contentIfChangeComputed()
	},1000)

}
const c_imagesCom=computed(()=>{

	return  paramsRef.list.map(item=>{
		if(item.c_images){
			const split = item.c_images.split(',')
			if(split?.length){
				return split.map(item=>{
					return host1+item
				})
			}
		}
	})
})
const onClickAll=()=>{
	contentIf.value=!contentIf.value
}
const textCapitalize =(value)=>{
	if(!value){
		return ''
	}
	value=value.toString()
	if (value.length>50) {
		return value.substr(0,50)+'...'
	}
	return value
}
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
const contentIfChangeComputed=()=>{
	return paramsRef.list.forEach(item=>{
		const {c_create_time}=item
		let _t=c_create_time*1000
		const days=moment().diff(moment(_t), 'days')
		let time=''
		if(days<=365){
			time=moment(_t).fromNow()
		}if(days>365){
			time=moment(_t).format('YYYY-MM-DD')
		}
		creationTime.value.push(time)
	})

}
const onRefresh1=()=>{
	onRefresh(getPyclist,{})
	setInterval(()=>{
		contentIfChangeComputed()
	},1000)

}
</script>
<template>
	<van-nav-bar placeholder fixed  title="朋友圈"
							 left-text="返回"
							 left-arrow
							 @click-left="$router.replace({path:'/my'})"
	>
		<template #right>
			 <div class="v-right">
				 <p class="iconfont icon-shuaxin" @click="onRefresh1"></p>
				 <van-uploader multiple   max-count="9"
											 v-model="uploadFile"
											 :after-read="onBeforeRead"
				 >
				 <p class="iconfont icon-xiangji"></p>
				 </van-uploader>
			 </div>
		</template>
	</van-nav-bar>
	<van-list
			:immediate-check="false"
			v-model:loading="paramsRef.isLoading"
			:finished="paramsRef.isFinished"
			finished-text="没有更多了"
			@load="onLoad"
	>
		<ul>
			<li class="li1" v-for="(item,index) in  paramsRef.list" :key="index">
				<div class="left">
					<van-image
							width="50"
							height="50"
							:src="`${host1}${item.c_avatar}`"
					/>
				</div>
				<div class="right">
					<p class="nickname">
						发布者:
						<span>{{item.c_name}}</span>
					</p>
					<div class="content">
						<p v-html="contentIf?item.c_content:textCapitalize(item.c_content)"></p>
						<span  @click="onClickAll" v-if="item.c_content.length>50">{{
								contentIf?'收起':'全文'}}</span>
					</div>
					<ul class="ul1">
						<li v-for="(item,index) in c_imagesCom&&c_imagesCom[index]" :key="index">
							<van-image
									width="100"
									height="100"
									:src="item"
							/>
						</li>
					</ul>
					<p class="time">
						发布于:{{creationTime[index]}}
					</p>
				</div>
			</li>
		</ul>
	</van-list>

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
	flex:1;
}
.nickname{
	font-size:12px;
	font-weight: 700;
	color: #999;
	margin-bottom: 3px;
}
.nickname span{
	color: #61affe;
	font-size: 16px;
}
.ul1{
	display: flex;
  justify-content: flex-start;
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
	word-break: break-all;
}
.content span{
	font-weight: 400;
	color: #61affe;
	display: block;
	margin: 4px 0;
}
.time{
	font-size: 13px;
	color: #999;
	text-align: right;
}
</style>
