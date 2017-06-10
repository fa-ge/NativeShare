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
    throw new Error('the browser do not support share!')
}

function init() {}

export default { setShareData, getShareData, callShare, init }
