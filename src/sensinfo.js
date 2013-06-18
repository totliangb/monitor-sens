/**
 * @overview
 *
 * @author 闲耘™ (hotoo.cn[AT]gmail.com)
 * @version 2013/05/13
 */

define(function(require, exports){
  var idcard = require("./idcard");
  var bankcard = require("./bankcard");
  var mobile = require("./mobilephone");
  var monitor = require("monitor");

  var re_privacy = {
    "6...4": /^(.{6}).*(.{4})$/,
    "3...4": /^(.{3}).*(.{4})$/
  };

  /**
   * 对银行卡号码进行隐私包含。
   * @param {String} card, 需要进行隐私保密的银行卡号码。
   * @param {String} pattern, 隐私保护的格式。
   * @return {String} 隐私保密处理后的银行卡号码。
   */
  function privacy(card, pattern){
    return String(card).replace(re_privacy[pattern], "$1...$2");
  }

  exports.scan = function(html){
    var re_cards = /\b\d{11,19}X?\b/g;
    var re_blank = /\s{2,}|\r|\n/g;
    var card, result, context, start, length;

    while(result = re_cards.exec(html)){
      card = result[0];
      start = Math.max(result.index - 30, 0);
      length = card.length + 60;
      context = html.substr(start, length)
      context = context.replace(re_blank, "");
      if(mobile.verify(card)){
        monitor.log("mobile="+privacy(card, "3...4")+"```"+context, "sens");
      }else if(idcard.verify(card)){
        monitor.log("idcard="+privacy(card, "6...4")+"```"+context, "sens");
      }else if(bankcard.verify(card)){
        monitor.log("bankcard="+privacy(card, "6...4")+"```"+context, "sens");
      }
    }
  };
});
