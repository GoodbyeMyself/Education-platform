import React from 'react';
import { Layout, Menu, Icon, Avatar } from 'antd';
import { Link } from 'dva/router';
import styles from './adminLayout.less';


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

  		const isArr = ['3.1','3.2','3.3','3.4','8.1','8.2','8.3','8.4'];

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
		            	<Menu.Item key="1"><Icon type="area-chart" /><span>大数据管理</span></Menu.Item>
		            	<Menu.Item key="2"><Icon type="message" /><span>教务公告</span></Menu.Item>
	          			<SubMenu key="3" 
	          				title={
	          						<span>
	          							<Icon type="switcher" />
	          							<span>学期设置</span>
	          						</span>
	          					} 
	          			>
          					<Menu.Item key="3.1">课程设置</Menu.Item>
          					<Menu.Item key="3.2">教室分配</Menu.Item>
          					<Menu.Item key="3.3">推送选课</Menu.Item>
          					<Menu.Item key="3.4">学生管理</Menu.Item>
        				</SubMenu>
		            	<Menu.Item key="4"><Icon type="user" /><span>教学管理</span></Menu.Item>	            	
						<Menu.Item key="5"><Icon type="ant-design" /><span>设备管理</span></Menu.Item>
		            	<Menu.Item key="6"><Icon type="question" /><span>实训中心</span></Menu.Item>	            	
						<Menu.Item key="7"><Icon type="team" /><span>考试管理</span></Menu.Item>
						<SubMenu key="8" 
							title={
									<span>
	          							<Icon type="trophy" />								
										<span>教学成果</span>
									</span>
								}
						>
          					<Menu.Item key="8.1">成绩管理</Menu.Item>
          					<Menu.Item key="8.2">学分绩</Menu.Item>
          					<Menu.Item key="8.3">结课论文</Menu.Item>
          					<Menu.Item key="8.4">实训总结</Menu.Item>
        				</SubMenu>
		            	<Menu.Item key="9"><Icon type="tool" /><span>工具</span></Menu.Item>	            	
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
		        		15500409521@163.com
		      		</Footer>
		    	</Layout>
	  		</Layout>
    	);
  	}
}

export default MainLayout;