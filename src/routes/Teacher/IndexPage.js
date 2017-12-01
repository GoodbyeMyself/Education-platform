import React from 'react';
import { connect } from 'dva';
import IndexPageComponent from '../../components/Teacher/IndexPage/IndexPage.js';
import MainLayout from '../../components/MainLayout/teacherLayout';

function IndexPage({ location }) {
  return (
    <MainLayout location={location}>
        <IndexPageComponent />
    </MainLayout>
  );
}

export default connect()(IndexPage);