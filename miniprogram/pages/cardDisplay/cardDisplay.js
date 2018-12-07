// miniprogram/pages/cardDisplay/cardDisplay.js
const db = wx.cloud.database()
const dataBase = db.collection('pieces')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    records: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (id) {
    console.log(id.id)
    dataBase.where({_id:id.id}).get({
      success: res=>{
        console.log(res)
        this.setData({
          name: res.data[0].name,
          records: res.data[0].records
        })
      }
  })
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

  }
})