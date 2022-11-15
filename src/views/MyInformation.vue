<script setup>
import {reactive} from 'vue'
const informationRef=reactive({
  nickname:'',
  username:''
})
</script>
<template>
  <div class="justify-center img-centered">
    <van-image
        round
        width="5rem"
        height="5rem"
        src="https://unpkg.com/@vant/assets/cat.jpeg"
    />
  </div>
  <van-cell-group inset>
    <!-- 输入任意文本 -->
    <van-field disabled v-model="informationRef.username" label="用户名" clearable colon center placeholder="请输入用户名"/>
    <van-field label-class="informationRef" v-model="informationRef.nickname" label="昵称" clearable colon center placeholder="请输入昵称"/>
  </van-cell-group>
  <div class="justify-center img-centered-1">
    <van-button hairline type="primary" block round>保存</van-button>
  </div>
</template>

<style scoped lang="scss">

</style>
