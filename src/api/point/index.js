import request from '@/utils/request'
//获取用户是否签到过
export const getUsersPoint = params => {
  return request({
    url: 'users/point',
    params,
  })
}
//保存用户积分
export const postUsersPoint = data => {
  return request({
    url: 'users/point',
    data,
    method: 'post',
  })
}
