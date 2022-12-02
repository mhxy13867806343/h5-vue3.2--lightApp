<script setup>
import {ref,onMounted,onUnmounted} from 'vue'
const codeDom=ref('')	// 点击空白处隐藏
const emojiTrgger=ref('') // 触发表情的dom
const divInputBox=ref('')// 输入框操作
const emojiShow=ref(false) // 是否显示表情
const historyListEmojiRef=ref([]) //历史表情
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
onMounted(() => {
	document.addEventListener('click', closeSelect)
	emojiTrggerSelectType('addEventListener')
})
onUnmounted(() => {
	document.removeEventListener('click', closeSelect)
	emojiTrggerSelectType('removeEventListener')
})
const onEmojiClick=(i,type)=>{
	if ( document.activeElement!==divInputBox.value) {
		divInputBox.value.focus()
	}
	const src =`https://cdn.sunofbeaches.com/emoji/${i}.png`
	const imgSrc=`<img class="emoji-imgs" src="${src}" style="width: 20px;height: 20px;"/>`
	document.execCommand('insertHTML', true, imgSrc)
	// divInputBox.value.innerHTML += imgSrc
	if(type=='news'){
		const list=historyListEmojiRef.value
		saveHistoryEmoji(i)
		if(list.length<9){
			saveHistoryEmoji(i)
		}else{
			historyListEmojiRef.value.pop()

		}

	}

}
const onEmojiDelete=()=>{
	const selection = window.getSelection()
	if (selection.rangeCount) {
		selection.deleteFromDocument()
	}
}
const restoreEmoji=()=>{
	if(historyListEmojiRef.value.length){
		divInputBox.value.innerHTML=historyListEmojiRef.value[0]
	}
}
//保存历史表情
const saveHistoryEmoji=(src)=>{
	let index=src
	let  list=historyListEmojiRef.value
	if(list.indexOf(index)==-1){
		list.unshift(index)
	}
	list=list.findIndex((item,index)=>{
		return item==src
	})

}
</script>
<template>
	<div id="apps" ref="codeDom">
		<div class="emoji-container">
			<div class="input-box-container">
				<div class="input-box" contenteditable="true" spellcheck="false"
						 placeholder="这一刻的想法..."
						 ref="divInputBox"
				></div>
			</div>
			<div class="input-action-position">
				<div class="input-action-part">
					<div @click="emojiShow=!emojiShow"><span class="emoji-trgger"
					ref="emojiTrgger"
					>表情</span>
						<span class="iconfont icon-biaoqing"></span></div>

				</div>
				<div v-show="emojiShow" class="input-action-absolute">
					<div class="emoji-title">

						<span>最近使用</span>
						<span class="iconfont icon-shanchu">清空</span>
					</div>
					<div class="history-container">
						<img  v-for="i in historyListEmojiRef" :src="`https://cdn.sunofbeaches.com/emoji/${i}.png`" :key="i"
						@click="onEmojiClick(i,'histry')"
						>
					</div>
					<div class="emoji-title">
						所有表情
					</div>
					<div class="emoji-all-container">
						<img  v-for="i in 130" :src="`https://cdn.sunofbeaches.com/emoji/${i}.png`" :key="i"
									@click="onEmojiClick(i,'news')"
						>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>



<style scoped>
.emoji-container{
	width:300px;
	height:200px;
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
}
.input-box {
	margin: 0 auto;
	background: #efefef;
	width: 300px;
	height: 100px;
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
	height:200px;
}
.history-container img ,.emoji-all-container img{
	width:30px;
	height:30px;
	padding:3px;
	cursor:pointer;
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
	background: #fff;
	box-shadow: 0 8px 24px rgb(0 0 0 / 16%);
	border-radius: 2px;
	z-index: 12;
}
</style>
