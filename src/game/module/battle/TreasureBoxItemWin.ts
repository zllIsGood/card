/* 我的宝箱
 * @Author: gravitycat 
 * @Date: 2020-10-16 18:58:56 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-10-21 17:20:59
 */
class TreasureBoxItemWin extends BaseEuiView {
    public constructor() {
        super();
        this.skinName = 'TreasureBoxItemSkin'
    }
    btn_close: BaseBtn
    list: eui.List
    reward: eui.Group


    private upView() {

        let data = TreasureModel.ins().treasureboxData
        let items = []
        for (let item of data.userBoxList) {
            let seconds = item.waitTime
            if (item.boxState == 2) {
                seconds = DateUtil.timediff(Date.parse(new Date().toString()) / 1000, item.unlockTime)
            }
            else if (item.boxState == 3) {
                seconds = "0"
            }
            items.push({ id: item.id, seconds: seconds, boxsource: item.boxType, lockbgsource: boxState[item.boxState], boxstate: item.boxState, cardNum: item.cardNum })
        }
        if (items.length < 6) {
            for (let i = items.length; i < 6; i++) {
                items.push(null)
            }
        }
        this.list.dataProvider = new eui.ArrayCollection(items)
        this.list.itemRenderer = TreasureBoxInfo
        this.list.width = 750
        this.list.height = 768
        this.reward.addChild(this.list)
    }

    group_boxhide: eui.Group
    public open(...param: any[]): void {
        this.addTouchEvent(this.btn_close, this.onclick)
        this.observe(TreasureModel.ins().postTreasureBox, this.upView)
        this.group_boxhide.scaleY = 0
        egret.Tween.get(this.group_boxhide).to({ scaleY: 1 }, 1000, egret.Ease.bounceOut)
        this.upView()
    }

    public close(...param: any[]): void {

    }

    private onclick(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_close:
                egret.Tween.get(this.group_boxhide).to({ scaleY: 0 }, 500, egret.Ease.backIn).call(() => {
                    ViewManager.ins().close(this)
                })

                break
        }
    }
}

ViewManager.ins().reg(TreasureBoxItemWin, LayerManager.UI_Popup);