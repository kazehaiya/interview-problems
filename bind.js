/**
 * 实现 bind 函数
 * 要求：能够完全模拟原生 bind 的特性
 */
(function () {
  Function.prototype.myBind = function (...args) {
    // 原函数对象
    const self = this;
    // this 上下文
    const context = args[0] || null;
    // 原函数参数
    const originArgs = args.slice(1);

    // 返回一个新函数
    return function (...newArgs) {
      return self.apply(context, [...originArgs, ...newArgs]);
    };
  };

  // 实例
  const obj = { name: 'Smiley' };
  function greeting(str, lang) {
    this.value = 'greetingValue';
    console.log('Welcome ' + this.name + ' to ' + str + ' in ' + lang);
  }
  const bindGretting = greeting.myBind(obj, 'the world');

  bindGretting('JS');
  console.log(obj);
})();
