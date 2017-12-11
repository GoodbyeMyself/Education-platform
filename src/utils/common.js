/**
 * @author mayunlong
 * @公共方法
 */

import Cookie from 'js-cookie';
import md5 from 'blueimp-md5';
import Fingerprint2 from 'fingerprintjs2';

const fp = new Fingerprint2();

let instance = null;

class AppContext {

    constructor() {

        if(!instance){
            instance = this;
            instance.map = {};
            fp.get(function(result, components) {
                instance.setItemInCookieHashed('deviceId', result, { path: '/' });
            });

            if (window.location.hostname === '10.10.16.217' || window.location.hostname === 'localhost') {
                //TODO: 部署时移除
                instance.setMockUserInfo();
            }
        }
        return instance;

    }


    /**
     * 写入模拟用户信息，
     * TODO: 生产/测试环境删除，仅用于联调
     */
    setMockUserInfo() {
        this.setItemInCookieHashed('userId', '');
        this.setItemInCookieHashed('userName', '');
        this.setItemInCookieHashed('userType', '');
        this.setItemInCookieHashed('userToken', '');
        console.error('仅用于联调，生产/测试环境移除此调用');
    }

    /**
     * 登出
     */
    logout() {
        if (window && window.localStorage) {
            this.removeItemInCookieHashed('userId');
            this.removeItemInCookieHashed('userToken');
            this.removeItemInCookieHashed('userType');
            this.removeItemInCookieHashed('userName');
        }
    }

    /**
     * 从cookie中获取当前登录的用户的账户信息, 用于接口调用
     * @return {[type]} [description]
     */
    getCurrentAccountInfo() {

        const accountInfo = {
            userName: this.getItemInCookie('userName'),
            userId: this.getItemInCookie('userId'),
            userType: this.getItemInCookie('userType'),
            imgLink: decodeURI(this.getItemInCookie('imgLink')),
            userToken: ''
        }
        return accountInfo;
    }    

    /**
     * 在localStorage中设置永久数据，浏览器关闭不会清空
     * @param {string} key   [description]
     * @param {string} value [description]
     */
    setItem(key, value) {
        if (window && window.localStorage) {
            window.localStorage.setItem(md5(key), new Buffer(value + '').toString('base64'));
        }
    }

    /**
     * 删除item
     */
    removeItem(key) {
        if (window && window.localStorage) {
            window.localStorage.removeItem(md5(key));
        }
    }    

    /**
     * 在localStorage中读取值
     * @param  {string} key [description]
     * @return {string}     [description]
     */
    getItem(key) {
        if (window && window.localStorage) {
            if (window.localStorage.getItem(md5(key))) {
                return new Buffer(window.localStorage.getItem(md5(key)), 'base64').toString();
            }
        }
        return null;
    }

    /**
     * 在session中设置临时数据，浏览器关闭时会清空
     * @param {string} key   key
     * @param {string} value value
     */
    setItemInSession(key, value) {
        if (window && window.sessionStorage) {
            window.sessionStorage.setItem(md5(key), new Buffer(value + '').toString('base64'));
        }
    }

    /**
     * 在session中获取临时数据,浏览器关闭时会清空
     * @param  {string} key [description]
     * @return {string}     [description]
     */
    getItemInSession(key) {
        if (window && window.sessionStorage) {
            return new Buffer(window.sessionStorage.getItem(md5(key)), 'base64').toString();
        }
        return null;
    }

    /**
     * 往 cookie 里存东西
     * @param {string} key
     * @param {string} value
     * @param {object} options
     */
    setItemInCookie(key, value, options = { expires: 30 }) {
        Cookie.set(key, value, options);
    }

    /**
     * 从 cookie 里取东西
     * @param {string} key
     */
    getItemInCookie(key) {
        return Cookie.get(key);
    }

    /**
     * 从cookie中删除某个key
     */
    removeItemInCookie(key) {
        return Cookie.remove(key);
    }

    /**
     * 往 cookie 里存东西
     * @param {string} key
     * @param {string} value
     * @param {object} options
     */
    setItemInCookieHashed(key, value, options = { expires: 30 }) {
        Cookie.set(md5(key), new Buffer(value + '').toString('base64'), options);
    }

    /**
     * 从 cookie 里取东西
     * @param {string} key
     */
    getItemInCookieHashed(key) {
        if (Cookie.get(md5(key))) {
            return new Buffer(Cookie.get(md5(key)), 'base64').toString();
        }
    }

    /**
     * 删除cookie里的某个key
     */
    removeItemInCookieHashed(key) {
        Cookie.remove(md5(key));
    }


    //日期格式化
    formatDate(time){
        var d = new Date(parseInt(time)*1000);
        var year = d.getFullYear();
        var month = d.getMonth()+1;
        var date = d.getDate();
        return   year+"年"+month+"月"+date+"日";
    }

    //显示默认日期
    defaultDate(time)   {
        var now = new Date(parseInt(time)*1000);
        var year=now.getFullYear();
        var month=now.getMonth()+1;
        var date=now.getDate();
        if(month<10){
            month = "0"+month
        }
        if(date<10){
            date = "0"+date
        }
        return `${year}-${month}-${date}`
    }

    //身份证
    isIDCard(value) {
        const regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        return regIdCard.test(value);
    }

    //空对象
    isEmpty(obj){
        for (var name in obj){
            return false;
        }
        return true;
    };

    //数组相同（校验顺序不同，未校验具体字段类型不同）
    isArrayEqual(array1, array2){
        if(JSON.stringify(array1)!=JSON.stringify(array2)){
            return false;
        }
        return true
    };

    /**
     * 传入  第一个参数开始数组， 第二个参数改变的数组
     * @descipition 判断数组两边是否相等（校验顺序、多维单维数组 和数组包含的json、校验具体字段类型不同）
     */
    arrayIsEqualFn(beforeArray, afterArray) {
        const compare = (() => {
            function compareArray(a, b) {
                if (a.length !== b.length) {
                    return false;
                }
                const length = a.length;
                for (let i = 0; i < length; i++) {
                    if (!compare(a[i], b[i])) {
                        return false;
                    }
                }
                return true;
            }

            function compareObject(a, b) {
                const keya = Object.keys(a);
                const keyb = Object.keys(b);
                if (keya.length !== keyb.length) {
                    return false;
                }
                return keya.every(key => {
                    if (!compare(a[key], b[key])) {
                        return false;
                    }
                    return true;
                });
            }

            function arrPosition(a, b) {
                if(JSON.stringify(a)!=JSON.stringify(b)){
                    return false;
                }
                return true
            }

            function compare(a, b) {
                if(!!a && !!b) {
                    return arrPosition(a, b)
                }
                if (a === b) {
                    return true;
                }
                if (typeof a !== typeof b || a === null || b === null) {
                    return false;
                }
                if (Array.isArray(a)) {
                    if (!Array.isArray(b)) {
                        return false;
                    }
                    return compareArray(a, b);
                }
                if (typeof a === "object") {
                    return compareObject(a, b);
                }
                return false;
            }
            return compare;
        })();
      return compare(beforeArray, afterArray)
    }

    //获取默认图片
    getDefaultImage(type){
        const obj =  {
                        'school_obs': 1,
                        'school_mbop': 2,
                        'avatar_passport': 3,
                        'COURSE_CLASSIFY/accounting': 4,
                        'COURSE_CLASSIFY/marketing': 5,
                        'COURSE_CLASSIFY/HR': 6,
                        'COURSE_CLASSIFY/e-commerce': 7,
                        'COURSE_CLASSIFY/InE': 8,
                    }
        const url = 'http://pbu-public.oss-cn-beijing.aliyuncs.com/webapps/default_images';
        return {url: `${url}/${type}.png`, id:obj[type]};
    }

    //对输入框值得数字限制
    limitCount(e){
        const value = e.target.value.replace(/\D/g,'');
        let count = Number(value).toString();
        if(count == "0"){
            count = "";
        }
        return count;
    }


}

export default new AppContext();
