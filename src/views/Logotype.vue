<script setup>
import {ref} from 'vue'
import {Toast} from 'vant'
const typeNumber=ref('')
const onClickLont=()=>{
	if(!typeNumber.value){
		Toast.fail('请输入标识号,标识号不能为空')
		return
	} if (typeNumber.value.length>0 && typeNumber.value.length<5){
		Toast.fail('标识号必须大于5位')
		return
	}
}
</script>
<template>
	<van-cell-group inset>
		<van-field v-model="typeNumber" type="digit" label="标识"  placeholder="只能输入数字，最小为5位" min="5"
		clearable center
		/>
	</van-cell-group>
	<div class="justify-center img-centered-1">
	<van-button type="primary"  block round
							@click="onClickLont"
	>保存</van-button>
	</div>
</template>


<style scoped>

</style>
