import { assign } from './utils'
import baseShareData from './baseShareData'

const shareData = assign({}, baseShareData)

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
    ucweb.startRequest('shell.page_share', [
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
