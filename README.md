# monitor-sens

---

支付宝敏感信息监控脚本，用于扫描全站页面中明文显示的敏感信息。

敏感信息包括：

* 身份证号码。
* 银行卡号码。
* 手机号码。

---

## 使用说明

```js
seajs.use(["jQuery", "monitor", "sensinfo"], function($, monitor, sensinfo){

  var sens_options = {
    "*": function(type, privacy, context){
      monitor.log({
        profile: "sens",
        type: type,
        privacy: privacy,
        context: context
      });
    }
  };

  // 自动扫描页面上的敏感信息。
  $(function(){
    try{
      var html = (document.documentElement || document.body).innerHTML;
      sensinfo.scan(html, sens_options);
    }catch(ex){}
  });

  // 手动扫描异步内容。
  $.ajax({
    url: "remote.json",
    success: function(data){
      sensinfo.scan(String(data), sens_options);
    }
  });

  // 自动扫描异步内容。
  // 建议修改 AJAX 类库，自动进行扫描处理。
  // 注：要考虑采样率的问题。
});
```

## API

### 静态方法 sensinfo.scan(String source, Object options)

扫描字符串 source 中的敏感信息。

在扫描到特定敏感信息时，触发以下事件：

* `mobile`: 明文手机号。
* `idcard`: 明文身份证号。
* `bankcard`: 明文银行卡号。
* `*`: 以上所有的敏感信息都会触发该事件。

`scan()` 方法的第二个参数选项对象中，key 为以上事件的回调函数都会被执行。
