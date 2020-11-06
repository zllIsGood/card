/* 结算ui
 * @Author: gravitycat 
 * @Date: 2020-10-14 14:11:29 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-10-21 17:21:08
 */
class BattleResultWin extends BaseEuiView {
    public constructor() {
        super();
        this.skinName = 'BattleResultSkin'
    }
    btn_again: BaseBtn
    btn_return: BaseBtn
    lab_honor: eui.Label
    data: any
    imgResult: eui.Image
    reward_info: eui.Group
    img_boxsource: eui.Image
    public open(...param: any[]): void {
        this.data = param[0]
        this.addTouchEvent(this.btn_again, this.onclick);
        this.addTouchEvent(this.btn_return, this.onclick);
        this.observe(FightModel.ins().postBattleResult, this.upView)
        this.upView()
    }

    private async upView() {
        let matchData = FightModel.ins().fightData
        if (matchData == null) return
        this.data.winsource = this.data.isWin ? matchData.userInfo.userInfo.avatar : matchData.matchInfo.userInfo.avatar
        this.data.failsource = !this.data.isWin ? matchData.userInfo.userInfo.avatar : matchData.matchInfo.userInfo.avatar
        if (!this.data.isWin) {
            this.imgResult.source = "battlefail_png"
            this.reward_info.visible = false
        }

        let _rewarddata = FightModel.ins().rewardData
        //这里为了处理返回的honor为负数
        let _honor = _rewarddata.honor
        this.img_boxsource.source = _rewarddata.box == null ? "" : boxType[_rewarddata.box.boxType]
        if (_honor == null) _honor = 0
        if (_honor >= 0) {
            _honor = "+ " + _honor
        }
        this.lab_honor.text = "荣誉值：" + _honor
    }

    private onclick(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_again:
                ViewManager.ins().open(MatchingWin)
                ViewManager.ins().close(this)
                break
            case this.btn_return:
                ViewManager.ins().close(this)
                ViewManager.ins().open(BattleWin)
                break
        }
    }

    public close(...param: any[]): void {

    }
}
ViewManager.ins().reg(BattleResultWin, LayerManager.UI_Popup);