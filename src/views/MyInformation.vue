<script setup>
import userMyDetails from '@/hooks/userMyDetails'
const {informationRef,onBeforeRead,onAfterRead,onClickSave}=userMyDetails()
</script>
<template>
  <div class="justify-center img-centered">
    <van-uploader v-model="informationRef.fileList" deletable  :max-count="1"
                  :before-read="onBeforeRead"
                  :after-read="onAfterRead"
    />

  </div>
  <van-cell-group inset>
    <!-- 输入任意文本 -->
    <van-field disabled v-model="informationRef.username" label="用户名" clearable colon center placeholder="请输入用户名"/>
    <van-field label-class="informationRef" v-model="informationRef.nickname" label="昵称" clearable colon center placeholder="请输入昵称"/>
    <van-cell title-class="informationRef" title="更多信息展示" is-link to="myiMore" />
  </van-cell-group>
  <div class="justify-center img-centered-1">
    <van-button hairline type="primary" block round @click="onClickSave">保存</van-button>
  </div>
</template>

<style scoped lang="scss">

</style>
