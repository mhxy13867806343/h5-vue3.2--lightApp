<script setup>
import { Dialog } from 'vant';
import {ref,onMounted}from 'vue'
import {useRoute,useRouter} from 'vue-router'
const router=useRouter()
import moment from 'moment'
const maxDate=ref()// 最大日期
const dmaxDate=ref()// 最大日期
const currentDate=ref()// 最大日期
const content=ref()// 内容
const minDate=ref()// 内容
const currentTime=ref()// 当前时间
const currentShow=ref(false)// 当前时间
const currentDateShow=ref(false)// 当前时间
const selectTextValue=ref('')// 选择的日期
const popShow=ref(false)// 是否显示弹出层
onMounted(()=>{
	Dialog.alert({
		message: '当前功能暂未开放，敬请期待',
	}).then(() => {
		// on close
		router.go(-1)
	});
	const m=moment().add(2,'years').format('YYYY-MM-DD')
	const m1=moment().add(3,'years').format('YYYY-MM-DD')
	const d=moment().format('YYYY-MM-DD')

	currentTime.value=moment().format('HH:mm')
	maxDate.value=new Date(m)
	dmaxDate.value=new Date(m1)
	minDate.value=new Date(d)
	currentDate.value=new Date(d)
})
const onClickSelect=data=>{
	selectTextValue.value=moment(data).format('YYYY-MM-DD')
	popShow.value = true;
}
const onCurrentTimChange=val=>{
	currentTime.value=val
}
const onCurrentTimChange1=(val)=>{
	currentTime.value=val
	currentShow.value=false
}
const onCurrentTimChange2=(val)=>{
	selectTextValue.value=moment(val).format('YYYY-MM-DD')
	currentDateShow.value=false
}
</script>
<template>
	<van-popup v-model:show="currentDateShow" position="bottom" style="height: 50%;">
		<van-datetime-picker
				v-model="currentDate"
				type="date"
				title="选择年月日"
				:min-date="minDate"
				:max-date="dmaxDate"
				@confirm="onCurrentTimChange2"
		/>
	</van-popup>
	<van-popup v-model:show="currentShow" position="bottom">
		<van-datetime-picker
				v-model="currentTime"
				confirm-button-text=""
				cancel-button-text=""
				type="time"
				title="选择时间"
				:min-hour="0"
				:max-hour="23"
				:min-minute="0"
				:max-minute="59"
				@confirm="onCurrentTimChange1"
				@change="onCurrentTimChange"
		/>
	</van-popup>
	<van-popup v-model:show="popShow" position="top" :style="{ height: '90%' }" >
		<div class="pop-container">
			<van-cell-group inset>
				<h2>新建日程</h2>
				<van-field v-model="content" label="内容" placeholder="请输入内容" type="textarea" clearable
				maxlength="100"
				/>
				<van-field v-model="selectTextValue" label="时间" disabled @click="currentDateShow=true">
					<template #button>
						<p @click.stop="currentShow=true">{{currentTime}}</p>

					</template>
				</van-field>

			</van-cell-group>
			<div class="btn-primary">
				<van-button type="primary" size="large">确定</van-button>
				<van-button type="primary" size="large" @click="popShow=false">取消</van-button>
			</div>
		</div>
	</van-popup>
	<van-calendar
			title="日历"
			:poppable="false"
			:show-confirm="false"
			:max-date="maxDate"
			@select="onClickSelect"
			:style="{ height: '500px' }"
	/>
</template>



<style scoped>
p{
	margin: 0;
	padding: 0;
}
.btn-primary{
	display: flex;
	justify-content: space-around;
	margin: 20px 0;
}
</style>
