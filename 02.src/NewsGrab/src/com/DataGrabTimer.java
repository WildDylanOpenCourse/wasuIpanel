package com;

import java.util.Timer;

import com.job.JobGrabTimeTask;
import com.news.NewsGrabTimeTask;

/**
 * 定时抓数据
 * @author Administrator
 *
 */
public class DataGrabTimer {
    public static void main(String[] args) {

        //后台自动抓新闻
        NewsGrabTimeTask newsGrabTask = new NewsGrabTimeTask();
        Timer timer = new Timer();
        long newsdelay = 30;
        long newsdelayseconds = 6*60*60;
        long newsintevalPeriod = newsdelayseconds * 1000;
        // schedules the task to be run in an interval
        timer.scheduleAtFixedRate(newsGrabTask, newsdelay, newsintevalPeriod);
        
        //后台自动抓招聘信息
        JobGrabTimeTask jobGrabTask  = new JobGrabTimeTask();
        long jobdelay = 30;
        long jobdelayseconds = 24*60*60;
        long jobintevalPeriod = jobdelayseconds * 1000;
        timer.scheduleAtFixedRate(jobGrabTask, jobdelay, jobintevalPeriod);
        
    }
}
