import request from '@/utils/request'
//字典列表
export const getDictList = params => {
  return request({
    url: 'dicts/list',
    params,
  })
}
//根据父字典Id查询子字典
export const getDictChildList = keys => {
  return request({
    url: `dicts/childList?keys=${keys}`,
  })
}
