/*
参数配置
*/
import React, { useState, useEffect, useRef } from 'react';
import styles from './index.less';
import { connect } from 'umi';
import { Form, Input, Button, Select } from 'antd';
const SetParams = (props) => {
  const { startAction, isDisabled } = props;
  const [form] = Form.useForm();
  const [epochNum, setEpochNum] = useState();
  // 处理开始操作
  const handleStart = () => {
    form
      .validateFields()
      .then((values) => {
        // TODO:需要判断保存成功后执行
        if (startAction) {
          startAction(values.epoch);
        }
        // addAccount(values).then((res) => {
        //   //  提交成功后，清除表单数据
        //   if (res?.code === 1) {
        //     form.resetFields();
        //     message.success('保存成功');
        //     form.resetFields();
        //     if (onOk) onOk();
        //   } else {
        //     message.error('保存失败：' + res?.msg);
        //   }
        // });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  // 定义select选项的数据
  const formData = {
    lossFunction: ['Dice+MSE', 'MAE', 'IOU', 'GIOU', 'CIOU', 'DIOU'],
    dataArgument: ['Auto', 'no', 'elastic deformation', 'Scale to Size', 'rotation'],
    earlyStopping: ['Auto'],
    optimizer: ['SGD', 'Adam', 'Adagrad', 'RMSProp', 'BGD'],
    monitor: ['val_loss', 'loss', 'acc', 'val_acc'],
  };

  useEffect(() => {
    onFill();
  }, []);

  const onFill = () => {
    form.setFieldsValue({
      lossFunction: 'Dice+MSE',
      dataArgument: 'Auto',
      earlyStopping: 'Auto',
      optimizer: 'SGD',
      monitor: 'val_loss',
      patiencer: '0.2',
      learningRate: '0.0003',
      factor: '0.1',
      minLr: '0.5',
      epoch: '100',
    });
  };

  return (
    <div>
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        name="dataForm"
        form={form}
        layout="horizontal"
        // initialValues={{ size: componentSize }}
        // onValuesChange={onFormLayoutChange}
        // size={componentSize as SizeType}
        className={styles.setParamsDiv}
      >
        <Form.Item label="Loss_function" name="lossFunction">
          <Select size="small" bordered={false}>
            {formData?.lossFunction?.map((item, index) => {
              return (
                <Select.Option value={item} key={`lossFunction${index}`}>
                  {item}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Data_argument" name="dataArgument">
          <Select size="small" bordered={false}>
            {formData?.dataArgument?.map((item, index) => {
              return (
                <Select.Option value={item} key={`dataArgument${index}`}>
                  {item}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Earlystopping" name="earlyStopping">
          <Select size="small" bordered={false}>
            {formData?.earlyStopping?.map((item, index) => {
              return (
                <Select.Option value={item} key={`earlyStopping${index}`}>
                  {item}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Optimizer" name="optimizer">
          <Select size="small" bordered={false}>
            {formData?.optimizer?.map((item, index) => {
              return (
                <Select.Option value={item} key={`optimizer${index}`}>
                  {item}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="monitor" name="monitor">
          <Select size="small" bordered={false}>
            {formData?.monitor?.map((item, index) => {
              return (
                <Select.Option value={item} key={`monitor${index}`}>
                  {item}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="patiencer" name="patiencer">
          <Input size="small" bordered={false} />
        </Form.Item>
        <Form.Item label="learning_rate" name="learningRate">
          <Input size="small" bordered={false} />
        </Form.Item>
        <Form.Item label="factor" name="factor">
          <Input size="small" bordered={false} />
        </Form.Item>
        <Form.Item label="min_lr" name="minLr">
          <Input size="small" bordered={false} />
        </Form.Item>
        <Form.Item label="epoch" name="epoch">
          <Input size="small" bordered={false} />
        </Form.Item>
        <div className={styles.buttonBox}>
          <a onClick={onFill}>default setting
</a>
          <Button size="small" type="primary" onClick={() => handleStart()} disabled={isDisabled}>
            Start
          </Button>
        </div>
      </Form>
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
export default connect(mapStateToProps, mapDispatchToProps)(SetParams);
