import request from '@/utils/request'
//注册
export const postRegister = params => {
  return request({
    url: 'users/register',
    params,
    method: 'post'
  })
}
//登录
export const postLogin = data => {
  return request({
    url: 'users/login',
    data,    method: 'post'
  })
}
//根据token获取用户信息
export const postToken = data => {
  return request({
    url: 'users/token',
    data, method: 'post'
  })
}

//根据Token获取用户信息并进行数据的添加
export const postSendpublish = data => {
  return request({
    url: 'users/sendpublish',
    data, method: 'post'
  })
}

//上传头像
export const postUpload= data => {
  return request({
    url: '/users/upload',
    data, method: 'post'
  })
}
//用户信息保存
export const postUserSave= data => {
  return request({
    url: '/users/userSave',
    data,    method: 'post'
  })
}
