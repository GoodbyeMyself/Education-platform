import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './IndexPage.less';

function adminIndexPage({ dispatch, list: dataSource, loading, total, page: current }) {


  return (
    <div >
       教务端设置
    </div>
  );
}


function mapStateToProps({ adminIndexPage }){
    return {
      	adminIndexPage
    };
}
export default  connect(mapStateToProps)(adminIndexPage);