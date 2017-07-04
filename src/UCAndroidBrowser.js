import { wechatTimeline, wechatFriend, qqFriend, qZone, weibo, defaultCommand } from './command'
import Share from './Share'

export default class UCAndroidBrowser extends Share {
    static commamdMap = {
        [wechatTimeline]: 'WechatTimeline',
        [wechatFriend]: 'WechatFriends',
        [qqFriend]: 'QQ',
        [qZone]: 'Qzone',
        [weibo]: 'SinaWeibo',
        [defaultCommand]: '',
    }

    constructor(config) {
        super(config)
    }

    call(command = 'default', options) {
        this.setShareData(options)
        const shareData = this.getShareData()
        const toApp = this.constructor.commamdMap[String(command).toLowerCase()]
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
}