import {reactive,computed} from 'vue'
import{postRegister,postLogin}from '@/api/user'
import {useRouter} from 'vue-router'

import { Toast } from 'vant';
export default ()=>{
  const router= useRouter()
  const userRef=reactive({
    user:'',//用户名
    pwd:'',//密码
  })
  const btnDisabledCom=computed(()=>{
    return !userRef.user || !userRef.pwd
  })
  const onClickUserType=type=>{
    /**
     * 1.注册
     * 2.登录
     */
    const username=userRef.user
    const password=userRef.pwd
    Toast.loading({
      message: (type===2?'注册...':'登录')+'中',
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
          if(data.user_type_num){
            router.push('/home')
          }else{
            router.push(`/zcNum?id=${data.id}`)
          }

        }
      })
    }
  }
  return {
    userRef,
    btnDisabledCom,
    onClickUserType
  }

}
