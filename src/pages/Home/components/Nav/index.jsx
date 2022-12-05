/*
菜单
*/
import React, { useState, useEffect, useRef } from 'react';
import styles from './index.less';
import { connect } from 'umi';
import logo from '@/assets/icon/logo.png';
import { UserOutlined }  from '@ant-design/icons';
const Nav = (props) => {
  const { setVisible } = props;
  const handleModle = () => {
    setVisible(true);
  };

  return (
    <div className={styles.homeMenu}>
      <div className={styles.logo}>
      {/* <img src={logo}  alt='Neusoft' /> */}
        <span>Deep Learning Visualization</span>
        <div className={styles.menuDiv}>
          <a>Model</a>
          <a onClick={() => handleModle()}>Data</a>
          <a>Test</a>
          <a>Help</a>
        </div>
        <div className={styles.userInfo}><UserOutlined /> doctor</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
