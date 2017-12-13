import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Form, Input, Button, Select, Row, Col, Popover, Progress } from 'antd';
import styles from './Register.less';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;


function Register({dispatch, Register, location, form:{setFieldsValue, getFieldDecorator, validateFields, getFieldValue}}){

	const  {  count, confirmDirty, visible, help, register } = Register;

	const passwordStatusMap = {
	  	ok: <div className={styles.success}>强度：强</div>,
	  	pass: <div className={styles.warning}>强度：中</div>,
	  	pool: <div className={styles.error}>强度：太短</div>,
	}

	const passwordProgressMap = {
	  	ok: 'success',
	  	pass: 'normal',
	  	pool: 'exception',
	}	

	const onGetCaptcha = () => {
	    let count = 59;
		dispatch({
            type: 'Register/updateState',
            payload: {
               count: count,
            }
        })   
	    let interval = setInterval(() => {
  			count -= 1;
 		 	dispatch({
	            type: 'Register/updateState',
	            payload: {
	               count: count,
	            }
	        })   
  			if (count === 0) {
    			clearInterval(interval);
  			}
		}, 1000);
	}

	const  getPasswordStatus = () => {

	    const value = getFieldValue('password');

	    if (value && value.length > 9) {
	      	return 'ok';
	    }
	    if (value && value.length > 5) {
	      	return 'pass';
	    }
	    return 'pool';
	}

  	const handleSubmit = (e) => {
    	e.preventDefault();
    	validateFields({ force: true },
    		(err, values) => {
	            if(!err){
	            	console.log(values);
	            	// dispatch(routerRedux.push('/user/register-result'));
	            }
       		}	
        );
  	}  

	const  handleConfirmBlur = (e) => {
	    const { value } = e.target;
		dispatch({
            type: 'Register/updateState',
            payload: {
               confirmDirty: confirmDirty || !!value
            }
        }) 	    
	}

  	const checkConfirm = (rule, value, callback) => {
    	if (value && value !== getFieldValue('password')) {
      		callback('两次输入的密码不匹配!');
    	} 
    	else {
      		callback();
    	}
  	}

	const  checkPassword = (rule, value, callback) => {
	    if (!value) {
			dispatch({
	            type: 'Register/updateState',
	            payload: {
	               	help: '请输入密码！',
	        		visible: !!value,
	            }
	        });  	    	
	      	callback('error');
	    } 
	    else {
			dispatch({
	            type: 'Register/updateState',
	            payload: {
	               	help: '',
	            }
	        });  	    	
	      	if (!visible) {
				dispatch({
		            type: 'Register/updateState',
		            payload: {
		               visible: !!value,
		            }
		        }); 	      		
	      	}
	      	if (value.length < 6) {
	        	callback('error');
	      	} 
	      	else {
	        	if (value && confirmDirty) {
	          		validateFields(['confirm'], { force: true });
	        	}
	        	callback();
	      	}
	    }
	}

	const renderPasswordProgress = () => {

		const value = getFieldValue('password');
		const passwordStatus = getPasswordStatus();
	   
	    return value && value.length ?
	      	<div className={styles[`progress-${passwordStatus}`]}>
	        	<Progress
	          		status = { passwordProgressMap[passwordStatus] }
	          		className = { styles.progress }
	          		strokeWidth = {6}
	          		percent = {value.length * 10 > 100 ? 100 : value.length * 10}
	          		showInfo = {false}
	        	/>
	      	</div> : null;
	  }	

    return (
       	<div className={styles.main}>
        	<h3>注册</h3>
        	<Form onSubmit = { handleSubmit }>
	          	<FormItem>
	            	{getFieldDecorator('mail', {
	              		rules: [{
	                		required: true, message: '请输入邮箱地址！',
	              		}, {
	                		type: 'email', message: '邮箱地址格式错误！',
	              		}],
	            	})(
	              		<Input size="large" placeholder="邮箱" />
	            	)}
	          	</FormItem>
	          	<FormItem help = { help }>
	            	<Popover
	              		content={
	                		<div style={{ padding: '4px 0' }}>
	                  			{ passwordStatusMap[getPasswordStatus()] }
	                  			{ renderPasswordProgress() }
	                  			<div style={{ marginTop: 10 }}>请至少输入 6 个字符。请不要使用容易被猜到的密码。</div>
	                		</div>
	              		}
	              		overlayStyle={{ width: 240 }}
	              		placement = "right"
	              		visible={ visible }
	            	>
		              	{getFieldDecorator('password', {
		                	rules: [{
		                  		validator: checkPassword,
		                	}],
		              	})(
		                	<Input
		                  		size = "large"
		                  		type = "password"
		                  		placeholder = "至少6位密码，区分大小写"
		                	/>
		              	)}
	            	</Popover>
	          	</FormItem>
	          	<FormItem>
	            	{getFieldDecorator('confirm', {
	              		rules: [{
	                		required: true, message: '请确认密码！',
	              		}, {
	                		validator: checkConfirm,
	             		}],
	            	})(
	              		<Input
	                		size="large"
	                		type="password"
	                		placeholder="确认密码"
	              		/>
	            	)}
	          	</FormItem>
	          	<FormItem>
	            	<InputGroup size="large" className={styles.mobileGroup} compact>
	              		<FormItem style={{ width: '20%' }}>
	                		{getFieldDecorator('prefix', {
	                  			initialValue: '86',
	                		})(
		                  		<Select size="large">
		                    		<Option value="86">+86</Option>
		                    		<Option value="87">+87</Option>
		                  		</Select>
	                		)}
	              		</FormItem>
	              		<FormItem style={{ width: '80%' }}>
	                		{getFieldDecorator('mobile', {
	                  			rules: [{
	                    			required: true, message: '请输入手机号！',
	                  			}, {
	                    		pattern: /^1\d{10}$/, message: '手机号格式错误！',
	                  			}],
	                		})(
	                  			<Input placeholder="11位手机号" />
	                		)}
	              		</FormItem>
	            	</InputGroup>
	          	</FormItem>
	          	<FormItem>
	            	<Row gutter={8}>
		              	<Col span={16}>
		                	{getFieldDecorator('captcha', {
		                  		rules: [{
		                    		required: true, message: '请输入验证码！',
		                  		}],
		                		})(
		                  			<Input
		                    			size="large"
		                    			placeholder="验证码"
		                  			/>
		                		)}
		              	</Col>
		              	<Col span={8}>
			                <Button
			                  	size="large"
			                  	disabled = { count }
			                  	className = { styles.getCaptcha }
			                  	onClick = { onGetCaptcha }
			                >
			                	{count ? `${count} s` : '获取验证码'}
			                </Button>
		              	</Col>
	            	</Row>
	          	</FormItem>
	          	<FormItem>
		            <Button size="large" loading={register.submitting} className={styles.submit} type="primary" htmlType="submit">
		              	注册
		            </Button>
		            <Link className={styles.login} to="/">使用已有账户登录</Link>
	          	</FormItem>
	        </Form>
    </div>
    );
}

function mapStateToProps({ Register }){
  	return {
        Register
  	};
}

const register= Form.create()(Register);

export default connect(mapStateToProps)(register);