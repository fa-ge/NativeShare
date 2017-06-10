import { assign, loadJs } from './utils'
import baseShareData from './baseShareData'

const shareData = assign({}, baseShareData)

function getShareData() {
    return assign({}, shareData)
}

function setShareData(options = {}) {
    callShare(undefined, options)
}

function callShare(command, options = {}) {
    assign(shareData, options)
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

    try {
        wx.ready(() => {
            wx.onMenuShareAppMessage(wxShareData)
            wx.onMenuShareQQ(wxShareData)
            wx.onMenuShareQZone(wxShareData)
            wx.onMenuShareWeibo(wxShareData)
            wx.onMenuShareTimeline(wxShareData)
        })
    } catch (err) {}
}

function init() {}

function setWechatConfig(config) {
    loadJs('https://res.wx.qq.com/open/js/jweixin-1.2.0.js', () => {
        wx.config(
            Object.assign(
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
    })
}

export default { setShareData, getShareData, callShare, init, setWechatConfig }
