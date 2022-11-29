<script setup>
import {ref,onMounted,reactive} from 'vue'
const active=ref(0)
import {useRouter,useRoute} from 'vue-router'
const router = useRouter()
const route = useRoute()
const pathreactive=reactive({
  list:[
    {
      active: 'icon-shouye-copy',
      inactive: 'icon-shouye',
      name:'首页'
    },
		{
			active: 'icon-resou-copy',
			inactive: 'icon-resou',
			name:'热搜'
		},
    {
      active: 'icon-wode-copy',
      inactive: 'icon-wode',
      name:'我的'
    }
  ]
})
onMounted(()=>{
  //页面刷新
  const list =['/home','/hot','/my']
  const index=list.findIndex(item=>item===route.path)
  active.value=index ||0
})
const onChange=(active)=>{
  const d={
    0:'/home',
		1:'/hot',
    2:'/my'
  }
  router.push(d[active])
}
</script>
<template>
  <router-view />

  <van-tabbar v-model="active" placeholder @change="onChange">
    <van-tabbar-item v-for="(item,index) in pathreactive.list" :key="index">
      <template #icon="props">
        <p class="iconfont" :class="props.active ? item.active : item.inactive"></p>

      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>


<style scoped>

</style>
