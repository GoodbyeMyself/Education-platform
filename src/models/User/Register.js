import * as RegisterService from '../../services/User/Register';
import { routerRedux } from 'dva/router';

export default {
  	namespace: 'Register',
  
  	state: {
		count : 0,
    	confirmDirty : false,
    	visible : false,
    	help : '',
    	register : ''   	
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