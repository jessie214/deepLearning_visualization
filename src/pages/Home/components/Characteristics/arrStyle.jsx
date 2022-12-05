/*
特征预览
*/
import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'umi';
const Characteristics = (props) => {
  const canvasRef = useRef(null);
  const divRef = useRef(null);

  const [rayData, setRayData] = useState();
  const { xRayData } = props;
  const [cvWidth, setCvWidth] = useState();
  const [cvHeight, setCvHeight] = useState();

  useEffect(() => {
    if (xRayData) {
      setRayData(xRayData);
    }
  }, [xRayData]);

  useEffect(() => {
    if (rayData) {
      main();
    }
  }, [rayData]);

  const main = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log('加载canvas加载失败');
      return;
    }

    var ctx = canvas.getContext('2d');
    const len = rayData?.length;
    // 通过canvas外层div的宽高来定义单张图片的尺寸
    const dw = cvWidth / 300;
    const dh = cvHeight / 300;
    const mdw = Math.min(dw, dh);
    const toLoad = (num) => {
      const lenI = rayData[num]?.length;
      //二维循环，单张图片
      for (var i = 0; i < lenI; i++) {
        for (var j = 0; j < rayData[num][i]?.length; j++) {
          // ctx.scale(0.8, 0.8);
          ctx.fillStyle =
            'rgb(' +
            Math.floor(rayData[num][i][j]) +
            ',' +
            Math.floor(rayData[num][i][j]) +
            ',' +
            Math.floor(rayData[num][i][j]) +
            ')';
          // ctx.fillRect(j * 1 + (num % 4) * 74, (Math.floor(num / 4) * 74 + i) * 1, 1, 1); //x,y,width,height
          ctx.fillRect(
            j * mdw + (num % 4) * 75 * mdw,
            (Math.floor(num / 4) * 75 * mdw + i * mdw) * 1,
            mdw,
            mdw,
          );
        }
      }
    };

    for (var t = 0; t < len; t++) {
      if (t < 16) {
        toLoad(t);
      }
    }
  };

  let cWidth = null;
  let cHeight = null;
  useEffect(() => {
    // 定时canvas的宽和高
    cWidth = divRef.current?.offsetWidth;
    cHeight = divRef.current?.offsetHeight;
    setCvWidth(cWidth);
    setCvHeight(cHeight);
  }, []);

  return (
    <div ref={divRef} style={{ width: '23vw', height: '100%' }}>
      <canvas ref={canvasRef} height={cvHeight} width={cvWidth}></canvas>
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
