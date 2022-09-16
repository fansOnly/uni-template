export default {
  /**
   * 卡号输出格式 - XX银行（0123)
   */
  genCardName(name, cardNo) {
    return `${name}(${cardNo.substring(cardNo.length - 4)})`;
  },
  // 显示卡尾号
  suffix(val) {
    return val ? '尾号' + val.substring(val.length - 4) : '';
  },
  // 处理利率格式
  formatRate(rate, type = 'integer') {
    const value = rate.split('%')[0];
    const [integer, decimal] = this.formatDecimal(value).split('.');
    return type === 'integer' ? integer : decimal;
  },
};
