/*
特征预览
*/
import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'umi';
import styles from './index.less';



const Characteristics = (props) => {
  const { xRayData } = props;
  const [imgData, setImgData] = useState([]);

  const getRandomArrayElements=(arr, count) =>{
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    setImgData(shuffled.slice(min));
    return shuffled.slice(min);
  }

  useEffect(() => {
    if (xRayData) {
      let num = 0;
    let setDtat = setInterval(()=>{
      getRandomArrayElements(xRayData, 16);
      num = num + 1;
      if (num > 99) {
        clearInterval(setDtat);
      }
      }, 1000) 
    }
  }, [xRayData]);

  return (
    <div style={{ width: '23vw', height: '100%' }} className={styles.imgDiv}>
      {imgData?.map((icon, index) => {
        // console.log(icon, 'icon');
        return <img src={`data:image/png;base64,${icon}`} key={`icon${index}`} />;
      })}
      {/* <img src="data:image/png;base64,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" /> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(Characteristics);
