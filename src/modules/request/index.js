import Axios from 'axios';

// 响应code
const RESPONSE_CODE = {
  SUCCESS: '00000000'
};

// 实例化一个对象，避免全局污染
const axios = Axios.create({
  timeout: 30 * 1000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
});

/**
 * 处理请求错误
 * @param error
 * @return {Promise<never>}
 */
const errorHandle = error => {
  // 配置了 noCatch: true 不处理
  if (error.config && error.config.noCatch) {
    return Promise.reject(error);
  }

  if (error.response) {
    let errorMsg = error.message;

    switch (error.response.status) {
      case 404:
        errorMsg = errorMsg || '您访问的地址有误，或者该页面不存在哦～';
        break;
      default:
        errorMsg = errorMsg || '网络异常，请稍后重试';
    }
    error.message = errorMsg;
  } else if (error instanceof Error) {
    error.message = '网络异常，请稍后重试';
  } else if (!error.message && error.data) {
    error.message = error.data.returnMessage || error.data.message;
  }
  if (error.message) {
    // TODO 处理提示
    console.error(error.message);
  }

  return Promise.reject(error);
};


// 数据转换
axios.defaults.transformResponse = [data => {
  if (!data) {
    return data;
  }

  let jsonData = data;
  if (typeof data === 'string') {
    try {
      jsonData = JSON.parse(data);
    } catch (e) {
      return data;
    }
  }

  return jsonData;
}];

axios.interceptors.request.use(config => {
  // GET请求加上时间戳
  if (config.method === 'get') {
    let params = config.params;
    if (params == null) {
      params = { _: Date.now() };
    } else if (typeof params === 'object') {
      Object.assign(params, { _: Date.now() });
    }
    config.params = params;
  }

  return config;
}, error => Promise.reject(error));


// 返回数据处理
axios.interceptors.response.use(
  response => {
    const jsonData = response.data;
    // 下载文件
    if (toString.call(jsonData) === '[object Blob]') {
      if (jsonData.type === 'application/json') { // 文件下载异常
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener('loadend', () => {
            const result = reader.result;
            let errorHead = {};
            try {
              errorHead = JSON.parse(result);
            } catch (e) {
              console.error(e);
            }
            errorHandle({
              ...response,
              message: errorHead.head && errorHead.head.msg,
              code: errorHead.head && errorHead.head.code
            }).then(reject).catch(reject);
          });
          reader.readAsText(jsonData);
        });
      }
      return response;
    }

    let returnCode = '';
    if (!jsonData.success && !jsonData.head) {
      return errorHandle(jsonData);
    }
    if (jsonData.head) {
      returnCode = jsonData.head.code;
      if (!returnCode || returnCode !== RESPONSE_CODE.SUCCESS) {
        return errorHandle({
          ...response,
          message: jsonData.head.msg,
          code: returnCode
        });
      }
    }

    return jsonData;
  },
  errorHandle,
);

export default axios;
