/*
公共title
*/
import React, { useState, useEffect, useRef } from 'react';
import styles from './index.less';
import { connect } from 'umi';
const Title = (props) => {
  const { titleContent } = props;
  return (
    <div className={styles.title}>
      <div className={styles.titleContent}>{titleContent}</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Title);
