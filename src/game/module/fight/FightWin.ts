/* 战斗ui界面
 * @Author: zhoulanglang 
 * @Date: 2020-10-09 15:37:50 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-11-04 14:58:59
 */
class FightWin extends BaseEuiView {
    xImg: BaseBtn
    breakImg: BaseBtn

    public constructor() {
        super();
        this.skinName = 'FightSkin'
    }

    public open(...param: any[]): void {
        this.addTouchEvent(this.xImg, this.onClick);
        this.addTouchEvent(this.breakImg, this.onClick);

        this.upView()
        SoundManager.ins().playBg()
    }

    mapView: MapView
    private upView() {
        if (this.mapView == null) {
            this.mapView = FightManager.ins().mapView
            this.addChildAt(this.mapView, 0)
        }
        let rate = FightManager.ins().rate
        if (rate == 1) {
            this.xImg.icon = 'fight_rate1_png'
        }
        else if (rate == 2) {
            this.xImg.icon = 'fight_rate2_png'
        }

    }


    public close(...param: any[]): void {
        SoundManager.ins().stopBg()
    }

    private onClick(e: egret.TouchEvent): void {
        switch (e.currentTarget) {
            case this.xImg:
                let rate = FightManager.ins().rate
                if (rate == 1) {
                    FightManager.ins().setRate(2)
                    this.xImg.icon = 'fight_rate2_png'
                }
                else if (rate == 2) {
                    FightManager.ins().setRate(1)
                    this.xImg.icon = 'fight_rate1_png'
                }
                break;
            case this.breakImg:
                if (Main.gamePlatform == Main.platformH5) {
                    if (!UserModel.ins().isVip) {
                        TipModel.ins().show({ icon: null, title: "开通vip才可以跳过噢~" })
                        break;
                    }
                }
                FightManager.ins().setBreak()
                break;
        }
    }

}
ViewManager.ins().reg(FightWin, LayerManager.UI_Popup);