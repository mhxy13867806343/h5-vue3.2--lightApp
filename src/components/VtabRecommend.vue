<script setup>
import {defineProps} from 'vue'
const props=defineProps({
	item:{
		type:Object,
		default:{}
	}
})
</script>
<template>
	<van-cell :title="item.title" is-link  center/>

</template>

<style scoped>

</style>
