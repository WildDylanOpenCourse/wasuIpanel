package GetJob;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

/**
 * 从数据库中读取招聘信息
 * @author Administrator
 *
 */
public class GetJobDao {
    
    // 查询岗位名
    private String selectJobname = "select  distinct jobname from job";
    // 查询全部招聘信息
    private String selectJobDetail = "select jobname, hiringnum, sex, age, salary, companyname, companyhr, companyphoneno, companyaddr "
                                      + "from job limit ? offset ?";
    // 根据岗位名查询招聘信息
    private String selectJobDetailByJobname = "select jobname, hiringnum, sex, age, salary, companyname, companyhr, companyphoneno, companyaddr "
                                            + "from job "
                                            + "where jobname = ? "
                                            + "limit ? offset ?";
    // 数据库路径
    private String DBPath = "jdbc:sqlite:C:/DB/shebao_service.db";
    
    /**
     * 查询岗位名
     * @return 岗位名
     */
    public ArrayList<String> getJobName() {
        ArrayList<String> jobnameList = new ArrayList<>();
        Connection conn = null;
        Statement stat = null;
        ResultSet rs = null;
        
        // 查询
        try {
            Class.forName("org.sqlite.JDBC");
            conn = DriverManager.getConnection(DBPath);
            stat = conn.createStatement();
            rs = stat.executeQuery(selectJobname);
            // 处理查询结果
            while(rs.next()) {
                jobnameList.add(rs.getString("jobname"));
            }
        } catch(Exception e) {
            e.printStackTrace();
        } finally {
            try {
                rs.close();
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        
        return jobnameList;
    }
    
    /**
     * 查询全部招聘信息
     * @param limit 每页显示的数量
     * @param offset 分页号
     * @return 招聘信息
     */
    public ArrayList<JobDetailDto> getJobDetail(int limit, int offset) {
        ArrayList<JobDetailDto> joblist = new ArrayList<>();
        Connection conn = null;
        PreparedStatement pstat = null;
        ResultSet rs = null;
        
        // 查询
        try {
            Class.forName("org.sqlite.JDBC");
            conn = DriverManager.getConnection(DBPath);
            pstat = conn.prepareStatement(selectJobDetail);
            // 设置查询参数 limit offset
            pstat.setInt(1, limit);
            pstat.setInt(2, offset * limit);
            rs = pstat.executeQuery();
            // 处理查询结果
            while(rs.next()) {
                JobDetailDto dto = new JobDetailDto();
                // 岗位名
                dto.setJobname(rs.getString("jobname"));
                // 招聘人数
                dto.setHiringnum(rs.getString("hiringnum"));
                // 性别
                dto.setSex(rs.getString("sex"));
                // 年龄
                dto.setAge(rs.getString("age"));
                // 薪资
                dto.setSalary(rs.getString("salary"));
                // 招聘公司名
                dto.setCompanyname(rs.getString("companyname"));
                // 招聘公司联系人
                dto.setCompanyhr(rs.getString("companyhr"));
                // 招聘公司联系电话
                dto.setCompanyphoneno(rs.getString("companyphoneno"));
                // 招聘公司地址
                dto.setCompanyaddr(rs.getString("companyaddr"));
                
                joblist.add(dto);
            }
        } catch(Exception e) {
            e.printStackTrace();
        } finally {
            try {
                rs.close();
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        
        return joblist;
    }
    
    /**
     * 查询指定岗位的招聘信息
     * @param jobname 岗位名
     * @param limit 每页显示的数量
     * @param offset 分页号
     * @return 招聘信息
     */
    public ArrayList<JobDetailDto> getJobDetailByJobname(String jobname, int limit, int offset) {
        ArrayList<JobDetailDto> joblist = new ArrayList<>();
        Connection conn = null;
        PreparedStatement pstat = null;
        ResultSet rs = null;
        
        // 查询
        try {
            Class.forName("org.sqlite.JDBC");
            conn = DriverManager.getConnection(DBPath);
            pstat = conn.prepareStatement(selectJobDetailByJobname);
            // 设置查询参数 limit offset
            pstat.setString(1,jobname);
            pstat.setInt(2, limit);
            pstat.setInt(3, offset * limit);
            rs = pstat.executeQuery();
            // 处理查询结果
            while(rs.next()) {
                JobDetailDto dto = new JobDetailDto();
                // 岗位名
                dto.setJobname(rs.getString("jobname"));
                // 招聘人数
                dto.setHiringnum(rs.getString("hiringnum"));
                // 性别
                dto.setSex(rs.getString("sex"));
                // 年龄
                dto.setAge(rs.getString("age"));
                // 薪资
                dto.setSalary(rs.getString("salary"));
                // 招聘公司名
                dto.setCompanyname(rs.getString("companyname"));
                // 招聘公司联系人
                dto.setCompanyhr(rs.getString("companyhr"));
                // 招聘公司联系电话
                dto.setCompanyphoneno(rs.getString("companyphoneno"));
                // 招聘公司地址
                dto.setCompanyaddr(rs.getString("companyaddr"));
                
                joblist.add(dto);
            }
        } catch(Exception e) {
            e.printStackTrace();
        } finally {
            try {
                rs.close();
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        
        return joblist;
    }
}
