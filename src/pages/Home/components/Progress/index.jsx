/*
进度
*/
import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import { connect } from 'umi';
import styles from './index.less';

const Progress = (props) => {
  const [optionData, setOptionData] = useState(0);
  const { proData } = props;
  // const [proNum, setProNum] = useState(0);
// console.log(proData,'proData')
  // useEffect(() => {
  //   if (proData) {
  //     setOptionData(proNum);
  //     if (proNum < 100) {
  //       setProNum(proNum + 1);
  //     }
  //   }
  // }, [proData]);

  // useEffect(() => {
  //   setOptionData(proNum);
  // }, [proNum]);
  useEffect(() => {
    setOptionData(proData);
    // console.log(proData, 'proData');
  }, [proData]);

  const position = ['50%', '50%'];

  const option = {
    // backgroundColor: '#000',
    polar: {
      radius: ['76%', '98%'], // 渐变进度条宽度
      center: position,
    },
    grid: {
      left: '10',
    },
    angleAxis: {
      max: 100,
      show: false,
      // clockwise: false, // 逆时针
      startAngle: 225,
      endAngle: 120,
    },
    radiusAxis: {
      type: 'category',
      show: true,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },

    series: [
      // 底部背景黑色
      {
        type: 'pie',
        radius: ['0%', '100%'],
        hoverAnimation: false,
        clockWise: false,
        itemStyle: {
          normal: {
            // shadowBlur: 20,
            // shadowColor: 'rgba(0, 255, 255,.3)',
            color: '#000',
          },
        },
        z: 0,
        label: {
          show: false,
        },
        data: [50],
      },
      // 进度格子及阴影
      {
        type: 'gauge',
        radius: '98%',
        // clockwise: false,
        startAngle: '225',
        endAngle: '-45',
        splitNumber: 50, // 格子数量
        detail: {
          offsetCenter: [0, -20],
          formatter: ' ',
        },
        pointer: {
          show: false,
        },
        animation: true,
        force: {
          layoutAnimation: true,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: [
              // 36.7/100格子颜色
              [0, '#2CFAFC'],
              [optionData / 100, '#1ea6d8'],
              [1, '#0f232e'],
            ],
            width: 28, // 进度条宽度与splitLine的length同步设置
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          length: 28,
          lineStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 255, 255, 1)',
            shadowOffsetY: '0',
            color: '#020f18', // 格子缝隙颜色
            width: 2,
          },
        },
        axisLabel: {
          show: false,
        },
      },

      // 最外层蓝色边框
      {
        name: '',
        type: 'pie',
        radius: ['99%', '100%'],
        center: position,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#0d6bb3' },
            { offset: 0.7, color: '#0d6bb3' },
            { offset: 1, color: 'rgba(0, 0, 0, 0)' },
          ]),
        },
        animation: false,
        force: {
          layoutAnimation: false,
        },
        data: [99],
      },
      /*外三层蓝色环*/
      {
        type: 'pie',
        radius: ['65%', '66%'],
        startAngle: 220,
        endAngle: -40,
        hoverAnimation: false,
        center: position,
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        animation: false,
        force: {
          layoutAnimation: false,
        },
        data: [
          {
            value: 1,
          },
        ],
        itemStyle: {
          normal: {
            color: '#1a77a3',
          },
        },
      },
      //外二层-蓝线
      {
        type: 'pie',
        radius: ['53%', '55%'],
        startAngle: 220,
        endAngle: -40,
        hoverAnimation: false,
        center: position,
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        animation: false,
        force: {
          layoutAnimation: false,
        },
        data: [
          {
            value: 1,
          },
        ],
        itemStyle: {
          normal: {
            color: '#3bcff7',
          },
        },
      },

      /*内圈深蓝色环*/
      {
        type: 'pie',
        radius: '45%',
        startAngle: 220,
        endAngle: -40,
        hoverAnimation: false,
        center: position,
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        animation: false,
        force: {
          layoutAnimation: false,
        },
        data: [
          {
            value: 1,
          },
        ],
        itemStyle: {
          normal: {
            color: '#002039',
          },
        },
      },
      /*内部圈文字*/
      {
        type: 'pie',
        radius: ['0', '45%'],
        center: position,
        z: 8,
        hoverAnimation: false,
        animation: false,
        itemStyle: {
          normal: {
            color: '#fff',
          },
        },
        force: {
          layoutAnimation: false,
        },
        data: [
          {
            value: `${optionData || 0}%`, // 进度百分比
            itemStyle: {
              normal: {
                color: '#002039',
                fontSize: '20',
              },
            },
            label: {
              normal: {
                rich: {
                  a: {
                    color: '#fff',
                    align: 'center',
                    fontSize: 28,
                    // fontWeight: 'bold',
                  },
                },
                formatter: function (params) {
                  return '{a|' + params.value + '}';
                },
                position: 'center',
                show: true,
              },
            },
            labelLine: {
              show: false,
            },
          },
        ],
      },
    ],
  };
  return (
    // <div style={{ height: '30vh', width: '30vh' }} className={styles.progressDiv}>
    <ReactEcharts option={option} className={styles.progressDiv} />
    // </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Progress);
