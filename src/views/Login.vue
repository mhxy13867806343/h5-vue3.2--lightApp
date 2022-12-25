<script setup>
import { NoticeBar,Toast } from 'vant';
import moment from 'moment';
import useUser from '@/hooks/useUser'
const {userRef,btnDisabledCom,onClickUserType}=useUser()
import {getSoupfapig} from '@/api/histry'
import {onMounted,ref,computed} from 'vue'
const soupfapig=ref('')
const mockMinsoldRef=ref('00天00小时00分钟00秒')
onMounted(()=>{

  getSoupfapig().then(res=>{
    if(res.data.error_code===0){
      soupfapig.value=res.data.result.text
    }
  })

	runningTimeComSetInterval()
})
function runningTimeComSetInterval(){
	const ts=1671508800
	const _t1000=ts*1000 //网站开始时间
	const startTime = new Date(_t1000).getTime()
	const runningTimeCom=()=>{
		const days = Math.floor((new Date().getTime() - startTime) / (1000 * 60 * 60 * 24))
		const hours = Math.floor((new Date().getTime() - startTime) / (1000 * 60 * 60) % 24)
		const minutes = Math.floor((new Date().getTime() -startTime) / (1000 * 60) % 60)
		const seconds = Math.floor((new Date().getTime() - startTime) / 1000 % 60)
		mockMinsoldRef.value=`${lt10(days)} 天 ${lt10(hours)} 小时 ${lt10(minutes)} 分钟 ${lt10(seconds)} 秒`
	}
	setInterval(()=>{
		runningTimeCom()
	},1000)
	function  lt10(n){
		return n<10?'0'+n:n
	}
}
</script>
<template>
  <van-notice-bar scrollable :text="soupfapig"  v-if="soupfapig"/>

  <van-cell-group inset>
    <van-field required v-model="userRef.user" label="用户名" placeholder="请输入用户名" clearable />
    <van-field required v-model="userRef.pwd" label="密码" placeholder="请输入密码" clearable  type="password"/>
  </van-cell-group>
  <van-button hairline  round block type="primary"
              :disabled="btnDisabledCom"
  @click="onClickUserType(1)"
  >登录</van-button>
  <div class="text-flex">
    <div class="iconfont icon-zhuce text-flex text-link" @click="$router.push('/zc')">注册
    </div>
    <div class="iconfont icon-yijianfankui text-flex text-link" @click="$router.push('/opinion')">
      反馈意见
    </div>
    <div class="iconfont icon-banben text-flex text-link" @click="$router.push('/versionNumber')">
      版本号
    </div>

  </div>
  <div class="flex-position">
    <van-cell center title="我的github地址" is-link url="https://github.com/mhxy13867806343" />
    <van-cell center title="我的掘金地址" is-link url="https://juejin.cn/user/1310273588955581" />
    <van-cell center title="使用vuepress创建的一个静态博客" is-link url="https://mhxy13867806343.github.io/vuepressBlogDemo/" />
    <van-cell center title="当前应用版本" value="0.01" />
		<van-cell center title="小网站运行时间：">
			<template #right-icon>
				<span class="mockMinsoldRef">{{ mockMinsoldRef }}</span>
			</template>
		</van-cell>

  </div>
</template>

<style scoped>
.van-cell-group{
  padding-top:25%;
}
.van-button{
  margin-top: 10%;
}
.text-flex{
  padding:8px;
}
.flex-position{
  position:fixed;
  bottom:0;
  left: 0;
  width: 100%;
}
.mockMinsoldRef{
	color: #c40000;
	font-size: 12px;
  font-weight: bold;
}
</style>
