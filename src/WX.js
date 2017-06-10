import { noop, assign } from './utils'
import baseShareData from './baseShareData'

const shareData = assign({}, baseShareData)

function getShareData() {
    return assign({}, shareData)
}

function setShareData(options = {}) {
    callShare(undefined, options)
}

function callShare(command = 'default', options = {}) {
    //TODO:
}

function init() {}

export default { setShareData, getShareData, callShare, init }
