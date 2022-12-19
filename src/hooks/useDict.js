import { reactive , onMounted , getCurrentInstance } from 'vue'
import {getDictChildList}from '@/api/dict'
const popProps={
  show:false,
  text:'',
  list:[],
  value:'',
  index:0
}
export default ()=>{
  const host1=getCurrentInstance ().appContext.config.globalProperties.$host1
  const editTextState = reactive({
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
  const editFormPopReactive=reactive({
    show:false,

    email:{
      ...popProps
    },
    subject:{
      ...popProps
    },
  })
  const getDictChildListType=()=>{
    const optionsType=(type=1,keys='')=>{
      const fuType=type===1?'email':'subject'
      getDictChildList(keys).then(res=>{
        joinReplace(res,fuType,2)
      })
    }
    const replaceItem=(keys)=>{
      return new Promise((resolve,reject)=>{
        getDictChildList(keys).then(res=>{
          res.data.map(item=>{
            item.router=item.key_url
            item.text=item.key_name
            item.icon=item.key_args
          })
          resolve(res.data)
        }).catch(e=>{
            reject(e)
        })
      }).catch(err=>{
        reject(err)
      })
    }

    return {
      optionsType,
      replaceItem
    }
  }
  const joinReplace=(res,key='email',type=1)=>{
    editFormPopReactive[key].list=res.data
    if(res.data.length){
      editFormPopReactive[key].value= editFormPopReactive[key].list[0][type===1?'key_value':'key_name']
      if(type!==1){
        editFormPopReactive[key].text= editFormPopReactive[key].list[0].key_name
      }
    }
  }
  const onProjiectActionsSelect=(item,index,key='email')=>{
    const data= editFormPopReactive[key]
    data.value=item[key==='email'?'key_value':'key_name']
    if(key==='subject'){
      editFormPopReactive[key].text=item.key_name
    }
    data.index=index
    data.show=false
  }
  return {
    editFormPopReactive,
    getDictChildListType,
    editTextState,
    onProjiectActionsSelect
  }
}
