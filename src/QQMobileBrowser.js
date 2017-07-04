import { loadJs, openAppByScheme, generateQueryString, Base64, isIos } from './utils'
import { wechatTimeline, wechatFriend, qqFriend, qZone, weibo, copyUrl, more, generateQRCode, defaultCommand } from './command'
import Share from './Share'

export default class QQMobileBrowser extends Share {
    static commamdMap = {
        [wechatTimeline]: 8,
        [wechatFriend]: 1,
        [qqFriend]: 4,
        [qZone]: 3,
        [weibo]: 11,
        [copyUrl]: 10,
        [more]: 5,
        [generateQRCode]: 7,
        [defaultCommand]: undefined,
    }

    constructor(config) {
        super(config)
        loadJs('https://jsapi.qq.com/get?api=app.share')
    }

    call(command = 'default', options) {
        this.setShareData(options)
        const shareData = this.getShareData()
        const toApp = this.constructor.commamdMap[String(command).toLowerCase()]
        browser.app.share({
            title: shareData.title,
            description: shareData.desc,
            url: shareData.link,
            img_url: shareData.icon,
            from: shareData.from,
            to_app: toApp,
        })
    }
}
