<script setup>
import {getUploads}from '@/api/user'
import { Dialog } from 'vant';
import {useRoute} from 'vue-router'
import {ref, onMounted, watch, onUpdated, nextTick, getCurrentInstance} from 'vue'
import Emoji from "@/components/Emoji.vue";
const host1=getCurrentInstance ().appContext.config.globalProperties.$host1
const route = useRoute()
const fileList=ref([]) // 上传图片列表
const showPopover=ref(false)// 是否显示弹出层
const sendText=ref('')// 发送内容
const activeText=ref('')// 发送内容
const checkedRef=ref()
const inputBoxRef=ref('')
const actionsList=ref([
	{ key_name: '公开',key_value:1 },
	{ key_name: '私人',key_value:2 },
])
onMounted(async ()=>{
	activeText.value=actionsList.value[0].key_name
	checkedRef.value=actionsList.value[0].key_value
	await fileListDb()
})
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
	if(!fileList.value.length){
		Dialog.confirm({
			confirmButtonText: '保留',
			cancelButtonText: '不保留',
			title: '',
			message:
					'保留此次编辑?',
		})
				.then(() => {
					// on confirm
				})
				.catch(() => {
					// on cancel
				});
	}
}
</script>
<template>
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
			<van-button type="success" size="mini">发布</van-button>
		</template>
	</van-nav-bar>
	<van-cell-group inset>
		<Emoji  v-model:inputBox="inputBoxRef"/>
		<van-field
				v-model="sendText"
				rows="3"
				autosize
				:border="false"
				clearable

				type="textarea"
				maxlength="288"
				placeholder="这一刻的想法..."
		/>
		<van-uploader deletable  v-model="fileList" multiple  :max-count="9" :max-size="500 * 1024">
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
</style>
