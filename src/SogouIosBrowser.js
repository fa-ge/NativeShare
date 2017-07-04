import Share from './Share'

export default class SogouIosBrowser extends Share {
    constructor(config) {
        super(config)
    }

    call(command, options) {
        this.setShareData(options)
        const shareData = this.getShareData()
        SogouMse.Utility.shareWithInfo({
            shareTitle: shareData.title,
            shareContent: shareData.desc,
            shareImageUrl: shareData.icon,
            shareUrl: shareData.link,
        })
    }
}
