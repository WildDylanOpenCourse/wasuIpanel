package GetNews;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

/**
 * Servlet implementation class GetNews
 */
@WebServlet("/GetNews")
public class GetNews extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetNews() {
        super();
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
     *      response)
     */
    protected void doGet(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {

        // 查询的类型  新闻列表或者新闻内容
        String call = "newslist";
        // 新闻内容
        int newstype = 1;
        // 如果查询新闻列表则表示页号  如果查询新闻内容则表示新闻编号
        int num = 0;
        // 从前台获得参数
        call = request.getParameter("call");
        newstype = Integer.parseInt(request.getParameter("newstype"));
        num = Integer.parseInt(request.getParameter("num"));
        System.out.println("call = "+call+"\nnewstype = "+newstype+"\nnum = "+num);

        // 获取新闻数据
        String jsondata = getData(call, newstype, num);
        // 新闻数据返回前台
//        System.out.println(jsondata);
        response.setHeader("Content-type", "text/html;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().print(jsondata);
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
     *      response)
     */
    protected void doPost(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
        
        doGet(request, response);
    }
    
    /**
     * 获取新闻列表或者新闻内容
     * @param call 需要获取的信息
     *   newslist  新闻列表
     *   其他  新闻内容
     * @param newstype 新闻类型
     *  0 定海新闻
     *  1 政策信息
     *  2 平安定海
     *  3 应急预警
     *  4 党建工作
     * @param num 当call为newslist时 num表示offset页号
     *            当call为其他时 num表示rowid新闻编号
     * @return
     */
    private String getData(String call, int newstype, int num) {
        ArrayList<NewsDetailDto> ndlist = new ArrayList<>();
        // 获取新闻列表
        if("newslist".equals(call)) {
            ndlist = getNewsList(newstype, num);
        // 获取新闻内容
//        } else if("newsdata".equals(call)) {
        } else {
            ndlist = getNewsData(newstype, num);
        }
        JSONArray array = JSONArray.fromObject(ndlist);
        return array.toString();
    }

    /**
     * 获取新闻列表 每页显示4条新闻
     * @param newstype 新闻类型
     *  0 定海新闻
     *  1 政策信息
     *  2 平安定海
     *  3 应急预警
     *  4 党建工作
     * @param offset 页号
     * @return 新闻列表
     */
    private ArrayList<NewsDetailDto> getNewsList(int newstype, int offset) {
        ArrayList<NewsDetailDto> ndlist = new ArrayList<>();
        GetNewsDao dao = new GetNewsDao();
        
        try {
            // 根据newstype取栏目新闻列表
            if (0 == newstype) {
                // 定海新闻
                ndlist = dao.getNewlistDHXW(offset*4);
            } else if (1 == newstype) {
                // 政策信息
                ndlist = dao.getNewlistZCXX(offset*4);
            } else if (2 == newstype) {
                // 平安定海
                ndlist = dao.getNewlistPADH(offset*4);
            } else if (3 == newstype) {
                // 应急预警 TODO
                ndlist = dao.getNewlistYJYJ(offset*4);
            } else if (4 == newstype) {
                // 党建工作
                ndlist = dao.getNewlistDJGZ(offset*4);
            } 
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return ndlist;
    }
    
    /**
     * 获取新闻内容
     * @param newstype 新闻类型
     *  0 定海新闻
     *  1 政策信息
     *  2 平安定海
     *  3 应急预警
     *  4 党建工作
     * @param rowid 新闻编号
     * @return 新闻内容
     */
    private ArrayList<NewsDetailDto> getNewsData(int newstype, int rowid) {
        ArrayList<NewsDetailDto> ndlist = new ArrayList<>();
        GetNewsDao dao = new GetNewsDao();
        
        try {
            // 根据newstype取栏目新闻内容
            if (0 == newstype) {
                // 定海新闻
                ndlist = dao.getNewsContentsDHXW(rowid);
            } else if (1 == newstype) {
                // 政策信息
                ndlist = dao.getNewsContentsZCXX(rowid);
            } else if (2 == newstype) {
                // 平安定海
                ndlist = dao.getNewsContentsPADH(rowid);
            } else if (3 == newstype) {
                // 应急预警 TODO
                ndlist = dao.getNewsContentsYJYJ(rowid);
            } else if (4 == newstype) {
                // 党建工作
                ndlist = dao.getNewsContentsDJGZ(rowid);
            } 
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ndlist;
    }
}
