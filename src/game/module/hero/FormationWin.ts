/* 布阵界面
 * @Author: zhoulanglang 
 * @Date: 2020-10-15 10:28:28 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-10-15 12:26:22
 */
class FormationWin extends BaseEuiView {

    grp: eui.Group
    retBtn: BaseBtn

    items: HeroItem[]
    posData
    posXY: { x, y }[]
    public constructor() {
        super();
        this.skinName = 'FormationSkin'
    }

    public open(...param: any[]): void {
        this.addTouchEvent(this.retBtn, this.onClick);
        this.observe(UserModel.ins().postListMat, this.upView)

        this.upView()
    }

    private upView() {
        let list = UserModel.ins().listMat
        let posData = [null, null, null, null, null, null]
        for (let item of list) {
            posData[item.position - 1] = UserModel.ins().getSingleBy(item.cardId)
        }
        this.posData = posData
        this.grp.removeChildren()
        this.items = []
        this.posXY = []

        let gapV = 24, gapH = 28, w = 200, h = 320, maxW = this.grp.width - w
        let x = 0, y = 0
        for (let i = 0; i < posData.length; i++) {
            let item = posData[i]
            let obj
            if (item) {
                obj = new FormationItem()
                obj.x = x
                obj.y = y
                obj.data = { heroId: item.cardId, has: true, level: item.lv, count: item.baseCardCount, fightPos: i + 1, isFormation: true }
                obj.setCallBack(this.posFun.bind(this))
            }
            else {
                obj = new eui.Image()
                obj.source = 'hero_none_png'
                obj.x = x
                obj.y = y
                obj.anchorOffsetY = -20
            }
            this.grp.addChild(obj)
            this.items.push(obj)
            this.posXY.push({ x: x, y: y })
            x += gapV + w
            if (x > maxW) {
                x = 0
                y += gapH + h
            }
        }
    }

    public posFun(parm: { x: number, y: number, pos: number }) {
        let obj = this.items[parm.pos - 1]
        if (obj == null) {
            return
        }
        let x = parm.x + 200 / 2
        let y = parm.y + 320 / 2
        let index = 0
        for (let i = 0; i < 6; i++) {
            let item = this.posXY[i]
            let bool = x >= item.x && x <= item.x + 200 && y >= item.y && y <= item.y + 320
            if (bool) {
                index = i + 1
                break
            }
        }
        let tw = egret.Tween.get(obj)
        if (index == 0 || index == parm.pos) {
            let xy = this.posXY[parm.pos - 1]
            tw.to({ x: xy.x, y: xy.y }, 300)
        }
        else {
            UserModel.ins().matSwap(parm.pos, index)

            let obj2 = this.items[index - 1]
            this.grp.addChildAt(obj2, this.grp.numChildren - 2)
            let xy1 = this.posXY[parm.pos - 1]
            let xy2 = this.posXY[index - 1]
            let tw2 = egret.Tween.get(obj2)
            tw.to({ x: xy2.x, y: xy2.y }, 300)
            tw2.to({ x: xy1.x, y: xy1.y }, 300).call(this.saveMat, this)
        }
    }

    private saveMat() {
        UserModel.ins().saveMat() //!!!
        // UserModel.ins().postListMat() //!!!
    }

    public close(...param: any[]): void {
        // App.ins().destoryBanner()
        this.items = null
        this.posData = null
        this.posXY = null
    }

    private onClick(e: egret.TouchEvent): void {
        switch (e.currentTarget) {
            case this.retBtn:
                ViewManager.ins().close(this)
                break;
        }
    }

}
ViewManager.ins().reg(FormationWin, LayerManager.UI_Popup);