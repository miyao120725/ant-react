
import React from 'react';
import { Modal, Button,Form, Input,Select} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Api from '@/common/axios/api';
import common from '@/common/common';

const { Option } = Select;

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
      title:'',
      desc:'',
      img_url:'',
      link_url:'',
      navData:[],
      blockData:[],
    }
  }

  showModal = () => {
    this.navListApi();
    this.blockListApi();
    const data=this.props.record;
    if(data){
      this.setState({
        visible: true,
        title:data.title,
        desc:data.desc,
        img_url:data.img_url,
        link_url:data.link_url,
      })
    }else{
      this.setState({
        visible: true
      })
    }
  }

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    console.log('click:', this.formRef.current.getFieldsValue());
    const fieldsValue=this.formRef.current.getFieldsValue();
    if(this.props.type==='0'){
      this.addListApi(fieldsValue);
    } else {
      this.updateListApi(fieldsValue);
    }
  }

  addListApi(fieldsValue){
    const options = {
      title:fieldsValue.title,
      desc:fieldsValue.desc,
      img_url:fieldsValue.img_url,
      link_url:fieldsValue.link_url,
      nav_id:fieldsValue.nav_id,
      block_id:fieldsValue.block_id,
    };
    Api.addList(common.getPostParams(options)).then((res) => {
      if (res.data.code === 0) {
        this.props.getListApi();
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  updateListApi(fieldsValue){
    const options = {
      id:this.props.record.id,
      list_id:this.props.record.list_id,
      nav_id:fieldsValue.nav_id,
      block_id:fieldsValue.block_id,
      title:fieldsValue.title,
      desc:fieldsValue.desc,
      img_url:fieldsValue.img_url,
      link_url:fieldsValue.link_url,
    };
    Api.updateList(common.getPostParams(options)).then((res) => {
      if (res.data.code === 0) {
        this.props.getListApi();
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  blockListApi(){
    Api.blockList(common.getPostParams({})).then((res) => {
      if (res.data.code === 0) {
        const data= res.data.data;
        this.setState({
          blockData:data
        })
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  navListApi(){
    Api.navList(common.getPostParams({})).then((res) => {
      if (res.data.code === 0) {
        const data= res.data.data;
        this.setState({
          navData:data
        })
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

  onChange(value) {
    console.log(`selected ${value}`);
  }

  onBlur() {
    console.log('blur');
  }

  onFocus() {
    console.log('focus');
  }

  onSearch(val) {
    console.log('search:', val);
  }

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
          title={this.props.type==='0'?"添加导航名称":'编辑导航名称'}
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          <Form {...layout}  
            ref={this.formRef} 
            name="control-ref" 
            initialValues={{
              title:this.state.title,
              desc:this.state.desc,
              img_url:this.state.img_url,
              link_url:this.state.link_url
            }}
            >
            {/* <Form.Item
              label="导航名称"
            >
              {
                getFieldDecorator('title',{
                  initialValue:'admin',
                  rules:[{ required: true, message: 'Please input your username!' }]
                })(<Input placeholder="Please input your username" />)
              }
            </Form.Item> */}
             <Form.Item
              label="导航名称"
              name="nav_id"
            >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onSearch={this.onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {
                  this.state.navData.map((item,index)=>{
                    return <Option value={item.id} key={index}>{item.nav_title}</Option>
                  })
                }
              </Select>
            </Form.Item>
            <Form.Item
              label="资讯模块名称"
              name="block_id"
            >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onSearch={this.onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {
                  this.state.blockData.map((item,index)=>{
                    return <Option value={item.id} key={index}>{item.block_title}</Option>
                  })
                }
              </Select>
            </Form.Item>
            <Form.Item
              label="项目名称"
              name="title"
            >
              <Input placeholder="Please input your username" />
            </Form.Item>
            <Form.Item
              label="项目描述"
              name="desc"
            >
              <Input.TextArea  placeholder="Please input your username"/>
            </Form.Item>
            <Form.Item
              label="icon地址"
              name="img_url"
            >
              <Input placeholder="Please input your username" />
            </Form.Item>
            <Form.Item
              label="项目链接"
              name="link_url"
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
