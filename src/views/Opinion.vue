<script setup>
import {postSendMail}from '@/api/email'
import {Toast,Dialog} from 'vant'
import { reactive,ref,onMounted } from 'vue';
// 引入组件
import Vue3Tinymce from '@jsdawn/vue3-tinymce';
import useDict from '@/hooks/useDict'
const {
  editFormPopReactive, editTextState, getDictChildList1,getDictChildList2,onProjiectActionsSelect }=useDict()
onMounted(()=> {
  Dialog.alert ( {
    title : '提示' ,
    message : '当前反馈版本，请使用腾讯邮箱进行反馈，谢谢！，后期新增功能会继续完善' ,
  } ).then ( () => {
    // on close
  } );
  getDictChildList1("email")
  getDictChildList2("subject")
})
const onEmailActionsSelect=(item,index)=>{
  onProjiectActionsSelect(item,index,'email',)
}
const onSubjectActionsSelect=(item,index)=>{
  onProjiectActionsSelect(item,index,'subject')
}
const onSubmit=()=>{
  if(!editFormPopReactive.email.text){
    return Toast("请输入您的邮箱地址前缀")
  } if (editFormPopReactive.email.text.includes("@")) {
    return Toast("邮箱地址前缀不能包含@")
  }
  if (!editFormPopReactive.subject.value) {
    return Toast("请选择反馈主题")
  }
  if(!editTextState.content){
    return Toast("请填写反馈内容")
  }
  const _editFormPopReactive=editFormPopReactive.email
  const data={
    address:_editFormPopReactive.text,
    host:_editFormPopReactive.value,
    cotent:editTextState.content,
    subject:editFormPopReactive.subject.text
  }
  postSendMail(data).then(res=>{
    console.log(res)
    editTextState.content=''
  })

}
</script>
<template>
  <van-cell-group inset>
    <!-- 输入任意文本 -->
    <van-field label="您的邮箱地址" v-model="editFormPopReactive.email.text" placeholder="请输入您的邮箱地址" clearable center>
      <template #button>
        <van-popover v-model:show="editFormPopReactive.email.show" >
          <van-cell :value="item.key_value" v-for="(item,index) in editFormPopReactive.email.list" :key="index"
                    @click="onEmailActionsSelect(item,index)"
                    :class="{'active-toogle':index===editFormPopReactive.email.index}"
          />
          <template #reference>
            {{editFormPopReactive.email.value}}
          </template>
        </van-popover>
      </template>
    </van-field>
    <van-field label="反馈" v-model="editFormPopReactive.subject.text" placeholder="请选择反馈"
               :disabled="editFormPopReactive.subject.value!=='其他'"

               center>

      <template #button>
        <van-popover v-model:show="editFormPopReactive.subject.show" >
          <van-cell :value="item.key_value" v-for="(item,index) in editFormPopReactive.subject.list" :key="index"
                    @click="onSubjectActionsSelect(item,index)"
                    :class="{'active-toogle':index===editFormPopReactive.subject.index}"
          />
          <template #reference>
            {{editFormPopReactive.subject.value}}
          </template>
        </van-popover>
      </template>
    </van-field>
  </van-cell-group>
  <vue3-tinymce
      script-src="/tinymce/tinymce.min.js"
      v-model="editTextState.content"

      :setting="editTextState.setting" />
  <div class="justify-center img-centered-1">
    <van-button hairline type="primary" block round @click="onSubmit">提交</van-button>
  </div>
</template>



<style scoped>
.active-toogle{
  background-color: #1989fa;
}
.active-toogle  /deep/ .van-cell__value--alone{
  color: #fff;
}
</style>
