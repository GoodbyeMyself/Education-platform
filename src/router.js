import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import dynamic from 'dva/dynamic';

function RouterConfig({ history, app }) {
  	
  	const Login = dynamic({
    	app,
    	models: () => [
      		import('./models/User/Login'),
    	],
    	component: () => import('./routes/User/Login'),
  	});

	const Register = dynamic({
    	app,
    	models: () => [
      		import('./models/User/Register'),
    	],
    	component: () => import('./routes/User/Register'),
  	}); 

	const adminIndexPage = dynamic({
    	app,
    	models: () => [
      		import('./models/Admin/IndexPage'),
    	],
    	component: () => import('./routes/Admin/IndexPage'),
  	});  	 	

	const stuIndexPage = dynamic({
    	app,
    	models: () => [
      		import('./models/Student/IndexPage'),
    	],
    	component: () => import('./routes/Student/IndexPage'),
  	});

	const tchIndexPage = dynamic({
    	app,
    	models: () => [
      		import('./models/Teacher/IndexPage'),
    	],
    	component: () => import('./routes/Teacher/IndexPage'),
  	});

  	return (
    	<Router history = { history }>
      		<Switch>
        		<Route exact path="/" component={ Login } />
        		<Route exact path="/Register" component={ Register } />
        		<Route exact path="/adminIndexPage" component={ adminIndexPage } />
        		<Route exact path="/stuIndexPage" component={ stuIndexPage } />
        		<Route exact path="/tchIndexPage" component={ tchIndexPage } />
      		</Switch>
    	</Router>
  	);
}

export default RouterConfig;
