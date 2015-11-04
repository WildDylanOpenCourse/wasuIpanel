package GetWeather;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import net.sf.json.JSONObject;

/**
 * Servlet implementation class GetWeather
 */
@WebServlet("/GetWeather")
public class GetWeather extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetWeather() {
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
        // 如果是getDinghaiWeather 获取定海的天气信息
        if("getDinghaiWeather".equals(call)) {
            // 天气信息
            returnDataStr = getWeatherInfo("定海", "101211106");
        // 否则
        } else {
            // 返回空
            returnDataStr = " ";
        }
        
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
     * 得到特定城市的天气信息
     * @param cityname 城市名(汉字)
     * @param citycode 城市编号(数字)
     * @return 天气+最高温度+最低温度+风向+风力的字符串
     */
    public String getWeatherInfo(String cityname, String citycode) {
        // 查询天气信息的基准API
        String searchURL = "http://apis.baidu.com/apistore/weatherservice/recentweathers";
        // 天气信息的字符串
        String weatherStr = " ";
        
        Document doc = null;
        try {
            Connection conn = Jsoup.connect(searchURL);
            conn.userAgent(
                    "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0");
            conn.timeout(5000);
            // 设置查询请求的apikey
            conn.header("apikey", "2a5dad4cff6d4864f2c6d43a86c70af0");
            // 设置查询请求的参数
            // 城市名
            conn.data("cityname", cityname);
            // 城市代码
            conn.data("cityid", citycode);
            // 查询天气信息
            doc = conn.ignoreContentType(true).get();
        // 查询天气信息的异常处理
        } catch (Exception e) {
            // 输出错误信息
            e.printStackTrace();
            // 返回空的天气信息
            return weatherStr;
        }
        String info = doc.text();
        // 数据转化成Json object
        JSONObject obj = JSONObject.fromObject(info);
        
        // 如果查询成功
        if(0 == obj.getInt("errNum") && 
           !"数据查询异常!".equals(obj.getString("retData"))) {
            try {
                // 得到指定城市当天的天气信息
                JSONObject weatherObj = obj.getJSONObject("retData").getJSONObject("today");
                // 设置前台需要的天气
                // 天气
                weatherStr = weatherObj.getString("type") + " " +
                // 最低温度
                             weatherObj.getString("lowtemp") + "~" +
                // 最高温度
                             weatherObj.getString("hightemp") + " " +
                // 风向
                             weatherObj.getString("fengxiang") + " " +
                // 风力
                             weatherObj.getString("fengli");
            // 设置数据的异常处理
            } catch (Exception e) {
                // 输出错误信息
                e.printStackTrace();
                // 天气信息为空
                weatherStr = " ";
            }
        // 如果查询不成功
        } else {
            // 天气信息为空
            weatherStr = " ";
        }

        return weatherStr;
    }
}
