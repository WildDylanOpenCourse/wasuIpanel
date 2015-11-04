package GetTrain;

/**
 * 车次信息
 * @author Administrator
 *
 */
public class TrainDataDto {

    // 车次
    private String trainNo;
    
    // 出发车站
    private String depStation;
    
    // 到达车站
    private String arrStation;
    
    // 出发时间
    private String deptTime;
    
    // 到达时间
    private String arrTime;

    /**
     * @return the trainNo
     */
    public String getTrainNo() {
        return trainNo;
    }

    /**
     * @return the depStation
     */
    public String getDepStation() {
        return depStation;
    }

    /**
     * @return the arrStation
     */
    public String getArrStation() {
        return arrStation;
    }

    /**
     * @return the deptTime
     */
    public String getDeptTime() {
        return deptTime;
    }

    /**
     * @return the arrTime
     */
    public String getArrTime() {
        return arrTime;
    }

    /**
     * @param trainNo the trainNo to set
     */
    public void setTrainNo(String trainNo) {
        this.trainNo = trainNo;
    }

    /**
     * @param depStation the depStation to set
     */
    public void setDepStation(String depStation) {
        this.depStation = depStation;
    }

    /**
     * @param arrStation the arrStation to set
     */
    public void setArrStation(String arrStation) {
        this.arrStation = arrStation;
    }

    /**
     * @param deptTime the deptTime to set
     */
    public void setDeptTime(String deptTime) {
        this.deptTime = deptTime;
    }

    /**
     * @param arrTime the arrTime to set
     */
    public void setArrTime(String arrTime) {
        this.arrTime = arrTime;
    }

}
