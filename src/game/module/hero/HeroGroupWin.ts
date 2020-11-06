/* 卡组
 * @Author: zhoulanglang 
 * @Date: 2020-09-28 15:51:34 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-10-16 16:35:33
 */
class HeroGroupWin extends BaseEuiView {

    list2: eui.List
    grp1: eui.Group
    cLab: eui.Label
    heroPos: HeroPosView

    listData: { heroId: number, has: boolean, level?: number, count?: number }[]
    listData2: { heroId: number, has: boolean, level?: number, count?: number }[]

    public constructor() {
        super();
        this.skinName = 'HeroGroupSkin'
        this.list2.itemRenderer = HeroItem
    }

    public open(...param: any[]): void {
        // this.addTouchEvent(this.closeBtn, this.onClick);
        this.observe(UserModel.ins().postUserList, this.upView)
        this.observe(UserModel.ins().postListMat, this.upGrpAndPos)

        this.upView()
    }

    upGrpAndPos() {
        this.upGrp()
        this.heroPos.upView()
    }

    private upView() {
        let cfgs = GlobalConfig.getMonsterCfg()
        let arr = []
        let arr2 = []
        let list = UserModel.ins().userList
        let hasIDs = []
        for (let item of list) {
            hasIDs.push(item.cardId)
            arr.push({ heroId: item.cardId, has: true, level: item.lv, count: item.baseCardCount })
        }
        for (let i in cfgs) {
            let cfg = cfgs[i]
            if (hasIDs.indexOf(cfg.id) < 0) {
                arr2.push({ heroId: cfg.id, has: false })
            }
        }
        this.listData = arr
        this.listData2 = arr2

        let str = `已收集 <font color=0x724E1A>${arr.length}/${arr.length + arr2.length}</font>`
        this.cLab.textFlow = new egret.HtmlTextParser().parser(str)

        TimerManager.ins().doTimer(500, 1, this.upList, this)
    }

    upList() {
        this.upGrp()
        this.list2.dataProvider = new eui.ArrayCollection(this.listData2)
    }

    upGrp() {
        this.selItem = null
        this.grp1.removeChildren()
        let gapV = 24, gapH = 28, w = 200, h = 320, maxW = this.grp1.width - w
        let x = 0, y = 0
        let ids = UserModel.ins().getListMatIds()
        let list = []
        for (let item of this.listData) {
            if (ids.indexOf(item.heroId) < 0) {
                list.push(item)
            }
        }
        for (let i = 0; i < list.length; i++) {
            let item = list[i]
            let obj = new HeroItem()
            obj.x = x
            obj.y = y
            obj.data = item
            obj.setCallBack(this.posFun.bind(this))
            x += gapV + w
            if (x > maxW) {
                x = 0
                y += gapH + h
            }
            this.grp1.addChild(obj)
        }
    }

    selItem: HeroItem
    posFun(parm: { isTap: boolean, item?: HeroItem }) {
        if (parm.isTap) {
            if (this.selItem) {
                this.selItem.currentState = 'normal'
            }
            this.selItem = parm.item
            this.selItem.currentState = 'use'
            let parent = this.selItem.parent
            parent.addChildAt(this.selItem, parent.numChildren)
        }
        else {
            this.selItem.currentState = 'normal'
        }
    }

    public close(...param: any[]): void {
        // App.ins().destoryBanner()
        this.listData = null
        this.listData2 = null
        this.selItem = null
        this.grp1.removeChildren()
    }

    // private onClick(e: egret.TouchEvent): void {
    //     switch (e.currentTarget) {
    //         case this.closeBtn:
    //             ViewManager.ins().close(this)
    //             break;
    //     }
    // }

}
ViewManager.ins().reg(HeroGroupWin, LayerManager.UI_Main);