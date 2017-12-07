import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert } from 'antd';
import styles from './Login.less';


const FormItem = Form.Item;
const { TabPane } = Tabs;

function Login({dispatch, Login, location, form: { setFieldsValue, getFieldDecorator, validateFields, getFieldValue }}){

	const  {  count, type, submitting, status } = Login;

  	const onSwitch = (key) => {
		dispatch({
            type: 'Login/updateState',
            payload: {
               type: key,
            }
        })    	
  	}

  	const onGetCaptcha = () => {
    	let count = 59;
		dispatch({
            type: 'Login/updateState',
            payload: {
               count: count,
            }
        })      	
		let interval = setInterval(() => {
  			count -= 1;
 		 	dispatch({
	            type: 'Login/updateState',
	            payload: {
	               count: count,
	            }
	        })   
  			if (count === 0) {
    			clearInterval(interval);
  			}
		}, 1000);
  	}

  	const handleSubmit = (e) => {
    	e.preventDefault();
    	validateFields({ force: true },(err, values) => {
            if(!err){
            	console.log(values);
            }
        });
  	}  

  	const renderMessage = (message) => {
	    return (
	      	<Alert
	        	style = {{ marginBottom: 24 }}
	        	message = {message}
	        	type = "error"
	        	showIcon
	      	/>
	    );
  	}  

    return (
            <div className={styles.main}>
        		<Form onSubmit={handleSubmit}>
          			<Tabs 
          				animated = { false } 
          				className = { styles.tabs } 
          				activeKey = { type } 
          				onChange = { onSwitch }
          			>
            			<TabPane tab="账户密码登录" key="account">
			              	{
			                	status && renderMessage('账户或密码错误')
			              	}
              				<FormItem>
                				{getFieldDecorator('userName', {
                  					rules: [{
                    					required: type === 'account', message: '请输入账户名！',
                  					}],
                				})(
                  					<Input
                    					size="large"
                    					prefix={<Icon type="user" className={styles.prefixIcon} />}
                    					placeholder=""
                  					/>
                				)}
              				</FormItem>
			              	<FormItem>
			                	{getFieldDecorator('password', {
			                  		rules: [{
			                    		required: type === 'account', message: '请输入密码！',
			                  		}],
			                	})(
			                  		<Input
			                    		size="large"
			                    		prefix={<Icon type="lock" className={styles.prefixIcon} />}
			                    		type="password"
			                    		placeholder=""
			                  		/>
			                	)}
			              </FormItem>
            		</TabPane>
            		<TabPane tab="手机号登录" key="mobile">
              			{
                			login.status === 'error' &&
                			login.type === 'mobile' &&
                			login.submitting === false &&
                			this.renderMessage('验证码错误')
              			}
              				<FormItem>
                				{getFieldDecorator('mobile', {
                  					rules: [{
                    					required: type === 'mobile', message: '请输入手机号！',
                  					}, {
                    					pattern: /^1\d{10}$/, message: '手机号格式错误！',
                  					}],
                				})(
	                  				<Input
	                    				size="large"
	                    				prefix={<Icon type="mobile" className={styles.prefixIcon} />}
	                    				placeholder="手机号"
	                  				/>
	                			)}
              			</FormItem>
              			<FormItem>
                			<Row gutter={8}>
	                  			<Col span={16}>
	                    			{getFieldDecorator('captcha', {
	                      				rules: [{
	                        				required: type === 'mobile', message: '请输入验证码！',
	                      				}],
	                    			})(
			                      		<Input
			                        		size="large"
			                        		prefix={<Icon type="mail" className={styles.prefixIcon} />}
			                        		placeholder="验证码"
			                      		/>
			                    	)}
	                  			</Col>
	                  			<Col span={8}>
				                    <Button
				                      	disabled = {count}
				                      	className = {styles.getCaptcha}
				                      	size = "large"
				                      	onClick = {onGetCaptcha}
				                    >
		                      			{count ? `${count} s` : '获取验证码'}
		                    		</Button>
	                  			</Col>
                			</Row>
              			</FormItem>
           			 </TabPane>
          		</Tabs>
          		<FormItem className={styles.additional}>
            		{getFieldDecorator('remember', {
              			valuePropName: 'checked',
              			initialValue: true,
            		})(
              			<Checkbox className={styles.autoLogin}>自动登录</Checkbox>
            		)}
            		<a className={styles.forgot} href="">忘记密码</a>
            		<Button size="large" loading = { submitting } className={styles.submit} type="primary" htmlType="submit">
              			登录
            		</Button>
          		</FormItem>
        	</Form>
        	<div className={styles.other}>
          		其他登录方式
          		{/* 需要加到 Icon 中 */}
          		<span className = {styles.iconAlipay} />
          		<span className = {styles.iconTaobao} />
          		<span className = {styles.iconWeibo} />
          		<Link className = {styles.register} to="/Register">注册账户</Link>
        	</div>
      	</div>
    );
}

function mapStateToProps({ Login }){
  	return {
        Login
  	};
}

const login= Form.create()(Login);

export default connect(mapStateToProps)(login);