import { assign } from './utils'
import baseShareData from './baseShareData'

const shareData = assign({}, baseShareData)

function getShareData() {
    return assign({}, shareData)
}

function setShareData(options = {}) {
    assign(shareData, options)
}

function callShare(command = 'default', options = {}) {
    setShareData(options)
    _flyflowNative.exec('bd_utils', 'shareWebPage', JSON.stringify({
        title: shareData.title,
        content: shareData.desc,
        landurl: shareData.link,
        imageurl: shareData.icon,
        shareSource: shareData.from,
    }), '')
}

function init() {}

export default { setShareData, getShareData, callShare, init }
