/*
 * @Author: zhoulanglang 
 * @Date: 2020-10-16 15:54:46 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-10-16 17:14:45
 */
class HomeTsetWin extends BaseEuiView {

    fightBtn: BaseBtn
    stratBtn: BaseBtn
    inBtn: BaseBtn
    editTxt: eui.EditableText
    constructor() {
        super();
        this.skinName = `HomeTsetSkin`;
    }

    public initUI(): void {
        super.initUI();
    }

    public open(...param: any[]): void {
        this.addTouchEvent(this.fightBtn, this.onClick);
        this.addTouchEvent(this.stratBtn, this.onClick);
        this.addTouchEvent(this.inBtn, this.onClick);

        this.upView()
    }

    private upView() {
        this.editTxt.visible = false
    }



    public close(...param: any[]): void {

    }

    private bgSource = ["bg_green_png", "bg_ice_png", "bg_soil_png", "bg_water_png", "bg_3_png"]
    private index: number = 0;
    private onClick(e: egret.TouchEvent): void {
        switch (e.currentTarget) {
            case this.fightBtn:
                ViewManager.ins().close(this)
                FightManager.ins().play(true)
                // let par = ParticleController.ins().playParticle("newParticle", this, -1)
                break;
            case this.inBtn:
                this.editTxt.visible = true
                break;
            case this.stratBtn:
                this.editTxt.visible = false
                let lab = this.editTxt.text
                if (lab) {
                    let arr = lab.split('_')
                    if (arr.length == 12) {
                        let lists = GlobalConfig.testCfg
                        let enemy = []
                        let our = []
                        let cfgs = GlobalConfig.config.monsterConfig
                        for (let i = 0; i < 6; i++) {
                            let id = Number(arr[i])
                            if (cfgs[id]) {
                                cfgs[id].lv = 10
                                our.push(cfgs[id])
                            }
                            else {
                                our.push(null)
                            }
                        }
                        for (let i = 6; i < 12; i++) {
                            let id = Number(arr[i])
                            if (cfgs[id]) {
                                cfgs[id].lv = 10
                                enemy.push(cfgs[id])
                            }
                            else {
                                enemy.push(null)
                            }
                        }
                        GlobalConfig.testCfg = { enemy: enemy, our: our }
                        ViewManager.ins().close(this)
                        FightManager.ins().play(true)
                        return
                    }
                }
                wx.showToast({ icon: 'none', title: `输入错误` })
                break;
        }
    }

}
ViewManager.ins().reg(HomeTsetWin, LayerManager.UI_Main2);