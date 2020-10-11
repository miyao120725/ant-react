import React from 'react';
import {withRouter} from "react-router-dom";
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import '@/App.css';
import Logo from '@/static/logo.png'
const { Header, Sider, Content,Footer } = Layout;

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      current: '',
      collapsed: false
    };
  }

  componentDidMount(){
    console.log(this.props)
    const key=this.props.location.pathname;
    this.setState({
      current: key,
    });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
    this.props.history.push(e.key);
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" >
            <img src={Logo} alt=''/>
          </div>
          <Menu theme="dark" mode="inline" 
          onClick={this.handleClick}
          defaultOpenKeys={['/']}
          selectedKeys={[this.state.current]}>
            <Menu.Item key="/" icon={<UserOutlined />}>
              导航列表
            </Menu.Item>
            <Menu.Item key="/block" icon={<VideoCameraOutlined />}>
              资讯模块
            </Menu.Item>
            <Menu.Item key="/list" icon={<UploadOutlined />}>
              资讯列表
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(App);
