import {reactive} from 'vue'
import { Toast } from 'vant'

export default ()=>{
  const paramsRef=reactive({
    list:[],
    page:1,
    size:10,
    total:0,
    isLoading:false,
    isFinished:false,
    isCurrent:false,//
    isRefreshing:false,//
  })
  //重置
  const onClearRead=()=>{
    paramsRef.isLoading=false
    paramsRef.isRefreshing=false
    paramsRef.isFinished=false
    paramsRef.isCurrent=false
    paramsRef.total=0
    paramsRef.page=1
    paramsRef.list=[]
  }
  //下拉刷新
  const onRefresh=(cb,p1={})=>{
    onClearRead()
    paramsRef.isLoading=true
    ongetList(cb,p1)
  }
  const ongetList=(cb,p1={})=>{
    const params={
      curren_page:paramsRef.page,
      page_size:paramsRef.size,
      ...p1
    }
    Toast.loading({
      message: '加载中...',
      duration: 0,
      forbidClick: true,
      loadingType: 'spinner',
    });
    paramsRef.isLoading=true
    cb(params).then(res=>{
      Toast.clear()
      const {code,total,list}=res
      if(code===200){
        if(!list.length){
          paramsRef.isFinished=true
        }
        paramsRef.list=[...paramsRef.list,...list]
        paramsRef.isLoading=false
        if(paramsRef.list.length>=total){
          paramsRef.isFinished=true
        }
      }
    }).catch(err=>{
      console.log(err)
      Toast.clear()
    })
  }
  return {
    paramsRef,
    onRefresh,
    ongetList,
    onClearRead
  }
}
