import request from '@/utils/request'
//表情列表
export const getEmojiList = params => {
  return request({
    url: 'emoji/list',
    params,
  })
}
