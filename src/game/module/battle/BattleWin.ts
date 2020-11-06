/* 匹配
 * @Author: gravitycat 
 * @Date: 2020-10-09 17:35:19 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-10-21 17:21:24
 */
class BattleWin extends BaseEuiView {
    data: { matchId: string, matchInfo: any }
    btn_battlestart: BaseBtn
    btn_close: BaseBtn
    public constructor() {
        super();
        this.skinName = 'BattleSkin'
    }

    private upView() {
        TreasureModel.ins().getMyTreasureBox()
    }

    public open(...param: any[]): void {
        this.upView()
        this.addTouchEvent(this.btn_battlestart, this.onclick);
        //this.addTouchEvent(this.btn_return, this.onclick);
        this.addTouchEvent(this.list, this.onclick);
        this.addTouchEvent(this.btn_box, this.onclick)
        this.addTouchEvent(this.btn_close, this.onclick)
    }
    //boxinfo: TreasureBoxInfo    
    reward: eui.Group
    list: eui.List
    btn_box: BaseBtn
    group_boxhide: eui.Group

    private onclick(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_battlestart:
                ViewManager.ins().open(MatchingWin)
                break
            case this.btn_box:
                TreasureModel.ins().getMyTreasureBox().catch((e) => {
                    wx.showToast({ icon: "none", title: "请检查网络" })
                    console.log(e)
                })
                ViewManager.ins().open(TreasureBoxItemWin)
                break;
        }
    }

    public close(...param: any[]): void {

    }
}
ViewManager.ins().reg(BattleWin, LayerManager.UI_Main);