package com.news.grab;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.news.dao.NewsGrabDao;
import com.news.dto.NewsDetailDto;
import com.news.dto.NewsInfoDto;

/**
 * 应急预警栏目的内容抓取  TODO
 *    文字部分存入数据库  
 *    图片部分下载到指定文件夹 并且把地址存入数据库
 * @author Administrator
 *
 */
public class NewsGrabYJYJ {
    
    // 抓新闻的链接
    private String url;// = "http://dhnews.zjol.com.cn/dhnews/jsb/news/index.shtml";
    
    // 存图片的地址
    private String path;// = "D:\\tempfile\\";
    
    // 数据库地址
    private String dbpath;// = "jdbc:sqlite:C:/Users/Administrator/zhengce_service.db";

    // 最长短新闻长度
    private int shortTextLength;// = 100;
    
    // 存新闻到数据库的SQL语句
    private static String insertSQL = "insert into yjyj values (?,?,?,?,?,?)";
    
    /**
     * 构造函数
     * @param url 抓新闻的链接
     * @param imgpath 存图片的地址
     * @param dbpath 数据库地址
     * @param textlength 最长短新闻长度
     */
    public NewsGrabYJYJ(String url, String imgpath, String dbpath, int textlength) {
        this.url = url;
        this.path = imgpath;
        this.dbpath = dbpath;
        this.shortTextLength = textlength;
    }
    
    /**
     * 获取yyyy/MM/dd格式时间的字符串
     * @return
     */
    public String getDate() {
        String todayDate = "";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
        todayDate = sdf.format(new Date());
        return todayDate;
    }
    
    /**
     * 检查是否有重复的URL
     * @param list
     * @param url
     * @return
     */
    public boolean isURLExists(ArrayList<NewsInfoDto> list, String url) {
        
        for(NewsInfoDto info : list) {
            if(info.getUrl().equals(url)) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * 去掉非法字符
     * @param title
     * @return
     */
    public String checkValidStr(String title) {
        title = title.replace('?', ' ');
        title = title.replace('\\', ' ');
        title = title.replace('*', ' ');
        title = title.replace('|', ' ');
        title = title.replace('\"', ' ');
        title = title.replace('<', ' ');
        title = title.replace('>', ' ');
        title = title.replace(':', ' ');
        title = title.replace('/', ' ');
        return title;
    }
    
    /**
     * 获取当日新闻的列表
     * @param strURL
     * @return
     */
    public ArrayList<NewsInfoDto> getNewsList(String strURL) {
        String todayDate = getDate();
        ArrayList<NewsInfoDto> newslist = new ArrayList<NewsInfoDto>();

        Document doc;
        try {
            Connection conn = Jsoup.connect(strURL).userAgent("Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0");
            doc = conn.timeout(10000).get();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        
        // 获取新闻列表中有超链接的元素
        Element alist = doc.getElementsByClass("ArtileList").first();
        Elements newslinks = alist.getElementsByTag("a"); 
        for(Element link : newslinks) {
            // 获取链接的绝对地址
            String linkHref = link.absUrl("href");
            // 文字
            String linkText = link.text();
            // 过滤非当天和文字为空的
            if(linkHref.indexOf(todayDate) < 0 ||
               linkText.length() == 0) {
                continue;
            }
            
            NewsInfoDto ni = new NewsInfoDto();
            ni.setTitle(linkText);
            ni.setUrl(linkHref);
            if(!isURLExists(newslist, linkHref)) {
                newslist.add(ni);
            }
        }
        return newslist;
    }
    
    /**
     * 获取新闻详细内容
     * @param info
     */
    public NewsDetailDto getNewsContents(NewsInfoDto info){
        NewsDetailDto dto = new NewsDetailDto();
        Document doc;
        try {
            URL url = new URL(info.getUrl());
            doc = Jsoup.parse(url, 10000);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        // 取得网页里class为contTxt中的元素
        Elements contTxt = doc.getElementsByClass("contTxt");
        
        // 完整新闻内容
        String fullText;
        // 解析内容时出错 本条新闻不下载
        try {
            fullText = getNewsFullText(contTxt.outerHtml());
        } catch (Exception e) {
            return null;
        }
        // 没有内容 本条新闻不下载
        if(fullText.length() == 0)
            return null;
        // 短新闻内容
        String shortText = getNewsShortText(fullText);
        // 图片
        Document imgDoc = Jsoup.parse(contTxt.outerHtml());
        Elements imgEle = imgDoc.getElementsByTag("img");
        String img = "";
        for (Element link : imgEle) {
            String filename = setNewsImgFile(link);
            if(!"".equals(filename)) {
                img = img + ";" + filename;
            }
        }
        img = img.substring(1);
        dto.setHref(info.getUrl());
        dto.setTitle(info.getTitle());
        dto.setShorttext(shortText);
        dto.setText(fullText);
        dto.setImg(img);
        return dto;
    }
    
    /**
     * 得到分段的新闻内容 
     * @param strHtml
     */
    public String getNewsFullText(String strHtml){
        
        Document pdoc = Jsoup.parse(strHtml);
        Elements peles = pdoc.getElementsByTag("p");
        StringBuffer sb = new StringBuffer();
        for(Element pele : peles) {
            if(pele.outerHtml().indexOf("原标题") < 0 &&
               pele.outerHtml().indexOf("img") < 0 &&
               pele.outerHtml().indexOf("style=") < 0 &&
               pele.text().trim().length() != 0) {
                
                sb.append(pele.text().replaceAll(" ", " ")+"\n");
             }
        }
        return sb.toString();
    }
    
    /**
     * 得到短的新闻内容
     * @param strHtml
     */
    public String getNewsShortText(String strHtml){

        String detail = strHtml.replaceAll("　", "");
        if(detail.length() > shortTextLength) {
            detail = detail.substring(0, shortTextLength) + "..";
        }
        return detail;
    }
    
    /**
     * 存图片 并返回图片名
     * @param ele
     */
    public String setNewsImgFile(Element ele) {
        String strURL = ele.absUrl("src");
        String filename = strURL.substring(strURL.lastIndexOf("/") + 1);
        InputStream is = null;
        FileOutputStream fos = null;
        File imgFile = new File(path + "\\" + filename);
        try {
            // 获取网页中的图片
            URL imgurl = new URL(strURL);
            URLConnection conn = imgurl.openConnection();
            is = conn.getInputStream();
 
            fos = new FileOutputStream(imgFile);
            int i = 0;
            while ((i = is.read()) != -1) {
                fos.write(i);
            }
        } catch (Exception e) {
            e.printStackTrace();
            // 图片保存出错  删除图片
            imgFile.delete();
            filename = "";
        } finally {
            try {
                is.close();
                fos.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return filename;
    }

//    /**
//     * 递归删除文件夹
//     * @param dir
//     * @return
//     */
//    public boolean deleteDir(File dir) {
//        if(dir.isDirectory()) {
//            String[] children = dir.list();
//            for(String child : children) {
//                boolean success = deleteDir(new File(dir, child));
//                if(!success) {
//                    return false;
//                }
//            }
//        }
//        return dir.delete();
//    }
    
    public void startgrab(){
        
        // 抓新闻
        ArrayList<NewsInfoDto> nilist = new ArrayList<NewsInfoDto>();
        // 取得新闻列表
        nilist = getNewsList(url);
        ArrayList<NewsDetailDto> ndlist = new ArrayList<>();
        // 获取新闻内容 下载图片
        for(NewsInfoDto dto : nilist) {
            System.out.println(dto.getTitle());
            NewsDetailDto nd = getNewsContents(dto);
            if(null != nd) {
                ndlist.add(nd);
            }
        }
        // 内容写入数据库
        NewsGrabDao dao = new NewsGrabDao();
        dao.insertNewsData(ndlist, dbpath, insertSQL);
    }
  
//    public static void main(String[] args) {
//        
//        NewsGrabDHXW hd = new NewsGrabDHXW();
//        hd.startgrab();     
//    }
}