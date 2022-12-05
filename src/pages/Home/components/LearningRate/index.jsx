/*
学习率
*/
import React, { useState, useEffect, useRef } from 'react';
// import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import { connect } from 'umi';
import styles from './index.less';
import { WindowsFilled } from '@ant-design/icons';

const LearningRate = (props) => {
  const [optionData, setOptionData] = useState([120, 200, 150, 80, 70, 110, 130]);
  const [xValue, setXValue] = useState();
  const [yValue, setYValue] = useState();
  const { learningData } = props;
  const chartRef = useRef(null);

  let myChart = null;
  useEffect(() => {
    if (learningData) {
      setOptionData(learningData);
    // x轴的值需要根据y轴的位数遍历
    // 由于一个数字无法显示折现，所以首位填充0
    // lastestData?.unshift(0);
      let len = 0;
      if (learningData.length < 101) {
        len =101
      }
      // else {
      //   len = learningData.length;
      // }
    const arr = []
    // 生成x轴的值
    for (let i = 0; i < len; i++){
      arr[i] = i;
      }
      // console.log(arr,'arr')
      setXValue(arr);
      setYValue( learningData);
      // console.log(xArr, yArr, '8888');
    }
  }, [learningData]);

  useEffect(() => {
    if (optionData) {
      setOptionData(optionData);
      myChart = echarts.init(chartRef.current);
      myChart.setOption(option);
    }
  }, [optionData]);
 

  const option = {
    title: {
      text: '学习率',
      right: '0',
      top: '5',
      fontWeight: '',
      textStyle: {
        color: '#fff', //颜色
        fontSize: 12, //大小
        // align: 'right', //水平对齐
        fontWeight: 'normal',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#283b56',
        },
      },
    },
    grid: [{ right: '20' }],
    dataZoom: {
      show: false,
      start: 0,
      end: 100,
    },
    xAxis: [
      {
        type: 'category',
        // min: 0,
        // max:100        
        boundaryGap: false,
        // show: false,
        axisLabel: {
          formatter: '{value}',
          fontSize: 10,
          // margin: 10,
          textStyle: {
            // x坐标文字颜色
            color: '#fff',
          },
        },
        axisLine: {
          lineStyle: {
            color: '#1f5061',
          },
        },
        axisPointer: {
          // 配置悬浮的x轴显示
          label: {
            fontSize: 12,
            formatter: function (params) {
              return (
                'Epoch：  ' + params.value
                // (params.seriesData.length ? '：' + params.seriesData[0].data : '')
              );
            },
          },
        },
        data: xValue,
        inverse: true, // 反转坐标轴
      },
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        max: 0.018,
        min: 0.003,
        // boundaryGap: [-1, 1],
        axisLine: {
          show: false,
        },
        axisLabel: { show: true },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#243753',
          },
        },
      },
    ],
    series: [
      {
        name: '学习率',
        type: 'line',
        smooth: false,
        symbolSize: 5,
        symbol: 'none',
        showSymbol: false,
        itemStyle: {
          normal: {
            lineStyle: {
              color: '#438edf',
              width: 1,
            },
          },
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(69,142,218,0.4)',
                },
                {
                  offset: 1,
                  color: 'rgba(69,142,218,0.4)',
                },
              ],
              false,
            ),
          },
        },
        data: yValue,
      },
    ],
  };
  // bar设置
  const drawecharts = (data) => {
    // setOptionData(data);
  };
  const resized = () => {
    myChart.resize();
  };
  const getEchartWidth = () => {
    chartRef.current.style.width = chartRef.current.offsetWidth;
    chartRef.current.style.height = chartRef.current.offsetHeight;
    resized();
  };

  useEffect(() => {
    myChart = echarts.init(chartRef.current);
    // window.onresize = () => {
    //   myChart.resize();
    // };
    window.addEventListener('resize', () => {
      myChart.resize();
    });
  }, []);

  return <div ref={chartRef} className={styles.accuracyChart}></div>;
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
export default connect(mapStateToProps, mapDispatchToProps)(LearningRate);
