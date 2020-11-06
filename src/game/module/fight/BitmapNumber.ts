/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-09 17:38:28 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-09 18:12:11
 */
class BitmapNumber extends BaseClass {
    private _labelPool: eui.BitmapLabel[];

    public constructor() {
        super();
        this._labelPool = [];
    }


    public static ins(): BitmapNumber {
        return super.ins() as BitmapNumber;
    }
	/*
	 * 创建一个艺术字 num完整
	 * */
    public createNumPicWithFullName(num: number | string, type: string, offset: number = 0, offsetY: number = 0): eui.BitmapLabel {
        let numStr: string = num.toString();

        let tempBm: eui.BitmapLabel = this.getLabel();
        tempBm.font = `${type}_fnt`;
        tempBm.letterSpacing = offset;
        tempBm.lineSpacing = offsetY;
        tempBm.text = numStr;

        TimerManager.ins().doFrame(1, 1, () => {
            tempBm.anchorOffsetX = tempBm.width / 2
            tempBm.anchorOffsetY = tempBm.height / 2
        }, this)
        return tempBm;
    }

    //销毁
    public desstroyNumPic(target: eui.BitmapLabel): void {
        this.recycleBM(target);
    }

	/*
	 * 改变
	 * */
    public changeNum(target: eui.BitmapLabel, num: number | string, type: string, offset: number = 0, offsetY: number = 0): void {
        let numStr: string = num.toString();

        target.text = numStr;
        target.font = `${type}_fnt`;
        target.letterSpacing = offset;
        target.lineSpacing = offsetY;
    }

    //回收
    private recycleBM(target: eui.BitmapLabel): void {
        if (target) {
            DisplayUtils.removeFromParent(target);
            target.scaleX = target.scaleY = target.alpha = 1;
            target.x = target.y = target.letterSpacing = target.lineSpacing
                = target.anchorOffsetX = target.anchorOffsetY = 0;
            target.text = "";
            target.font = null;
            this._labelPool.push(target);
        }
    }

    private getLabel(): eui.BitmapLabel {
        if (this._labelPool.length)
            return this._labelPool.shift();
        return new eui.BitmapLabel();
    }
}