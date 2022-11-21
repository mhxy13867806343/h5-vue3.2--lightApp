import request from '@/utils/request'
//邮件发送
export const postSendMail = params => {
  return request({
    url: 'emails/send',
    params,
    method: 'post',
  })
}
