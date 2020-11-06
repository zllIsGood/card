/**
 * 常量类
 * @author kei
 * @since 2019-01-28
 */
class Constant {

    public static COLOR_LOCK_NAME = "color-lock";

    public static COLOR_SELECTED_NAME = "color-selected";

    public static IMAGE_BASE64_PREFIX = "data:image/png;base64,";


    public static SYSTEM_INFO_WIDTH = "system_info_width";
    public static SYSTEM_INFO_HEIGHT = "system_info_height";


    public static LOGIN_TOKEN = "login_token";
    public static LOGIN_USER_ID = "login_user_id";
    public static LOGIN_AWARD = "login_award";

    public static RECORD_SHARE_URL = "record_share_url";

    public static WATCH_AD_COUNT = "watch_ad_count";
    public static WATCH_AD_DAY = "watch_ad_day";

    public static HEADER_X_WWW_FORM_URLENCODED = {
        "content-type": "application/x-www-form-urlencoded",
        "platform": Main.gamePlatform
    };

    public static USER_PROTO = "USER_PROTO"
    public static DATA_VERSION = 'DATA_VERSION' //数据版本

    public static AD_CFG = "AD_CFG"
}
window["Constant"] = Constant;