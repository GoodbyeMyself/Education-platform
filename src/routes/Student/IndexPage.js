import React from 'react';
import { connect } from 'dva';
import IndexPageComponent from '../../components/Student/IndexPage/IndexPage.js';
import MainLayout from '../../components/MainLayout/studentLayout';

function IndexPage({location }) {
  return (
    <MainLayout location={location}>
        <IndexPageComponent />
    </MainLayout>
  );
}

export default connect()(IndexPage);