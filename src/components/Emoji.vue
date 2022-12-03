<script setup>
import {getEmojiList} from '@/api/emoji'
import {ref, onMounted, onUnmounted, defineProps, defineEmits, watch,nextTick, computed, getCurrentInstance} from 'vue'
import {Toast} from "vant";
const host1=getCurrentInstance ().appContext.config.globalProperties.$host1
const props = defineProps({
	inputBox: {
		type: String,
	}
})


const emit=defineEmits(['update:inputBox'])
const emojiTitleActive=ref(0)	// 表情索引
const codeDom=ref('')	// 点击空白处隐藏
const vanTabResize=ref('')	// 外层元素大小或组件显示状态变化时，可以调用此方法来触发重绘	-
const emojiTrgger=ref('') // 触发表情的dom
const emojiList=ref([]) // 表情列表
const divInputBox=ref('')// 输入框操作
const emojiShow=ref(false) // 是否显示表情
const historyListEmojiRef=ref([]) //历史表情
const emojiCount=ref(0)// 表情和文本和数量

watch(()=>emojiShow.value,(value)=>{
	setTimeout(()=>{
		vanTabResize.value.resize()
	},200)

})

onMounted(() => {
	const _emojiList=JSON.parse(localStorage.getItem('emojiList'))
	const _historyListEmoji=JSON.parse(localStorage.getItem('historyListEmoji'))
	if(_historyListEmoji){
		historyListEmojiRef.value=_historyListEmoji
	}
	if(!_emojiList){
		getEmojiList1()
	}else{
		emojiList.value=_emojiList
	}
	setTimeout(()=>{
		if(emojiList.value.length){
			const emojiContainerAll=document.querySelectorAll('.emoji-all-container')
			const emojiItemAll=document.querySelectorAll('.emoji-item-img-url')
			const emojiListLen=emojiList.value.length
			for(let i=0;i<emojiContainerAll.length;i++){
				const sum=emojiItemAll[i].height*(emojiListLen/24)
				emojiContainerAll[i].style.maxHeight=sum+'px'
			}
		}
	},200)
	document.addEventListener('click', closeSelect)
	emojiTrggerSelectType('addEventListener')
	divInputBoxaddEventListener()
})
onUnmounted(() => {
	document.removeEventListener('click', closeSelect)
	emojiTrggerSelectType('removeEventListener')
})
const getEmojiList1=()=>{
	getEmojiList().then(res=>{

		res.data.map(item=>{
			item.e_url=host1+item.e_url
			return item
		})
		emojiList.value=res.data
		localStorage.setItem('emojiList',JSON.stringify(emojiList.value))
	})
}
//点击空白处隐藏
const closeSelect = (e) => {
	if (codeDom.value && !codeDom.value.contains(e.target)) {
		emojiShow.value = false
	}
}
const emojiTrggerSelect=e=>{
	return e.preventDefault()
}
const emojiTrggerSelectType=type=>{
	if(emojiTrgger.value){
		emojiTrgger.value[type]('click', e=>emojiTrggerSelect(e))
	}
}
const divInputBoxaddEventListener=()=>{
	divInputBox.value.addEventListener('input',e=>{
		emit('update:inputBox',e.target.innerText)
		calcTextAreaLength()
	})
}
const onEmojiClick=(item,type)=>{
	if ( document.activeElement!==divInputBox.value) {
		divInputBox.value.focus()
	}
	const src =item.e_url
	const imgSrc=`<img class="emoji-imgs" src="${src}" style="width: 20px;height: 20px;"/>`
	document.execCommand('insertHTML', true, imgSrc)
	// divInputBox.value.innerHTML += imgSrc
	document.getSelection().collapseToEnd()

	if(type=='news'){
		saveHistoryEmoji(item)
	}

}
const calcTextAreaLength=()=> {
	let sum=0
	let reg = /<img class="emoji-imgs" [^>]*>/gi;
	let stringHtml =divInputBox.value.innerHTML;
	let stringText =divInputBox.value.innerText; //  拿到输入框中字符长度
	//  匹配出输入框中的图片表情包个数
	let emojiArr = stringHtml.match(reg) || [];
	if(emojiArr.length){
		sum+=emojiArr.length*1
	}
	emojiCount.value = stringText.length + emojiArr.length+sum;
	return stringText.length + emojiArr.length;
}
const onClickDivInputBoxFocus=()=>{
	emojiShow.value=!emojiShow.value
	//divGetSelection()
	divGetSelection()
}
const divGetSelection=()=>{
	const  esrc = document.getElementById('inputBox');

	const range = document.createRange();

	range.selectNodeContents(esrc);

	range.collapse(false);

	const sel = window.getSelection();

	sel.removeAllRanges();

	sel.addRange(range);
}
const restoreEmoji=()=>{
	historyListEmojiRef.value=[]
	localStorage.removeItem('historyListEmoji')
	Toast.success('清除成功')
}
//去重方法封装
const arrUnique=arr=>arr.filter((item, index, arr)=>arr.indexOf(item, 0) === index);
//保存历史表情
const saveHistoryEmoji=(item)=>{
	let  list=historyListEmojiRef.value
	const temp_index=list.indexOf(item)
	if(temp_index>-1){
		historyListEmojiRef.value.splice(temp_index,1)
	}
	historyListEmojiRef.value.unshift(item)


	// 历史记录只保存6条

	if (list && list.length && list.length > 8) {

		list.pop()
	}
	localStorage.setItem("historyListEmoji", JSON.stringify(historyListEmojiRef.value));

}
const updateContent=value=>{
	const _divInputBox=divInputBox.value
	if (value!==_divInputBox.innerHTML){
		_divInputBox.innerHTML=value
	}
}
const onemojiTitleActive=index=>{
	emojiTitleActive.value=index

}
const onemojiTabActive=index=>{
	emojiTitleActive.value=index
}
const toGtouchstart=(e,item)=>{
}
const toGtouchmove=(e,item)=>{

}
const toGtouchend=(e,item)=>{

}
</script>
<template>
	<div id="apps" ref="codeDom">
		<div class="emoji-container">
			<div class="input-box-container">
				<div class="input-box-edit">
					<div class="input-box" contenteditable="true" spellcheck="false" id="inputBox"
							 placeholder="这一刻的想法..."
							 ref="divInputBox"
					></div>
				</div>
				<span class="input-count" :style="{'color':emojiCount>1000?'#f53f3f':'',}"


				>{{emojiCount}}/1000</span>
			</div>
			<div class="input-action-position">
				<div class="input-action-part">
					<div @click="onClickDivInputBoxFocus"><span class="emoji-trgger"
					ref="emojiTrgger"
					>表情</span>
						<span class="iconfont icon-biaoqing"></span></div>

				</div>
				<div v-show="emojiShow" class="input-action-absolute">
						<span
								@click="onemojiTitleActive(0)"
								class="iconfont  icon-111" :class="[emojiTitleActive===0?'icon-biaoqing1-copy':'icon-biaoqing']"></span>
					<span 	@click="onemojiTitleActive(1)" class="iconfont  icon-111" :class="[emojiTitleActive===1?'icon-biaoqing1-copy':'icon-biaoqing']"></span>
					<span 	@click="onemojiTitleActive(2)" class="iconfont  icon-111" :class="[emojiTitleActive===2?'icon-biaoqing1-copy':'icon-biaoqing']"></span>
					<span 	@click="onemojiTitleActive(3)" class="iconfont   icon-111" :class="[emojiTitleActive===3?'icon-biaoqing1-copy':'icon-biaoqing']"></span>
					<van-tabs
							@change="onemojiTabActive"
							v-model:active="emojiTitleActive"  title-active-color="#ee0a24" ref="vanTabResize">
						<van-tab title="系统表情">
							<div style="width:100%;height:100%;overflow:hidden;">
								<div class="emoji-title" v-if="historyListEmojiRef.length">

									<span>最近使用({{historyListEmojiRef.length}})</span>
									<span class="iconfont icon-shanchu" @click="restoreEmoji">清空</span>
								</div>
								<div class="history-container">
<!--									<div class="vishob">-->
<!--										<img src="http://localhost:8010/uploads/emoji/3.png">-->
<!--									</div>-->
									<img  v-for="(item,index) in historyListEmojiRef" :src="item.e_url" :key="index"
												@touchstart="toGtouchstart($event,item)"
												@touchmove="toGtouchmove($event,item)"
												@touchend="toGtouchend($event,item)"
												@click="onEmojiClick(item,'histry')"
									>
								</div>
								<div class="emoji-title">
									所有表情({{emojiList.length}})
								</div>
								<div class="emoji-all-container">
									<img  v-for="(item,index) in emojiList" :src="item.e_url" :key="index"
												class="emoji-item-img-url"
												@touchstart="toGtouchstart($event,item)"
												@touchmove="toGtouchmove($event,item)"
												@touchend="toGtouchend($event,item)"
												@click="onEmojiClick(item,'news')"
									>
								</div>
							</div>
						</van-tab>
						<van-tab title="自定义表情">
							自定义表情
						</van-tab>
						<van-tab title="收藏表情">
							收藏表情
						</van-tab>
						<van-tab title="其他">
							其他
						</van-tab>
					</van-tabs>

				</div>
			</div>
		</div>

	</div>
</template>



<style scoped>
.emoji-container{
	width:300px;
	margin:30px auto;
	background-color:#fff;
}
.input-action-part{
	display: flex;
	align-items: center;
	padding-left: 3px;
	margin: 5px 0;
}
.emoji-trgger{
	color: #4e5969;
	font-size: 14px;
	line-height: 22px;
	transition: color .3s;
}
.input-box-container {
	padding:1px;
	position: relative;

}
.input-box-edit{
	overflow: hidden;
	max-height: 230px;
	overflow-y: scroll;
}
.input-count{
	position: absolute;
  right: 0;
  bottom: -15px;
  font-size: 12px;
	color: #8a919f;
  text-align: center;
  z-index: 1;
}
.input-box {
	margin: 0 auto;
	background: #efefef;
	width: 300px;
	min-height: 100px;
	outline: none;
	border: transparent;
	border-radius: 4px;
	padding: 5px;
	font-size: 14px;
}
.emoji-title{
	margin:6px 0;
	display: flex;
	align-items: center;
	position: relative;
	cursor: pointer;
	border-bottom: 1px solid #e5e6eb;
	padding: 5px 4px;
	margin-left: 4px;
	justify-content: space-between;
}
.emoji-title span{
	font-size: 14px;
  font-weight: bold;
  color: #8a919f;
	opacity: .8;
}
.input-box:empty:before {
	content: attr(placeholder);
	position: absolute;
	color: gray;
	background-color: transparent;
	font-size: 13px;
	opacity: 0.57;
}
.emoji-all-container{
	overflow-y:scroll;
	max-height: 150px;
	height: 100%;
}
.history-container img ,.emoji-all-container img,.vishob img{
	width:30px;
	height:30px;
	padding:3px;
	cursor:pointer;
}
.history-container,.emoji-all-container{
	position:relative
}
.emoji-all-container::-webkit-scrollbar {
	width: 5px;
}

.emoji-all-container::-webkit-scrollbar-track {
	background-color: #F9FAFB;
	border-radius: 1em;
}

.emoji-all-container::-webkit-scrollbar-thumb {
	background-color: #E5E6EB;
	border-radius: 1em;
}
.input-action-position{
	position: relative;
}
.input-action-absolute{
	position: absolute;
	top: 30px;
	left: 0;
	width: 100%;
	background: #fff;
	box-shadow: 0 8px 24px rgb(0 0 0 / 16%);
	border-radius: 2px;
	z-index: 12;
}
.icon-111{
	padding: 10px;
}
.icon-biaoqing1-copy:before{
	color:#d81e06;
	font-size: 20px;
  font-weight: bold;
}
</style>
