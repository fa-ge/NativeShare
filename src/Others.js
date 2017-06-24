import { shareToQQ, shareToQZone, shareToWeibo4Web } from './specifyShare'
import { qqFriend, qZone, weibo } from './command'
import Share from './Share'

export default class Others extends Share {
    constructor(config) {
        super(config)
    }

    call(command = 'default', options = {}) {
        command = String(command).toLowerCase()
        this.setShareData(options)
        const shareData = this.getShareData()

        if (command === weibo) {
            shareToWeibo4Web(shareData)
        } else {
            if (command === qqFriend) {
                shareToQQ(shareData)
            } else if (command === qZone) {
                shareToQZone(shareData)
            }

            throw new Error(`the browser may not support command ${command}!`)
        }
    }
}
