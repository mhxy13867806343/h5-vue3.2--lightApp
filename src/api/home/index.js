import request from '@/utils/request'
//动态数据
export const getHomeList = params => {
  return request({
    url: 'home/list',
    params,
  })
}
