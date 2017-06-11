import { setShareData, shareData } from './baseShare'

function callShare(command = 'default', options = {}) {
    setShareData(options)
    _flyflowNative.exec(
        'bd_utils',
        'shareWebPage',
        JSON.stringify({
            title: shareData.title,
            content: shareData.desc,
            landurl: shareData.link,
            imageurl: shareData.icon,
            shareSource: shareData.from,
        }),
        ''
    )
}

function init() {}

export default { callShare, init }
