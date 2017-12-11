import fetch from 'dva/fetch';
import config from './config';
import constant from './constant';
import { message } from 'antd';
import appContext from './common.js';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

export default async function request(action, payload) {
   	
   	let url = "";
   	const env = config.env();

   	console.log(env);

   	//根据环境切换请求url
   	url = `/${env}/${action}`;

   	console.log(url);
  
   	const params = {
       	userName: 1,
       	userId: 2,
       	userType: 3,
       	userToken: 4,
       	...payload.params,
   	}

   	console.log(url+':'+JSON.stringify(params));
  
   	//按需添加公共字段
   	const options = {
      	method: 'POST',
      	headers: {
        	'Content-Type': 'application/x-www-form-urlencoded'
      	}
   	}
    
    const response = await fetch(url, options);
    checkStatus(response);

    let data = await response.json();


    console.log(url+'RESPONSE:'+JSON.stringify(data));
   
   	return{data}

 }
