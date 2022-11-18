<script setup>
import {ref,onMounted,reactive} from 'vue'
import moment from 'moment'
const calendarReactive =reactive({
  start: new Date(),
  end:new Date(),
  defaultDate: new Date(),
  list:[]
})
const posShow=ref(false)//积分规则
onMounted(()=>{
  calndarSplit()
})
const calndarSplit=()=>{
  const tempm=moment()
  const start=splitData(tempm.startOf("month"))
  const end= splitData(tempm.endOf('month'))
  calendarReactive.start=start
  calendarReactive.end=end
  calendarReactive.defaultDate=splitData(moment())
}
//测试使用的
const abc=()=>{
  let list=[
      { time: '2022-11-11',checked:true},
      { time: '2022-11-12',checked:true},
      { time: '2022-11-13',checked:true},
      { time: '2022-11-14',checked:true},
      { time: '2022-11-15',checked:true},
      { time: '2022-11-16',checked:true},
      { time: '2022-11-17',checked:true},
      { time: '2022-11-18',checked:true},
  ]
  list=list.map(item=>{
    const temp=moment(item.time).format("YYYY-MM-DD").valueOf()
    return {
      time:temp,
      checked:moment(calendarReactive.defaultDate).subtract(1,'month').format('YYYY-MM-DD')===temp
    }
  })
  calendarReactive.list=list
  console.log(calendarReactive.list,2)
}
const splitData=data=>{
  const temp=data.format("YYYY-MM-DD").split('-')
  return new Date(...temp)
}
const onClickPotion=()=>{
  posShow.value=true
}
const onClickSave=()=>{
  console.log(moment(calendarReactive.defaultDate).valueOf())
  console.log(moment().valueOf())
}
const formatter = (day) => {
  const month = day.date.getMonth();
  const date = day.date.getDate();
  const MM=+moment().format('MM')
  let list=[
    { time: '2022-11-11',checked:true},
    { time: '2022-11-12',checked:true},
    { time: '2022-11-13',checked:true},
    { time: '2022-11-14',checked:true},
    { time: '2022-11-15',checked:true},
    { time: '2022-11-16',checked:true},
    { time: '2022-11-17',checked:true},
    { time: '2022-11-18',checked:true},
  ]
  list=list.map(item=>{
    const temp=+moment(item.time).format("DD")
    return temp
  })
  if (month === MM) {
    list.map(item=>{
      const temp=+moment(item.time).format("DD")
      if (date <=temp-1) {
        day.bottomInfo='true'
        day.className='day-classNames'
      }
    })

  }
  console.log(day,2222)
  return day;
};
</script>
<template>
<div class="center">
  <van-cell-group inset>
    <van-cell title="积分说明" :value="`共${400}积分`"  is-link>
      <template #label>
        <van-icon name="question-o" @click="onClickPotion" />
      </template>
    </van-cell>
  </van-cell-group>
  <div class="top justify-center">
    <p>当前签到<span class="span-text span-text-active">400</span>天</p>
    <p>已连续签到<span class="span-text">400</span>天</p>
    <p>获取积分<span class="span-text">400</span>分</p>
  </div>
</div>
  <van-calendar
      :formatter="formatter"
      :min-date="calendarReactive.start"
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
    </template>
  </van-calendar>
  <div class="justify-center img-centered-1">
    <van-button hairline type="primary" block round @click="onClickSave">签到</van-button>
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
/deep/ .day-classNames{
  background-color: #e8f3ff;
  position: relative;
}
/deep/ .van-calendar__bottom-info{
  position: absolute;
  top: 5px;
  right: 3px;
  left: auto;
}
/deep/ .van-calendar__bottom-info .day-oks{
  position: absolute;
  bottom: 0px;
  left: 0;
  display: block;
  transform: translateX(-100%);
  white-space: nowrap;
  color: #1e80ff;
}
</style>
