import { loadJs, assign } from './utils'
import Share from './Share'

export default class QQ extends Share {
    constructor(config) {
        super(config)
        this.init()
    }

    call(command = 'default', options) {
        this.setShareData(options)
        
        const shareData = this.getShareData()
        const imageArr = [],
            titleArr = [],
            summaryArr = [],
            shareURLArr = []
        for (let i = 0; i < 5; i++) {
            imageArr.push(shareData.icon)
            shareURLArr.push(shareData.link)
            titleArr.push(shareData.title)
            summaryArr.push(shareData.desc)
        }
        QZAppExternal.setShare(
            ({ code }) => {
                if (code != 0) {
                    this.hasSomethingWrong = true
                }
            },
            {
                type: 'share',
                image: imageArr,
                title: titleArr,
                summary: summaryArr,
                shareURL: shareURLArr,
            }
        )
    }

    setShareData(options) {
        try {
            this.call('default', options)
        } catch (err) {}
    }

    init() {
        loadJs('https://qzonestyle.gtimg.cn/qzone/phone/m/v4/widget/mobile/jsbridge.js', () => {
            this.call('default')
        })
    }
}
