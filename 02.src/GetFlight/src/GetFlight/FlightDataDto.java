package GetFlight;

/**
 * 航班信息
 * @author Administrator
 *
 */
public class FlightDataDto {
    
    // 航班号
    private String flightNO;
    
    // 出发机场
    private String dptAirport;
    
    // 计划出发时间
    private String planDptTime;
    
    // 到达机场
    private String arrAirport;
    
    // 计划到达时间
    private String planArrTime;

    /**
     * @return the flightNO
     */
    public String getFlightNO() {
        return flightNO;
    }

    /**
     * @return the dptAirport
     */
    public String getDptAirport() {
        return dptAirport;
    }

    /**
     * @return the planDptTime
     */
    public String getPlanDptTime() {
        return planDptTime;
    }

    /**
     * @return the arrAirport
     */
    public String getArrAirport() {
        return arrAirport;
    }

    /**
     * @return the planArrTime
     */
    public String getPlanArrTime() {
        return planArrTime;
    }

    /**
     * @param flightNO the flightNO to set
     */
    public void setFlightNO(String flightNO) {
        this.flightNO = flightNO;
    }

    /**
     * @param dptAirport the dptAirport to set
     */
    public void setDptAirport(String dptAirport) {
        this.dptAirport = dptAirport;
    }

    /**
     * @param planDptTime the planDptTime to set
     */
    public void setPlanDptTime(String planDptTime) {
        this.planDptTime = planDptTime;
    }

    /**
     * @param arrAirport the arrAirport to set
     */
    public void setArrAirport(String arrAirport) {
        this.arrAirport = arrAirport;
    }

    /**
     * @param planArrTime the planArrTime to set
     */
    public void setPlanArrTime(String planArrTime) {
        this.planArrTime = planArrTime;
    }
}
