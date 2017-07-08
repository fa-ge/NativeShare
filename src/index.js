import { shareToQQ, shareToQZone, shareToWeibo4Web, shareToQZone4Web } from './specifyShare'
import {
    isQQMBrowser,
    isUCMBrowser,
    isWechat,
    isBaiduMBrowser,
    isAndroid,
    isIos,
    isQQ,
    isQZone,
    isSogouMBrowser,
    isBaiduApp,
} from './utils'
import Share from './Share'
import QQMobileBrowser from './QQMobileBrowser'
import UCIosBrowser from './UCIosBrowser'
import UCAndroidBrowser from './UCAndroidBrowser'
import BaiduAndroidBrowser from './BaiduAndroidBrowser'
import BaiduIosBrowser from './BaiduIosBrowser'
import SogouIosBrowser from './SogouIosBrowser'
import Wechat from './Wechat'
import Others from './Others'
import QQIos from './QQIos'
import QQAndroid from './QQAndroid'
import QZone from './QZone'
import BaiduIos from './BaiduIos'
import BaiduAndroid from './BaiduAndroid'

let NativeShare

if (isWechat) {
    NativeShare = Wechat
} else if (isQQ && isIos) {
    NativeShare = QQIos
} else if (isQQ && isAndroid) {
    NativeShare = QQAndroid
} else if (isQZone) {
    NativeShare = QZone
} else if (isQQMBrowser) {
    NativeShare = QQMobileBrowser
} else if (isUCMBrowser && isIos) {
    NativeShare = UCIosBrowser
} else if (isUCMBrowser && isAndroid) {
    NativeShare = UCAndroidBrowser
} else if (isBaiduMBrowser && isAndroid) {
    NativeShare = BaiduAndroidBrowser
} else if (isBaiduMBrowser && isIos) {
    NativeShare = BaiduIosBrowser
} else if (isSogouMBrowser && isIos) {
    NativeShare = SogouIosBrowser
} else if (isBaiduApp && isIos) {
    NativeShare = BaiduIos
} else if (isBaiduApp && isAndroid) {
    NativeShare = BaiduAndroid
} else {
    NativeShare = Others
}

export {
    Share,
    QQMobileBrowser,
    UCIosBrowser,
    UCAndroidBrowser,
    BaiduAndroidBrowser,
    BaiduIosBrowser,
    SogouIosBrowser,
    BaiduIos,
    BaiduAndroid,
    Wechat,
    Others,
    QQIos,
    QQAndroid,
    QZone,
    shareToQQ,
    shareToQZone,
    shareToWeibo4Web,
    shareToQZone4Web,
}

window.NativeShare = NativeShare
export default NativeShare
