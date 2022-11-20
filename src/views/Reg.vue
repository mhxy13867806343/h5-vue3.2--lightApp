<script setup>
import useUser from '@/hooks/useUser'
const {userRef,btnDisabledCom,onClickUserType}=useUser()
</script>
<template>
  <van-cell-group inset>
    <van-field required v-model="userRef.user" label="用户名" placeholder="请输入用户名" clearable />
    <van-field required v-model="userRef.pwd" label="密码" placeholder="请输入密码" clearable  type="password"/>
  </van-cell-group>
  <van-button hairline  round block type="primary"
              :disabled="btnDisabledCom"
              @click="onClickUserType(2)">注册</van-button>
  <div class="text-flex text-link iconfont icon-denglu" @click="$router.push('/login')">
    已注册,去登录
  </div>

</template>


<style scoped>
.van-cell-group{
  padding-top:25%;
}
.van-button{
  margin-top: 10%;
}
.text-flex{
  padding:8px;
}
</style>
