import { setShareData, shareData } from './baseShare'

const commamdMap = {
    timeline: 'WechatTimeline',
    appMessage: 'WechatFriends',
    qq: 'QQ',
    weiBo: 'SinaWeibo',
    default: undefined,
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

export default { callShare, init }
