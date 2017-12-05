import React from 'react';
import { Router, Route } from 'dva/router';
import Login from './routes/User/Login';
import Register from './routes/User/Register';
import stuIndexPage from './routes/Student/IndexPage';
import tchIndexPage from './routes/Teacher/IndexPage';


const cached = {};

function registerModel(app, model) {
  	if (!cached[model.namespace]) {
    	app.model(model);
    	cached[model.namespace] = 1;
  	}
}

function RouterConfig({ history, app }) {
    const routes = [
        
        {
          path: '/',
          name: 'Login',
          getComponent (nextState, cb) {
            require.ensure([], require => {
                registerModel(app, require('./models/User/Login'));
                cb(null, require('./routes/User/Login'))
            })
          }
        },  
        {
          path: '/Register',
          name: 'Register',
          getComponent (nextState, cb) {
            require.ensure([], require => {
                registerModel(app, require('./models/User/Register'));
                cb(null, require('./routes/User/Register'))
            })
          }
        },  
        {
          path: '/stuIndexPage',
          name: 'stuIndexPage',
          getComponent (nextState, cb) {
            require.ensure([], require => {
               registerModel(app, require('./models/Student/IndexPage'));
               cb(null, require('./routes/Student/IndexPage'))
            })
          }
        },                      
        {
          path: '/tchIndexPage',
          name: 'tchIndexPage',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              	registerModel(app, require('./models/Teacher/IndexPage'));
              	cb(null, require('./routes/Teacher/IndexPage'))
            })
          }
        }                  
    ];
    return <Router history={history} routes={routes} />;
}


export default RouterConfig;
