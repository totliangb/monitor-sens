# 演示文档

---

<script type="text/javascript" src="http://arale.alipay.im/alipay/monitor/dist/seer.js"></script>

* 明文手机号：13912345678, 18612345678
* 明文身份证：36048119881214202X
* 明文银行卡：6225885718336811
* 随机数：0.6225885718336811
* 浮点数：12.49444651847702


````javascript
seajs.use(["jquery", "monitor", "sensinfo"], function($, monitor, sensinfo){

  // 命中率：[0,1]: 实际对应采样率：[0%,100%]
  var rate = 0.8;

  /**
   * 随机采样命中算法。
   * @param {Nuber} rate, 采样率，[0,1] 区间的数值。
   * @return {Boolean}
   */
  function hit(rate){
    return 0 === Math.floor(Math.random() / rate);
  };

  // 启动监控。
  monitor.boot();

  if(!hit(rate)){return;}

  $(function(){
    try{
      var html = (document.documentElement || document.body).innerHTML;
      sensinfo.scan(html);
    }catch(ex){}
  });

});
````
