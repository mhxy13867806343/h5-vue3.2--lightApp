import request from '@/utils/request'
//管理版本
export const getHistry = params => {
  return request({
    url: 'histry/list',
    params,
  })
}
