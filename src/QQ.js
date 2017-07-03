import { loadJs } from './utils'
import Share from './Share'

export default class QQ extends Share {
    constructor(config) {
        super(config)
        this.init()
    }

    call(command = 'default', options = {}) {
        this.setShareData(options)
        mqq.ui.showShareMenu()
    }

    init() {
        loadJs('https://open.mobile.qq.com/sdk/qqapi.js', () => {
            const shareData = this._shareData
            mqq.ui.setOnShareHandler(function(type) {
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
                    function({ retCode }) {
                        if (retCode === 0) {
                            shareData.success.call(this)
                        } else if (retCode === 1) {
                            shareData.cancel.call(this)
                        } else {
                            shareData.fail.call(this)
                        }
                    }
                )
            })
        })
    }
}
