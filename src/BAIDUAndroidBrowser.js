import Share from './Share'

export default class BaiduAndroidBrowser extends Share {
    constructor(config) {
        super(config)
    }

    call(command, options) {
        this.setShareData(options)
        const shareData = this.getShareData()
        _flyflowNative.exec(
            'bd_utils',
            'shareWebPage',
            JSON.stringify({
                title: shareData.title,
                content: shareData.desc,
                landurl: shareData.link,
                imageurl: shareData.icon,
                shareSource: shareData.from,
            }),
            ''
        )
    }
}
