/**
 * 根据不同的开发环境 进行切换
 * mayunlong     2017-11-27
 */
exports.env = function () {
    const constant = require('./constant');
    return constant.STEST;
};


