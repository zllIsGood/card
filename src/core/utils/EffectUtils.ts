class EffectUtiles {
    /**
   * 开始发光闪烁
   * @param obj
   */
    public static startFlash(obj: egret.DisplayObject, flashColor: number, flashTime: number): void {
        let glowFilter: egret.GlowFilter = obj["flashFilter"];
        if (!glowFilter) {
            let color: number = flashColor;        /// 光晕的颜色，十六进制，不包含透明度
            let alpha: number = 1;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
            let blurX: number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
            let blurY: number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
            let strength: number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
            let quality: number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现

            glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality);
            obj.filters = [glowFilter];
            obj["flashFilter"] = glowFilter;
        }
        egret.Tween.get(glowFilter).to({ "alpha": 0 }, flashTime).to({ "alpha": 1 }, flashTime).call(this.startFlash, this, [obj, flashColor, flashTime]);
    }

    /**
     * 停止发光闪烁
     * @param obj
     */
    public static stopFlash(obj: egret.DisplayObject): void {
        let glowFilter: egret.GlowFilter = obj["flashFilter"];
        if (glowFilter) {
            egret.Tween.removeTweens(glowFilter);
            obj.filters = null;
            delete obj["flashFilter"];
        }
    }
}