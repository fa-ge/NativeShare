import { assign } from './utils'
import baseShareData from './baseShareData'

const shareData = assign({}, baseShareData)

const commamdMap = {
    timeline: 'kWeixinFriend',
    appMessage: 'kWeixin',
    qq: 'kQQ',
    weiBo: 'kSinaWeibo',
    qZone: 'kQZone',
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
    if (ucbrowser.web_shareEX) {
        ucbrowser.web_shareEX(
            JSON.stringify({
                title: shareData.title,
                content: shareData.desc,
                sourceUrl: shareData.link,
                imageUrl: shareData.icon,
                source: shareData.from,
                target: toApp,
            })
        )
    } else {
        ucbrowser.web_share(title, desc, link, toApp, '', from, '')
    }
}

function init() {}

export default { setShareData, getShareData, callShare, init }
