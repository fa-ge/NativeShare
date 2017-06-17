import { setShareData, shareData } from './baseShare'

const commamdMap = {
    timeline: 'WechatTimeline',
    appMessage: 'WechatFriends',
    qq: 'QQ',
    weiBo: 'SinaWeibo',
    default: '',
}

function callShare(command = 'default', options = {}) {
    setShareData(options)
    const toApp = commamdMap[command]
    ucweb.startRequest('shell.page_share', [
        shareData.title,
        shareData.desc,
        shareData.link,
        toApp,
        '',
        shareData.from,
        shareData.icon,
    ])
}

function init() {}

export default { callShare, init }
