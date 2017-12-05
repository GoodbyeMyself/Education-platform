import React from 'react';
import { connect } from 'dva';
import registerComponent from '../../components/User/Register.js';
import UserLayout from '../../components/UserLayout/UserLayout';

function Register({ location }) {
  return (
    <UserLayout location={location}>
        <registerComponent />
    </UserLayout>
  );
}

export default connect()(Register);