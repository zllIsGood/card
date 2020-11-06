/* 主页
 * @Author: zhoualnglang 
 * @Date: 2020-03-31 10:27:29 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-10-19 17:42:08
 */
class HomeWin extends BaseEuiView {

    // private bg: eui.Image
    taskBtn: BaseBtn
    cardBtn: BaseBtn
    battleBtn: BaseBtn
    testBtn: BaseBtn

    constructor() {
        super();
        this.skinName = `HomeSkin`;
    }

    public initUI(): void {
        super.initUI();
    }

    public open(...param: any[]): void {
        this.addTouchEvent(this.taskBtn, this.onClick);
        this.addTouchEvent(this.cardBtn, this.onClick);
        this.addTouchEvent(this.battleBtn, this.onClick);
        this.addTouchEvent(this.testBtn, this.onClick);

        this.upView()
    }

    private upView() {
        this.setView(3)
    }

    private setView(num) {
        if (num == this.index) {
            return
        }
        if (this.index != 0) {
            if (this.index == 1) {
                ViewManager.ins().close(TaskMainWin)
            }
            if (this.index == 2) {
                ViewManager.ins().close(HeroGroupWin)
            }
            if (this.index == 3) {
                ViewManager.ins().close(BattleWin)
            }
        }
        if (num == 1) {
            ViewManager.ins().open(TaskMainWin)
        }
        if (num == 2) {
            ViewManager.ins().open(HeroGroupWin)
        }
        if (num == 3) {
            ViewManager.ins().open(BattleWin)
        }
        this.index = num
    }

    public show(isShow) {
        this.setVisible(isShow)
        if (this.index != 0) {
            let view = null
            if (this.index == 1) {
                view = TaskMainWin
            }
            if (this.index == 2) {
                view = HeroGroupWin
            }
            if (this.index == 3) {
                view = BattleWin
            }
            let obj = ViewManager.ins().getView(view)
            if (obj) {
                obj.setVisible(isShow)
            }
        }
    }

    public close(...param: any[]): void {
        this.setView(0)
        this.index = 0
    }

    private index: number = 0

    private onClick(e: egret.TouchEvent): void {
        switch (e.currentTarget) {
            case this.taskBtn:
                this.setView(1)
                break;
            case this.cardBtn:
                this.setView(2)
                break;
            case this.battleBtn:
                this.setView(3)
                break;
            case this.testBtn:
                let view = ViewManager.ins().getView(HomeTsetWin)
                if (view) {
                    ViewManager.ins().close(HomeTsetWin)
                }
                else {
                    ViewManager.ins().open(HomeTsetWin)
                }
                break;
        }
    }

}
ViewManager.ins().reg(HomeWin, LayerManager.UI_Main2);