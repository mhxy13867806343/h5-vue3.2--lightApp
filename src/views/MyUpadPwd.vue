<script setup>
import {Toast} from 'vant'
import { onMounted , reactive } from 'vue'
import { postToken,postUserUpPwd } from '@/api/user'
const informationRef=reactive({
  pwd:'',
  pwd2:'',
  username:'',
  nickname:'',
  user:{},
  pwdCount:0,
})
onMounted(()=>{
  getPostToken()


})
const getPostToken=()=>{
  postToken({}).then(res=>{
    const {code,data}=res

    if ( code===200 ){
      setTimeout(()=>{
        informationRef.user =data
        informationRef.pwdCount= informationRef.user .pwdCount
        informationRef.username=informationRef.user.username
        informationRef.nickname=informationRef.user.nickname
      },1000)
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
        :disabled="informationRef.pwdCount<1"
        type="password" v-model="informationRef.pwd" label="新密码" clearable colon center placeholder="请输入新密码"/>
    <van-field  :disabled="informationRef.pwdCount<1"  type="password" v-model="informationRef.pwd2" label="二次密码" clearable colon center placeholder="请输入二次密码"/>

  </van-cell-group>
  <div class="justify-center img-centered-1">
    <van-button hairline type="primary" block round @click="onClickUpd"
    :disabled="informationRef.pwdCount<1"
    >{{informationRef.pwdCount>0?'修改密码':'本月已使用完次数'}}</van-button>
  </div>
</template>



<style scoped>
.upda-count{
  color:#FF3F29
}
</style>
