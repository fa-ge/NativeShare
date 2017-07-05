import { loadJs, getHostnameFromUrl } from './utils'
import Share from './Share'

export default class QQAndroid extends Share {
    constructor(config) {
        super(config)
        this.init()
    }

    setShareData(options) {
        super.setShareData(options)
        const shareData = this.getShareData()
        if (getHostnameFromUrl(shareData.link) !== location.hostname) {
            shareData.link = location.href
            console.warn('安卓的QQ自带浏览器分享url必须跟页面url同一个域名，已自动为你设置为当前页面的url')
        }
        try {
            mqq.data.setShareInfo(
                {
                    share_url: shareData.link,
                    title: shareData.title,
                    desc: shareData.desc,
                    image_url: shareData.icon,
                },
                data => {
                    if (data !== true) {
                        console.warn(data)
                    }
                }
            )
        } catch (err) {}
    }

    call(command = 'default', options) {
        this.setShareData(options)
        mqq.ui.showShareMenu()
    }

    init() {
        loadJs('https://open.mobile.qq.com/sdk/qqapi.js', () => {
            this.setShareData()
        })
    }
}
