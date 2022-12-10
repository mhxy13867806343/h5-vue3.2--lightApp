<script setup>
import {getSigninList,postUsersPoint}from '@/api/point'
import {ref,onMounted,reactive,computed} from 'vue'
import moment from 'moment'
import {Notify, Toast} from "vant";
const calendarReactive =reactive({
  start: new Date(),
  end:new Date(),
  defaultDate: new Date(),
  list:[],
	isCheck:0,
	author_sigi_count:0,
	sigi_count:0,
  potinList:[]
})
const posShow=ref(false)//积分规则
onMounted(()=>{
	getSigninList1()
  calndarSplit()
})
const calndarSplit=()=>{
  const tempm=moment()
  const start=splitData(tempm.startOf("month"))
  const end= splitData(tempm.endOf('month'))
  calendarReactive.start=start
  calendarReactive.end=end
  calendarReactive.defaultDate=splitData(moment().subtract(1, 'months'))
}
const getSigninList1=()=>{
	getSigninList().then(res=>{
		const {code,msg,data:{list,is_Check,check_In_Days,now_days}}=res
		calendarReactive.list=list
		calendarReactive.isCheck=is_Check
		calendarReactive.author_sigi_count=check_In_Days
		calendarReactive.sigi_count=now_days
  })
}
const splitData=data=>{
  const temp=data.format("YYYY-MM-DD").split('-')
  return new Date(...temp)
}
const onClickPotion=()=>{
  posShow.value=true
}
const onClickSave=()=>{
	const   offset=Number(moment(calendarReactive.defaultDate).format('DD'))
	Toast.loading({
		message: '签到中...',
		forbidClick: true,
		loadingType: 'spinner',
		duration: 0,
	});
  postUsersPoint({offset}).then(res=>{
    const {code,msg}=res
		if(code===200) {
			Toast.success(msg)
			getSigninList1()
		}
  })
}
const formatter = (day) => {
  const MM=+moment().format('MM')
	const month = day.date.getMonth() + 1;
  const potinList=calendarReactive?.list||[]
  const list =potinList.map(item=>{
    return {
      time:moment(item.check_time*1000).format('yyyy-MM-DD'),
      checked:item.is_Check?true:false,
			is_not_sign:!item.check_time?true:false,
		}
  })
  const vm=+moment(day.date).format('MM')
  if (vm === month) {
		if(list.length){
			list.map(item=>{
				const _vm=moment(day.date).subtract(0, 'months').format('YYYY-MM-DD')
				if(item.checked){
					if(_vm===item.time){
						day.bottomInfo='true'
						day.className='day-classNames'
					}

				}else{
					if(_vm===item.time){
						day.bottomInfo='not'
						day.className='day-classNames1'
					}
				}

			})
		}

  }

  return day
};

</script>
<template>
<div class="center">
  <van-cell-group inset>
    <van-cell title="积分说明"   is-link>
      <template #label>
        <van-icon name="question-o" @click="onClickPotion" />
      </template>
    </van-cell>
  </van-cell-group>
  <div class="top justify-center">

    <p>当前签到<span class="span-text span-text-active">{{calendarReactive.sigi_count||0}}</span>天</p>
    <p>已连续签到<span class="span-text">{{calendarReactive.author_sigi_count||0}}</span>天</p>
    <p v-if="0">获取积分<span class="span-text">{{calendarReactive.data?.points||0}}</span>分</p>
  </div>
</div>
  <van-calendar
			:formatter="formatter"
      :max-date="calendarReactive.end" readonly
      :default-date="calendarReactive.defaultDate"
      :poppable="false"
      :show-title="false"
      :show-mark="false"
      title=""
      :show-confirm="false"
      :style="{ height: '500px' }"
  >
    <template #bottom-info="day">

      <van-icon name="success" color="#ff7d00"  v-if="day.bottomInfo==='true'" size="14px" />
      <span  v-if="day.bottomInfo==='true'" class="day-oks">已签到</span>
      <span  v-if="day.bottomInfo==='not'" class="day-oks">未签到</span>
    </template>
  </van-calendar>
  <div class="justify-center img-centered-1">
    <van-button hairline type="primary" block round @click="onClickSave"
    :disabled="calendarReactive.isCheck"
    >
      {{calendarReactive.isCheck?'已签到':'签到'}}
    </van-button>
  </div>
  <van-popup  v-model:show="posShow" position="center" :style="{width:'80%' }" round closeable >

    积分规则
  </van-popup>
</template>

<style scoped>
.top p{
  padding: 10px;
  white-space: normal;
  width:33%;
  text-align: center;
  color: #86909c;
  font-weight: 400;
  font-size: 14px;
}
.top p span{
  display: block;
  white-space: pre-wrap;
  word-break: break-all;
}
.top p .span-text{
  font-weight: 700;
  font-size: 36px;
  color: #1d2129;
  line-height: 36px;
}
.top p .span-text-active{
  color: #1e80ff;
}
/deep/.van-calendar__header-subtitle{
  display: none;
}
/deep/ .day-classNames,/deep/ .day-classNames1{
	position: relative;
}
/deep/ .day-classNames{
  background-color: #e8f3ff;

}
/deep/ .day-classNames1{
	background-color: #64854c;
}
/deep/ .van-calendar__bottom-info{
  position: absolute;
  top: 5px;
  right: 3px;
  left: auto;
}
/deep/ .van-calendar__bottom-info .day-oks{
  position: absolute;
	bottom: 0;
	left: -25px;
	transform: translate(50%, 50%);
  white-space: nowrap;
  color: #000;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
