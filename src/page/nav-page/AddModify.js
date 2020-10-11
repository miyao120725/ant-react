
import React from 'react';
import { Modal, Button,Form, Input,Upload, message,Tabs} from 'antd';
import {LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Api from '@/common/axios/api';
import common from '@/common/common';

const { TabPane } = Tabs;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class DrawerForm extends React.Component {
  formRef = React.createRef();
  constructor(props){
    super(props)
    this.state = {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      nav_title:'',
      loading:false,
      type:0,
      img_link:''
    }
  }
  

  showModal = () => {
    this.setState({
      visible: true,
      nav_title:this.props.record?this.props.record.nav_title:'',
      img_link:this.props.record?this.props.record.icon_img:''
    },()=>{
        //   this.formRef.current.setFieldsValue({
            // nav_title:this.props.record.nav_title
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
      this.addNavApi(fieldsValue);
    } else {
      this.updateNavApi(fieldsValue);
    }
  }

  addNavApi(fieldsValue){
    const options = {
      nav_title:fieldsValue.nav_title,
      img_link:this.state.type==0?this.state.img_link:fieldsValue.img_link,
      type:this.state.type
    };
    Api.addNavList(common.getPostParams(options)).then((res) => {
      if (res.data.code === 0) {
        this.props.navListApi();
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  updateNavApi(fieldsValue){
    const options = {
      id:this.props.record.id,
      nav_title:fieldsValue.nav_title,
      img_link:this.state.type==0?this.state.img_link:fieldsValue.img_link,
      type:this.state.type
    };
    Api.updateNavList(common.getPostParams(options)).then((res) => {
      console.log(res)
      if (res.data.code === 0) {
        this.props.navListApi();
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
    //   nav_title: value
    // });
    console.log('Finish:', value);
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done'||info.file.status === 'error') {
      // Get this url from response in real world.
      // console.log(1111,info.file.response.data.img_link)
      getBase64(info.file.originFileObj, imageUrl =>{
        this.setState({
          // imageUrl,
          img_link:info.file.response.data.img_link,
          loading: false,
        })
      }
      );
    }
  }

  callback=(key)=> {
    this.setState({
      type:key
    });
    console.log(key);
  }

  render() {

    const { loading, imageUrl,img_link } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

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
          title={this.props.type==='0'?"添加导航名称":'编辑导航名称'}
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
              nav_title:this.state.nav_title,
              img_link:this.state.img_link
            }}
            >
            {/* <Form.Item
              label="导航名称"
            >
              {
                getFieldDecorator('nav_title',{
                  initialValue:'admin',
                  rules:[{ required: true, message: 'Please input your username!' }]
                })(<Input placeholder="Please input your username" />)
              }
            </Form.Item> */}
            <Form.Item
              label="导航名称"
              name="nav_title"
            >
              <Input placeholder="Please input your username" />
            </Form.Item>
            <Tabs defaultActiveKey="0" centered onChange={this.callback}>
              <TabPane tab="本地icon链接" key="0">
              <Form.Item
                  label="导航icon上传"
                  name="icon_img"
                >
                  <Upload
                    // name="avatar"
                    name="icon_img"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    action="http://127.0.0.1:3334/img/upload"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                    // onPreview={this.handleChange}
                  >
                    {img_link ? <img src={img_link} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                  </Upload>
                </Form.Item>
              </TabPane>
              <TabPane tab="线上icon链接" key="1">
                <Form.Item
                    label="导航icon链接"
                    name="img_link"
                  >
                    <Input placeholder="Please input your username" />
                  </Form.Item>
              </TabPane>
            </Tabs>
          </Form>
        </Modal>
      </>
    );
  }
}

export default DrawerForm;
