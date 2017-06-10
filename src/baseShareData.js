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

export default {
    link: location.href,
    title: document.title,
    desc,
    icon,
    from: '',
}
