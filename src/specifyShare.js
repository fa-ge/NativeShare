import { openAppByScheme, generateQueryString, Base64, isIos } from './utils'
import shareData from './shareData'

function generateQQQueryString(shareData) {
    return generateQueryString({
        share_id: 924053302,
        url: Base64.encode(shareData.link),
        title: Base64.encode(shareData.title),
        description: Base64.encode(shareData.desc),
        previewimageUrl: Base64.encode(shareData.icon), // ios
        image_url: Base64.encode(shareData.icon), // android
    })
}

function shareToQQ() {
    const shareScheme = isIos
        ? 'mqqapi://share/to_fri?src_type=web&version=1&file_type=news'
        : 'mqqapi://share/to_fri?src_type=isqqBrowser&version=1&file_type=news'
    openAppByScheme(`${shareScheme}&${generateQQQueryString(shareData)}`)
}

function shareToQZone() {
    const shareScheme = isIos
        ? 'mqqapi://share/to_fri?file_type=news&src_type=web&version=1&generalpastboard=1&shareType=1&cflag=1&objectlocation=pasteboard&callback_type=scheme&callback_name=QQ41AF4B2A'
        : 'mqqapi://share/to_qzone?src_type=isqqBrowser&version=1&file_type=news&req_type=1'
    openAppByScheme(`${shareScheme}&${generateQQQueryString(shareData)}`)
}

function shareToQZone4Web() {
    const queryObj = {
        url: shareData.link,
        title: shareData.title,
        pic: shareData.icon,
        desc: shareData.desc,
    }
    location.href = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?${generateQueryString(queryObj, true)}`
}

function shareToWeibo4Web() {
    const queryObj = {
        url: shareData.link,
        title: shareData.title,
        pic: shareData.icon,
    }
    location.href = `http://service.weibo.com/share/share.php?${generateQueryString(queryObj, true)}`
}

export { shareToQQ, shareToQZone, shareToWeibo4Web, shareToQZone4Web }
