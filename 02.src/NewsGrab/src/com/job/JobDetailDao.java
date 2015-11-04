package com.job;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 * 招聘信息数据库处理的类
 * 
 * @author Administrator
 *
 */
public class JobDetailDao {

    /**
     * 招聘信息写入数据库
     * 
     * @param joblist
     *            招聘信息list
     * @param jobDBPath
     *            数据库路径
     * @param insertSQL
     *            插入数据的SQL
     */
    public void insertJobDetail(ArrayList<JobDetailDto> joblist,
            String jobDBPath, String insertSQL) {
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            // 链接数据库
            Class.forName("org.sqlite.JDBC");
            conn = DriverManager.getConnection(jobDBPath);
            ps = conn.prepareStatement(insertSQL);

            // 准备插入数据的SQL
            for (JobDetailDto dto : joblist) {
                int index = 1;
                // 岗位名
                ps.setString(index++, dto.getJobname());
                // 招聘人数
                ps.setString(index++, dto.getHiringnum());
                // 性别
                ps.setString(index++, dto.getSex());
                // 年龄
                ps.setString(index++, dto.getAge());
                // 薪资
                ps.setString(index++, dto.getSalary());
                // 招聘公司名
                ps.setString(index++, dto.getCompanyname());
                // 招聘公司联系人
                ps.setString(index++, dto.getCompanyhr());
                // 招聘公司联系电话
                ps.setString(index++, dto.getCompanyphoneno());
                // 招聘公司地址
                ps.setString(index++, dto.getCompanyaddr());

                // 插入数据
                try {
                    ps.executeUpdate();
                } catch (Exception e) {
                    e.printStackTrace();
                    // 插入数据失败 直接插入下一条
                    continue;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                ps.close();
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 删除全部招聘信息的数据
     * 
     * @param jobDBPath
     *            数据库路径
     */
    public void deleteALLJobDetail(String jobDBPath) {
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            // 链接数据库
            Class.forName("org.sqlite.JDBC");
            conn = DriverManager.getConnection(jobDBPath);
            ps = conn.prepareStatement("delete from job where 1 = ?");

            // 岗位名
            ps.setInt(1, 1);
            // 删除数据
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                ps.close();
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
