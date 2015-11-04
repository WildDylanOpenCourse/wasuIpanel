package GetJob;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

/**
 * Servlet implementation class GetJob
 */
@WebServlet("/GetJob")
public class GetJob extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetJob() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	    // 返回前台的字符串
	    String returnDataStr = "";
	    // 查询类型
	    String call = request.getParameter("call");
	    System.out.println("call: "+call);
	    // 查询类型  jobname
	    // 获取岗位名
	    if("jobname".equals(call)) {
	        returnDataStr = getJobName();
	    // 获取招聘信息
	    } else {
	        // 每页显示的数量
	        int limit = Integer.parseInt(request.getParameter("limit"));
	        // 分页号
	        int offset = Integer.parseInt(request.getParameter("offset"));
	        // 岗位名  需要URLDecoder解码
	        String jobname = URLDecoder.decode(request.getParameter("jobname"), "UTF-8");
	        System.out.println("limit: "+limit);
	        System.out.println("offset: "+offset);
	        System.out.println("jobname: "+jobname);
	        // 前台没有传岗位名
	        if(null == jobname || "".equals(jobname)) {
	            // 获取全部招聘信息
	            returnDataStr = getJobDetail(limit, offset);
	        // 前台传了岗位名
	        } else {
	            // 获取指定岗位的招聘信息
	            returnDataStr = getJobDetailByJobname(jobname, limit, offset);
	        }
	    }
	    
	    // 新闻数据返回前台
//        System.out.println(returnDataStr);
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
	 * 从后台获取岗位名
	 * @return 岗位名的Json字符串
	 */
	public String getJobName() {
	    GetJobDao dao = new GetJobDao();
	    // 查询岗位名
	    ArrayList<String> jobnamelist = dao.getJobName();
	    jobnamelist.add(0, "全部");
	    // 转换成Json格式
	    JSONArray jobnamearray = JSONArray.fromObject(jobnamelist);
	    return jobnamearray.toString();
	}
	
	/**
	 * 从后台获取全部招聘信息
	 * @param limit 每页显示的数量
	 * @param offset 分页号
	 * @return 招聘信息的Json字符串
	 */
	public String getJobDetail(int limit, int offset) {
	    GetJobDao dao = new GetJobDao();
	    // 查询全部招聘信息
	    ArrayList<JobDetailDto> joblist = dao.getJobDetail(limit, offset);
	    // 转换成Json格式
	    JSONArray jobarray = JSONArray.fromObject(joblist);
	    return jobarray.toString();
	}
	
	/**
	 * 从后台获取指定岗位的招聘信息
	 * @param jobname 岗位名
	 * @param limit 每页显示的数量
	 * @param offset 分页号
	 * @return 招聘信息的Json字符串
	 */
	public String getJobDetailByJobname(String jobname, int limit, int offset) {
	    GetJobDao dao = new GetJobDao();
	    // 查询指定岗位的招聘信息
	    ArrayList<JobDetailDto> joblist = dao.getJobDetailByJobname(jobname, 
	                                                                limit, 
	                                                                offset);
	    // 转换成Json格式
	    JSONArray jobarray = JSONArray.fromObject(joblist);
	    return jobarray.toString();
	}
}
