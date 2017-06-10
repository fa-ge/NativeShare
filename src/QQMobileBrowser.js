import { assign, loadJs } from './utils'
import baseShareData from './baseShareData'

const shareData = assign({}, baseShareData)

const commamdMap = {
    timeline: 8,
    appMessage: 1,
    qq: 4,
    weiBo: 11,
    qZone: 3,
    copyUrl: 10,
    more: 5,
    generateQRCode: 7,
    defualt: undefined,
}

function getShareData() {
    return assign({}, shareData)
}

function setShareData(options = {}) {
    assign(shareData, options)
}

function callShare(command = 'default', options = {}) {
    setShareData(options)
    const toApp = commamdMap[command]
    browser.app.share({
        title: shareData.title,
        description: shareData.desc,
        url: shareData.link,
        img_url: shareData.icon,
        from: shareData.from,
        to_app: toApp,
    })
}

function init() {
    loadJs('https://jsapi.qq.com/get?api=app.share')
}

export default { setShareData, getShareData, callShare, init }
