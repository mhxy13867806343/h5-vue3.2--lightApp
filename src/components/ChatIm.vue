<script setup>
import {defineProps} from 'vue'
const props =defineProps({
	list:{
		type:Array,
		default:[]
	}
})
</script>
<template>
	<ul>
		<li v-for="(item,index) in list" :key="index">
			<div class="li-center">
				{{item.time}}
			</div>
			<div class="li-items" v-for="(item1,index1) in item.list" :key="index1">
				<div class="li--left">
					<van-image
							width="30px"
							height="30px"
							:src="item1.leftAvatar"
					/>
					<div class="li-left-right">
						<p class="left-p2" v-html="item1.leftContent"></p>
					</div>
				</div>
				<div class="li-right">
					<div class="li--right">
						<p class="right-p1" v-html="item1.rightContent"></p>
					</div>
					<van-image
							width="30px"
							height="30px"
							:src="item1.rightAvatar"
					/>

				</div>
			</div>

		</li>
	</ul>
</template>


<style scoped>
ul{}
li{
	padding: 14px;
}
p{
	margin: 0;
	padding: 0;
}
.li-center{
	text-align: center;
}
.li-center{
	padding: 10px 0;

}
.left-p1,.li-center{
	color: #bebebe;
}
.left-p2,.right-p1{
	padding: 6px;
	border-radius: 7px;
	height: 50px;
	line-height: 50px;
}
.left-p2{
	background: #fff;

}
.right-p1{
	background: #59b269;
}
.li-items{}
.li-items:last-child{
	padding-bottom: 10px;
}
.li--left,.li-right{
	display: flex;
	margin-bottom: 10%;
	align-items: center;
}
.li--left{

	align-items: center;
}
.right-p1{
	text-align: right;
}
.li-right{
	justify-content: flex-end;
}
.li-left-right{
	padding-left: 11px;
}
.li--right{
	padding-right: 10px;
}
.left-p2,.right-p1{
	font-size: 14px;
	position: relative;
	font-weight: bold;
}
.left-p2:before{
	width: 0px;
	height: 0px;
	content: "";
	border-top: 5px solid transparent;
	border-bottom: 5px solid transparent;
	border-right: 5px solid #fff;
	left: -5px;
}
.left-p2:before,.right-p1:after {
	position: absolute;
	transform: translate(0,-50%);
	top: 50%;
}
.right-p1:after {
	right: -15px;
	content: '';
	border-width: 10px;
	border-style: solid;
	border-top-color: transparent;
	border-right-color: transparent;
	border-bottom-color: transparent;
	border-left-color: #59b269;


}
</style>
