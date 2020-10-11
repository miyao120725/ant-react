
import React from 'react';
import {Table, Tag, Space , Form, Input, Button,DatePicker } from 'antd';
import Api from '@/common/axios/api';
import common from '@/common/common';
import AddModify from './AddModify'
const { RangePicker } = DatePicker;

const onFinish = values => {
  console.log('Finish:', values);
};

class Block extends React.Component{
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
      title: '资讯模块',
      dataIndex: 'block_title',
      key: 'block_title',
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
          <AddModify type="1" record={record}  blockListApi={this.blockListApi.bind(this)}></AddModify>
          <a onClick={this.removeBlockApi.bind(this,record.id)}>删除</a>
        </Space>
      ),
    },
  ]

  componentDidMount(){
    this.blockListApi();
  }

  blockListApi(){
    const options={
      page:this.state.current_page,
      page_size:this.state.pageSize
    }
    Api.blockList(common.getPostParams(options)).then((res) => {
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

  removeBlockApi(id){
    const options = {
      id:id
    };
    Api.removeBlockList(common.getPostParams(options)).then((res) => {
      if (res.data.code === 0) {
        this.blockListApi();
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.setState({
        current_page: pagination.current
    },()=>{
      this.blockListApi();
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
              <AddModify type="0" blockListApi={this.blockListApi.bind(this)}></AddModify>
            </Form.Item>
          </Form>
          
        </div>
        <Table columns={this.columns} dataSource={this.state.dataList} pagination={{ pageSize: this.state.pageSize,current:this.state.current_page,total:this.state.total }} onChange={this.handleTableChange}/>
      </div>
    )
  }
}

export default Block;
