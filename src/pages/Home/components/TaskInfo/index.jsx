/*
任务信息()
*/
import React, { useState, useEffect, useRef } from 'react';
import styles from './index.less';
import { connect } from 'umi';

const TaskInfo = (props) => {
  const { taskInfoData } = props;
  const [data, setData] = useState({});


  useEffect(() => {
    if (taskInfoData) {
      setData(taskInfoData);
    }
  }, [taskInfoData])
  

  return (
    <div className={styles.taskInfo}>
      <div>
        <div className={styles.tit}>Data name</div>
        <div className={styles.content}>{JSON.stringify(data)==='{}'?'': '病灶分类'}</div>
      </div>
      <div>
        <div className={styles.tit}>Task Type</div>
        <div className={styles.content}>{data?.trainingDataInfo?.taskType}</div>
      </div>
      <div>
        <div className={styles.tit}>Image type</div>
        <div className={styles.content}>{data?.trainingDataInfo?.impactType}</div>
      </div>
      <div>
        <div className={styles.tit}>Part</div>
        <div>{data?.trainingDataInfo?.position}</div>
      </div>
      <div className={styles.item1}>Training set</div>
      <div>
        <div className={styles.tit}>Data name</div>
        <div className={styles.content}>{data?.trainingDataset}</div>
      </div>
      <div>
        <div className={styles.tit}>Data size</div>
        <div className={styles.content}>{data?.trainingDataInfo?.dataVolume}</div>
      </div>
      <div>
        <div className={styles.tit}>Proportion</div>
        
        <div className={styles.content}>{ JSON.stringify(data)==='{}'?'': data?.setTraining ? `${data?.setTraining}%` : '100%'}     </div>
      </div>
      <div className={styles.item1}>Validation set</div>
      <div>
        <div className={styles.tit}>Data name</div>
        <div className={styles.content}>{data?.validationDtaset ? data?.validationDtaset:data?.trainingDataset}</div>
      </div>
      <div>
        <div className={styles.tit}>Data size</div>
        <div className={styles.content}>{data?.validationgDataInfo?.dataVolume}</div>
      </div>
      <div>
        <div className={styles.tit}>Proportion</div>
        <div className={styles.content}>
         { JSON.stringify(data)==='{}'?'':data?.setValidation ? `${data?.setValidation}%` : '100%'}          
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
export default connect(mapStateToProps, mapDispatchToProps)(TaskInfo);
