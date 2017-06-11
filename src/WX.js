import { assign, loadJs } from './utils'
import baseShareData from './baseShareData'

const shareData = assign({}, baseShareData)

function getShareData() {
    return assign({}, shareData)
}

function setShareData(options = {}) {
    assign(shareData, options)
}

function callShare(command, options = {}) {
    setShareData(options)
}

function init() {}

function setWechatConfig(config) {
    loadJs('https://res.wx.qq.com/open/js/jweixin-1.2.0.js', () => {
        wx.config(
            assign(
                {
                    debug: false,
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'onMenuShareQZone',
                    ],
                },
                config
            )
        )
        const wxShareData = {
            title: shareData.title,
            desc: shareData.desc,
            link: shareData.link,
            imgUrl: shareData.icon,
            type: shareData.type,
            dataUrl: shareData.dataUrl,
            success: shareData.success,
            cancel: shareData.cancel,
            fail: shareData.fail,
            trigger(...args) {
                assign(wxShareData, shareData)
                shareData.trigger(...args)
            },
        }

        wx.ready(() => {
            wx.onMenuShareAppMessage(wxShareData)
            wx.onMenuShareQQ(wxShareData)
            wx.onMenuShareQZone(wxShareData)
            wx.onMenuShareWeibo(wxShareData)
            wx.onMenuShareTimeline(wxShareData)
        })
    })
}

export default { setShareData, getShareData, callShare, init, setWechatConfig }
