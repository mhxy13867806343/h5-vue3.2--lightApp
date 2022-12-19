import {reactive,computed,ref,onMounted} from 'vue'
import{postRegister,postLogin,postSendCode}from '@/api/user'
import {useRouter,useRoute} from 'vue-router'

import { Toast } from 'vant';
export default ()=>{
  const route=useRoute()
  const router= useRouter()
  const _codeRef=reactive({
    code:'',
    image:'',
  })
  const userRef=reactive({
    user:'',//用户名
    pwd:'',//密码
    code:'',//验证码
  })
  onMounted(()=>{
    onRouteCode()
  })
  const onRouteCode=()=>{
    if(route.path==='/zc'){
      postSendCode({}).then(res=>{
        _codeRef.code=res.data.code
        _codeRef.image=res.data.image
      })
    }
  }
  const btnDisabledCom=computed(()=>{
    if(route.path==='/zc'){
      return !userRef.user || !userRef.pwd || !userRef.code
    }
    return !userRef.user || !userRef.pwd
  })
  const onClickUserType=type=>{
    /**
     * 1.注册
     * 2.登录
     */
    const username=userRef.user
    const password=userRef.pwd
    const code=userRef.code
    if(type===2){
      if(code!==_codeRef.code){
        onUpdateClickUserType()
        userRef.code=''
        Toast.fail('验证码错误')
        return
      }
    }
    Toast.loading({
      message: `(${type===2?'注册...':'登录'})中`,
      duration: 0,
      forbidClick: true,
      loadingType: 'spinner',
    });
    if(type===2){
      Toast.clear()
      postRegister({username,password}).then(res=>{
        Toast.fail(res.msg)
        if(res.code===6001){
          router.push('/login')
        }else{

        }
      })
    }else if(type===1){
      Toast.clear()
      const params = new FormData();
      params.append('username', username)
      params.append('password', password)
      postLogin(params).then(res=>{
        Toast.fail(res.msg)
        if(res.code===6000){
          router.push('/zc')
        }else if(res.code==200){
          const {data,token}=res
          localStorage.setItem('token',token)
          localStorage.setItem('user',JSON.stringify(data))
          if(data.user_type_num!=='0'){
            router.push('/home')
          }else{
            router.push(`/zcNum?id=${data.id}`)
          }

        }
      })
    }
  }
  //验证码
  const onUpdateClickUserType=()=>{
    Toast.loading({
      message: '验证码更新中...',
      duration: 0,
      forbidClick: true,
      loadingType: 'spinner',
    });
    onRouteCode()
    Toast.clear()
    Toast.success('验证码更新成功')
  }
  return {
    _codeRef,
    userRef,
    btnDisabledCom,
    onClickUserType,
    onUpdateClickUserType
  }

}
