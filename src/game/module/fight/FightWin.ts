/* 战斗ui界面
 * @Author: zhoulanglang 
 * @Date: 2020-10-09 15:37:50 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-12-01 15:30:31
 */
class FightWin extends BaseEuiView {
    ownPwBar: eui.ProgressBar//我方能量条 
    enemyPwBar: eui.ProgressBar//对方能量条
    subjectitems: SubjectItem//题目信息组件
    imgAvaEnemy: eui.Image//对方头像
    imgAvaOwn: eui.Image//自己头像
    rectTouch: eui.Rect
    public constructor() {
        super();
        this.skinName = 'FightSkin'
    }

    public open(...param: any[]): void {
        this.observe(QuestionModel.ins().postBar, this.upView)
        QuestionModel.ins().initSubjects(this.subjectitems)
        this.upView()
        if (!FightManager.ins().isTest) {
            let matchData = FightModel.ins().fightData
            this.imgAvaEnemy.source = matchData.matchInfo.userInfo.avatar
            this.imgAvaOwn.source = matchData.userInfo.userInfo.avatar
        }
        SoundManager.ins().playBg()
    }

    mapView: MapView
    parGroup: eui.Group
    private upView() {
        if (QuestionModel.ins().isPlaying) {
            this.rectTouch.visible = true
        }
        else {
            this.rectTouch.visible = false
        }
        if (this.mapView == null) {
            this.mapView = FightManager.ins().mapView
            this.addChildAt(this.mapView, 0)
        }
        if (this.parGroup == null) {
            this.parGroup = FightManager.ins().parGroup
            this.addChild(this.parGroup)
        }
        this.ownPwBar.value = QuestionModel.ins().ownBar
        this.enemyPwBar.value = QuestionModel.ins().enemyBar

    }


    public close(...param: any[]): void {
        SoundManager.ins().stopBg()
    }


}
ViewManager.ins().reg(FightWin, LayerManager.UI_Popup);