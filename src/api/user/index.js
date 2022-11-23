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
    url: 'users/upload',
    data, method: 'post'
  })
}
//用户信息保存
export const postUserSave= data => {
  return request({
    url: 'users/userSave',
    data,    method: 'post'
  })
}

//添加用户标签
export const postUserLabel= data => {
  return request({
    url: 'users/label',
    data,    method: 'post'
  })
}

//删除用户标签
export const delUserLabel= params => {
  return request({
    url: 'users/label',
    params,    method: 'delete'
  })
}

//获取用户标签
export const getUserLabel= params => {
  return request({
    url: 'users/label',
    params,
  })
}
//修改密码
export const postUserUpPwd= data => {
  return request({
    url: 'users/updatpwd',
    data,    method: 'post'
  })
}
//退出
export const postUserLogut= data => {
  return request({
    url: 'users/logut',
    data,
    method: 'post'
  })
}
//获取用户标签
export const getsignature= data => {
  return request({
    url: 'users/getsignature',
    data,
    method: 'post'
  })
}

//新增用户标签
export const postUserSignature= data => {
  return request({
    url: 'users/signature',
    data,
    method: 'post'
  })
}

//修改用户标签
export const putUsersignature= data => {
  return request({
    url: 'users/signature',
    data,
    method: 'put'
  })
}
