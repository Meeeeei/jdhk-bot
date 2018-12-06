// miniprogram/pages/pageOne/pageOne.js
const db = wx.cloud.database()
const dataCollection = db.collection('data_immuteables')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    atk: null,
    baseAtk: 0.0,
    critDmg: null,
    baseCrit: 0.0,
    ttl: 0.0,
    name: '',
    color: "red",
    lower: 0.0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    dataCollection.get().then(
      res => {
        var temp = []
        var i
        for (i=0; i<res.data.length; i++){
          temp.push(res.data[i]['name'])
        }
        this.setData({ names: temp })
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
    this.setData({
      atk: null,
      critDmg: null,
      ttl: 0.0,
      name: null,
      lower: 0.0,
      color: "red"
      })
    wx.showToast({
      title: '已清空',
      icon: 'success',
      duration: 2000
    })
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

  setAtk: function(e){
    this.data.atk= Number(e.detail.value)
  },

  setCrit: function(e){
    this.data.critDmg= Number(e.detail.value)
  },

  calculate: function(){
    this.setData({ttl: (this.data.baseCrit + this.data.critDmg)*(this.data.baseAtk+this.data.atk)/100})
    if(this.data.ttl>this.data.lower){
      this.setData({color: "green"})
    }
    else{
      this.setData({color: "red"})
    }
  },

  onQuery: function (e) {
    // 查询当前用户所有的 counters
    dataCollection.where({
      name: this.data.names[e.detail.value]
    }).get({
      success: res => {
        this.setData({
          baseAtk: res.data[0].attack,
          baseCrit: res.data[0].crit,
          name: res.data[0].name,
          lower: Number(res.data[0].limLower)
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