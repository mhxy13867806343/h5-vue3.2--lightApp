<script setup>
import { NoticeBar,Toast } from 'vant';
import useUser from '@/hooks/useUser'
const {userRef,btnDisabledCom,onClickUserType}=useUser()
import {getDictList} from '@/api/dict'
import {getSoupfapig} from '@/api/histry'
import {onMounted,ref} from 'vue'
const soupfapig=ref('')
onMounted(()=>{
  const _key='dictList'
  getDictList({
    page_size:100
  }).then(res=>{
    localStorage.setItem(_key,JSON.stringify(res.data))
  })
  getSoupfapig().then(res=>{
    if(res.data.error_code===0){
      soupfapig.value=res.data.result.text
    }
  })
})
</script>
<template>
  <van-notice-bar scrollable :text="soupfapig"  v-if="soupfapig"/>

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
  <div class="flex-position">
    <van-cell center title="我的github地址" is-link url="https://github.com/mhxy13867806343" />
    <van-cell center title="我的掘金地址" is-link url="https://juejin.cn/user/1310273588955581" />
    <van-cell center title="使用vuepress创建的一个静态博客" is-link url="https://mhxy13867806343.github.io/vuepressBlogDemo/" />
    <van-cell center title="当前应用版本" value="0.01" />

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
.flex-position{
  position:fixed;
  bottom:0;
  left: 0;
  width: 100%;
}
</style>
