package com.news;

import java.util.Date;
import java.util.TimerTask;

import com.news.grab.NewsGrabDHXW;
import com.news.grab.NewsGrabDJGZ;
import com.news.grab.NewsGrabPADH;
import com.news.grab.NewsGrabZCXX;

/**
 * 后台定时抓新闻
 * @author Administrator
 *
 */
public class NewsGrabTimeTask extends TimerTask {
    
    // 抓定海新闻栏目的链接
    private String urlDHXW = "http://dhnews.zjol.com.cn/dhnews/jsb/news/index.shtml";
    
    // 抓政策信息栏目的链接
    private String urlZCXX = "http://www.zhoushan.gov.cn/web/zhzf/zwgk/fgwj/zcjd/index.shtml";

    // 抓平安定海栏目的链接
    private String urlPADH = "http://www.padh.gov.cn/index.php/cms/item-list-category-1.shtml";

    // 抓应急预警栏目的链接 TODO 这个栏目的内容来源不确定
//    private String urlYJYJ = "http://dhnews.zjol.com.cn/dhnews/jsb/news/index.shtml";
    
    // 抓党建工作栏目的链接
    private String urlDJGZ = "http://www.zsdj.gov.cn/articles/categories/26";

    // 存图片的地址
    private String imgpath = "C:\\inewsimg\\newsimg.war\\";
    
    // 数据库地址
    private String dbpath = "jdbc:sqlite:C:/DB/zhengce_service.db";

    // 最长短新闻长度
    private int shortTextLength = 100;
    

    @Override
    public void run() {
        // task to run goes here
        Date date = new Date();
        System.out.println(date.toString() + "\nGrab Start\nStart dhxw");
        try {
            // 定海新闻
            NewsGrabDHXW ngdhxw = new NewsGrabDHXW(urlDHXW, imgpath, dbpath, shortTextLength);
            ngdhxw.startgrab();
            System.out.println("dhxw end\nStart zcxx");
            // 政策信息
            NewsGrabZCXX ngzcxx = new NewsGrabZCXX(urlZCXX, imgpath, dbpath, shortTextLength);
            ngzcxx.startgrab();
            System.out.println("zcxx end\nStart padh");
            // 平安定海
            NewsGrabPADH ngpadh = new NewsGrabPADH(urlPADH, imgpath, dbpath, shortTextLength);
            ngpadh.startgrab();
            System.out.println("padh end\nStart yjyj");
            // 应急预警 TODO
//        NewsGrabYJYJ ngyjyj = new NewsGrabYJYJ(urlYJYJ, imgpath, dbpath, shortTextLength);
//        ngyjyj.startgrab();
            System.out.println("yjyj end\nStart djgz");
            // 党建工作
            NewsGrabDJGZ ngdjgz = new NewsGrabDJGZ(urlDJGZ, imgpath, dbpath, shortTextLength);
            ngdjgz.startgrab();
        } catch (Exception e) {
            e.printStackTrace();
        }
        date = new Date();
        System.out.println("djgz end\nGrab End\n" + date.toString());
    }

}
