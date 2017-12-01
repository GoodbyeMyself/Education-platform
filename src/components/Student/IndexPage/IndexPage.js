import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './IndexPage.less';

function stuIndexPage({ dispatch, list: dataSource, loading, total, page: current }) {


  return (
    <div >
      	学生端 首页 asdasdsadasd
    </div>
  );
}


function mapStateToProps({ stuIndexPage }){
    return {
      	stuIndexPage
    };
}
export default  connect(mapStateToProps)(stuIndexPage);