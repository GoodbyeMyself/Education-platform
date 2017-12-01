import request from '../../utils/request';
import { PAGE_SIZE } from '../../constants';

/**
 * 接口 注释   
 * @param {String}    xxx           必要参数
 * @param {Number}    xxx    		必要参数
 * @return {Promise}                [description]
 */
export async function getData({ a }) {
    return request('TESTVCE',{
        params: {
            a: a
        }
    })
}


















