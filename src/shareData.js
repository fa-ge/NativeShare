import { noop, getContentFromDescTag, getHrefFromIconTag, getTitleFromTitleTag } from './utils'

export default {
    link: location.href,
    title: getTitleFromTitleTag(),
    desc: getContentFromDescTag(),
    icon: getHrefFromIconTag(),
    from: '',
    success: noop,
    fail: noop,
    trigger: noop,
}
