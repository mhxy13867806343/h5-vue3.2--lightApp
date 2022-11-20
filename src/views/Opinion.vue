<script setup>

import { reactive,getCurrentInstance,ref,onMounted } from 'vue';
// 引入组件
import Vue3Tinymce from '@jsdawn/vue3-tinymce';
const host1=getCurrentInstance ().appContext.config.globalProperties.$host1
const state = reactive({
  content: '',
  // editor 配置项
  setting: {
    toolbar:
        'undo redo | fullscreen | blocks alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontsize forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |',
    quickbars_selection_toolbar:
        'removeformat | bold italic underline strikethrough | fontsize forecolor backcolor',
    plugins: 'link image media table lists fullscreen quickbars',
    font_size_formats: '12px 14px 16px 18px',
    menubar: false,
    height: 300,
    toolbar_mode: 'sliding',
    nonbreaking_force_tab: true,
    link_title: false,
    link_default_target: '_blank',
    content_style: 'body{font-size: 16px}',
    // 自定义 图片上传模式
    custom_images_upload: true,
    images_upload_url: `${host1}histry/upload`,
    custom_images_upload_callback: (res) => {
      console.log(res);
      return host1+res.data;
    },
    custom_images_upload_param: {  },
    language: 'zh-Hans',
    language_url: '/tinymce/langs/zh-Hans.js',
  },
});
const formPopReactive=reactive({
  show:false,
  email:'',
  list:[
    { text: '@qq.com' },
    { text: '@163.com' },
  ],
  activeIndex:0,
  text:''
})
onMounted(()=>{
  formPopReactive.text=formPopReactive.list[0].text
})
const onActionsSelect=(item,index)=>{
  formPopReactive.text=item.text
  formPopReactive.activeIndex=index
  formPopReactive.show=false
}
const onSubmit=()=>{
  console.log(state.content,22)
}
</script>
<template>
  <van-cell-group inset>
    <!-- 输入任意文本 -->
    <van-field label="邮箱地址" v-model="formPopReactive.email" placeholder="邮箱地址" clearable center>
      <template #button>
        <van-popover v-model:show="formPopReactive.show" >
          <van-cell :value="item.text" v-for="(item,index) in formPopReactive.list" :key="index"
                    @click="onActionsSelect(item,index)"
                    :class="{'active-toogle':index===formPopReactive.activeIndex}"
          />
          <template #reference>
            {{formPopReactive.text}}
          </template>
        </van-popover>
      </template>
    </van-field>
  </van-cell-group>
  <vue3-tinymce
      script-src="/tinymce/tinymce.min.js"
      v-model="state.content"

      :setting="state.setting" />
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
