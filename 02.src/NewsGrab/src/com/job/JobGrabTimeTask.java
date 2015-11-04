package com.job;

import java.util.Date;
import java.util.TimerTask;

/**
 * 后台定时抓招聘信息
 * @author Administrator
 *
 */
public class JobGrabTimeTask extends TimerTask {
    
    // 招聘网页的URL
    private String joburl = "http://www.zsjob.com.cn/zsjyw/art/2015/06/16/art_11749_50088.html";
    
    // 数据库地址
    private String jobDBPath = "jdbc:sqlite:C:/DB/shebao_service.db";
    
    // 插入数据的SQL
    private String insertSQL = "insert into job (jobname, hiringnum, sex, age, salary, companyname, companyhr, companyphoneno, companyaddr) values (?,?,?,?,?,?,?,?,?)";

    @Override
    public void run() {

        Date date = new Date();
        System.out.println(date.toString() + "\nGrab Start\nStart job");
        try {
            JobGrab jb = new JobGrab(joburl, jobDBPath, insertSQL);
            jb.startGrab();
        } catch (Exception e) {
            e.printStackTrace();
        }
        date = new Date();
        System.out.println("job end\nGrab End\n" + date.toString());
    }

}
