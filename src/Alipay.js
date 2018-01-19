import { loadJs } from './utils'
import Share from './Share'

export default class Alipay extends Share {
    constructor(config) {
        super(config)
        loadJs('https://a.alipayobjects.com/g/h5-lib/alipayjsapi/3.0.6/alipayjsapi.inc.min.js')
    }

    call(command = 'default', options) {
        this.setShareData(options)
        
        const shareData = this.getShareData();
        ap.share({
        	title: shareData.title,
        	content: shareData.desc,
        	url: shareData.link,
        	image: shareData.icon || '',
        	captureScreen: shareData.icon || true,
        	showToolBar: false
        }, (result) => {
	    	this.hasSomethingWrong = !result.shareResult;
	    });
    }

    setShareData(options) {
        try {
            this.call('default', options)
        } catch (err) {}
    }
}
