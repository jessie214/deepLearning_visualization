import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Select, Checkbox, InputNumber } from 'antd';
import styles from './index.less';

const AddDataset = (props) => {
  const [form] = Form.useForm();
  const { onCancel, visible, onOk } = props;
  const [showProportion, setShowProportion] = useState(false);
  const [trainingPoportion, setTrainingProportion] = useState(70);
  const [dataInfo, setDataInfo] = useState([]);
  const [dataset, setDataset] = useState({});
  const [isShow, setIsShow] = useState(false);
  const [validationisShow, setValidationIsShow] = useState(false);

  // 定义select选项的数据
  const formData = {
    datasets: ['lung nodules1', 'lung nodules2', 'lung nodules3', 'lung nodules4'],
    trainingDataInfo: {
      taskType: 'lung nodules',
      dataVolume: '100',
      impactType: 'CT',
      position: 'lung',
    },
    validationgDataInfo: {
      taskType: 'nodules',
      dataVolume: '200',
      impactType: 'CT',
      position: 'lung',
    },
  };
  // 设置默认值并解决关闭modal数据不销毁的问题
  useEffect(() => {
    if (visible) {
      // 设置比例
      setShowProportion(false);
      form.setFieldsValue({
        setValidation: 30,
        setTraining: 70,
      });
    }
  }, [visible]);

  // 提交添加
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const formValues = {...values,trainingDataInfo:formData.trainingDataInfo,validationgDataInfo:formData.validationgDataInfo}
        if (onOk) {          
          onOk(formValues);
          form.resetFields(); // 失效
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

  // 处理关闭
  const handleCancel = () => {
    if (onCancel) {
      form.resetFields();
      onCancel();
    }
  };

  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 14,
    },
  };

  // 复选框改变时触发-设置是否显示数据集的比例
  const checkboxOnChange = (e) => {
    if (e?.target?.checked) {
      setShowProportion(true);
    } else {
      setShowProportion(false);
    }
  };

  // 改变训练集比例时触发-处理比例设置
  const trainingProportion = (value) => {
    if (value) {
      setTrainingProportion(value);
    }
  };

  // 改验证集比例时触发-处理比例设置
  const validationProportion = (value) => {
    if (value) {
      setTrainingProportion(100 - value);
    }
  };

  // 通过表单的set方法动态设置数据
  const onFormLayoutChange = () => {
    form.setFieldsValue({
      setValidation: 100 - trainingPoportion,
      setTraining: trainingPoportion,
    });
  };

  const handleOnChangeTrain = () => {
    setIsShow(true);
  }

  const handleValidationChange = () => {
    setValidationIsShow(true);
  }

  return (
    <Modal
      width="600px"
      height="600px"
      title="Selecting data"
      visible={visible}
      // onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
      footer={null}
    >
      <div className={styles.AddData}>
        <Form
          form={form}
          layout="horizontal"
          name="userAddForm"
          {...formItemLayout}
          onValuesChange={onFormLayoutChange()}
        >
          <Form.Item label="Training set" name="trainingDataset">
            <Select size="small" bordered={false} onChange={()=>handleOnChangeTrain()}>
              {formData?.datasets?.map((item, index) => {
                return (
                  <Select.Option value={item} key={`trainingDataset${index}`}>
                    {item}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          {/* 选择后显示设置比例 */}
          <Form.Item label=" " name="setBox" className={styles.noSymble}>
            <Checkbox onChange={checkboxOnChange}>The validation set is the same data</Checkbox>
            {isShow ?
           ( <div className={styles.attributes}>
            <p>Task type:{formData?.trainingDataInfo?.taskType}</p>
            <p>Data size:{formData?.trainingDataInfo?.dataVolume}</p>
            <p>Type:{formData?.trainingDataInfo?.impactType}</p>
            <p>Part:{formData?.trainingDataInfo?.position}</p>
          </div>)
          :null}
            
          </Form.Item>
          {/* 判断复选框是否被选择，选择后显示 */}
          {!showProportion ? (
            <>
             <Form.Item label="Validation set" name="validationDtaset">
             <Select size="small" bordered={false} onChange={()=>handleValidationChange()}>
               {formData?.datasets?.map((item, index) => {
                 return (
                   <Select.Option value={item} key={`validationDtaset${index}`}>
                     {item}
                   </Select.Option>
                 );
               })}
              </Select>              
              </Form.Item>
              {validationisShow ? (
                  <Form.Item label=" " name="info"  className={styles.noSymble}>
                  <div className={styles.attributes}>
                    <p>Task type:{formData?.validationgDataInfo?.taskType}</p>
                    <p>Data size:{formData?.validationgDataInfo?.dataVolume}</p>
                    <p>Type:{formData?.validationgDataInfo?.impactType}</p>
                    <p>Part:{formData?.validationgDataInfo?.position}</p>
                 </div>
                  </Form.Item>
              ):null}
         
              </>
          ):null}

          {/* 判断复选框是否被选择，未选时显示 */}
          {showProportion ? (
            <>
              <Form.Item label="Training set Proportion" name="setTraining">
                <InputNumber
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace('%', '')}
                  onChange={(value) => trainingProportion(value)}
                  // value={trainingPoportion}
                />
              </Form.Item>
              <Form.Item label="Validation set proportion" name="setValidation">
                <InputNumber
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace('%', '')}
                  onChange={(value) => validationProportion(value)}
                />
              </Form.Item>
            </>
          ) : null}
          <Form.Item label=" " className={styles.buttonItem}>
            <div className={styles.buttonBox}>
              <Button key="submit" type="primary" size="small" onClick={handleOk}>
                OK
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

const mapStateToProps = ({ loading }) => ({
  addLoading: loading.effects['account/addAccount'],
});
const mapDispatchToProps = (dispatch) => ({
  // 获取数据集列表
  addAccount(params) {
    return dispatch({ type: 'account/addAccount', payload: { ...params } });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AddDataset);
