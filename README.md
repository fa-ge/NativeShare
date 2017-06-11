# 移动端调用原生分享的插件

### 功能
在移动端浏览器直接调用浏览器自带的分享组件

### 兼容性
* QQ浏览器
* UC浏览器
* android百度浏览器
* 微信自带浏览器
* QQ自带浏览器(即将支持)

### 示例
[demo](https://fa-ge.github.io/nativeShare/demo/index.html)

![demo](https://fa-ge.github.io/nativeShare/demo/demo.png)

### 使用
支持ES6模块,AMD，CMD引入
如果你的项目没有模块化。你也可以直接用script标签引入NativeShare.js。可以参考[demo](https://fa-ge.github.io/nativeShare/demo/index.html)
```javascript
import nativeShare from 'nativeshare'

// 如果你需要在微信浏览器中分享，那么你需要在最开始setShareData之前调用,不需要在微信中分享不需要调用setWechatConfig
// 特别提示一下微信分享有一个坑，不要分享安全域名以外的域名(具体见jssdk文档)，否则会导致你配置的文案无效
nativeShare.setWechatConfig({
      appId: '',
      timestamp: '',
      nonceStr: '',
      signature: '',
  })

// 设置分享文案
nativeShare.setShareData({
    icon: 'https://pic3.zhimg.com/v2-080267af84aa0e97c66d5f12e311c3d6_xl.jpg',
    link: 'https://github.com/fa-ge/nativeShare',
    title: 'nativeShare',
    desc: 'nativeShare是一个整合了各大移动端浏览器调用原生分享的插件',
    from: '@fa-ge',
})

// 唤起浏览器原生分享组件(如果在微信中不会唤起，此时callShare方法只会设置文案。类似setShareData)
try {
	nativeShare.callShare()
} catch(err) {
  // 如果不支持，你可以在这里做降级处理
}
```

### API

nativeShare一共只有三个实例方法

* getShareData() 获得分享的文案
* setShareData() 设置分享的文案
* callShare(command = 'default', [options]) 调用浏览器原生的分享组件

还有就是针对微信的实例方法 setWechatConfig

setShareData设置文案的格式为

```javascript
{
    icon: '',
    link: '',
    title: '',
    desc: '',
    from: '',
}
```

调用callShare方法时第一个参数是指定用什么命令调用分享组件。目前支持6个命令。分别是

* default 默认，调用起底部的分享组件，当其他命令不支持的时候也会调用该命令
* timeline 分享到朋友圈
* appMessage 分享给微信好友
* qq 分享给QQ好友
* qZone 分享到QQ空间
* weiBo 分享到微博




### 交流
如果你知道其他浏览器调用分享的方式，请务必一定要告诉我。