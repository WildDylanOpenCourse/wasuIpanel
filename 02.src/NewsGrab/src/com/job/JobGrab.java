package com.job;

import java.io.IOException;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * 总招聘网页中抓取招聘信息的类
 * @author Administrator
 *
 */
public class JobGrab {
    
    // 招聘网页的URL
    private String joburl;// = "http://www.zsjob.com.cn/zsjyw/art/2015/06/16/art_11749_50088.html";
    
    // 数据库路径
    private String jobDBPath;
    
    // 插入数据的SQL
    private String insertSQL;
    
    /**
     * 构造函数
     * @param url 招聘网页的URL
     * @param dbpath 数据库路径
     * @param insertsql 插入数据的SQL
     */
    public JobGrab(String url, String dbpath, String insertsql) {
        this.joburl = url;
        this.jobDBPath = dbpath;
        this.insertSQL = insertsql;
    }
    
    /**
     * 得到招聘网页的HTML
     * @return 招聘网页的HTML
     * @throws IOException
     */
    public Document getPageHTML() throws IOException {
        // 创建链接
        Connection conn = Jsoup.connect(joburl);
        conn.userAgent("Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0");
        return conn.get();
    }

    /**
     * 按格式处理招聘单位信息 拼成字符串 用','分割
     * @param employerinfo 待处理的招聘单位信息
     * @return 处理完毕的招聘信息字符串
     */
    public String getEmployerInfo(String employerinfo) {
        StringBuffer sb = new StringBuffer();
        // 先按照空格分割联系人、电话、地址几个部分
        String[] str = employerinfo.split(" | ");
        for(String s : str) {
            // 取得以上3个部分中的数据部分 
            sb.append(s.substring(s.indexOf("：")+1));
            sb.append(',');
        }
        // 去掉末尾最后一个','
        sb.deleteCharAt(sb.length()-1);
        return sb.toString();
    }
    
    /**
     * 招聘岗位详细信息
     * @param companyname 招聘单位名
     * @param employerinfo 招聘单位信息
     * @param jobinfo 招聘岗位信息
     * @return 招聘单位名、单位信息、岗位信息合并后完整的岗位信息的dto
     */
    public JobDetailDto getJobDetail(String companyname, String employerinfo, String jobinfo) {

        JobDetailDto jobdto = new JobDetailDto();
        
        // 招聘公司名
        jobdto.setCompanyname(companyname);
        
        // 招聘单位信息部分
        String[] einfo = employerinfo.split(",");
        // 招聘公司联系人
        jobdto.setCompanyhr(einfo[0]);
        // 招聘公司联系电话
        jobdto.setCompanyphoneno(einfo[1]);
        // 招聘公司地址
        jobdto.setCompanyaddr(einfo[2]);
        
        // 岗位名
        Pattern pattern1 = Pattern.compile("\\d+名");
        Matcher matcher1 = pattern1.matcher(jobinfo);
        if(matcher1.find()) {
            jobdto.setJobname(jobinfo.substring(0, matcher1.start()));
        }
        
        // 招聘人数
        Pattern pattern2 = Pattern.compile("\\d+名");
        Matcher matcher2 = pattern2.matcher(jobinfo);
        if(matcher2.find()) {
            jobdto.setHiringnum(matcher2.group());
        } else {
            jobdto.setHiringnum("人数不限");
        }
        
        // 性别
        Pattern pattern3 = Pattern.compile("男|女|不限");
        Matcher matcher3 = pattern3.matcher(jobinfo);
        if(matcher3.find()) {
            jobdto.setSex(matcher3.group());
        } else {
            jobdto.setSex("不限");
        }
        
        // 年龄
        Pattern pattern4 = Pattern.compile("\\d+-\\d+周岁|年龄不限|\\d+周.?以下");
        Matcher  matcher4 = pattern4.matcher(jobinfo);
        if(matcher4.find()) {
            jobdto.setAge(matcher4.group());
        } else {
            jobdto.setAge("年龄不限");
        }
        
        // 薪资
        Pattern pattern5 = Pattern.compile("\\d+-\\d+周岁|年龄不限|\\d+周.?以下");
        Matcher matcher5 = pattern5.matcher(jobinfo);
        if(matcher5.find()) {
            jobdto.setSalary(jobinfo.substring(matcher5.end()));
        } else {
            jobdto.setSalary("面议");
        }
        
        return jobdto;
    }
    
    /**
     * 从网页中获取招聘信息的主函数  组成招聘信息的list
     * @return 招聘信息的list
     * @throws IOException
     */
    public ArrayList<JobDetailDto> getJobDataFromHTML() {
        // 存储招聘信息的list
        ArrayList<JobDetailDto> joblist = new ArrayList<>();
        // 得到招聘网页的HTML
        Document doc = null;
        try {
            doc = getPageHTML();
        // 连接到招聘网页出现异常
        } catch (Exception e) {
            // 输出异常信息并返回空的招聘信息list
            e.printStackTrace();
            return joblist;
        }
        
        // 定位网页中的每一条招聘信息   <div class=zoom>标签中的<p>标签
        Elements peles = doc.select("div#zoom>p");
        // 汉字正则表达式
        String regEx = "[\\u4e00-\\u9fa5]"; 
        Pattern p = Pattern.compile(regEx);
        // 每一个<p>标签取其中的招聘信息
        for(Element pele : peles) {
            // 过滤掉其中没有数据的部分
            Matcher m = p.matcher(pele.text());
            // 有数据部分的处理
            if(m.find()) {
                // 招聘公司名
                Elements strongele = pele.select("p>strong");
                String companyname = strongele.text();
                // 招聘信息
                Elements spanele = pele.select("p>span:eq(2)");
                String detailinfo = spanele.text();
                // 分割招聘信息
                Pattern pattern = Pattern.compile("\\(\\d+\\)");
                String info[] = pattern.split(detailinfo);
                // 招聘单位信息部分
                String employerinfo = getEmployerInfo(info[0]);
                // 招聘岗位信息部分
                for (int i = 1; i < info.length; i++) {
                    JobDetailDto dto = new JobDetailDto();
                    // 得到这个招聘公司单条的岗位信息
                    String s = info[i];
                    // 拼装完整的招聘信息
                    dto = getJobDetail(companyname, employerinfo, s.replaceAll(" | ", ""));
                    joblist.add(dto);
                }
            }
        }
        
        return joblist;
    }
    
    public void startGrab() {
        
        JobDetailDao dao = new JobDetailDao();

        // 从招聘网页抓取招聘信息
        ArrayList<JobDetailDto> joblist = new ArrayList<>();
        joblist = getJobDataFromHTML();
        if(joblist.size() > 0) {
            System.out.println("Job Number : "+joblist.size());
            // 先删除老的招聘信息数据？
            dao.deleteALLJobDetail(jobDBPath);
            // 数据写入数据库
            dao.insertJobDetail(joblist, jobDBPath, insertSQL);
        }
    }
}
