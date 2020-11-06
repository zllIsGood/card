/* 宝箱解锁
 * @Author: gravitycat 
 * @Date: 2020-10-19 18:11:10 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-10-20 18:32:11
 */
class UnLockBoxWin extends BaseEuiView {
    public constructor() {
        super();
        this.skinName = 'UnlockBoxSkin'
    }
    btn_close: BaseBtn
    img_box: eui.Image
    lab_boxtype: eui.Label
    lab_rewardcount: eui.Label
    lab_usetime: eui.Label
    btn_unlock: BaseBtn
    data: any
    public open(...param: any[]): void {
        this.data = param[0]
        this.addTouchEvent(this.btn_close, this.onclick)
        this.addTouchEvent(this.btn_unlock, this.onclick)
        this.upView()
    }

    public close(...param: any[]): void {

    }

    private upView() {
        this.img_box.source = boxType[this.data.boxtype]
        this.lab_usetime.text = this.data.usetime
        this.lab_rewardcount.text = "x" + this.data.cardcount
    }

    private onclick(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_close:
                ViewManager.ins().close(this)
                break
            case this.btn_unlock:
                TreasureModel.ins().openTreasureBox(this.data.id).then(() => {
                    TipModel.ins().show({ icon: null, title: "解锁成功~" })
                    ViewManager.ins().close(this)
                }).catch(() => {
                    TipModel.ins().show({ icon: null, title: "每次只能解锁一个噢~" })
                })
                break
        }
    }
}
ViewManager.ins().reg(UnLockBoxWin, LayerManager.UI_Popup);