
import React from 'react';
import { Modal, Button,Form, Input} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Api from '@/common/axios/api';
import common from '@/common/common';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

class DrawerForm extends React.Component {
  formRef = React.createRef();
  constructor(props){
    super(props)
    this.state = {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      block_title:''
    }
  }
  

  showModal = () => {
    this.setState({
      visible: true,
      block_title:this.props.record?this.props.record.block_title:''
    },()=>{
        //   this.formRef.current.setFieldsValue({
            // block_title:this.props.record.block_title
        //   });
    });
  }

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    console.log('click:', this.formRef.current.getFieldsValue());
    const fieldsValue=this.formRef.current.getFieldsValue();
    if(this.props.type==='0'){
      this.addBlockApi(fieldsValue);
    } else {
      this.updateBlockApi(fieldsValue);
    }
  }

  addBlockApi(fieldsValue){
    const options = {
      block_title:fieldsValue.block_title
    };
    Api.addBlockList(common.getPostParams(options)).then((res) => {
      if (res.data.code === 0) {
        this.props.blockListApi();
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  updateBlockApi(fieldsValue){
    const options = {
      id:this.props.record.id,
      block_title:fieldsValue.block_title
    };
    Api.updateBlockList(common.getPostParams(options)).then((res) => {
      console.log(res)
      if (res.data.code === 0) {
        this.props.blockListApi();
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  onFinish = event => {
    const value=event;
    // this.setState({
    //   visible: true,
    //   block_title: value
    // });
    console.log('Finish:', value);
  };

  render() {
    return (
      <>
      {
        this.props.type==='0'?
         (<Button type="primary" onClick={this.showModal}>
          <PlusOutlined /> 添加
        </Button>):
        (<a onClick={this.showModal}>编辑</a>)
      }
    
        <Modal
          title={this.props.type==='0'?"添加资讯模块名称":'编辑资讯模块名称'}
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          <Form {...layout}  
            ref={this.formRef} 
            name="control-ref" 
            // onFinish={this.onFinish}
            initialValues={{
              block_title:this.state.block_title
            }}
            >
            {/* <Form.Item
              label="导航名称"
            >
              {
                getFieldDecorator('block_title',{
                  initialValue:'admin',
                  rules:[{ required: true, message: 'Please input your username!' }]
                })(<Input placeholder="Please input your username" />)
              }
            </Form.Item> */}
            <Form.Item
              label="资讯模块名称"
              name="block_title"
            >
              <Input placeholder="Please input your username" />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default DrawerForm;
