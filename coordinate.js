/**
 * Excel 行列转 数字坐标
 * 例如： "A3" -> [1, 3], "Z10" -> [26, 10], "AZ2" -> [52, 2], "BA30" -> [53, 30]
 */
(function () {
  function strToArr(str) {
    if (!str.match(/^[A-Z]+\d+$/)) {
      throw new Error('请输入合法行列字符串');
    }

    const reg = /^([A-Z]+)(\d+)$/;
    const res = reg.exec(str);

    // 获取拆分后的结果
    const strVal = res[1];
    const lineVal = Number(res[2]);
    const strLastPos = strVal.length - 1;

    // 通过 charCode 获取坐标
    let rowVal = 0;
    for (let index = strLastPos; index >= 0; index--) {
      const charCode = strVal[index].charCodeAt() - 64;
      rowVal += 26 ** (strLastPos - index) * charCode;
    }

    return [rowVal, lineVal];
  }

  console.log(strToArr('BA30'));
})();
