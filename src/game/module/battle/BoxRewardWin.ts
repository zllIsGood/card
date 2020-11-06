/* 打开宝箱
 * @Author: gravitycat 
 * @Date: 2020-10-20 14:04:28 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-10-21 14:52:44
 */
class BoxRewardWin extends BaseEuiView {
    public constructor() {
        super();
        this.skinName = 'BoxOpenSkin'
    }
    item_card: eui.List
    btn_close: BaseBtn
    data: any
    public open(...param: any[]): void {
        this.data = param[0]
        this.upView()
        this.addTouchEvent(this.item_card, this.onclick);
        this.addTouchEvent(this.btn_close, this.onclick);
    }

    private upView() {
        let drawdara = TreasureModel.ins().drawTreasureData
        let carddata = []
        // const card = [
        //     { count: 1, id: 51 },
        //     { count: 1, id: 22 },
        //     { count: 11, id: 45 },
        //     { count: 12, id: 85 }]
        for (let item of drawdara.awardDataList) {
            if (item.type == 10) {
                carddata.push({ id: item.card.id, count: item.count })
            }
            //carddata.push({ id: item.id, count: item.count })
        }

        this.item_card.dataProvider = new eui.ArrayCollection(carddata)
        this.item_card.itemRenderer = DrawCardInfo
    }

    private onclick(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_close:
                ViewManager.ins().close(this)
                break
        }
    }

    public close(...param: any[]): void {

    }
}

ViewManager.ins().reg(BoxRewardWin, LayerManager.UI_Popup);