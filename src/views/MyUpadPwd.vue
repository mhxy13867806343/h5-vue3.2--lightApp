<script setup>
import { onMounted , reactive } from 'vue'
import { postToken } from '@/api/user'
const informationRef=reactive({
  pwd:'',
  pwd2:'',
  username:'',
  nickname:'',
})
onMounted(()=>{
  postToken({}).then(res=>{
    const {code}=res
    if ( code===200 ){
      const user = JSON.parse(localStorage.getItem('user'))
      informationRef.username=user.username
      informationRef.nickname=user.nickname
    }
  })


})
</script>
<template>
  <van-cell-group inset>
    <van-field disabled v-model="informationRef.username" label="用户名" clearable colon center placeholder="请输入用户名"/>
    <van-field disabled v-model="informationRef.nickname" label="昵称" clearable colon center placeholder="请输入昵称"/>

    <van-field  v-model="informationRef.pwd" label="新密码" clearable colon center placeholder="请输入新密码"/>
    <van-field  v-model="informationRef.pwd2" label="二次密码" clearable colon center placeholder="请输入二次密码"/>

  </van-cell-group>
  <div class="justify-center img-centered-1">
    <van-button hairline type="primary" block round>保存</van-button>
  </div>
</template>



<style scoped>

</style>
