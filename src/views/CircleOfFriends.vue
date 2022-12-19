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
import UserList from "@/components/UserList.vue";

const host1=getCurrentInstance ().appContext.config.globalProperties.$host1
const uploadFile=ref([])//临时使用的上传
const router=useRouter()


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


})
onMounted(()=>{
	ongetList(getPyclist,{})

})
const onLoad=()=>{
	paramsRef.page++
	ongetList(getPyclist,{})


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

const onRefresh1=()=>{
	onRefresh(getPyclist,{})
}
</script>
<template>
	<van-nav-bar placeholder fixed  title="朋友圈"
							 left-text="个人中心"
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
		<user-list :list="paramsRef.list"></user-list>
	</van-list>

</template>

<style scoped>
/deep/.van-nav-bar__content{
	background: #f7f7fa;
}
</style>
