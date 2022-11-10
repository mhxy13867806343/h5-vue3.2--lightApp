import {reactive,computed} from 'vue'
export default ()=>{
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
    console.log(type)
  }
  return {
    userRef,
    btnDisabledCom,
    onClickUserType
  }

}
