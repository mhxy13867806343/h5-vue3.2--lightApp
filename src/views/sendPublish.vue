<script setup>
import{postSendpublish} from '@/api/user'
import{Toast}from 'vant'
import {ref,onMounted} from 'vue'
const publishRef=ref('')//发布的内容
const positionRef=ref('')//发布的位置
const ispositionLoading=ref(false)//发布的位置
import{useRouter} from 'vue-router'
const router=useRouter()
onMounted(()=>{
  onClickgetH5MapInit()
})
const onClickgetH5MapInit=()=>{
  if(!ispositionLoading.value&&!positionRef.value){
    ispositionLoading.value=true
    getH5MapInit().then(res=>{
      positionRef.value=res.formattedAddress
      ispositionLoading.value=false
    }).catch(e=>{
      positionRef.value='定位失败'
      ispositionLoading.value=false
    })
  }

}
//定位相关配置
function settingAMap(AMap){
  const geolocation = new AMap.Geolocation({
    enableHighAccuracy: true, //是否使用高精度定位，默认:true
    timeout: 500000, //超过10秒后停止定位，默认：无穷大
    maximumAge: 0, //定位结果缓存0毫秒，默认：0
    convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
    showButton: true, //显示定位按钮，默认：true
    buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
    buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
    showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
    showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
    panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
    zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
  })
  return geolocation
}

// h5定位
const getH5MapInit=()=> {
  return new Promise((resolve,reject)=>{
    const mapObj = new AMap.Map('');
    mapObj.plugin('AMap.Geolocation', function() {
      const geolocation =settingAMap(AMap)
      mapObj.addControl(geolocation);
      geolocation.getCurrentPosition((a,b)=>{
      });
      //返回定位信息
      AMap.event.addListener(geolocation, 'complete', onComplete);
      //返回定位出错信息
      AMap.event.addListener(geolocation, 'error', err=> {
        onError(err)
      });
      function onComplete(data){
        resolve(data)
      }
      function onError(error){
        reject(error.status)

      }
    });
  })
}
const onClickSendPublish=()=>{
  if(!positionRef.value){
   return  Toast('定位失败')
  }
  const data=new FormData()
  data.append('content',publishRef.value)
  data.append('positioning',positionRef.value)
  data.append('id',JSON.parse(localStorage.getItem('user')).id)
  console.log(data)
  postSendpublish(data).then(res=>{
    const {code}=res
    if(code===200){
      publishRef.value=''
    }


  })
  //router.push('/home')
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
  <div class="position">

    <van-loading size="24px" v-if="ispositionLoading">加载中...</van-loading>

  </div>
  <span class="position-text text-link" v-if="!ispositionLoading"
  @click="onClickgetH5MapInit('')">所在位置:{{positionRef}}</span>
</template>



<style scoped>
.position{
  text-align: center;
}
.position-text{
  color:#999
}
.text-link{
  font-size:14px;
}
</style>
