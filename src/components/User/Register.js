import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Form, Input, Button, Select, Row, Col, Popover, Progress } from 'antd';
import styles from './Register.less';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

const passwordStatusMap = {
  	ok: <div className={styles.success}>强度：强</div>,
  	pass: <div className={styles.warning}>强度：中</div>,
  	pool: <div className={styles.error}>强度：太短</div>,
};

const passwordProgressMap = {
  	ok: 'success',
  	pass: 'normal',
  	pool: 'exception',
};




function Register({dispatch, Login, location, form:{setFieldsValue, getFieldDecorator, validateFields, getFieldValue}}){


    

   

    return (
        <div>
           
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