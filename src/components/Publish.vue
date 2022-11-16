<script setup>
import {useRouter}from 'vue-router';
import {Toast}from 'vant'
const router = useRouter();
const onClickSendpublish=()=>{
  const avatar=JSON.parse(localStorage.getItem('user')).avatar
  if(!avatar){
    Toast('没有头像')
    return
  }
  router.push('/sendpublish')
}
</script>
<template>
  <div class="publish">
    <span class="iconfont icon-fabu" @click="onClickSendpublish"/>
  </div>
</template>



<style scoped>
.publish{
  position: fixed;
  bottom: 20%;
  right: 25px;
}
</style>
