import {postToken,postUpload,postUserSave}from '@/api/user'
import { ref , onMounted , reactive,getCurrentInstance } from 'vue'
import { Toast } from 'vant';
import { useRouter } from 'vue-router'
export default ()=>{
  const router = useRouter()
  const myDetail = ref({})
  const informationRef=reactive({
    nickname:'',
    username:'',
    avatar:'',
    fileList:[]
  })
  const host1=getCurrentInstance ().appContext.config.globalProperties.$host1
  onMounted(()=>{
    postToken({}).then(res=>{
      const {code}=res
      if ( code===200 ){
        myDetail.value = JSON.parse(localStorage.getItem('user'))
        informationRef.nickname=myDetail.value.nickname
        informationRef.username=myDetail.value.username
        informationRef.avatar=myDetail.value.avatar
        informationRef.fileList=[
          {
            url: host1+myDetail.value.avatar,
          },
        ]
      }
    })


  })
  const onBeforeRead=file=>{
    const {size,type}=file
    if(size>=(1024*1024*2)){
      Toast.fail('图片大小不能超过2M')
      return false
    } if(type!=='image/jpeg' && type!=='image/png'){
      Toast.fail('图片格式只能是jpeg或png')
      return false
    }
    return true
  }
  const onAfterRead=({file})=>{
    const avatar=file.name
    const formData=new FormData()
    formData.append('avatar',new Blob([file],{type:'image/jpeg'}),avatar)
    formData.append('id',+myDetail.value.id)
    postUpload( formData).then(res=>{
      const {code}=res
      if(code===200){
        informationRef.avatar=res.data
      }
    })
  }
  const onClickSave=()=>{
    if(!informationRef.nickname){
      Toast.fail('请输入昵称')
      return
    }
    const formData=new FormData()
    formData.append('avatar',informationRef.avatar)
    formData.append('nickname',informationRef.nickname)
    formData.append('id',+myDetail.value.id)
    const toast = Toast.loading({
      duration: 0,
      forbidClick: true,
      message: '倒计时 3 秒',
    });
    postUserSave(formData).then(res=>{
      Toast.clear();
      const {code,data,msg}=res
      if(code===200){
        Toast.success(msg)
        localStorage.setItem('user',JSON.stringify(data))
        router.push('/my')
      }else {
        Toast.fail(msg)
      }
    }).catch(e=>{
      Toast.clear();
    })
  }
  return {
    myDetail ,
    informationRef,onBeforeRead,onAfterRead,onClickSave
  }
}
