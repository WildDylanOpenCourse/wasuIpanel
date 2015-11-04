package GetTrain;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.Locale;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * Servlet implementation class GetTrain
 */
@WebServlet("/GetTrain")
public class GetTrain extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetTrain() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	    // 需要获取的数据
        String call = request.getParameter("call");
        System.out.println("call = " + call);
        
        String returnDataStr = "";
        // 根据前台传来需要获取的数据  调用不同的数据获取函数
        // 如果是getdayofweek 获取当天的星期数
        if("getdayofweek".equals(call)) {
            // 当天的星期数
            returnDataStr = getNowDayOfWeek();
        // 否则  获取列车车次信息
        } else {
            // 获取列车车次信息需要的参数
            // 当天开始延后的天数
            String daydelay = request.getParameter("daydelay");
            // 根据当天开始延后的天数得到出发日期yyyyMMdd
            String searchdate = getSearchDate(daydelay);
            // 出发地  URLEncode编码之后的
            String depcity = request.getParameter("depcity");
            // 到达地 URLEncode编码之后的
            String arrcity = request.getParameter("arrcity");
            // 列车车次信息
            returnDataStr = getTrainData(searchdate, depcity, arrcity);
            
            System.out.println("daydelay = " + daydelay + " searchdate = " + searchdate);
            System.out.println("depcity = " + depcity);
            System.out.println("arrcity = " + arrcity);
        }
//        System.out.println(returnDataStr);
        
        // 向前台返回信息
        response.setHeader("Content-type", "text/html;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().print(returnDataStr);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
	
	   /**
     * 获取列车车次信息
     * @param searchdate 出发日期
     * @param depcity 出发地
     * @param arrcity 到达地
     * @return 列车车次信息的json字符串
     */
    public String getTrainData(String searchdate, String depcity, String arrcity) {
        // 查询航班信息的基准API
        String searchURL =  "http://train.qunar.com/search/stationtostation.jsp?format=json&"
                            + "from=fromcity&"
                            + "to=tocity&"
                            + "type=oneway&canBuy=1&"
                            + "date=searchdate&"
                            + "trainDateVersion=datever&"
                            + "ver=1440387079191&callback=jQuery172016651165043003857_1440387078837&_=1440387079192";
        // 替换查询参数
        // 出发时间
        searchURL = searchURL.replaceFirst("searchdate", searchdate);
        // 出发地
        searchURL = searchURL.replaceFirst("fromcity", depcity);
        // 到达地
        searchURL = searchURL.replaceFirst("tocity", arrcity);
        // 版本
        searchURL = searchURL.replaceFirst("datever", searchdate);
        // 存储列车车次信息的list
        ArrayList<TrainDataDto> trainDataList = new ArrayList<>();
        // 存储列车车次信息的json结构
        JSONArray trainDataArray = new JSONArray();
        
        Document doc = null;
        try {
            Connection conn = Jsoup.connect(searchURL);
            conn.userAgent("Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0");
            conn.timeout(5000);
            // 查询列车车次信息
            doc = conn.ignoreContentType(true).get();
        // 查询航班信息异常处理
        } catch (IOException e) {
            // 输出错误信息
            e.printStackTrace();
            // 转换空的列车车次信息
            trainDataArray = JSONArray.fromObject(trainDataList);
            // 返回空列车车次信息的Json字符串
            return trainDataArray.toString();
        }
        // 处理查询到的列车车次信息  截取其中Json格式的数据部分
        String info = doc.text().substring(doc.text().indexOf("(")+1, doc.text().lastIndexOf(")"));
        // 数据转化成Json object
        JSONObject obj = JSONObject.fromObject(info);
        
        // 如果查询成功
        if(obj.getInt("count") > 0) {
            // 得到查询到的列车车次信息列表
            JSONObject dataInfoList = obj.getJSONObject("dataInfo");
            // 列表按照车次分开
            @SuppressWarnings("unchecked")
            Iterator<String> keys = dataInfoList.keys();
            // 从列车车次信息中截取前台需要的数据
            while(keys.hasNext()) {
                TrainDataDto dto = new TrainDataDto();
                // 得到本条车次
                String trainNo = keys.next();
                // 得到本条车次信息
                JSONObject dataObj = dataInfoList.getJSONObject(trainNo);
                // 车次
                dto.setTrainNo(trainNo);
                // 出发车站
                dto.setDepStation(dataObj.getString("from"));
                // 出发时间
                dto.setDeptTime(dataObj.getString("dt"));
                // 到达车站
                dto.setArrStation(dataObj.getString("to"));
                // 到达时间
                dto.setArrTime(dataObj.getString("at"));
                
                trainDataList.add(dto);
            }
        }
        
        // 把前台需要的信息转换成Json array
        trainDataArray = JSONArray.fromObject(trainDataList);
        // 返回Json字符串
        return trainDataArray.toString();
    }
	
    /**
     * 根据当天开始延后的天数设置指定日期的字符串  yyyyMMdd格式
     * @param daydelay 当天开始延后的天数(1~7)
     * @return 返回指定日期的字符串
     */
    public String getSearchDate(String daydelay) {

        // 得到数字形式的星期几
        int intdaydelay = Integer.parseInt(daydelay);
        
        // 得到当前日期的星期几
        Calendar cal = Calendar.getInstance(Locale.CHINA);
        cal.setTime(new Date());
        
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        // 设置指定的日期 从本日开始往后的日期
        cal.add(Calendar.DAY_OF_MONTH, intdaydelay);            

        // 返回指定日期的字符串  yyyy-MM-dd
        return sdf.format(cal.getTime());
    }
    
    /**
     * 得到当前的星期数
     * @return 星期数
     */
    public String getNowDayOfWeek() {
        
        Calendar cal = Calendar.getInstance(Locale.CHINA);
        cal.setTime(new Date());
        // java的星期数从周日开始算 所以实际的需要-1
        int dayofweek = cal.get(Calendar.DAY_OF_WEEK) - 1;
        // 如果是周日的话 -1之后为0  直接设置为7
        if(0 == dayofweek) {
            dayofweek = 7;
        }
        return Integer.toString(dayofweek);
    }
}
