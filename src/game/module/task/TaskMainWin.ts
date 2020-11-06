/* 成长线首页
 * @Author: zhoulanglang 
 * @Date: 2020-10-19 16:20:13 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-10-19 18:01:27
 */
class TaskMainWin extends BaseEuiView {

    private goImg: eui.Image
    private starGrp: eui.Group
    private btn: BaseBtn
    private list: eui.List

    private honorLab: eui.Label
    private zoomImg: eui.Image

    public constructor() {
        super();
        this.skinName = 'TaskMainSkin'
        this.list.itemRenderer = TaskRewardItem
    }

    public open(...param: any[]): void {
        this.addTouchEvent(this.goImg, this.onClick);
        this.addTouchEvent(this.starGrp, this.onClick);
        this.addTouchEvent(this.btn, this.onClick);

        this.upView()
    }

    private upView() {
        let data = TaskModel.ins().main
        if (!data) {
            return
        }

        this.honorLab.text = '荣誉值 ' + data.honor
        this.zoomImg.source = UserConst.getZoomIcon(data.dan, data.lv)
        let star = data.star
        for (let i = 0; i < this.starGrp.numChildren; i++) {
            let obj = this.starGrp.getChildAt(i) as eui.Image
            if (obj) {
                obj.source = star >= i + 1 ? 'task_star1_png' : 'task_star2_png'
            }
        }

        this.list.dataProvider = new eui.ArrayCollection(data.awardList)
    }


    public close(...param: any[]): void {

    }

    private onClick(e: egret.TouchEvent): void {
        switch (e.currentTarget) {
            case this.goImg:
            case this.starGrp:
                ViewManager.ins().open(TaskWin)
                break;
            case this.btn:
                // ViewManager.ins().open(UserProtoDetialWin, UserProtoDetialWinOpen.private)
                break;
        }
    }
}
ViewManager.ins().reg(TaskMainWin, LayerManager.UI_Main);