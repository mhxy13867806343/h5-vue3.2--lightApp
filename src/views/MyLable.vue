<script setup>
import {postUserLabel,delUserLabel,getUserLabel} from '@/api/user'
import {Toast,Dialog} from 'vant'
import {ref,onMounted} from 'vue'
const labelRef=ref('')//标签的内容
const labelList=ref([])//标签列表
const _id=JSON.parse(localStorage.getItem('user'))?.id
onMounted(()=>{
  getUserLabel1()
})
const getUserLabel1=()=>{
  getUserLabel({id:_id}).then(res=>{
    labelList.value=res.data
    console.log(labelList.value,22)
  })
}
const onClickLabelSave=()=>{
  if(!labelRef.value){
    Toast('请输入标签')
    return
  }
  const list=labelList.value
  const _templist=list.filter(item=>item.lable_name===labelRef.value)
  if(_templist.length){
    Toast('不允许重复添加标签')
    return
  }
  onClickSend(labelRef.value)

}
const onCloseUserTab=index=>{
  const {lable_name:text,id}=labelList.value[index]
  Dialog.confirm({
    title: '提示',
    message:
        `是否要删除${text}标签`,
  })
      .then(() => {
        delUserLabel({id}).then(res=>{
          const {code}=res
          if(code===200){
            Toast('删除成功')
            getUserLabel1()
          }else{
            Toast('删除失败')
          }
        }).catch(e=>{
          Toast('删除失败')
        })
      })
      .catch(() => {
        // on cancel
      });

}
const onClickSend=(lable_name)=>{
  if(labelList.value.length>5){
    Toast('标签长度不能超过5个,请先删除几个吧')
    return
  }
  Toast.loading({
    message:'提交中...',
    duration: 0,
    forbidClick: true,
    loadingType: 'spinner',
  });
  const data=[{
    id:_id,
    lable_name
  }]
  postUserLabel(data).then(res=>{
    const {code,msg}=res
    if(code===200){
      Toast.success(msg)
      labelList.value.unshift({lable_name})
      labelRef.value=''
    }else{
      Toast.fail(msg)
    }
  })
}
</script>
<template>
  <van-cell-group inset>
    <p>我的标签:{{labelList.length}}个</p>
  <van-tag type="primary" size="medium" round
           @close="onCloseUserTab(b)"
  v-for="(a,b) in labelList" :key="b" closeable
  >{{a.lable_name}}</van-tag>
  </van-cell-group>
  <van-cell-group inset>
    <van-field v-model="labelRef" placeholder="请输入标签名,在6个字内"  max="6" clearable>
      <template #button>
        <van-button size="small" type="primary" @click="onClickLabelSave"
        >添加</van-button>
      </template>
    </van-field>
  </van-cell-group>
</template>


<style scoped>
.van-tag--round{
  margin:4px;
}
.van-button{
  margin-top: 10%;
}
</style>
