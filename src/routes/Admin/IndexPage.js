import React from 'react';
import { connect } from 'dva';
import IndexPageComponent from '../../components/Admin/IndexPage/IndexPage.js';
import MainLayout from '../../components/MainLayout/adminLayout';

function IndexPage({ location }) {
  return (
    <MainLayout location={location}>
        <IndexPageComponent />
    </MainLayout>
  );
}

export default connect()(IndexPage);