
class DateUtil {
    /**秒*/
    public static getUnixtime(): number {
        return new Date().getTime() / 1000;
    }

    public static getDayStart(): number {
        return Date.parse(new Date().toDateString()) / 1000;
    }
    /**
     * 返回两个时间戳之间的秒数
     * @param  {} $begin_time
     * @param  {} $end_time
     */
    public static timediff($begin_time, $end_time) {
        if ($begin_time < $end_time) {
            var starttime = $begin_time;
            var endtime = $end_time;
        } else {
            var starttime = $end_time;
            var endtime = $begin_time;
        }

        //计算天数
        let timediff = endtime - starttime
        let days = timediff / 86400;
        //计算小时数
        let remain = timediff % 86400;
        let hours = Math.floor(remain / 3600);
        //计算分钟数
        remain = remain % 3600;
        let mins = Math.floor(remain / 60);
        //计算秒数
        let secs = hours * 60 * 60 + mins * 60
        return secs;
    }

}
window["DateUtil"] = DateUtil;