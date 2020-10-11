
import React from 'react';
import {Table, Tag, Space , Form, Input, Button,DatePicker } from 'antd';
import Api from '@/common/axios/api';
import common from '@/common/common';
import AddModify from './AddModify'
const { RangePicker } = DatePicker;

const onFinish = values => {
  console.log('Finish:', values);
};

class List extends React.Component{
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
      width:50
    },
    {
      title: '导航名称',
      dataIndex: 'nav_title',
      key: 'nav_title',
      ellipsis: true,
    },
    {
      title: '资讯模块',
      dataIndex: 'block_title',
      key: 'block_title',
      ellipsis: true,
    },
    {
      title: '项目名',
      dataIndex: 'title',
      key: 'title',
      width:100,
      ellipsis: true,
    },
    {
      title: '项目描述',
      dataIndex: 'desc',
      key: 'desc',
      ellipsis: true,
    },
    {
      title: '项目icon地址',
      dataIndex: 'img_url',
      key: 'img_url',
      ellipsis: true,
    },
    {
      title: '项目链接',
      dataIndex: 'link_url',
      key: 'link_url',
      ellipsis: true,
    },
    {
      title: '创建时间',
      key: 'created_at',
      dataIndex: 'created_at',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <AddModify type="1" record={record}  getListApi={this.getListApi.bind(this)}></AddModify>
          <a onClick={this.removeListApi.bind(this,record.id,record.list_id)}>删除</a>
        </Space>
      ),
      width: 150,
    },
  ]

  componentDidMount(){
    this.getListApi();
  }

  getListApi(){
    const options={
      page:this.state.current_page,
      page_size:this.state.pageSize
    }
    Api.listApi(common.getPostParams(options)).then((res) => {
      if (res.data.code === 0) {
        const data= res.data.data;
        this.setState({
          dataList:data.list,
          total: data.total
        })
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  removeListApi(id,list_id){
    const options = {
      id:id,
      list_id:list_id
    };
    Api.removeList(common.getPostParams(options)).then((res) => {
      if (res.data.code === 0) {
        this.getListApi();
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.setState({
        current_page: pagination.current
    },()=>{
      this.getListApi();
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
              <AddModify type="0" getListApi={this.getListApi.bind(this)}></AddModify>
            </Form.Item>
          </Form>
          
        </div>
        <Table columns={this.columns} dataSource={this.state.dataList} pagination={{ pageSize: this.state.pageSize,current:this.state.current_page,total:this.state.total }} onChange={this.handleTableChange}/>
      </div>
    )
  }
}

export default List;
