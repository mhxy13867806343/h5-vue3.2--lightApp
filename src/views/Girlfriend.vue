<script setup>
import ChatIm from "@/components/ChatIm.vue";
import Swipers from "@/components/Swipers.vue";
import { Toast } from 'vant'
import {ref,defineProps,onMounted,onUnmounted,nextTick} from "vue";
import {useRoute} from 'vue-router'
const swiperList = ref([])//工具
const route=useRoute()
const props = defineProps({
	title:{
		type:String,
		default:'机器人'
	}
})
//聊天数据
const contentList=ref([
	{
		time:'2021-06-01 12:00:00',
		list:[
			{
				leftAvatar:'https://img.yzcdn.cn/vant/cat.jpeg',
				rightAvatar:'https://img.yzcdn.cn/vant/cat.jpeg',
				leftName:'作者a',
				rightName:'我',
				leftContent:'今天天气真的\n冷呀',
				rightContent:'大佬早上好呀',
			},
			{
				leftAvatar:'https://img.yzcdn.cn/vant/cat.jpeg',
				rightAvatar:'https://img.yzcdn.cn/vant/cat.jpeg',
				leftName:'作者a',
				rightName:'我',
				leftContent:'fuck,....',
				rightContent:'????',
			},
			{
				leftAvatar:'https://img.yzcdn.cn/vant/cat.jpeg',
				rightAvatar:'https://img.yzcdn.cn/vant/cat.jpeg',
				leftName:'作者a',
				rightName:'我',
				leftContent:'老子心情不好,你别说话',
				rightContent:'大佬，怎么了?',
			},
			{
				leftAvatar:'https://img.yzcdn.cn/vant/cat.jpeg',
				rightAvatar:'https://img.yzcdn.cn/vant/cat.jpeg',
				leftName:'作者a',
				rightName:'作者a',
				leftContent:'操你妈',
				rightContent:'你骂人干什么',
			}
		]
	},
	{
		time:'2021-06-01 12:00:00',
		list:[
			{
				leftAvatar:'https://img.yzcdn.cn/vant/cat.jpeg',
				rightAvatar:'https://img.yzcdn.cn/vant/cat.jpeg',
				leftName:'作者a',
				rightName:'我',
				leftContent:'今天天气真的\n冷呀',
				rightContent:'大佬早上好呀',
			},
			{
				leftAvatar:'https://img.yzcdn.cn/vant/cat.jpeg',
				rightAvatar:'https://img.yzcdn.cn/vant/cat.jpeg',
				leftName:'作者a',
				rightName:'我',
				leftContent:'fuck,....',
				rightContent:'????',
			},
			{
				leftAvatar:'https://img.yzcdn.cn/vant/cat.jpeg',
				rightAvatar:'https://img.yzcdn.cn/vant/cat.jpeg',
				leftName:'作者a',
				rightName:'我',
				leftContent:'老子心情不好,你别说话',
				rightContent:'大佬，怎么了?',
			},
			{
				leftAvatar:'https://img.yzcdn.cn/vant/cat.jpeg',
				rightAvatar:'https://img.yzcdn.cn/vant/cat.jpeg',
				leftName:'作者a',
				rightName:'作者a',
				leftContent:'操你妈',
				rightContent:'你骂人干什么',
			}
		]
	}
])
const contentRef=ref('')	// 点击空白处隐藏
const codeDom=ref('')	// 点击空白处隐藏
const divInputBox=ref('')	// 点击空白处隐藏
const emojiShow=ref(false)
const emojiTrgger=ref('') // 触发表情的dom
const inValueToogle=ref('off')
onMounted(() => {
	getRouterSwiperList()
	document.addEventListener('click', closeSelect)
})
onUnmounted(() => {
	document.removeEventListener('click', closeSelect)
})
const getRouterSwiperList=(type)=>{
	swiperList.value=[
		{
			num:1,
			list:[
				{
					className:'icon-tupian',
					title:'相册',
				},
				{
					className:'icon-paishe',
					title:'拍摄',
				},
				{
					className:'icon-shipintonghua-tianchong',
					title:'视频通话',
				},
				{
					className:'icon-position',
					title:'位置',
				},
				{
					className:'icon-tuikuan',
					title:'红包',
				},
				{
					className:'icon-zhuanzhang',
					title:'转账',
				},
				{
					className:'icon-saying',
					title:'语音输入',
				},
				{
					className:'icon-wodeshoucang',
					title:'我的收藏',
				},
			]
		},
		{
			num:1,
			list:[
				{
					className:'icon-mingpian1',
					title:'名片',
				},
				{
					className:'icon-wenjianjia',
					title:'文件',
				},
				{
					className:'icon-yinle',
					title:'音乐',
				}
			]
		}
	]
}
//点击空白处隐藏
const closeSelect = (e) => {
	console.log(e.target,codeDom.value.contains(e.target))
	console.log(e.target,!codeDom.value.contains(e.target))
	if (!codeDom.value.contains(e.target)) {
		emojiShow.value = false
	}
}
const emojiTrggerSelect=e=>{
	return e.preventDefault()
}
const onInValueToogle=()=>{
	const on=inValueToogle.value==='off'?'on':'off'
	inValueToogle.value=on
}
const onClickDivInputBoxFocus=()=>{
	emojiShow.value=!emojiShow.value
	setTimeout(()=>{
		const _contentRef=contentRef.value
		const offsetHeight=+_contentRef.scrollHeight
		let scrollOptions = {
			top: +offsetHeight,
			behavior:'smooth'
		}
		console.log(scrollOptions)
		window.scrollTo(scrollOptions);
	},230)
}
const onClickDivInputBox=(e)=>{
	const innerHTML=e.target.innerHTML
	if(innerHTML.length>10){
		Toast('内容太长了!!!!')
	}
}
</script>
<template>
	<div class="wrapper" ref="codeDom">
		<div class="top">
			<van-nav-bar :title="title" left-arrow fixed placeholder>
				<template #right>
					<p @click="$router.push({path:'/groupDetails',query:{type:route.query.type||'group'}})">
						...
					</p>
				</template>
			</van-nav-bar>
		</div>
		<div class="content" ref="contentRef"
				 :class="[emojiShow?'content-emoji-show1':'content-emoji-show0']">
			<chat-im :list="contentList"/>
		</div>
		<div class="bot">
			<div class="bot-top" :class="[emojiShow?'bot-mores-top0-y':'bot-mores-top1-y']">
				<div class="iconfont" :class="[inValueToogle==='off'?'icon-jianpan':'icon-saying']" @click="onInValueToogle"></div>
				<div class="input-box" v-if="inValueToogle==='off'">
					<span class="input-click">按住 说话</span>
				</div>
				<div class="input-box" contenteditable="true" spellcheck="false" id="inputBox"
						 placeholder="请输入想要发布的内容" v-else
						 @input="onClickDivInputBox"
						 style="overflow-y:scroll;display: block; -webkit-user-modify: read-write-plaintext-only;"
						 ref="divInputBox"
				></div>
				<div class="more bot-bot">
					<div class="iconfont icon-biaoqing" @click="onClickDivInputBoxFocus"
							 ref="emojiTrgger"
					></div>
					<div class="iconfont icon-tianjia"></div>
				</div>
			</div>

			<transition name="slide-up">
				<div class="more-last" v-show="emojiShow">
					<swipers :list="swiperList" />
				</div>
			</transition>
		</div>
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
	background: #dbdbdb;
	padding-bottom: 19px;
}

.bot {
	width: 100%;

}
.bot{
	position: fixed;
	bottom:0;
	width:100%;
	left:0;
}
.more,.bot-top{
	display: flex;
	align-items: center;
	align-content: center;
}
.input-box{
	border: 1px solid #f1b8b8;
	width: 86%;
	background: #fff;
	height: 39px;
	margin: 0 4px;
	line-height:39px;
	text-indent: 2px;
}
.input-click{
	display: block;
	text-align: center;
	font-size: 12px;

}
.input-box {
	background: #efefef;
	outline: none;
	border: transparent;
	border-radius: 4px;
	font-size: 14px;
}
.input-box:focus{
	outline: none;
}
.input-box:empty:before {
	content: attr(placeholder);
	position: absolute;
	color: gray;
	background-color: transparent;
	font-size: 13px;
	opacity: 0.57;
}
.icon-jianpan,.icon-biaoqing,.icon-tianjia,.icon-saying{
	font-size: 24px;
	padding: 2px;
}
.more-last{
	width: 100%;
	height: 150px;
	background: #fff;
}
.bot-top{
	position: absolute;
	width: 100%;
	background: #fff;
	padding:3px;
	bottom:0;
	transition: all 0.5s;
}

.more-last{
	position: absolute;
	bottom:0;
	left: 0;
}
.slide-up-enter-active {
	animation: slide-up 0.5s;
}
.slide-up-leave-active {
	animation: slide-down 0.5s;
}
.bot-mores-top0-y{
	transform: translateY(-150px);


}
.content-emoji-show1{
	padding-bottom: 130px;
	transition: all 0.5s;
}
.content-emoji-show0{
	padding-bottom: 19px;
	transition: all 0.5s;
}
.bot-mores-top1-y{
	transform: translateY(0);
}

@keyframes slide-up {
	from {
		transform: translateY(100%);
	}
	to {
		transform: translateY(0);
	}
}
@keyframes slide-down {
	from {
		transform: translateY(0);
	}
	to {
		transform: translateY(100%);
	}
}

</style>
