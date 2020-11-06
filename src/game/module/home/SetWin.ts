/*
 * @Author: zhoulanglang 
 * @Date: 2020-07-11 12:17:00 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-10-27 17:49:30
 */
class SetWin extends BaseEuiView {

    // private verLab: eui.Label
    private userProto: eui.Label
    private priviteProto: eui.Label
    private protoGrp: eui.Group
    private closeGrp: eui.Group
    private imgAbout: eui.Image
    private imgSuggest: eui.Image
    private namelab: eui.Label
    private lab1: eui.Label
    private lab2: eui.Label
    //国学博物馆
    /**版本号*/
    private version = {
        app: 'V1.7',
    }

    public constructor() {
        super();
        this.skinName = 'SetSkin'
    }

    public open(...param: any[]): void {
        this.addTouchEvent(this.priviteProto, this.onClick);
        this.addTouchEvent(this.userProto, this.onClick);
        this.addTouchEvent(this.closeGrp, this.onClick);
        this.addTouchEvent(this.imgAbout, this.onClick);
        this.addTouchEvent(this.imgSuggest, this.onClick);
        this.addTouchEvent(this.lab1, this.onClick);
        this.addTouchEvent(this.lab2, this.onClick);

        this.upView()
        App.ins().playBannerAd(Ad.loadingBanner)
    }

    private upView() {
        this.namelab.text = '神奇的画展' // '国学博物馆'  //趣趣简笔画  //神奇的画展
        this.userProto.textFlow = new egret.HtmlTextParser().parser(`<u>服务协议</u>`)
        this.priviteProto.textFlow = new egret.HtmlTextParser().parser(`<u>隐私政策</u>`)
        // this.verLab.text = this.version.app
    }


    public close(...param: any[]): void {
        App.ins().destoryBanner()
    }

    private onClick(e: egret.TouchEvent): void {
        switch (e.currentTarget) {
            case this.priviteProto:
                // ViewManager.ins().open(UserProtoDetialWin, UserProtoDetialWinOpen.private)
                let url1 = 'https://h5.zmfamily.cn/#/GamePrivacyAgreement'
                if (window && window.open) {
                    window.open(url1)
                }
                else {
                    Openadsdk.OpenURL(null, null, url1)
                }
                break;
            case this.userProto:
                // ViewManager.ins().open(UserProtoDetialWin, UserProtoDetialWinOpen.user)
                let url2 = 'https://h5.zmfamily.cn/#/GameUserServiceAgreement'
                if (window && window.open) {
                    window.open(url2)
                }
                else {
                    Openadsdk.OpenURL(null, null, url2)
                }
                break;
            case this.closeGrp:
                ViewManager.ins().close(this)
                break;
            case this.lab1:
            case this.imgAbout:  //关于我们
                let url = 'https://h5.zmfamily.cn/#/WordAboutUs'
                // let url = 'https://h5.zmfamily.cn/#/AboutUs'
                if (window && window.open) {
                    window.open(url)
                }
                else {
                    Openadsdk.OpenURL(null, null, url)
                }
                break;
            case this.lab2:
            case this.imgSuggest: //建议
                ViewManager.ins().close(this)
                ViewManager.ins().open(SuggestWin)
                break;
        }
    }

}
ViewManager.ins().reg(SetWin, LayerManager.UI_Popup);
window["SetWin"] = SetWin;