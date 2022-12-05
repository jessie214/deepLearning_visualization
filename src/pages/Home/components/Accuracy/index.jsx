/*
准确率与损失函数
*/
import React, { useState, useEffect, useRef } from 'react';
import echarts from 'echarts';
import styles from './index.less';
import { connect } from 'umi';

const Accuracy = (props) => {
  const [optionData, setOptionData] = useState({}); // echart的option
  const [xData, setXData] = useState([]); // 准确性的x轴
  const [xLossData, setXLossData] = useState([]); // 损失函数的x轴
  const {
    doubleLine, // 准确率与损失函数实时的值
    epochNum, //  用户设置的轮数
  } = props;

  const chartRef = useRef(null);
  let myChart = null;

  // 轮数
  const type_list = ['准确率', 'IOU准确率'];

  const option = {
    backgroundColor: '#000',
    title: [
      {
        text: 'A\nc\nc\nu\nr\na\nc\ny',
        left: '2%',
        top: '20%',
        textAlign: 'center',
        textStyle: {
          color: '#fff', //颜色
          fontSize: 12, //大小
          fontWeight: 'nomal',
        },
      },
    ],
    tooltip: {
      // 浮动显示数值
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#283b56',
          fontSize: 8,
        },
        textStyle: {
          fontSize: 8,
        },
      },
    },
    grid: [{ left: '10%', right: '12%', top: '5', width: '87%', height: '80%' }],
    xAxis: [
      {
        gridIndex: 0,
        type: 'category',
        // name: 'Epoch',
        boundaryGap: false,
        // max: 100,
        min: 0,
        interval: 0,
        // minInterval: 10,
        // splitNumber: 10,
        axisLabel: {
          // formatter: '{value}',
          fontSize: 10,
          // margin: 10,
          textStyle: {
            // x坐标文字颜色
            color: '#e9e9e9',
            align: 'center',
          },
        },
        axisLine: {
          lineStyle: {
            color: '#cccccc',
            width: 2,
          },
        },
        axisTick: {
          show: false,
        },
        axisPointer: {
          // 配置悬浮的x轴显示
          label: {
            // fontSize: 12,
            formatter: function (params) {
              return (
                'Epoch：  ' + params.value
                // (params.seriesData.length ? '：' + params.seriesData[0].data : '')
              );
            },
          },
        },
        data: xData,
      },
    ],
    yAxis: [
      {
        // 准确率的平均值
        gridIndex: 0,
        splitNumber: 5,
        max: 1,
        min: 0,
        axisLine: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            // x坐标文字颜色
            color: '#e9e9e9',
            fontSize: 8,
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#6d6d6d',
          },
        },
      },
    ],
    series: [
      // 训练集的准确率
      {
        name: type_list[0],
        symbol: 'none',
        type: 'line',
        smooth: true,
        itemStyle: {
          normal: {
            lineStyle: {
              color: '#1a74e4',
              width: 2,
            },
          },
        },
        data: optionData?.acc1,
        // 因有缺失的点, 所以采用如下属性来使数据正常连接不断开
        connectNulls: true,
      },
      // iou准确率
      {
        name: type_list[1],
        symbol: 'none',
        type: 'line',
        smooth: true,
        itemStyle: {
          normal: {
            lineStyle: {
              color: '#b8df62',
              width: 2,
            },
          },
        },
        data: optionData?.acc2,
        connectNulls: true,
      },
    ],
  };

  useEffect(() => {
    if (doubleLine) {
      const yValue = doubleLine;
      // 设置y轴首位值为0，以实现首值有线
      yValue?.acc1?.unshift(0);
      yValue?.acc2?.unshift(0);
      // yValue?.loss1?.unshift(0);
      // yValue?.loss2?.unshift(0);
      // yValue?.loss3?.unshift(0);
      // yValue?.xloss?.unshift(0);
      // console.log(yValue, 'yValue');
      setOptionData(yValue);
      // console.log(doubleLine, 'doubleLine');
      // setXLossData(doubleLine?.xloss);
    }
  }, [doubleLine]);

  useEffect(() => {
    // myChart = echarts.init(chartRef.current);
    // myChart.setOption(option); // 设置option
    window.addEventListener('resize', () => {
      myChart.resize();
    });
  }, []);

  let xArr = [];
  useEffect(() => {
    if (epochNum) {
      let epochData = Number(epochNum);
      //   Number(epochNum) % 10 === 0 ? Number(epochNum) / 10 : Number(epochNum) / 10 + 1;
      // console.log(epochData, 'epochData');
      // if (epochData < 10 || epochData === 10) {
      for (var i = 0; i < epochData; i++) {
        xArr[i] = i;
      }
      // console.log(xArr);
      setXData(xArr);
      return xArr;
      // }
    }
  }, [epochNum]);

  useEffect(() => {
    if (optionData) {
      setOptionData(optionData);
      myChart = echarts.init(chartRef.current);
      myChart.setOption(option);
    }
  }, [optionData]);

  useEffect(() => {
    myChart = echarts.init(chartRef.current);
    myChart.setOption(option);
  }, [xArr]);

  return (
    // <div>
    <div
      ref={chartRef}
      // style={{ width: '100%', height: '200px' }}
      className={styles.lineDiv}
    ></div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Accuracy);
