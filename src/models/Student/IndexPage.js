import * as indexpageService from '../../services/Student/IndexPage';
import { routerRedux } from 'dva/router';
import { message, Modal } from 'antd';
import { PBU_SUCCESS } from '../../utils/constant';

export default {
  	namespace: 'stuIndexPage',

  	state: {
    	a: '0',
  	},

	subscriptions: {
		setup({dispatch, history}) {
			return history.listen(({ pathname, query }) => {
                if (pathname === '/stuIndexPage') {
                    dispatch({
                        type: 'getData',
                        payload: {
							a : 0,    //请求参数
                        }
                    });
                }
            });
		}    	
  	},  

  	effects: {
		*getData({ payload }, { call, put, select }) {
			const { data } = yield call(indexpageService.getData,payload);
            if (data.code == 200) {
            	// message.success('数据请求成功，请在控制台查看结果');
				yield put({
					type: 'updateState',
					payload: {
						a : 0,
					}
				})
            }
			else{
				message.error('测试错误提示');
			}
        },    	
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