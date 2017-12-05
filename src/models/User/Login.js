import * as LoginService from '../../services/User/Login';
import { routerRedux } from 'dva/router';

export default {
  	namespace: 'Login',
  
  	state: {
		count: 0,
    	type: 'account',    	
  	},

  	subscriptions: {
    
  	},

  	effects: {
    
  	}, 

  	reducers: {
		// 更新 “ 本模块所有 ”数据
		updateState(state, action) {
			return {
				...state,
			    ...action.payload
			}
		}    	    	
  	},
  
  
};