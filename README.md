原文地址 [https://github.com/fa-ge/NativeShare/blob/master/README.md](https://github.com/fa-ge/NativeShare/blob/master/README.md)

### 起因

最近有一个活动页需要在移动端浏览器分享网页到微信，QQ。虽然每一个浏览器都有分享到微信的能力，但不是每个都提供接口供网页来调用。及时有提供，浏览器暴露出的api也各不相同，而我写[NativeShare](https://github.com/fa-ge/NativeShare)的目的只是为前端开发者提供一致的api来调用浏览器的原生分享组件。大小uglify + gzip = 4k。



### 兼容性(毫无疑问是兼容浏览器最多的插件了)

- **移动端几乎所有浏览器都支持分享到QQ和QQ空间**
- QQ浏览器
- UC浏览器
- 微信自带浏览器
- QQ自带浏览器
- QQ空间APP
- 百度浏览器
- 百度APP自带浏览器
- ios 搜狗浏览器
- 支持分享到web微博
- 即将支持(android 搜狗浏览器，微博APP）

存在的问题

* 安卓的QQ自带浏览器不支持.com以外的域名后缀。可能会支持.cn,.com.cn，但明确不支持.me,.io这个具体可以自己测试。
* 安卓的QQ自带浏览器分享url必须跟页面url同一个域名，否则所有设置不生效。
* 安卓的QQ自带浏览器无法直接分享
* 虽然几乎所有的浏览器都支持分享到QQ和QQ空间，但是webview中基本都会不支持。我也很难判断当前浏览器是否支持，浏览器是否唤起QQ APP我也很难判断，所有除了上述支持的浏览器，APP外其他情况调用分享到QQ我也会抛出异常。
* UC浏览器安卓端不能设置icon
* 百度浏览器，百度APP不能直接分享
* QQ空间APP，微信自带浏览器只能设置文案，分享需要用户手动点击右上角



### 示例
[demo](https://fa-ge.github.io/NativeShare/demo/index.html)

![demo](https://fa-ge.github.io/NativeShare/demo/demo.png)

### 使用
支持ES6模块,AMD，CMD引入
如果你的项目没有模块化。你也可以直接用script标签引入NativeShare.js。可以参考[demo](https://fa-ge.github.io/NativeShare/demo/index.html)
```javascript
import NativeShare from 'nativeshare'

// 先创建一个实例
var nativeShare = new NativeShare()
// 如果你需要在微信浏览器中分享，那么你需要设置额外的微信配置
// 特别提示一下微信分享有一个坑，不要分享安全域名以外的链接(具体见jssdk文档)，否则会导致你配置的文案无效
// 创建实例应该带参数
var nativeShare = new NativeShare({
    wechatConfig: {
        appId: '',
        timestamp: '',
        nonceStr: '',
        signature: '',
    },
  	// 让你修改的分享的文案同步到标签里，比如title文案会同步到<title>标签中
	// 这样可以让一些不支持分享的浏览器也能修改部分文案，默认都不会同步
  	syncDescToTag: false,
  	syncIconToTag: false,
  	syncTitleToTag: false,
})

// 你也可以在setConfig方法中设置配置参数
nativeShare.setConfig({
    wechatConfig: {
        appId: '',
        timestamp: '',
        nonceStr: '',
        signature: '',
    }
})


// 设置分享文案
nativeShare.setShareData({
    icon: 'https://pic3.zhimg.com/v2-080267af84aa0e97c66d5f12e311c3d6_xl.jpg',
    link: 'https://github.com/fa-ge/NativeShare',
    title: 'NativeShare',
    desc: 'NativeShare是一个整合了各大移动端浏览器调用原生分享的插件',
    from: '@fa-ge',
})

// 唤起浏览器原生分享组件(如果在微信中不会唤起，此时call方法只会设置文案。类似setShareData)
try {
	nativeShare.call()
    // 如果是分享到微信则需要 nativeShare.call('wechatFriend')
    // 类似的命令下面有介绍
} catch(err) {
  // 如果不支持，你可以在这里做降级处理
}
```

### API

NativeShare一共只有五个实例方法

* getShareData() 获得分享的文案
* setShareData() 设置分享的文案
* call(command = 'default', [options]) 调用浏览器原生的分享组件
* setConfig() 设置配置参数和new NativeShare()中设置的一样
* getConfig() 获得配置参数

```javascript
{
    icon: '',
    link: '',
    title: '',
    desc: '',
    from: '',
      
    // 以下两个个回调目前只有在微信和百度APP中很好的支持
    success: noop,
    fail: noop,
      
    // 只有微信支持
    trigger: noop,
}
```

调用call方法时第一个参数是指定用什么命令调用分享组件。目前支持6个命令。分别是

* default 默认，调用起底部的分享组件，当其他命令不支持的时候也会调用该命令
* wechatTimeline 分享到朋友圈
* wechatFriend 分享给微信好友
* qqFriend 分享给QQ好友
* qZone 分享到QQ空间
* weibo 分享到微博


### 交流
如果你是浏览器开发者或者你知道其他浏览器调用分享的方式，请务必一定要告诉我。