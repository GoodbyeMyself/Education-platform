import React from 'react';
import { Layout, Menu, Icon, Avatar } from 'antd';
import { Link } from 'dva/router';
import styles from './teacherLayout.less';


const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MainLayout extends React.Component {

	rootSubmenuKeys = ['3', '8'];

    state = {
    	collapsed: false,
    	openKeys: [''],
  	};

  	toggle = () => {
    	this.setState({
      		collapsed: !this.state.collapsed,
    	});
  	};

  	handleClick = (e) => {
    	console.log('click ', e);
    	this.setState({
      		current: e.key,
    	});
  	}

  	onOpenChange = (openKeys) => {
    	const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);

    	if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      		this.setState({ openKeys });
    	}
    	else {
      		this.setState({
        		openKeys: latestOpenKey ? [latestOpenKey] : [],
      		});
    	}
  	}

  	onSelect = (openKeys) => {

  		const that = this;

  		const isArr = ['3.1','3.2','3.3','8.1','8.2','8.3','8.4'];

  		if(isArr.indexOf(openKeys.key) == -1){
			that.setState({
		    	openKeys: []
		    });  			
  		}
  	}

  	render() {
    	return (
	      	<Layout className={styles.layout}>
	    		<Sider
	          		trigger={null}
	          		collapsible
	          		collapsed={this.state.collapsed}
	        	>
	          	<div className={styles.logo} />
		          	<Menu 
		          		theme = "dark" 
		          		mode = "inline" 
		          		defaultSelectedKeys = {['1']}
		          		openKeys = {this.state.openKeys}
        				onOpenChange = {this.onOpenChange}
        				onSelect = {this.onSelect}
		          	>
		            	<Menu.Item key="1"><span>大数据管理</span></Menu.Item>
		            	<Menu.Item key="2"><span>通知</span></Menu.Item>
	          			<SubMenu key="3" title={<span>课前准备</span>}>
          					<Menu.Item key="3.1">学生管理</Menu.Item>
          					<Menu.Item key="3.2">进行备课</Menu.Item>
          					<Menu.Item key="3.3">排课管理</Menu.Item>
        				</SubMenu>
		            	<Menu.Item key="4"><span>教学管理</span></Menu.Item>	            	
						<Menu.Item key="5"><span>实训中心</span></Menu.Item>
		            	<Menu.Item key="6"><span>答疑区</span></Menu.Item>	            	
						<Menu.Item key="7"><span>团队管理</span></Menu.Item>
						<SubMenu key="8" title={<span>教学成果</span>}>
          					<Menu.Item key="8.1">成绩管理</Menu.Item>
          					<Menu.Item key="8.2">查看作业</Menu.Item>
          					<Menu.Item key="8.3">结课论文</Menu.Item>
          					<Menu.Item key="8.4">实训总结</Menu.Item>
        				</SubMenu>
		            	<Menu.Item key="9"><span>工具</span></Menu.Item>	            	
		          	</Menu>
	        	</Sider>
		    	<Layout>
		          	<Header className={styles.header}>
		            	<Icon
		              		className={styles.trigger}
		              		type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
		              		onClick={this.toggle}
		            	/>
		            	<Menu
					        onClick={this.handleClick}
					        mode="horizontal"
					        className={styles.nav}
					    >
			            	<SubMenu title={<Avatar className={styles.user} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}>
					            <Menu.Item><Icon type="user" />个人中心</Menu.Item>
	        					<Menu.Item><Link to="/stuIndexPage"><Icon type="setting" />切换到学生</Link></Menu.Item>
	        					<Menu.Divider />
	        					<Menu.Item key="logout">
	        						<Link to="/"><Icon type="logout" />退出登录</Link>
	        					</Menu.Item>
					        </SubMenu>
					    </Menu>    
		          	</Header>
		          	<Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
		            	{this.props.children}
		          	</Content>
		        
		      		<Footer style={{ textAlign: 'center' }}>
		        		在线课堂
		      		</Footer>
		    	</Layout>
	  		</Layout>
    	);
  	}
}

export default MainLayout;