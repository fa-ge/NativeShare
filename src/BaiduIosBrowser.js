import Share from './Share'

export default class BaiduIosBrowser extends Share {
    constructor(config) {
        super(config)
    }

    call(command, options) {
        this.setShareData(options)
        const shareData = this.getShareData()
        location.href =
            'baidubrowserapp://bd_utils?action=shareWebPage&params=' +
            encodeURIComponent(
                JSON.stringify({
                    title: shareData.title,
                    content: shareData.desc,
                    imageurl: shareData.icon,
                    landurl: shareData.link,
                    mediaType: 0,
                    share_type: 'webpage',
                })
            )
    }
}
