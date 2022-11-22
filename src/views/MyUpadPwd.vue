<script setup>
import moment from 'moment'
import {Toast,Notify} from 'vant'
import { onMounted , reactive,computed } from 'vue'
import { postToken,postUserUpPwd } from '@/api/user'
const informationRef=reactive({
  pwd:'',
  pwd2:'',
  username:'',
  nickname:'',
  user:{},
  pwdCount:0,
  currentTimeRef:'',
})
onMounted(()=>{
  getPostToken()

})
const pwdTimeComputed=computed(()=>{
  const pwdTime=informationRef.user.pwdTime*1000
  const value=moment().valueOf()
  return pwdTime-value
})
/**
 * 设置精度定时器
 * @param {function} 回调函数
 * @param {number}   延迟时间
 * @return {number}  定时器ID
 */
const setIntervalPrecision=(callback, delay)=> {
  // 生成并记录定时器ID
  let obj = window.interValPrecisionObj || (window.interValPrecisionObj = { num: 0 })
  obj.num++
  obj['n' + obj.num] = true
  const intervalId = obj.num
  // 开始时间
  const startTime = +new Date()
  // 已执行次数
  let count = 0
  // 延迟时间
  delay = delay || 0
  ;(function loop() {
    // 定时器被清除，则终止
    if (!obj['n' + intervalId]) return

    // 满足条件执行回调
    if (+new Date() > startTime + delay * (count + 1)) {
      count++
      callback(count)
    }

    requestAnimationFrame(loop)
  })()

  return intervalId
}

/**
 * 清除精度定时器
 * @param {number} 定时器ID
 */
const clearIntervalPrecision=intervalId=> {
  if (window.interValPrecisionObj) {
    delete window.interValPrecisionObj['n' + intervalId]
  }
}
const getPostToken=()=>{
  postToken({}).then(res=>{
    const {code,data}=res

    if ( code===200 ){
      informationRef.user =data
      informationRef.pwdCount= informationRef.user .pwdCount
      informationRef.username=informationRef.user.username
      informationRef.nickname=informationRef.user.nickname
      const notMessage=`离下次时间:${moment(informationRef.user.times).format('YYYY-MM-DD HH:mm:ss')},
        才可以进行修改密码`
      Notify({

        position:'bottom',
        duration:4000, type: 'primary', message: notMessage });
    }
  })
}
const onClickUpd=()=>{
  if ( !informationRef.pwd ){
    return Toast('请输入密码')
  }if(informationRef.pwd.length<5){
    return Toast('密码长度不能小于5位')
  }if ( !informationRef.pwd2 ){
    return Toast('请再次输入密码')
  }if(informationRef.pwd2.length<5){
    return Toast('再密码长度不能小于5位')
  }if ( informationRef.pwd!==informationRef.pwd2 ){
    return Toast('两次输入的密码不一致')
  }
  Toast.loading({
    duration: 0,
    forbidClick: true,
    loadingType: 'spinner',
    message: '修改中。。。',
  });

  postUserUpPwd({
    password:informationRef.pwd,
  }).then(res=>{
    Toast.clear()
    const {code,msg}=res
   if(code!==200){
     Toast(msg)
   }else{
     getPostToken()
   }

  }).catch(e=>{
    Toast.clear()
  })
}
</script>
<template>

  <van-cell-group inset>
    <van-field disabled v-model="informationRef.username" label="用户名" clearable colon center placeholder="请输入用户名"/>
    <van-field disabled v-model="informationRef.nickname" label="昵称" clearable colon center placeholder="请输入昵称"/>
    <van-field disabled v-model="informationRef.pwdCount" label="修改密码次数"
               clearable colon center placeholder="请输入昵称">
      <template #button>
        <div>
          <p>您本月还可以修改
            <span class="upda-count">{{informationRef.pwdCount}}</span>次
          </p>
        </div>
        <p>,注意每个月最多可以修改2次密码</p>
      </template>

    </van-field>

    <van-field
        :disabled="informationRef.pwdCount==0"
        type="password" v-model="informationRef.pwd" label="新密码"
        :required="informationRef.pwdCount>0"
        clearable colon center
        :placeholder="informationRef.pwdCount==0?'不能输入':'请输入新密码'"
    />
    <van-field
        :required="informationRef.pwdCount>0"
        :disabled="informationRef.pwdCount==0"  type="password"
                v-model="informationRef.pwd2" label="二次密码" clearable colon center
                :placeholder="informationRef.pwdCount==0?'不能输入':'请输入二次密码'"/>

  </van-cell-group>
  <div class="justify-center img-centered-1">
    <van-button hairline type="primary" block round @click="onClickUpd"
    :disabled="informationRef.pwdCount<1"
    >{{informationRef.pwdCount>0?'修改密码':'本月已使用完次数'}}


    </van-button>
    <van-count-down
        v-if="informationRef.pwdCount==0"
        :time="pwdTimeComputed" format="还有:DD 天 HH 时 mm 分 ss 秒才可以重新进行修改密码操作" />
  </div>
</template>



<style scoped>
.upda-count,.van-count-down{
  color:#FF3F29
}
.van-count-down{
  padding:5% 0;
}
.img-centered-1{
  flex-wrap:wrap
}
</style>
