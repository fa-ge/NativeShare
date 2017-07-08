import Share from './Share'

export default class BaiduAndroid extends Share {
    constructor(config) {
        super(config)
    }

    call(command, options) {
        this.setShareData(options)
        const shareData = this.getShareData()
        window.NativeShareFailCallback = shareData.fail
        window.NativeShareSuccessCallback = shareData.success

        prompt(
            'BdboxApp:' +
                JSON.stringify({
                    obj: 'Bdbox_android_utils',
                    func: 'callShare',
                    args: [
                        `{
                            imageUrl: "",
                            mediaType: "all",
                            title: "${shareData.title}",
                            content: "${shareData.desc}",
                            linkUrl: "${shareData.link}",
                            iconUrl: "${shareData.icon}"
                        }`,
                        'window.NativeShareSuccessCallback',
                        'window.NativeShareFailCallback',
                    ],
                })
        )
    }
}
