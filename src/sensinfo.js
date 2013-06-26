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
    var re_cards = /([0-9]\.)?\b(\d{11,19}X?)\b/g;
    var re_blank = /\s{2,}|\r|\n/g;
    var card, result, context, start, length;
    var isFloat; // 浮点数标志。
    var cardType; // 卡号类型。
    var privacy_card; // 隐私保护处理后的卡号。

    while(result = re_cards.exec(html)){
      isFloat = "undefined" !== typeof result[1];
      if(isFloat){continue;}
      card = result[2];
      start = Math.max(result.index - 30, 0);
      length = card.length + 60;
      context = html.substr(start, length);
      context = context.replace(re_blank, "");
      if(mobile.verify(card)){
        cardType = "mobile";
        privacy_card = privacy(card, "3...4");
      }else if(idcard.verify(card)){
        cardType = "idcard";
        privacy_card = privacy(card, "6...4");
      }else if(bankcard.verify(card)){
        cardType = "bankcard";
        privacy_card = privacy(card, "6...4");
      }else{
        continue;
      }
      context = context.replace(card, privacy_card);
      monitor.log(cardType+"="+privacy_card+"```"+context, "sens");
    }
  };
});
