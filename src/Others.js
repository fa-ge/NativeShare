import { setShareData, shareData } from './baseShare'

function callShare(command, options = {}) {
    setShareData(options)
    throw new Error('the browser do not support share!')
}

function init() {}

export default { callShare, init }
