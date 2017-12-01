import React from 'react';
import { Router, Route } from 'dva/router';
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
