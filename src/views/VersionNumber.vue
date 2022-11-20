<script setup>
import {getHistry} from '@/api/histry'
import {ref,onMounted} from 'vue'
const versionList=ref([])
onMounted(() => {
  getHistry().then(res=>{
    versionList.value=res.list
  })
})
</script>
<template>
  <van-steps direction="vertical" :active="0">
    <van-step v-for="(item,index) in versionList" :key="index">
      <h3>【{{item.name}}】{{item.version}}版本</h3>
      <p>{{item.name}}时间:{{item.time}}</p>
      <p>{{item.name}}内容为:</p>
      <p v-for="(k,v) in item.description" :key="v">
        {{v+1}}.{{k.name}}
      </p>
    </van-step>
  </van-steps>
  <van-divider>我是有底线的</van-divider>
</template>



<style scoped>

</style>
