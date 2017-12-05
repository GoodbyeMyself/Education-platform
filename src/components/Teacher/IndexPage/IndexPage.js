import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './IndexPage.less';

function tchIndexPage({ dispatch, list: dataSource, loading, total, page: current }) {


  return (
    <div >
      教师端首页
    </div>
  );
}


function mapStateToProps({ tchIndexPage }){
    return {
      	tchIndexPage
    };
}
export default  connect(mapStateToProps)(tchIndexPage);