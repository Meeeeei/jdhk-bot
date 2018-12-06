// miniprogram/pages/pageAdd/pageAdd.js
const db = wx.cloud.database()
const item_list = db.collection('items')
const save_path = db.collection('pieces')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    records:[],
    items: [],
    currItem: '',
    currRecord:{id:'', num: 0},
    boxHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    item_list.get().then(
      res=>{
        var temp = []
        for(var i=0;i<res.data.length;i++){
          temp.push(res.data[i]['id'])
        }
        this.setData({items: temp})
      }
    )
    var temp = this.data.boxHeight
    wx.getSystemInfo({
      success: function (res) {
        temp = parseInt(res.windowHeight*0.4)
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

  onInputName: function(e){
    this.data.name = e.detail.value
  },

  onSet: function(e){
    this.setData({
      currItem: this.data.items[e.detail.value]
    })
  },

  onInput: function(e){
    this.setData({
      currRecord: {id:this.data.currItem, num: Number(e.detail.value)}
    })
    
  },

  onAdd:function(){
    // this.data.records.push(this.data.currRecord)
    var temp = this.data.records
    temp.push(this.data.currRecord)
    this.setData({
      records: temp
    })
  },

  onSubmit: function(){
    if (this.data.name!='' && this.data.records.length>0){
    save_path.add({
      data:{
        name: this.data.name,
        records: this.data.records
      },
      success: res=>{
        wx.showToast({
          title: 'Success'
        })
      },
      fail: err=>{
        wx.showToast({
          icon: 'none',
          title: 'Fail'
        })
      }
    })
    }
    else{
      wx.showToast({
        icon: 'loading',
        title: 'Entry Invalid'
      })
    }
  }
})