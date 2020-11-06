/* 出战
 * @Author: zhoulanglang 
 * @Date: 2020-10-14 11:23:00 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-10-15 10:42:57
 */
class HeroPosView extends eui.Component {

    btn: BaseBtn
    grp: eui.Group
    items: egret.DisplayObject[]
    selectN = -1

    public constructor() {
        super();
        this.skinName = "HeroPosSkin";
        this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this);
        this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
    }

    public childrenCreated(): void {
        super.childrenCreated();
    }

    public open(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this)
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this)
        this.upView()
    }

    public upView() {
        this.selectN = -1
        let list = UserModel.ins().listMat
        let posData = [null, null, null, null, null, null]
        for (let item of list) {
            posData[item.position - 1] = UserModel.ins().getSingleBy(item.cardId)
        }
        this.grp.removeChildren()
        this.items = []

        let gapV = 24, gapH = 28, w = 200, h = 320, maxW = this.grp.width - w
        let x = 0, y = 0
        for (let i = 0; i < posData.length; i++) {
            let item = posData[i]
            let obj
            if (item) {
                obj = new HeroItem()
                obj.x = x
                obj.y = y
                obj.data = { heroId: item.cardId, has: true, level: item.lv, count: item.baseCardCount, fightPos: i + 1 }
                obj.setCallBack(this.posFun.bind(this))
            }
            else {
                obj = new eui.Image()
                obj.source = 'hero_none_png'
                obj.x = x
                obj.y = y + 20
            }
            this.grp.addChild(obj)
            this.items.push(obj)
            x += gapV + w
            if (x > maxW) {
                x = 0
                y += gapH + h
            }
        }
    }
    //1-6
    public posFun(parm: { isTap?: boolean, pos: number }) {
        if (parm.isTap) {
            if (this.selectN != -1) {
                let obj = this.items[this.selectN] as HeroItem
                obj.currentState = 'normal'
            }
            this.selectN = parm.pos - 1
            let obj = this.items[this.selectN] as HeroItem
            obj.currentState = 'remove'
            this.grp.addChildAt(obj, this.grp.numChildren)
        }
        else {
            let obj = this.items[this.selectN] as HeroItem
            obj.currentState = 'normal'
            this.selectN = -1
        }
    }

    private onClick() {
        ViewManager.ins().open(FormationWin)
    }

    public close(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
        this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this)
        this.grp.removeChildren()
        this.selectN = -1
    }

}