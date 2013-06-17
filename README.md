# monitor-privacy

---

支付宝敏感信息监控脚本，用于扫描全站页面中明文显示的敏感信息。

敏感信息包括：

* 身份证号码。
* 银行卡号码。
* 手机号码。

---

## 使用说明

```js
seajs.use(["$", "sensinfo"], function($, sensinfo){
  // 自动扫描页面上的敏感信息。
  $(function(){
    try{
      var html = (document.documentElement || document.body).innerHTML;
      sensinfo.scan(html);
    }catch(ex){}
  });

  // 手动扫描异步内容。
  $.ajax({
    url: "remote.json",
    success: function(data){
      sensinfo.scan(String(data));
    }
  });

  // 自动扫描异步内容。
  // 建议修改 AJAX 类库，自动进行扫描处理。
  // 要考虑采样率的问题。
});
```

## API

* scan(String source)

扫描字符串 source 中的敏感信息。
