import React from 'react';
import { connect } from 'dva';
import LoginComponent from '../../components/User/Login.js';
import UserLayout from '../../components/MainLayout/UserLayout';

function Login({ location }) {
  return (
    <UserLayout location={location}>
        <LoginComponent />
    </UserLayout>
  );
}

export default connect()(Login);