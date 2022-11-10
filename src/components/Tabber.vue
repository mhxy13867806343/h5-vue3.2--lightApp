<script setup>
import {ref,onMounted} from 'vue'
const active=ref(0)
import {useRouter,useRoute} from 'vue-router'
const router = useRouter()
const route = useRoute()
onMounted(()=>{
  //页面刷新
  const list =['/home','/my']
  const index=list.findIndex(item=>item===route.path)
  active.value=index ||0
})
const onChange=(active)=>{
  const d={
    0:'/home',
    1:'/my'
  }
  router.push(d[active])
}
</script>
<template>
  <router-view />
  <van-tabbar v-model="active" placeholder safe-area-inset-bottom @change="onChange">
    <van-tabbar-item icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="contact">我的</van-tabbar-item>
  </van-tabbar>
</template>


<style scoped>

</style>
