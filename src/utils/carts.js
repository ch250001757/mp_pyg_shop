
// 购物车的方法

const key = 'GOOD'

/**
 * 购物车新增方法
 * 按需导出
 */
export const addGoods = ({
  goods_id,
  goods_number
}) => {
  // 先从本地获取,如果没则新增 如果有则数量累加
  var goodsList = wx.getStorageSync(key) || {}

  if (goodsList[goods_id]) {
    goodsList[goods_id] += goods_number
  } else {
    goodsList[goods_id] = goods_number
  }

  wx.setStorageSync(key, goodsList)
}

/**
 * 获取本地数据
 */
export const getLocalGoods = () => {
  var goodsList = wx.getStorageSync(key) || {}
  return goodsList
}

/**
 * 更改商品数量
 */

export const updateData = (item) => {
  var goodsList = wx.getStorageSync(key) || {}

  goodsList[item.goods_id] = item.goods_number

  wx.setStorageSync(key, goodsList)
}

/**
 * 删除商品
 */

export const delData = (id) => {
  var goodsList = wx.getStorageSync(key) || {}
  delete goodsList[id]
  wx.setStorageSync(key, goodsList)
}
