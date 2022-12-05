/*
训练情况
*/
import React, { useState, useEffect, useRef } from 'react';
import styles from './index.less';
import { connect } from 'umi';
const TrainingInfo = (props) => {
  const [data, setData] = useState();
  const [startTime, setStartTime] = useState();
  const [usageTime, setUsageTime] = useState([]);
  const [currentEpoch, setCurrentEpoch] = useState();
  const { trainingData, startTimes ,proData} = props;


  



  useEffect(() => {    
    if (proData) {
      setCurrentEpoch(proData);
    }
  }, [proData])
  
  useEffect(() => {
    if (trainingData) {
      
      setData(trainingData);
      // console.log(trainingData, 'trainingData');
    }
  }, [trainingData]);

  // 将开始时间转换成需要的时间格式
  const dateFormat = (dateData) => {
    const date = new Date(dateData);
    const y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? `0${m}` : m;
    let d = date.getDate();
    d = d < 10 ? `0${d}` : d;
    let h = date.getHours();
    h = h < 10 ? `0${h}` : h;
    let min = date.getMinutes();
    min = min < 10 ? `0${min}` : min;
    let s = date.getSeconds();
    s = s < 10 ? `0${s}` : s;
    const time = `${y}-${m}-${d} ${h}:${min}:${s}`;
    setStartTime(time)
    return time;
  };


  useEffect(() => {
    if (startTimes) {
      dateFormat(startTimes);     
    }
  }, [startTimes])

  // 计算已用时间，根据开始时间和当前时间的时间差
  const secondToDate = (second) => {
    if (!second) {
        return 0;
    }
    var time = new Array(0, 0, 0, 0, 0);
    if (second >= 365 * 24 * 3600) {//计算年
        time[0] = parseInt(second / (365 * 24 * 3600));
        second %= 365 * 24 * 3600;
    }
    if (second >= 24 * 3600) {//计算天
        time[1] = parseInt(second / (24 * 3600));
        second %= 24 * 3600;
    }
    if (second >= 3600) {//计算时
        time[2] = parseInt(second / 3600);
        second %= 3600;
    }
    if (second >= 60) {//计算分
        time[3] = parseInt(second / 60);
        second %= 60;
    }
    if (second > 0) {//计算秒
        time[4] = second;
    }
    setUsageTime(time);
    return time;
  }

  // 将当前时间和开始时间转为时间戳用于计算
  const setTime=()=> {
  var create_time = Math.round(new Date(startTimes).getTime() / 1000);//设置起始时间为点击开始的时间。
  var timestamp =  Math.round(new Date().getTime() / 1000);
  secondToDate((timestamp - create_time));    
  }
  
  // 已用时间的渲染
  const timeRender = () => {
    if (JSON.stringify(usageTime) !== '[]') {
      if (usageTime[1] === 0 && usageTime[2] === 0 && usageTime[3] === 0) {
        return `${usageTime[4]} Sec`
      }
      if (usageTime[1] === 0 && usageTime[2] === 0) {
        return `${usageTime[3]} :  ${usageTime[4]} `
      }
      if (usageTime[1] === 0) {
        return `${usageTime[2]} : ${usageTime[3]} :  ${usageTime[4]} `
      }     
      
      return `${usageTime[1]}:${usageTime[2]} : ${usageTime[3]} :  ${usageTime[4]} `
    }
  }
  // const timeRender = () => {
  //   if (JSON.stringify(usageTime) !== '[]') {
  //     if (usageTime[1] === 0 && usageTime[2] === 0 && usageTime[3] === 0) {
  //       return `${usageTime[4]} 秒`
  //     }
  //     if (usageTime[1] === 0 && usageTime[2] === 0) {
  //       return `${usageTime[3]} 分  ${usageTime[4]} 秒`
  //     }
  //     if (usageTime[1] === 0) {
  //       return `${usageTime[2]} 时 ${usageTime[3]} 分  ${usageTime[4]} 秒`
  //     }     
      
  //     return `${usageTime[1]}天${usageTime[2]} 时 ${usageTime[3]} 分  ${usageTime[4]} 秒`
  //   }
  // }
  
  useEffect(() => {
    if (startTime) {
      let num = 0;
      let setTimeData = setInterval(()=>{
        setTime();
        num = num + 1;
        if (num > 101) {
          clearInterval(setTimeData);
        }
      }, 1000);
      
    }
  }, [startTime])
  

  // const d = new Date();
  // const startTimeis = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()-1} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [startTimeis])

  return (
    <div className={styles.trainingDiv}>
      {/* <div className={styles.data}>
        <h6>训练时间</h6>
        <div>
          <span>开始时间</span> 2021年7月13日7时12分50秒
        </div>
        <div>
          <span>已用时间</span> 7时12分
        </div>
      </div> */}
      <div className={styles.tit1}>Training time</div>
      <div className={styles.content}>
        <span>Start time:</span>
        {startTime}
      </div>
      <div className={styles.content}>
        <span>Verstreken:</span>
        {timeRender()}

      </div>
      <div className={styles.item1}>
        <div className={styles.tit2}>Training Cycle</div>
        <div>
          <span>Epoch：</span>{currentEpoch}
          {/* {data?.epoch} */}
        </div>
        <div>
          <span>Iterations per epoch:</span> {data?.iterations}
        </div>
        <div>
          <span>Time per epoch:</span> {data?.maxIterations?'60sec':''}
        </div>
      </div>
      {/* <div className={styles.item1}>
        <div className={styles.tit2}>Validatiion</div>
        <div>
          <span>Frequency:</span> {data?.iterations} <span>Iterations</span>
        </div>
        <div>
          <span>Patience:</span> Inf
        </div>
      </div> */}
      <div className={styles.tit3}>Hardware Resources</div>
      {/* <div className={styles.content2}>
        <span>CPU:</span> {data?.frequency}个
      </div> */}
      <div className={styles.content2}>
        <span>GPU:</span> {data?.patience}1
      </div>
    </div>
  );
};

export default TrainingInfo;
