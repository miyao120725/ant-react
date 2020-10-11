
import React from 'react';
import {Table, Tag, Space , Form, Input, Button,DatePicker } from 'antd';
import Api from '@/common/axios/api';
import common from '@/common/common';
import AddModify from './AddModify'
const { RangePicker } = DatePicker;

const onFinish = values => {
  console.log('Finish:', values);
};

class Nav extends React.Component{
  constructor(props){
    super(props)
    this.state={
      current_page:1,
      pageSize:10,
      total: 0,
      dataList:[]
    }
  }

  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: text => <a>{text}</a>,
    },
    {
      title: '导航icon',
      dataIndex: 'icon_img',
      key: 'icon_img',
      render: text => <img  style={{ height: '30px' }} src={text} />,
    },
    {
      title: '导航名称',
      dataIndex: 'nav_title',
      key: 'nav_title',
    },
    {
      title: '创建时间',
      key: 'created_at',
      dataIndex: 'created_at'
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <AddModify type="1" record={record}  navListApi={this.navListApi.bind(this)}></AddModify>
          <a onClick={this.removeNavApi.bind(this,record.id)}>删除</a>
        </Space>
      ),
    },
  ]

  componentDidMount(){
    this.navListApi();
  }

  navListApi(){
    const options={
      page:this.state.current_page,
      page_size:this.state.pageSize
    }
    Api.navList(common.getPostParams(options)).then((res) => {
      if (res.data.code === 0) {
        const data= res.data.data;
        this.setState({
          dataList:data.data,
          total: data.total
        })
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  removeNavApi(id){
    const options = {
      id:id
    };
    Api.removeNavList(common.getPostParams(options)).then((res) => {
      if (res.data.code === 0) {
        this.navListApi();
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.setState({
        current_page: pagination.current
    },()=>{
      this.navListApi();
    })
  }

  render() {
    return(
      <div>
        <div  className="header-form-block">
          <Form layout="inline" onFinish={onFinish}>
            <Form.Item name="range-time-picker" label="时间">
              <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <Form.Item label="Field A">
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  搜索
                </Button>
              )}
            </Form.Item>
            <Form.Item>
              <AddModify type="0" navListApi={this.navListApi.bind(this)}></AddModify>
            </Form.Item>
          </Form>
          
        </div>
        <Table columns={this.columns} dataSource={this.state.dataList} pagination={{ pageSize: this.state.pageSize,current:this.state.current_page,total:this.state.total }} onChange={this.handleTableChange}/>
      </div>
    )
  }
}

export default Nav;
