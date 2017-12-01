import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Avatar  } from 'antd';
import { Link } from 'dva/router';
import styles from './studentLayout.less';


const { Header, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;

class MainLayout extends React.Component {

  	handleClick = (e) => {
    	console.log('click ', e);
    	this.setState({
      		current: e.key,
    	});
  	}

  	render() {
    	return (
	      	<Layout className={styles.layout}>
    			<Header className={styles.header}>
      				<div className={styles.logo}/>
				    <Menu
				        theme = "dark"
				        mode = "horizontal"
				        defaultSelectedKeys = {['1']}
				        style = {{ lineHeight: '64px' }}
				        className = {styles.nav}
				    >
        				<Menu.Item key="1">首页</Menu.Item>
        				<Menu.Item key="2">学习中心</Menu.Item>
                		<SubMenu title={<span>实训中心</span>}>
                    		<Menu.Item>互评</Menu.Item>
                  			<Menu.Item>实训内容</Menu.Item>
                		</SubMenu>                  
        				<Menu.Item key="4">讨论区</Menu.Item>
        				<Menu.Item key="5">我的团队</Menu.Item>
						<SubMenu title={<span>实训成果</span>}>
                    		<Menu.Item>实训总结</Menu.Item>
                  			<Menu.Item>实训成绩</Menu.Item>
                		</SubMenu>         				
        				<SubMenu title={<span>工具</span>}>
                    		<Menu.Item>抢答器</Menu.Item>
                		</SubMenu>  
						<SubMenu title={<span><Avatar className={styles.user} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></span>}>
				            <Menu.Item><Icon type="user" />个人中心</Menu.Item>
        					<Menu.Item><Link to="/tchIndexPage"><Icon type="setting" />切换到教师</Link></Menu.Item>
        					<Menu.Divider />
        					<Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
				        </SubMenu>        				
      				</Menu>
					  				
    			</Header>
    			<Content style={{ padding: '0 50px', background: "#fff" }}>
      				<div style={{ background: '#ececec', minHeight: 600, marginTop: 30 }} className={styles.container}>
      					{this.props.children}
      				</div>
    			</Content>
    			<Footer style={{ textAlign: 'center' }}>
      				新道科技股份有限公司
    			</Footer>
  			</Layout>
    	);
  	}
}

export default MainLayout;