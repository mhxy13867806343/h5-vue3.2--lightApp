<script setup>
import {postCsave,postUploads}from '@/api/user'
import useUpload from "@/hooks/useUpload";
const {onAfterRead}=useUpload()
import {getUploads}from '@/api/user'
import {Dialog, Toast} from 'vant';
import {useRoute,useRouter} from 'vue-router'
import {ref, onMounted, watch, onUpdated, nextTick, getCurrentInstance, reactive} from 'vue'
import Emoji from "@/components/Emoji.vue";
const host1=getCurrentInstance ().appContext.config.globalProperties.$host1
const route = useRoute()
const router = useRouter()
const fileList=ref([]) // 上传图片列表
const showPopover=ref(false)// 是否显示弹出层
const sendText=ref('')// 发送内容
const sendTextLen=ref(0)// 发送内容
const activeText=ref('')// 下拉内容
const checkedRef=ref()
const previesImg=reactive({
	show:false,
	index:0,
	list:[]
})
const actionsList=ref([
	{ key_name: '公开',key_value:0 },
	{ key_name: '私人',key_value:1 },
])
onMounted(async ()=>{
	activeText.value=actionsList.value[0].key_name
	checkedRef.value=actionsList.value[0].key_value
	getSuploadPromiseTask()
})
const getSuploadPromiseTask=()=>{
	const arr=JSON.parse(localStorage.getItem('suploadPromiseTask'))
	const _suploadPromiseTask=arr ||[]
	if(_suploadPromiseTask.length) {
		const _fileList = []
		for (let i = 0; i < _suploadPromiseTask.length; i++) {
			const res = _suploadPromiseTask[i]
			_fileList.push(res)
		}
		fileList.value = _fileList
	}
}
const fileListDb=()=>{
	const {id:userId}=JSON.parse(localStorage.getItem('user'))
	getUploads({id:userId}).then(res=>{
		const {code,data}=res
		if(code===200){
			const list=[]
			data.split(',').map(item=>{
				list.push({
					url:host1+item
				})
			})
			if(list.length){
				fileList.value=list
			}
		}
	})
}
const onSelect = (action) => {
	activeText.value=action.key_name
	checkedRef.value=action.key_value
	showPopover.value = false
}
const onClickLeft = () => {
	const suploadPromiseTask=JSON.parse(localStorage.getItem('suploadPromiseTask'))
	if(suploadPromiseTask.length){
		Dialog.confirm({
			confirmButtonText: '保留',
			cancelButtonText: '不保留',
			title: '',
			message:
					'保留此次编辑?',
		})
				.then((type) => {
					console.log(type)
					// on confirm
					router.replace({path:'/circleOfFriends'})
				})
				.catch((type) => {
					// on cancel
					if(type==='cancel'){
						localStorage.removeItem('suploadPromiseTask')
						router.replace({path:'/circleOfFriends'})
					}
				});
	}

}
//删除某一个
const onClickDelSend=(index)=>{
	const suploadPromiseTask=JSON.parse(localStorage.getItem('suploadPromiseTask'))
	const arr=previesImg.list
	const _arr=suploadPromiseTask

	let _arrb=_arr.filter(k=>k.content!==arr[index])


	localStorage.setItem('suploadPromiseTask',JSON.stringify(_arrb))
	console.log(_arrb.length,index)
	if(_arrb.length>index){
		previesImg.index++
	}
	previesImg.index--
 if(!_arrb.length){
	 previesImg.show=false
	 fileList.value=_arrb
	 previesImg.list=_arrb
 }
	// if(previesImg.index>0){
	// 	previesImg.index--
	// }
	// if(previesImg.index===-1){
	// 	previesImg.show=false
	// }
	// if(!_arrb.length){
	// 	fileList.value=[]
	// 	previesImg.show=false
	// }
	getSuploadPromiseTask()

}
//预览图片
const onClickPrevies=(db,dbs)=>{
	const content=[]
	fileList.value.map(item=>{
		content.push(item.content)
	})
	previesImg.show=true
	previesImg.index=dbs.index
	previesImg.list=content

}
//切换图片的索引
const onPreviesImgChange=index=>{
	previesImg.index=index
}
const onPreviesImgClose=()=>{
	previesImg.show=false
	previesImg.index=0
	previesImg.list=[]
}
const onBeforeRead=file=>{
	onAfterRead(file,fileList.value)
}
//删除
const onImgDelete=(file,delval)=>{
	const suploadPromiseTask=JSON.parse(localStorage.getItem('suploadPromiseTask'))
	const arr=previesImg.list
	const _arr=suploadPromiseTask
	_arr.splice(delval.index,1)
	localStorage.setItem('suploadPromiseTask',JSON.stringify(_arr))
	getSuploadPromiseTask()
}
const onSendText=()=>{
	const text=sendTextLen.value
	if(text>1000){
		Toast(`动态内容达到了${text},请减少到1000长度以内,离1000还有${text-1000}个长度`)
		return
	}
	addJoin2()

}
const addJoin1=()=>{

	const data={
		public_type:checkedRef.value,
		c_content:sendText.value,
	}
	Toast.loading({
		message: '提交中...',
		duration: 0,
		forbidClick: true,
		loadingType: 'spinner',
	});
	postCsave(data).then(res=>{
		const {code,msg}=res
		if(code===200){
			Toast.success(msg)
			localStorage.removeItem('suploadPromiseTask')
			router.push({
				path:'/circleOfFriends'
			})
		}else{
			Toast.fail(msg)
		}
	})
}
const addJoin2=()=>{
	getItemUploadPromiseTaskLocalStorage()
}

function  base64toBlob(dataurl, filename) {
	var arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, { type: mime });

}
const getItemUploadPromiseTaskLocalStorage=()=>{
	const {id}=JSON.parse(localStorage.getItem('user'))
	const uploadPromiseTask=JSON.parse(localStorage.getItem('suploadPromiseTask'))
	if(uploadPromiseTask.length){
		const formData=new FormData()
		uploadPromiseTask.map((item,index)=>{
			formData.append('files',base64toBlob(item.content,item.file.name))
		})
		formData.append('id',id)
		postUploads(formData).then(res=>{
			const {code}=res
			if(code===200){
				addJoin1()

			}
		})
	}else{
		Toast('上传失败！')
	}
}
const onInputBoxClear=()=>{
	sendTextLen.value=0
	sendText.value=''
	console.log('清空',sendText.value)
}
</script>
<template>
	<van-image-preview v-model:show="previesImg.show" :images="previesImg.list"
										 overlay-class="overlay-class-abc"
										 :startPosition="previesImg.index"
										 @close="onPreviesImgClose"
										 @change="onPreviesImgChange">
		<template v-slot:index>第{{ previesImg.index+1 }}页</template>
<!--		<template v-slot:cover class="vcodes">-->
<!--			<p class="iconfont icon-shanchu" @click="onClickDelSend(previesImg.index)"></p>-->
<!--			<p class="iconfont icon-guanbi" @click="onPreviesImgClose"></p>-->
<!--		</template>-->
	</van-image-preview>
	<van-nav-bar placeholder fixed left-arrow @click-left="onClickLeft">
		<template #right>
			<van-popover v-model:show="showPopover" >
				<van-radio-group v-model="checkedRef">
					<van-radio checked-color="#ee0a24" :name="a.key_value"  v-for="(a,b) in actionsList" :key="b"  @click="onSelect(a)" >{{a.key_name}}</van-radio>

				</van-radio-group>
				<template #reference>
					<p class="iconfont icon-xiala">谁可以看:{{activeText}}</p>
				</template>
			</van-popover>
			<van-button type="success" size="mini" @click="onSendText"
			:disabled="!fileList.length"
			>发布</van-button>
		</template>
	</van-nav-bar>
	<Emoji  v-model:inputBox="sendText" v-model:inputLen="sendTextLen"
	@clear="onInputBoxClear"
	/>
	<van-cell-group inset>
		<van-uploader :deletable="true"
									:after-read="onBeforeRead"
									@delete="onImgDelete"
									:preview-full-image="false" v-model="fileList" multiple  :max-count="9" :max-size="500 * 1024"
		@click-preview="onClickPrevies"
		>
		</van-uploader>
	</van-cell-group>


</template>

<style scoped>
.icon-xiala{
	padding: 10px;
}
/deep/ .van-uploader{
	margin-top:20px;
}
/deep/  .van-radio {
	padding: 10px;
}
/deep/ .van-uploader__preview{
	margin: 1px;
}
.icon-shanchu,.icon-guanbi{
	font-size: 20px;
	color: #fff;
	padding-right: 10px;
}
</style>
<style>
.van-image-preview__cover {
	left: auto;
	right: 20px;
	display: flex;
}
</style>
