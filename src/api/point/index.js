import request from '@/utils/request'
//获取用户签到列表
export const getSigninList= params => {
  return request({
    url: 'users/signin',
    params,
  })
}

//用户签到
export const postUsersPoint = params => {
  return request({
    url: 'users/signin',
    params,
    method: 'post',
  })
}
