<script setup>
import publish from '@/components/Publish.vue'
import dyList from '@/components/DyList.vue'
import useList from '@/hooks/useList'
const { paramsRef, onRefresh, ongetList, onClearRead }=useList()
import {getHomeList}from '@/api/home'
import {onMounted,ref} from 'vue'
import {getDictList} from "@/api/dict";
onMounted(()=>{
	const _key='dictList'
	getDictList({
		page_size:100
	}).then(res=>{
		localStorage.setItem(_key,JSON.stringify(res.data))
	})
  ongetList(getHomeList,{})

})
const onLoad=()=>{
  paramsRef.page++
  ongetList(getHomeList,{})

}
</script>
<template>
  <van-list
      :immediate-check="false"
      v-model:loading="paramsRef.isLoading"
      :finished="paramsRef.isFinished"
      finished-text="没有更多了"
      @load="onLoad"
  >
    <dyList :list="paramsRef.list"></dyList>
    <van-empty image="error" description="暂无数据" v-if="!paramsRef.list.length" />
  </van-list>
  <publish></publish>
</template>
<style scoped>
.van-list{
  min-height: 100vh;
}
</style>
