/* 匹配中
 * @Author: gravitycat 
 * @Date: 2020-10-09 17:38:59 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-10-19 11:42:19
 */
class MatchingWin extends BaseEuiView {
    data: any
    btn_cancel: BaseBtn
    labSecond: eui.Label
    btn_rematch: BaseBtn
    lab_matchstate: eui.Label

    public constructor() {
        super();
        this.skinName = 'MatchingSkin'
    }
    second: number = 10
    img_head: eui.Image
    public open(...param: any[]): void {
        this.addTouchEvent(this.btn_cancel, this.onclick);
        this.addTouchEvent(this.btn_rematch, this.onclick);
        TimerManager.ins().doTimer(1000, 0, this.countbySecond, this)
        TimerManager.ins().setTimeOut(MathUtils.limitInteger(1000, 3000), this.countDown, this)

        this.matchStart();

        //用户信息从app拿
        // this.data = param[0]
        // this.img_head.source = this.data.userInfo.userInfo.avatar
    }

    private countDown() {
        if (this.data != undefined) {
            ViewManager.ins().close(this)
            ViewManager.ins().open(MatchShowWin)
        }
    }

    private countbySecond() {
        if (this.second == 0) this.second = 10
        this.second--
        this.labSecond.text = "预计等待 " + this.second + " 秒"
    }
    private upView() {

    }

    private async matchStart() {
        FightModel.ins().startFight().then((res) => {
            if (FightModel.ins().fightData) {
                this.data = FightModel.ins().fightData
                this.img_head.source = this.data.userInfo.userInfo.avatar
            }
        }).catch((e) => {
            console.log(e)
            this.btn_rematch.visible = true
            this.lab_matchstate.text = "匹配失败"
            this.labSecond.text = null
            TimerManager.ins().remove(this.countbySecond, this)
        })
    }

    private onclick(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_cancel:
                //ViewManager.ins().close(this)
                ViewManager.ins().close(this)
                break
            case this.btn_rematch:
                this.matchStart()
                this.btn_rematch.visible = false
                break
        }
    }


    public close(...param: any[]): void {
        TimerManager.ins().remove(this.countDown, this)
        TimerManager.ins().remove(this.countbySecond, this)
    }
}
ViewManager.ins().reg(MatchingWin, LayerManager.UI_Popup);