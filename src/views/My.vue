<script setup>
import userMyDetails from '@/hooks/userMyDetails'
const {myDetail}=userMyDetails()
import {useRouter} from 'vue-router'
const router = useRouter()
//退出登录
const onClickLont=()=>{
  router.push('/login')
  localStorage.clear()
}
</script>
<template>
  <div class="justify-center img-centered">
    <van-image
        round
        width="5rem"
        height="5rem"
        :src="$host1+myDetail.avatar"
    />
  </div>
  <van-cell-group inset>
    <van-cell center title="我的昵称"  :value="myDetail.nickname"/>
    <van-cell center title="我的信息" is-link  to="minformation"/>
    <van-cell center title="我的标签" is-link  to="mlabel"/>
  </van-cell-group>
  <div class="justify-center img-centered-1">
    <van-button hairline type="primary" block round @click="onClickLont">退出</van-button>
  </div>
</template>

<style scoped>

</style>
