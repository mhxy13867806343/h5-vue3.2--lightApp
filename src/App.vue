<template>
  <router-view/>
</template>

<style>
html,body{
	scroll-behavior: smooth;
}
.text-flex{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.justify-center{
  display: flex;
  justify-content: center;
}
.text-link{
  font-size:20px;
}
.img-centered{
  margin: 5% 0;
}
.img-centered-1{
  margin: 20% 0;
}
.informationRef{
  color: var(--van-field-disabled-text-color) !important;
}
.v-right{
	display: flex;
}
.v-right p{
	padding: 0 10px;
}
</style>
