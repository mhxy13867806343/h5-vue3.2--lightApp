<script setup>
import {defineProps,computed} from 'vue'
import moment from 'moment'
const props =defineProps({
  list:{
    type:Array,
    default:[]
  }
})
const createTimeComputed=computed(()=>{
  return props.list.map(item=>moment(item.create_time*1000).format('YYYY-MM-DD HH:mm:ss'))
})
</script>
<template>
  <ul>
    <li class="item-li" v-for="(item,index) in list" :key="index">
      <div class="item-list-1">
        <div class="wrapp-list-item">
          <van-image
              round
              width="5rem"
              height="5rem"
              :src="$host1+item.avatar"
          />
          <p class="p-content">
            <span v-html="item.content"></span>
          </p>
        </div>
      </div>
      <div class="wrapp-list-create_time">
        <p> <span class="iconfont icon-shijian"></span>{{createTimeComputed[index]}}</p>
      </div>
      <div v-if="item.positioning">
       <span class="iconfont icon-wxbdingwei"></span>{{item.positioning}}
      </div>
    </li>
  </ul>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-li{
  padding:10px;
}
.wrapp-list-item{
  flex: 1;
  display: flex;
  align-items: center;
}
.wrapp-list-create_time{
  flex: 1;
  text-align: end;
}
.p-content{
  padding-left: 12px;
  width: 300px;
  word-break: break-word;
  white-space: pre-line;
}
p,.iconfont{
  font-size:12px;
}
.iconfont{
  margin-right: 6px;
}

</style>
