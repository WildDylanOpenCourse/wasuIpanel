package GetHospitalZSYY;

/**
 * 医生信息DTO
 * @author Administrator
 *
 */
public class ZSYYDoctorDto {
    
    // 医院代码
    private String hospitalId;
    
    // 科室编号
    private String departmentId;

    // 医生编号
    private String doctorId;
    
    // 医生姓名
    private String name;
    
    // 医生擅长
    private String speciality;
    
    // 医生职称
    private String title;

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
     * @return the speciality
     */
    public String getSpeciality() {
        return speciality;
    }

    /**
     * @return the title
     */
    public String getTitle() {
        return title;
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
     * @param speciality the speciality to set
     */
    public void setSpeciality(String speciality) {
        this.speciality = speciality;
    }

    /**
     * @param title the title to set
     */
    public void setTitle(String title) {
        this.title = title;
    }

}
