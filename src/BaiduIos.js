import Share from './Share'

export default class BaiduIos extends Share {
    constructor(config) {
        super(config)
    }

    call(command, options) {
        this.setShareData(options)
        const shareData = this.getShareData()
        window.NativeShareFailCallback = shareData.fail
        window.NativeShareSuccessCallback = shareData.success
        location.href =
            'baiduboxapp://callShare?' +
            [
                `options=${encodeURIComponent(
                    JSON.stringify({
                        title: shareData.title,
                        imageUrl: '',
                        mediaType: 'all',
                        content: shareData.desc,
                        linkUrl: shareData.link,
                        iconUrl: shareData.icon,
                    })
                )}`,
                'errorcallback=window.NativeShareFailCallback',
                'successcallback=window.NativeShareSuccessCallback',
            ].join('&')
    }
}
