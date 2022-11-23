<script setup>
import { getsignature , postUserSignature , putUsersignature } from '@/api/user'
import moment from 'moment'
import {onMounted,computed,reactive} from 'vue'
const informat=reactive({
  createTime:'',
  signature:'',//签名
  userid:''
})
onMounted(()=>{

  jsTimedawn()
})
const  getsignature1=(id)=>{
  getsignature({}).then(res=>{
   const {data:{signature},code,msg}=res
    if(code==200){
      informat.signature=signature
    }
  })
}
const  postUserSignature1=()=>{
  const data={
    "user_id": informat.userid,
    "signature": informat.signature
  }
  postUserSignature(data).then(res=>{
    console.log(res,333)
  })
}
const jsTimedawn=()=>{
  let jssum=''
  const user = JSON.parse(localStorage.getItem('user'))
  informat.userid=user.id
  getsignature1(user.id)
  const start =user.reg_time*1000
  const end1 = moment()
  const  days = end1.diff(moment(start), 'days')
  if(days<2){
    jssum=`${(days/24).toFixed(2)}小时`
  }
  else if(days<30){
    jssum=`${parseInt(days)}天`
  }else if(days<365){
    jssum=`${parseInt(Math.floor(days/30))}个月${parseInt(days%24)}天`
  }else {
    jssum=`${parseInt(days/365)}年${parseInt(days/30)}月${parseInt(days%24)}天`
  }
  informat.createTime=jssum
}
const onClickSave=()=>{
  postUserSignature1()
}
</script>
<template>
  <van-cell-group title="基本信息">
    <van-cell title="注册时间" :value="informat.createTime" />
    <van-field
        v-model="informat.signature"
        center
        clearable
        label="签名"
        placeholder="签名字数在100个字以内"
        maxlength="100"
        autosize
        type="textarea"
        show-word-limit
    >
    </van-field>
  </van-cell-group>
  <div class="justify-center img-centered-1">
    <van-button hairline type="primary" block round @click="onClickSave">保存</van-button>
  </div>
</template>


<style scoped>

</style>
