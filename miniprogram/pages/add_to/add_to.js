import WxValidate from 'WxValidate.js'
import WxValidatee from 'WxValidate.js'


const db = wx.cloud.database();
const _ = db.command
Page({
  /**
   * 页面的初始数据
   */
  data: {
    
  },
    //便签
    addnote: function () {
      db.collection("Note").get().then(console.log)
    },

    //记账
    addBookkeeping: function () {
      db.collection("Bookkeeping").get().then(console.log)
    },


  showModal(error) {
    wx.showModal({
    content: error.msg,
    showCancel: false,
       })
  },
  
  // 添加便签
  onAdd: function (e) {
    console.log('携带数据为：', e.detail.value)
    const formdata = e.detail.value

//校验表单
    if (!this.WxValidatee.checkForm(formdata)) {
      const error = this.WxValidatee.errorList[0]
      this.showModal(error)
      return false
    }  

    this.submitInfo(formdata);
  },

  submitInfo(formdata) {
    // form提交
    let form = formdata
     console.log('将要提交的表单信息：', form);

     const db = wx.cloud.database()
     db.collection('Note').add({
       data: {
         "biaoti": formdata.bianqian1,
         "neirong": formdata.neirong
       },
       success: res => {
         // 在返回结果中会包含新创建的记录的 _id
         this.setData({
           counterId: res._id,
           count: 1
         })
         wx.showToast({
           title: '新增记录成功',
         })
         console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
       },
       fail: err => {
         wx.showToast({
           icon: 'none',
           title: '新增记录失败'
         })
         console.error('[数据库] [新增记录] 失败：', err)
       }
     })
  
  },
//便签
  initValidate1() {
    const rules = {
      bianqian1: {
        required: true,
        rangelength: [2, 15]
      },
      neirong: {
        required: true,
        rangelength: [2, 15]
      },
    }
    const messages = {
      bianqian1: {
        required: '请输入标题',
        rangelength: '请输入2~15个汉字个汉字'
      },
      neirong: {
        required: '请输入内容',
        rangelength: '请输入2~15个汉字个汉字'
      }
    }
    // 创建实例对象
    this.WxValidatee = new WxValidatee(rules, messages)
  },

  //记账
  initValidate() {
      const rules = {
        biaoti1: {
          required: true,
          rangelength: [2, 15]
        },
        zhichu: {
          required: true,
          rangelength: [2, 15]
        },
        jiner: {
          required: true,
          number: true
        },
        shouru1: {
          required: true,
          rangelength: [2, 15]
        },
        jiner1: {
          required: true,
          number: true
        },
      }
   // 验证字段的提示信息，若不传则调用默认的信息
   const messages = { 
     biaoti1: {
       required: '请输入1标题',
       rangelength: '请输入2~15个汉字个汉字'
     },
     zhichu: {
       required: '请输入支出内容',
       rangelength: '请填写正确的内容'
     }, 
     jiner: {
       required: '请输入金额',
       rangelength: '请输入正确金额'
     },
     shouru1: {
       required: '请输入收入内容',
       rangelength: '请填写正确的内容'
     },
     jiner1: {
       required: '请输入金额',
       rangelength: '请输入正确金额'
     }
      
    }   
      // 创建实例对象
   this.WxValidate = new WxValidate(rules, messages)    
   },

//添加记账

  onAdd1: function (e) {
    console.log('携带数据为：', e.detail.value)
    var formdata = e.detail.value;

    //表单提交验证
    if (!this.WxValidate.checkForm(formdata)) {
         const error = this.WxValidate.errorList[0]
         this.showModal(error)
         return false
    }

    this.submitInfo1(formdata);
    },

    submitInfo1(formdata){
      let form =formdata;
      console.log('携带的数据：',form);

      const db = wx.cloud.database()
      db.collection('Bookkeeping').add({
        data: {
          "jizhangbiaoti": formdata.biaoti1,
          "zhichuleixing": formdata.leixing,
          "zhichuneirong": formdata.zhichu,
          "zhichujiner": formdata.jiner,
          "shouruleixing": formdata.leixing1,
          "shouruneirong": formdata.shouru1,
          "shourujiner": formdata.jiner1
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          this.setData({
            counterId: res._id,
            count: 1
          })
          wx.showToast({
            title: '新增记录成功',
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate();
    this.initValidate1();


  },
  showModal(error) {
       wx.showModal({
            content: error.msg,
           showCancel: false,
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
  onShareAppMessage1: function (res) {
    wx.onShareAppMessage(() => {
      return {
        title: '转发标题',
        imageUrl: '' // 图片 URL
      }
    })

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
    this.setData({
      chooseBQ: false,
      chooseJZ: true
    })
  },
  chooseFXBtnClick:function(){
    wx.navigateTo({
      url: '/pages/share/share',
    })
  },
  chooseWCBtnClick:function(){
    this.setData({
      salaryInputData: "",
      salaryValue: "",
      salaryIndividualTax: -1,
      salaryOpacity: 0.5,
      salaryTaxableIncome: 0,
      specialDeductionInputData: 0,
      specialAddDeductionInputData: 0,
      salaryDigitHint: "",
      specialDeductionDigitHint: "",
      specialAddDeductionDigitHint: "",
      salaryTax: ""
    })
    console.log("ccc")
    if (this.data.salaryInputData == "") {
      console.log("ddd")
      this.setData({
        salaryTaxFlg: false
      })
    }
  }
})