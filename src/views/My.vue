<script setup>
import {Toast} from 'vant'
import {postUserLogut}from '@/api/user'
import userMyDetails from '@/hooks/userMyDetails'
const {myDetail}=userMyDetails()
import {useRouter} from 'vue-router'
const router = useRouter()
//退出登录
const onClickLont=()=>{
postUserLogut().then(res=>{
  const {code,msg}=res
  Toast(msg)
  if(code===200){
    router.push('/login')
    localStorage.clear()
  }
})

}
</script>
<template>

<!--	<van-cell-group inset title=" ">-->
<!--		<van-cell center title="智能机器人" is-link to="girlfriend"/>-->
<!--	</van-cell-group>-->
  <van-cell-group inset title=" ">
    <van-cell center title="朋友圈"  to="circleOfFriends" is-link/>
    <van-cell center title="我的信息" is-link  to="minformation"/>
    <van-cell center title="我的标签" is-link  to="mlabel"/>
    <van-cell center title="我的签到" is-link  to="mcenter"/>
<!--    <van-cell center title="我的签到记录" is-link  to="myCheckInRecords"/>-->
  </van-cell-group>
  <van-cell-group inset title=" ">
    <van-cell center title="修改密码" is-link to="mupwd"/>
  </van-cell-group>
  <div class="justify-center img-centered-1">
    <van-button hairline type="primary" block round @click="onClickLont">退出</van-button>
  </div>
</template>

<style scoped>

</style>
