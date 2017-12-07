import React from 'react';
import { connect } from 'dva';
import RegisterComponent from '../../components/User/Register.js';
import UserLayout from '../../components/UserLayout/UserLayout';

function Register({ location }) {
  return (
    <UserLayout location={location}>
        <RegisterComponent />
    </UserLayout>
  );
}

export default connect()(Register);