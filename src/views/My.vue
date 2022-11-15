<script setup>

</script>
<template>
  <div class="justify-center img-centered">
    <van-image
        round
        width="5rem"
        height="5rem"
        src="https://unpkg.com/@vant/assets/cat.jpeg"
    />
  </div>
  <van-cell-group inset>
    <van-cell center title="我的信息" is-link  to="minformation"/>
  </van-cell-group>
  <div class="justify-center img-centered-1">
    <van-button hairline type="primary" block round>退出</van-button>
  </div>
</template>

<style scoped>

</style>
