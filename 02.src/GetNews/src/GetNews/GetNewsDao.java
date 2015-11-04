package GetNews;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 * 从数据库中读新闻
 * @author Administrator
 *
 */
public class GetNewsDao {
    
    // 定海新闻 新闻列表
    private static String selectlistdhxw = "select rowid, title, subtitle, shorttext, img "
                                            + "from dhxw "
                                            + "order by rowid desc "
                                            + "limit 4 offset ?";
    // 定海新闻 新闻内容
    private static String selectdhxw = "select rowid, title, subtitle, shorttext, text, img "
                                       + "from dhxw "
                                       + "where rowid = ?";
    // 政策信息 新闻列表
    private static String selectlistzcxx = "select rowid, title, subtitle, shorttext, img "
                                            + "from zcxx "
                                            + "order by rowid desc "
                                            + "limit 4 offset ?";
    // 政策信息 新闻内容
    private static String selectzcxx = "select rowid, title, subtitle, shorttext, text, img "
                                       + "from zcxx "
                                       + "where rowid = ?";
    // 平安定海 新闻列表
    private static String selectlistpadh = "select rowid, title, subtitle, shorttext, img "
                                            + "from padh "
                                            + "order by rowid desc "
                                            + "limit 4 offset ?";
    // 平安定海 新闻内容
    private static String selectpadh = "select rowid, title, subtitle, shorttext, text, img "
                                       + "from padh "
                                       + "where rowid = ?";
    // 应急预警 新闻列表
    private static String selectlistyjyj = "select rowid, title, subtitle, shorttext, img "
                                            + "from yjyj "
                                            + "order by rowid desc "
                                            + "limit 4 offset ?";
    // 应急预警 新闻内容
    private static String selectyjyj = "select rowid, title, subtitle, shorttext, text, img "
                                       + "from yjyj "
                                       + "where rowid = ?";
    // 党建工作 新闻列表
    private static String selectlistdjgz = "select rowid, title, subtitle, shorttext, img "
                                            + "from djgz "
                                            + "order by rowid desc "
                                            + "limit 4 offset ?";
    // 党建工作 新闻内容
    private static String selectdjgz = "select rowid, title, subtitle, shorttext, text, img "
                                       + "from djgz "
                                       + "where rowid = ?";
    // 数据库路径
    private static String DBPath = "jdbc:sqlite:C:/DB/zhengce_service.db";

    /**
     * 获取定海新闻栏目的一页4条新闻
     * @param offset 页号(偏移量)
     * @return
     * @throws ClassNotFoundException
     */
    public ArrayList<NewsDetailDto> getNewlistDHXW(int offset) throws ClassNotFoundException {
        ArrayList<NewsDetailDto> ndlist = new ArrayList<>();
        Connection conn = null;
        PreparedStatement pstat = null;
        ResultSet rs = null;
        try {
            Class.forName("org.sqlite.JDBC");
            conn = DriverManager.getConnection(DBPath);
            pstat = conn.prepareStatement(selectlistdhxw);
            pstat.setInt(1, offset);
            rs = pstat.executeQuery();
            while(rs.next()) {
                NewsDetailDto dto = new NewsDetailDto();
                dto.setRowid(rs.getInt("rowid"));
                dto.setTitle(rs.getString("title"));
                dto.setSubtitle(rs.getString("subtitle"));
                dto.setShorttext(rs.getString("shorttext"));
                dto.setImg(rs.getString("img"));

                ndlist.add(dto);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                rs.close();
                pstat.close();
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return ndlist;
    }
    
    /**
     * 获取政策信息栏目的一页4条新闻
     * @param offset 页号(偏移量)
     * @return
     * @throws ClassNotFoundException
     */
    public ArrayList<NewsDetailDto> getNewlistZCXX(int offset) throws ClassNotFoundException {
        ArrayList<NewsDetailDto> ndlist = new ArrayList<>();
        Connection conn = null;
        PreparedStatement pstat = null;
        ResultSet rs = null;
        try {
            Class.forName("org.sqlite.JDBC");
            conn = DriverManager.getConnection(DBPath);
            pstat = conn.prepareStatement(selectlistzcxx);
            pstat.setInt(1, offset);
            rs = pstat.executeQuery();
            while(rs.next()) {
                NewsDetailDto dto = new NewsDetailDto();
                dto.setRowid(rs.getInt("rowid"));
                dto.setTitle(rs.getString("title"));
                dto.setSubtitle(rs.getString("subtitle"));
                dto.setShorttext(rs.getString("shorttext"));
                dto.setImg(rs.getString("img"));

                ndlist.add(dto);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                rs.close();
                pstat.close();
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return ndlist;
    }
    
    /**
     * 获取平安定海信息栏目的一页4条新闻
     * @param offset 页号(偏移量)
     * @return
     * @throws ClassNotFoundException
     */
    public ArrayList<NewsDetailDto> getNewlistPADH(int offset) throws ClassNotFoundException {
        ArrayList<NewsDetailDto> ndlist = new ArrayList<>();
        Connection conn = null;
        PreparedStatement pstat = null;
        ResultSet rs = null;
        try {
            Class.forName("org.sqlite.JDBC");
            conn = DriverManager.getConnection(DBPath);
            pstat = conn.prepareStatement(selectlistpadh);
            pstat.setInt(1, offset);
            rs = pstat.executeQuery();
            while(rs.next()) {
                NewsDetailDto dto = new NewsDetailDto();
                dto.setRowid(rs.getInt("rowid"));
                dto.setTitle(rs.getString("title"));
                dto.setSubtitle(rs.getString("subtitle"));
                dto.setShorttext(rs.getString("shorttext"));
                dto.setImg(rs.getString("img"));

                ndlist.add(dto);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                rs.close();
                pstat.close();
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return ndlist;
    }
    
    /**
     * 获取应急预警信息栏目的一页4条新闻 TODO
     * @param offset 页号(偏移量)
     * @return
     * @throws ClassNotFoundException
     */
    public ArrayList<NewsDetailDto> getNewlistYJYJ(int offset) throws ClassNotFoundException {
        ArrayList<NewsDetailDto> ndlist = new ArrayList<>();
        Connection conn = null;
        PreparedStatement pstat = null;
        ResultSet rs = null;
        try {
            Class.forName("org.sqlite.JDBC");
            conn = DriverManager.getConnection(DBPath);
            pstat = conn.prepareStatement(selectlistyjyj);
            pstat.setInt(1, offset);
            rs = pstat.executeQuery();
            while(rs.next()) {
                NewsDetailDto dto = new NewsDetailDto();
                dto.setRowid(rs.getInt("rowid"));
                dto.setTitle(rs.getString("title"));
                dto.setSubtitle(rs.getString("subtitle"));
                dto.setShorttext(rs.getString("shorttext"));
                dto.setImg(rs.getString("img"));

                ndlist.add(dto);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                rs.close();
                pstat.close();
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return ndlist;
    }
    
    /**
     * 获取党建工作信息栏目的一页4条新闻
     * @param offset 页号(偏移量)
     * @return
     * @throws ClassNotFoundException
     */
    public ArrayList<NewsDetailDto> getNewlistDJGZ(int offset) throws ClassNotFoundException {
        ArrayList<NewsDetailDto> ndlist = new ArrayList<>();
        Connection conn = null;
        PreparedStatement pstat = null;
        ResultSet rs = null;
        try {
            Class.forName("org.sqlite.JDBC");
            conn = DriverManager.getConnection(DBPath);
            pstat = conn.prepareStatement(selectlistdjgz);
            pstat.setInt(1, offset);
            rs = pstat.executeQuery();
            while(rs.next()) {
                NewsDetailDto dto = new NewsDetailDto();
                dto.setRowid(rs.getInt("rowid"));
                dto.setTitle(rs.getString("title"));
                dto.setSubtitle(rs.getString("subtitle"));
                dto.setShorttext(rs.getString("shorttext"));
                dto.setImg(rs.getString("img"));

                ndlist.add(dto);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                rs.close();
                pstat.close();
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return ndlist;
    }
    
    /**
     * 获取定海新闻栏目中当前这条新闻的详细内容
     * @param rowid 新闻条目编号
     * @return
     * @throws ClassNotFoundException
     */
    public ArrayList<NewsDetailDto> getNewsContentsDHXW(int rowid) throws ClassNotFoundException {
        NewsDetailDto dto = new NewsDetailDto();
        ArrayList<NewsDetailDto> ndlist = new ArrayList<>();
        Connection conn = null;
        PreparedStatement pstat = null;
        ResultSet rs = null;
        try {
            Class.forName("org.sqlite.JDBC");
            conn = DriverManager.getConnection(DBPath);
            pstat = conn.prepareStatement(selectdhxw);
            pstat.setInt(1, rowid);
            rs = pstat.executeQuery();
            while(rs.next()) {                
                dto.setRowid(rs.getInt("rowid"));
                dto.setTitle(rs.getString("title"));
                dto.setSubtitle(rs.getString("subtitle"));
                dto.setShorttext(rs.getString("shorttext"));
                dto.setText(rs.getString("text"));
                dto.setImg(rs.getString("img"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                rs.close();
                pstat.close();
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        ndlist.add(dto);
        return ndlist;
    }
    
    /**
     * 获取政策信息栏目中当前这条新闻的详细内容
     * @param rowid 新闻条目编号
     * @return
     * @throws ClassNotFoundException
     */
    public ArrayList<NewsDetailDto> getNewsContentsZCXX(int rowid) throws ClassNotFoundException {
        NewsDetailDto dto = new NewsDetailDto();
        ArrayList<NewsDetailDto> ndlist = new ArrayList<>();
        Connection conn = null;
        PreparedStatement pstat = null;
        ResultSet rs = null;
        try {
            Class.forName("org.sqlite.JDBC");
            conn = DriverManager.getConnection(DBPath);
            pstat = conn.prepareStatement(selectzcxx);
            pstat.setInt(1, rowid);
            rs = pstat.executeQuery();
            while(rs.next()) {                
                dto.setRowid(rs.getInt("rowid"));
                dto.setTitle(rs.getString("title"));
                dto.setSubtitle(rs.getString("subtitle"));
                dto.setShorttext(rs.getString("shorttext"));
                dto.setText(rs.getString("text"));
                dto.setImg(rs.getString("img"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                rs.close();
                pstat.close();
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        ndlist.add(dto);
        return ndlist;
    }
    
    /**
     * 获取平安定海栏目中当前这条新闻的详细内容
     * @param rowid 新闻条目编号
     * @return
     * @throws ClassNotFoundException
     */
    public ArrayList<NewsDetailDto> getNewsContentsPADH(int rowid) throws ClassNotFoundException {
        NewsDetailDto dto = new NewsDetailDto();
        ArrayList<NewsDetailDto> ndlist = new ArrayList<>();
        Connection conn = null;
        PreparedStatement pstat = null;
        ResultSet rs = null;
        try {
            Class.forName("org.sqlite.JDBC");
            conn = DriverManager.getConnection(DBPath);
            pstat = conn.prepareStatement(selectpadh);
            pstat.setInt(1, rowid);
            rs = pstat.executeQuery();
            while(rs.next()) {                
                dto.setRowid(rs.getInt("rowid"));
                dto.setTitle(rs.getString("title"));
                dto.setSubtitle(rs.getString("subtitle"));
                dto.setShorttext(rs.getString("shorttext"));
                dto.setText(rs.getString("text"));
                dto.setImg(rs.getString("img"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                rs.close();
                pstat.close();
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        ndlist.add(dto);
        return ndlist;
    }
    
    /**
     * 获取应急预警栏目中当前这条新闻的详细内容 TODO
     * @param rowid 新闻条目编号
     * @return
     * @throws ClassNotFoundException
     */
    public ArrayList<NewsDetailDto> getNewsContentsYJYJ(int rowid) throws ClassNotFoundException {
        NewsDetailDto dto = new NewsDetailDto();
        ArrayList<NewsDetailDto> ndlist = new ArrayList<>();
        Connection conn = null;
        PreparedStatement pstat = null;
        ResultSet rs = null;
        try {
            Class.forName("org.sqlite.JDBC");
            conn = DriverManager.getConnection(DBPath);
            pstat = conn.prepareStatement(selectyjyj);
            pstat.setInt(1, rowid);
            rs = pstat.executeQuery();
            while(rs.next()) {                
                dto.setRowid(rs.getInt("rowid"));
                dto.setTitle(rs.getString("title"));
                dto.setSubtitle(rs.getString("subtitle"));
                dto.setShorttext(rs.getString("shorttext"));
                dto.setText(rs.getString("text"));
                dto.setImg(rs.getString("img"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                rs.close();
                pstat.close();
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        ndlist.add(dto);
        return ndlist;
    }
    
    /**
     * 获取党建工作栏目中当前这条新闻的详细内容
     * @param rowid 新闻条目编号
     * @return
     * @throws ClassNotFoundException
     */
    public ArrayList<NewsDetailDto> getNewsContentsDJGZ(int rowid) throws ClassNotFoundException {
        NewsDetailDto dto = new NewsDetailDto();
        ArrayList<NewsDetailDto> ndlist = new ArrayList<>();
        Connection conn = null;
        PreparedStatement pstat = null;
        ResultSet rs = null;
        try {
            Class.forName("org.sqlite.JDBC");
            conn = DriverManager.getConnection(DBPath);
            pstat = conn.prepareStatement(selectdjgz);
            pstat.setInt(1, rowid);
            rs = pstat.executeQuery();
            while(rs.next()) {                
                dto.setRowid(rs.getInt("rowid"));
                dto.setTitle(rs.getString("title"));
                dto.setSubtitle(rs.getString("subtitle"));
                dto.setShorttext(rs.getString("shorttext"));
                dto.setText(rs.getString("text"));
                dto.setImg(rs.getString("img"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                rs.close();
                pstat.close();
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        ndlist.add(dto);
        return ndlist;
    }
}
