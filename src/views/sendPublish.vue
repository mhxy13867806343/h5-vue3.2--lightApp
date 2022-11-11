<script setup>
import {ref} from 'vue'
const publishRef=ref('')//发布的内容
import{useRouter} from 'vue-router'
const router=useRouter()
const onClickSendPublish=()=>{
  console.log(publishRef.value)
  router.push('/home')
}
</script>
<template>
  <van-cell-group inset>
    <van-field v-model="publishRef"
               rows="7"
               type="textarea"
               placeholder="请输入输入您想要分享的心情" clearable
               maxlength="1000"
               show-word-limit>

      <template #button>
        <van-button
            @click="onClickSendPublish"
            type="primary" icon="plus" size="mini"  hairline  :disabled="!publishRef.length">发布</van-button>
      </template>
    </van-field>

  </van-cell-group>
</template>



<style scoped>

</style>
