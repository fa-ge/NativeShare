# 移动端调用原生分享的插件

### 功能
整合了QQ浏览器，UC浏览器，安卓百度浏览器，微信。

### 使用
支持ES6模块,AMD，CMD引入
如果你的项目没有模块化。你也可以直接用script标签引入NativeShare.js。可以参考demo
```javascript
import nativeShare from 'nativeshare'
nativeShare.setShareData({
    icon: 'https://pic3.zhimg.com/v2-080267af84aa0e97c66d5f12e311c3d6_xl.jpg',
    link: 'https://github.com/fa-ge/nativeShare',
    title: 'nativeShare',
    desc: 'nativeShare是一个整合了各大移动端浏览器调用原生分享的插件',
    from: '@fa-ge',
})
try {
	nativeShare.callShare()
} catch(err) {
  // 如果不支持，你可以在这里做降级处理
}
```