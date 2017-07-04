import { wechatTimeline, wechatFriend, qqFriend, qZone, weibo, defaultCommand } from './command'
import Share from './Share'

export default class UCIosBrowser extends Share {
    static commamdMap = {
        [wechatTimeline]: 'kWeixinFriend',
        [wechatFriend]: 'kWeixin',
        [qqFriend]: 'kQQ',
        [qZone]: 'kQZone',
        [weibo]: 'kSinaWeibo',
        [defaultCommand]: undefined,
    }

    constructor(config) {
        super(config)
    }

    call(command = 'default', options) {
        this.setShareData(options)
        const shareData = this.getShareData()
        const toApp = this.constructor.commamdMap[String(command).toLowerCase()]
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
}
