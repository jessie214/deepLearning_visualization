/*
建模结果--建模结束后显示
*/
import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import { connect } from 'umi';
import styles from './index.less';

const ResultInfo = (props) => {
  const [optionData, setOptionData] = useState();
  const { proData } = props;

  useEffect(() => {
    if (proData) {
      setOptionData(proData);
    }
  }, [proData]);

  var value = [0.75];
  let barWidth = 22;

  const option = {
    // backgroundColor: 'rgba(10,16,30,1)',
    grid: {
      top: '15%',
      left: '0%',
      right: '0%',
      bottom: '13%',
    },
    tooltip: {
      show: false,
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 1,
      axisLine: {
        show: false,
        lineStyle: {
          color: '#ffffff',
          width: 1,
        },
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: 'rgba(96,118,173,0.3)',
        },
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      //show: false,
      type: 'category',
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        interval: 0,
        margin: 0,
        align: 'left',
        padding: [-50, 0, 0, 0],
        textStyle: {
          color: '#ffffff',
          fontSize: 16,
        },
      },
      axisTick: {
        show: false,
      },
      data: ['王丹丹'],
    },
    series: [
      {
        //真实数值条形图
        name: '真实值',
        type: 'bar', //pictorialBar
        barWidth,
        itemStyle: {
          normal: {
            borderWidth: 0,
            color: {
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: '#00d9de', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#00d9de', // 100% 处的颜色
                },
              ],
            },
          },
          barBorderRadius: 10,
        },
        label: {
          show: false,
        },
        data: value,
        z: 1,
      },
      {
        //辅助方格图形
        name: '辅助值',
        type: 'pictorialBar',
        barWidth,
        symbol: 'rect',
        symbolRepeat: 'true',
        symbolMargin: '90%',
        symbolSize: ['10%', '100%'],
        symbolOffset: ['150%', '0%'],
        symbolRepeat: true,
        itemStyle: {
          normal: {
            color: 'rgba(10,16,30,1)',
          },
          barBorderRadius: 10,
        },
        label: {
          normal: {
            color: '#fff',
            show: false,
            position: ['100%', '10%'],
            fontSize: 18,
            formatter: function (params) {
              console.info(params);
              return ' ' + (value[params.dataIndex] * 100).toFixed(2) + '%';
            },
          },
        },
        data: [1],
        z: 2,
      },
      {
        //辅助背景图形
        name: '背景条',
        type: 'bar', //pictorialBar
        barWidth,
        barGap: '-100%',
        itemStyle: {
          normal: {
            borderWidth: 0,
            color: '#052a32',
          },
          barBorderRadius: 10,
        },
        data: [1],
        z: 0,
      },
    ],
  };

  return (
    <div className={styles.ResultDiv}>
      <div className={styles.boxDiv}>
        <div>
          <p>TP</p>11
        </div>
        <div>
          <p>TN</p>0
        </div>
        <div>
          <p>FP</p>1
        </div>
        <div>
          <p>FN</p>0
        </div>
      </div>
      <div className={styles.rateData}>
        <div className={styles.item1}>
          <span>Precision ratio： </span>100%
        </div>
        <div className={styles.item1}>
          <span>Recall ratio：</span>91.7%
        </div>
        <div className={styles.item2}>
          <span>IOU：</span>78.5%
        </div>
        <div>
          <ReactEcharts option={option} style={{ width: '100%', height: '30px' }} />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ loading }) => ({
  cardLoading: loading.effects['task/fetchTaskList'],
});
const mapDispatchToProps = (dispatch) => ({
  // 获取任务列表
  fetchTaskList(params) {
    return dispatch({ type: 'task/fetchTaskList', payload: { ...params } });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ResultInfo);
