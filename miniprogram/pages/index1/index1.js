
import * as echarts from '../../ec-canvas/echarts';
var chart = null;

function initChart(canvas, width, height, option) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = option;
  chart.setOption(option);
  return chart;
}


function initChart1(canvas, width, height, option) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = option;
  chart.setOption(option);
  return chart;
}
const db = wx.cloud.database();
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {}
  },
  echartInit(e) {
    var option = {
      backgroundColor: "#ffffff",
      color: ["#CC0000", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C"],
      series: [{
        type: 'pie',
        center: ['50%', '50%'],
        radius: [0, '60%'],
        data: [{
          value: 100,
          name: '吃喝'
        }, {
          value: 20+90,
          name: '游玩'
        }, {
          value: 10,
          name: '医药'
        }, {
          value: 20,
          name: '日常用品'
        }, {
          value: 38,
          name: '其他'
        },],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 2, 2, 0.3)'
          }
        }
      }]
    };
    initChart(e.detail.canvas, e.detail.width, e.detail.height, option);
  },
 
    echartInit1(e) {
      var option = {
        backgroundColor: "#ffffff",
        color: ["#CC0000", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C"],
        series: [{
          type: 'pie',
          center: ['50%', '50%'],
          radius: [0, '60%'],
          data: [{
            value: 10,
            name: '吃喝'
          }, {
            value: 20 + 90,
            name: '游玩'
          }, {
            value: 10,
            name: '医药'
          }, {
            value: 20,
            name: '日常用品'
          }, {
            value: 38,
            name: '其他'
          },],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 2, 2, 0.3)'
            }
          }
        }]
      };
      initChart1(e.detail.canvas, e.detail.width, e.detail.height, option);
    },

    chooseJZBtnClick: function (e) {
    wx.clearStorage(),
      this.setData({
        chooseJZ: true,
        chooseSJ: false,
        option: 1
      })
  },
  chooseSJBtnClick: function (e) {
    wx.clearStorage(),
      this.setData({
        chooseJZ: false,
        chooseSJ: true
      })
  }
  });
