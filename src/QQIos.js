import { loadJs } from './utils'
import Share from './Share'

export default class QQIos extends Share {
    constructor(config) {
        super(config)
        this.init()
    }

    call(command = 'default', options) {
        this.setShareData(options)
        mqq.ui.showShareMenu()
    }

    init() {
        loadJs('https://open.mobile.qq.com/sdk/qqapi.js', () => {
            const shareData = this._shareData
            mqq.ui.setOnShareHandler(type => {
                mqq.ui.shareMessage(
                    {
                        back: true,
                        share_type: type,
                        title: shareData.title,
                        desc: shareData.desc,
                        share_url: shareData.link,
                        image_url: shareData.icon,
                        sourceName: shareData.from,
                    },
                    data => {
                        if (data.retCode === 0) {
                            shareData.success(data)
                        } else {
                            shareData.fail(data)
                        }
                    }
                )
            })
        })
    }
}
