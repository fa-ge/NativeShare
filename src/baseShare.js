import { noop, assign } from './utils'

const descTag = document.querySelector('meta[name=description]')
const iconTag = document.querySelector('link[rel*=icon]')
let desc = 'from https://github.com/fa-ge/NativeShare'
let icon = ''
if (descTag) {
    desc = descTag.getAttribute('content')
}
if (iconTag) {
    icon = iconTag.getAttribute('href')
}

const shareData = {
    link: location.href,
    title: document.title,
    desc,
    icon,
    from: '',
    success: noop,
    fail: noop,
    cancel: noop,
    trigger: noop,
}

function getShareData() {
    return assign({}, shareData)
}

function setShareData(options = {}) {
    assign(shareData, options)
}

export { shareData, getShareData, setShareData }
