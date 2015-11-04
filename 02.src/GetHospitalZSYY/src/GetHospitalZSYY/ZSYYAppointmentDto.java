package GetHospitalZSYY;

public class ZSYYAppointmentDto {
    
    // 医院代码
    private String hospitalId;
    
    // 科室编号
    private String departmentId;
    
    // 医生编号
    private String doctorId;

    // 医生姓名
    private String name;
    
    // 医生职称
    private String title;
    
    // 医生擅长
    private String speciality;
    
    // 挂号日期
    private String regDate;
    
    // 挂号上下午(挂号时间)
    private String regTime;
    
    // 剩余挂号数
    private String leftNum;
    
    // 排班表ID
    private String scheduleId;

    /**
     * @return the hospitalId
     */
    public String getHospitalId() {
        return hospitalId;
    }

    /**
     * @return the departmentId
     */
    public String getDepartmentId() {
        return departmentId;
    }

    /**
     * @return the doctorId
     */
    public String getDoctorId() {
        return doctorId;
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @return the title
     */
    public String getTitle() {
        return title;
    }

    /**
     * @return the speciality
     */
    public String getSpeciality() {
        return speciality;
    }

    /**
     * @return the regDate
     */
    public String getRegDate() {
        return regDate;
    }

    /**
     * @return the regTime
     */
    public String getRegTime() {
        return regTime;
    }

    /**
     * @return the leftNum
     */
    public String getLeftNum() {
        return leftNum;
    }

    /**
     * @return the scheduleId
     */
    public String getScheduleId() {
        return scheduleId;
    }

    /**
     * @param hospitalId the hospitalId to set
     */
    public void setHospitalId(String hospitalId) {
        this.hospitalId = hospitalId;
    }

    /**
     * @param departmentId the departmentId to set
     */
    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }

    /**
     * @param doctorId the doctorId to set
     */
    public void setDoctorId(String doctorId) {
        this.doctorId = doctorId;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @param title the title to set
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * @param speciality the speciality to set
     */
    public void setSpeciality(String speciality) {
        this.speciality = speciality;
    }

    /**
     * @param regDate the regDate to set
     */
    public void setRegDate(String regDate) {
        this.regDate = regDate;
    }

    /**
     * @param regTime the regTime to set
     */
    public void setRegTime(String regTime) {
        this.regTime = regTime;
    }

    /**
     * @param leftNum the leftNum to set
     */
    public void setLeftNum(String leftNum) {
        this.leftNum = leftNum;
    }

    /**
     * @param scheduleId the scheduleId to set
     */
    public void setScheduleId(String scheduleId) {
        this.scheduleId = scheduleId;
    }

}
