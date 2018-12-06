// miniprogram/pages/exchangeLog/exchangeLog.js
const db = wx.cloud.database()
const dataBase = db.collection('pieces')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    all_data: [
      {
        name: 'Player1',
        records: [{ id: 'a', num: 1 },
        { id: 'b', num: 15 },
        { id: 'c', num: 6 }]
      },
      {
        name: 'Player2',
        records: [{ id: 'c', num: 32 },
        { id: 'v', num: 3 },
        { id: 'b', num: 6 },
        { id: 'd', num: 4}]
      }
     ],
     boxHeight: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // dataBase.get().then(
    //   res => {
    //     console.log(res.data)
    //     this.setData({
    //       all_data: res.data
    //     })
    //   }
    // )
    var temp= this.data.boxHeight
    wx.getSystemInfo({
      success: function (res) {
        temp = res.windowHeight-120
        console.log(temp)
      }
    })
    this.setData({
      boxHeight: temp
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    console.log(this.data.boxHeight)
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
    dataBase.get().then(
      res => {
        this.setData({
          all_data: res.data
        })
      }
    )
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

  onUpdate: function(){
    // dataBase.get().then(
    //   res => {
    //     console.log(res.data)
    //     this.setData({
    //       all_data: res.data
    //     })
    //   }
    // )
    console.log(this.data.all_data[0].records)
    console.log(this.data.all_data[0].records[0])
  },

  onAdd: function(){
    wx.redirectTo({
      url: "../pageAdd/pageAdd"
    })
  }
})