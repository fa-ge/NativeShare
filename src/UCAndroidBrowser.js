import { assign } from './utils'
import baseShareData from './baseShareData'

const shareData = assign({}, baseShareData)
// 暂时没找到的命令都用空字符替代
const commamdMap = {
    timeline: 'WechatTimeline',
    appMessage: 'WechatFriends',
    qq: 'QQ',
    weiBo: 'SinaWeibo',
    default: undefined,
}

function getShareData() {
    return assign({}, shareData)
}

function setShareData(options = {}) {
    assign(shareData, options)
}

function callShare(command = 'default', options = {}) {
    setShareData(options)
    const toApp = commamdMap[command]
    window.ucweb.startRequest('shell.page_share', [
        shareData.desc,
        shareData.title,
        shareData.link,
        toApp,
        '',
        shareData.from,
        '',
    ])
}

function init() {}

export default { setShareData, getShareData, callShare, init }
