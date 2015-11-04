package com.news.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;

import com.news.dto.NewsDetailDto;

/**
 * 后台定时抓新闻的数据库处理部分
 * @author Administrator
 *
 */
public class NewsGrabDao {
    
    /**
     * 把新闻存到数据库中
     * @param newslist 新闻数据list
     * @param dbpath 数据库路径
     * @param insertSQL 插入数据的SQL
     */
    public void insertNewsData(ArrayList<NewsDetailDto> newslist, String dbpath, String insertSQL) {
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            Class.forName("org.sqlite.JDBC");
            conn = DriverManager.getConnection(dbpath);
            ps = conn.prepareStatement(insertSQL);
 
            for(NewsDetailDto dto : newslist) {
                int index = 1;
                // 新闻链接
                ps.setString(index++, dto.getHref());
                // 新闻标题
                ps.setString(index++, dto.getTitle());
                // 新闻副标题
                ps.setString(index++, dto.getSubtitle());
                // 新闻短内容
                ps.setString(index++, dto.getShorttext());
                // 新闻长内容
                ps.setString(index++, dto.getText());
                // 新闻图片
                ps.setString(index++, dto.getImg());
                
                try {
                    ps.executeUpdate();
                } catch (Exception e) {
                    e.printStackTrace();
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
}
