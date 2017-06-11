/**
 * 目前存在的问题
 * UC浏览器安卓端不能设置icon
 * 百度浏览器ios端分享到QQ，QQ空间失败，分享到微信的链接是百度浏览器的下载链接(暂时直接砍掉这块)
 * 百度浏览器安卓端正常，但是不能指定分享
 * ios UC浏览器分享到微博也有问题
 */

import { isQQMBrowser, isUCMBrowser, isWechat, isBAIDUMBrowser, isAndroid, isIos, noop } from './utils'
import { getShareData, setShareData } from './baseShare'
import QQMB from './QQMobileBrowser'
import UCAB from './UCAndroidBrowser'
import UCIB from './UCIosBrowser'
import BAIDUAB from './BAIDUAndroidBrowser'
import WX from './WX'
import Others from './Others'

let nativeShare = {}

if (isWechat) {
    nativeShare = WX
} else if (isQQMBrowser) {
    nativeShare = QQMB
} else if (isUCMBrowser && isAndroid) {
    nativeShare = UCAB
} else if (isUCMBrowser && isIos) {
    nativeShare = UCIB
} else if (isBAIDUMBrowser && isAndroid) {
    nativeShare = BAIDUAB
} else {
    nativeShare = Others
}

nativeShare.init()

if (!isWechat) {
    nativeShare.setWechatConfig = noop
}
nativeShare.getShareData = getShareData
nativeShare.setShareData = setShareData

window.nativeShare = nativeShare
export default nativeShare
