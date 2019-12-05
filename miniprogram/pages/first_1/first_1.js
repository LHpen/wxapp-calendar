// miniprogram/pages/first_1/first_1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 1,
    counterId: '',
    openid: '',
    count: null,
    queryResult: '',
    neirongg:''

  },
  onQuery: function () {
    const db = wx.cloud.database()
    db.collection('Note').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          queryResult: res.data, 
          chooseBQ: true,
          chooseJZ: false,
          option: 1
        })
        console.log('[数据库] [查询记录] 成功: ', res.data)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  chooseBQBtnClick: function (e) {
    wx.clearStorage(),
    this.setData({
      chooseBQ: true,
      chooseJZ: false,
      option: 1
    })
  },
  chooseJZBtnClick: function (e) {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('Bookkeeping').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          queryResult: res.data, 
          chooseBQ: false,
          chooseJZ: true
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
})