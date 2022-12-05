/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 *
 * @see You can view component api by: https://github.com/ant-design/ant-design-pro-layout
 */
import { connect } from 'umi';
import styles from './BasicLayout.less';

const BasicLayout = (props) => {
  const { children } = props;
  return (
    <div className={styles.BasicLayout}>
      {/* <div className={styles.Background}> */}
      {/* <div className={styles.BgTop}>
          <div className={styles.BgTopTitle}></div>
        </div>
        <div className={styles.BgLeft}></div>
        <div className={styles.BgRight}></div>
        <div className={styles.BgBottom}>
          <div className={styles.BarLeft}></div>
          <div className={styles.BarRight}></div>
        </div> */}
      {/* </div> */}
      {children}
    </div>
  );
};

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
