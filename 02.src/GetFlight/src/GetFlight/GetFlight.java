package GetFlight;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
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
 * Servlet implementation class GetFlight
 */
@WebServlet("/GetFlight")
public class GetFlight extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetFlight() {
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
        // 如果是gettime 获取当前时间
        } else if("gettime".equals(call)) {
            // 当前时间
            returnDataStr = getTime();
        // 否则  获取航班信息
        } else {
            // 获取航班信息需要的参数
            // 当天开始延后的天数
            String daydelay = request.getParameter("daydelay");
            // 根据当天开始延后的天数得到出发日期 yyyy-MM-dd
            String searchdate = getSearchDate(daydelay);
            // 出发地  URLEncode编码之后的
            String depcity = request.getParameter("depcity");
            // 到达地 URLEncode编码之后的
            String arrcity = request.getParameter("arrcity");
            // 航班信息
            returnDataStr = getFlightData(searchdate, depcity, arrcity);
            
            System.out.println("daydelay = " + daydelay + " searchdate = " + searchdate);
            System.out.println("depcity = " + depcity);
            System.out.println("arrcity = " + arrcity);
        }
//	    System.out.println(returnDataStr);
	    
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
     * 根据当天开始延后的天数设置指定日期的字符串  yyyy-MM-dd格式
     * @param daydelay 当天开始延后的天数(1~7)
     * @return 返回指定日期的字符串
     */
    public String getSearchDate(String daydelay) {

        // 得到数字形式的星期几
        int intdaydelay = Integer.parseInt(daydelay);
        
        // 得到当前日期的星期几
        Calendar cal = Calendar.getInstance(Locale.CHINA);
        cal.setTime(new Date());
        
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        // 设置指定的日期 从本日开始往后的日期
        cal.add(Calendar.DAY_OF_MONTH, intdaydelay);            

        // 返回指定日期的字符串  yyyy-MM-dd
        return sdf.format(cal.getTime());
    }

    /**
     * 获取航班信息
     * @param searchdate 出发日期
     * @param depcity 出发地
     * @param arrcity 到达地
     * @return 航班信息的Json字符串
     */
    public String getFlightData(String searchdate, String depcity, String arrcity) {
        
        // 查询航班信息的基准API
        String searchURL =  "https://sp0.baidu.com/9_Q4sjW91Qh3otqbppnN2DJv/"
                            + "pae/channel/data/asyncqury?"
                            + "cb=jQuery11020608647977700457_1440032338298"
                            + "&date=searchdate&dep=depcity&arr=arrcity"
                            + "&appid=4047&_=1440032338307";
        // 替换查询参数
        // 出发时间
        searchURL = searchURL.replaceFirst("searchdate", searchdate);
        // 出发地
        searchURL = searchURL.replaceFirst("depcity", depcity);
        // 到达地
        searchURL = searchURL.replaceFirst("arrcity", arrcity);
        // 存储航班信息的list
        ArrayList<FlightDataDto> flightDataList = new ArrayList<>();

        Document doc = null;
        try {
            Connection conn = Jsoup.connect(searchURL);
            conn.userAgent("Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0");
            conn.timeout(5000);
            // 查询航班信息
            doc = conn.ignoreContentType(true).get();
        // 查询航班信息异常处理
        } catch (IOException e) {
            // 输出错误信息
            e.printStackTrace();
            // 转换空的航班信息
            JSONArray array = JSONArray.fromObject(flightDataList);
            // 返回空航班信息的Json字符串
            return array.toString();
        }
        // 处理查询到的航班信息  截取其中Json格式的数据部分
        String info = doc.text().substring(doc.text().indexOf("(")+1, doc.text().lastIndexOf(")"));
        // 数据转化成Json object
        JSONObject obj = JSONObject.fromObject(info);
        
        // 如果查询成功
        if("0".equals(obj.getString("status"))) {
            // 从数据部分中 取出航班信息的数据
            JSONArray array = JSONArray.fromObject(obj.get("data").toString());
            // 截取前台需要的数据字段
            for(int i=0; i<array.size(); i++) {
                FlightDataDto dto = new FlightDataDto();
                // 单条航班信息转换成Json object
                JSONObject flightDataObj = (JSONObject) array.get(i);
                
                // 航班号
                dto.setFlightNO(flightDataObj.getString("flightNO"));
                // 出发机场
                dto.setDptAirport(flightDataObj.getString("dptAirport"));
                // 计划出发时间  HH:mm格式
                dto.setPlanDptTime(flightDataObj.getString("planDptTime").
                                       replaceAll("\\d+-\\d+-\\d+\\s", ""));
                // 到达机场
                dto.setArrAirport(flightDataObj.getString("arrAirport"));
                // 计划到达时间 HH:mm格式
                dto.setPlanArrTime(flightDataObj.getString("planArrTime").
                                       replaceAll("\\d+-\\d+-\\d+\\s", ""));
                
                // 单条航班信息存入list中
                flightDataList.add(dto);
            }
        } 
        
        // 把前台需要的信息转换成Json array
        JSONArray flightDataArray = JSONArray.fromObject(flightDataList);
        // 返回Json字符串
        return flightDataArray.toString();
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
    
    /**
     * 得到当前的时间 HH:mm
     * @return
     */
    public String getTime() {
        
        Calendar cal = Calendar.getInstance(Locale.CHINA);
        cal.setTime(new Date());
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        return sdf.format(cal.getTime());
    }
}

