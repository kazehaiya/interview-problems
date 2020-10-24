/**
 * 简单的 JSONP 实现
 */
(function () {
  function jsonp(options = {}) {
    const { data, url, success, jsonp = 'callback', jsonpCallback } = options;

    if (!url) {
      throw new Error('请确保填写了请求地址');
    }
    if (typeof success !== 'function') {
      throw new Error('请确保 success 函数已配置');
    }

    // 拼接参数
    let params = '';
    if (typeof data === 'object') {
      for (const key in data) {
        params = `${params}${key}=${data[key]}&`;
      }
    }

    // 回调函数名称（或者生成一个唯一函数名）
    let callbackFuncName =
      jsonpCallback ||
      `myFunc_${Math.floor(Math.random() * 10000)}_${Date.now()}`;

    // 注册全局函数
    window[callbackFuncName] = (data) => {
      // 销毁全局函数
      window[callbackFuncName] = undefined;
      // 销毁创建的 script 节点
      const createdNode = document.getElementById(callbackFuncName);
      const parentNode = createdNode.parentNode;
      parentNode.removeChild(createdNode);

      // 回掉函数触发
      success(data);
    };

    const script = document.createElement('script');
    script.id = callbackFuncName;
    script.src = `${url}?${params}${jsonp}=${callbackFuncName}`;
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(script);
  }

  jsonp({
    url: '',
    data: {},
    jsonp: 'callback',
    jsonpCallback: 'handleCallBack',
    success: function (res) {
      console.log(res);
    },
  });
})();
