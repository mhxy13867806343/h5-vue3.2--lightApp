<script setup>
import useUser from '@/hooks/useUser'
const {userRef,btnDisabledCom,onClickUserType}=useUser()
import {getDictList} from '@/api/dict'
import {onMounted} from 'vue'
onMounted(()=>{
  const _key='dictList'
  getDictList({
    page_size:100
  }).then(res=>{
    localStorage.setItem(_key,JSON.stringify(res.data))
  })

})
</script>
<template>
  <van-cell-group inset>
    <van-field required v-model="userRef.user" label="用户名" placeholder="请输入用户名" clearable />
    <van-field required v-model="userRef.pwd" label="密码" placeholder="请输入密码" clearable  type="password"/>
  </van-cell-group>
  <van-button hairline  round block type="primary"
              :disabled="btnDisabledCom"
  @click="onClickUserType(1)"
  >登录</van-button>
  <div class="text-flex">
    <div class="iconfont icon-zhuce text-flex text-link" @click="$router.push('/zc')">注册
    </div>
    <div class="iconfont icon-yijianfankui text-flex text-link" @click="$router.push('/opinion')">
      反馈意见
    </div>
    <div class="iconfont icon-banben text-flex text-link" @click="$router.push('/versionNumber')">
      版本号
    </div>
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
