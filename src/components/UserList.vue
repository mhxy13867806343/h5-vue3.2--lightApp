<script setup>
import { ImagePreview } from 'vant';
import {getCurrentInstance, defineProps, computed, ref, onMounted, reactive} from "vue";
import moment from "moment/moment";

const props=defineProps({
	list:{
		type:Array,
		default:[]
	}
})
const contentIf=ref(false)
const creationTime=ref([])
const imagePreview=reactive({
	show:false,
	index:0,
	list:[]
})
const host1=getCurrentInstance ().appContext.config.globalProperties.$host1
onMounted(()=>{
	setInterval(()=>{
		contentIfChangeComputed()
	},1000)
})
const contentIfChangeComputed=()=>{
	if(props.list.length>0) {

		return props.list.forEach(item => {
			const {c_create_time} = item
			let _t = c_create_time * 1000
			const days = moment().diff(moment(_t), 'days')
			let time = ''
			if (days <= 365) {
				time = moment(_t).fromNow()
			}
			if (days > 365) {
				time = moment(_t).format('YYYY-MM-DD')
			}
			creationTime.value.push(time)
		})
	}
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
const c_imagesCom=computed(()=>{

	return  props.list.map(item=>{
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
const onImagePreview=(item,index,index1)=>{
	imagePreview.list=c_imagesCom.value[index]
	imagePreview.index=index1
	imagePreview.show=true
}
const onImagePreviewChange=index=>imagePreview.index=index
</script>
<template>
	<van-image-preview
			:startPosition="imagePreview.index"
			v-model:show="imagePreview.show" :images="imagePreview.list" @change="onImagePreviewChange">
		<template v-slot:index>第{{ imagePreview.index+1 }}页</template>
	</van-image-preview>
	<ul>
		<li class="li1" v-for="(item,index) in  list" :key="index">
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
					<li v-for="(item,index1) in c_imagesCom&&c_imagesCom[index]" :key="index1">
						<van-image
								width="100"
								height="100"
								:src="item"
								@click="onImagePreview(item,index,index1)"
						/>
					</li>
				</ul>
				<p class="time">
					发布于:{{creationTime[index]||'刚刚'}}
				</p>
			</div>
		</li>
	</ul>
</template>



<style scoped>

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
