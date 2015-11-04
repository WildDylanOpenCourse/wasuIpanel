package GetHospitalZSYY;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * Servlet implementation class GetHospitalZSYY
 */
@WebServlet("/GetHospitalZSYY")
public class GetHospitalZSYY extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetHospitalZSYY() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
	    //获取参数
	    String call = request.getParameter("call");
	    System.out.println("call: "+call);
	    String returnDataStr = "";
	    
	    // 根据前台传来需要获取的数据  调用不同的数据获取函数
	    // 如果是getAppointmentInfo
	    if("getAppointmentInfo".equals(call)) {
	        String deptId = request.getParameter("deptid");
	        System.out.println("deptid: "+deptId);
	        // 获取指定科室的医生挂号信息
	        returnDataStr = getDocAppData(deptId);
	    // 如果是doAppointment
	    } else if("doAppointment".equals(call)) {
	        // 预约挂号
	        returnDataStr = doAppointment(request);
//	        returnDataStr = "预约成功!";
	    }
//	    System.out.println("returnDataStr: " +returnDataStr);
	    
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
     * 取得医生挂号信息的Json字符串
     * @param deptId 科室编号
     * @return
     */
    public String getDocAppData(String deptId) {
        // 医生信息的list
        ArrayList<ZSYYDoctorDto> docList = getDoctorInfo(deptId);
        // 医生挂号信息的list
        ArrayList<ZSYYAppointmentDto> apptList = new ArrayList<>();
        // 获取每一个医生的挂号信息
        for(ZSYYDoctorDto dto : docList){
            // 挂号信息存入list中
            apptList.addAll(getAppointmentInfo(dto));
        }
        // 医生挂号信息转化为JsonArray
        JSONArray array = JSONArray.fromObject(apptList);
        
        return array.toString();
    }
    
    /**
     * 获取选中科室的医生信息
     * @param deptId 科室编号
     * @return
     */
    public ArrayList<ZSYYDoctorDto> getDoctorInfo(String deptId) {
        
        // 获取医生信息的基准URL
        String doctorBaseURL = "http://61.153.209.115:7001/zsyy/?"
                               + "callback=jQuery111107832739690784365_1440416157601&"
                               + "cmd=get_doctor&"
                               + "hospitalId=10010&"
                               + "departmentId=deptid&"
                               + "token=Jh2044695&_=1440416157604";
        // 科室编号
        doctorBaseURL = doctorBaseURL.replaceFirst("deptid", deptId);
        // 存储医生信息的list
        ArrayList<ZSYYDoctorDto> doctorInfoList = new ArrayList<>();
        
        Document doc = null;
        try {
            doc = Jsoup.connect(doctorBaseURL).ignoreContentType(true).get();
        } catch (IOException e) {
            // 输出错误信息
            e.printStackTrace();
            // 返回空的医生信息
            return doctorInfoList;
        }
        // 查询返回的数据
        String info = doc.text().substring(doc.text().indexOf("(")+1, doc.text().lastIndexOf("")-1);
        // 数据转化成Json object
        JSONObject obj = JSONObject.fromObject(info);
        
        // 如果查询成功
        if(true == obj.getBoolean("success")) {
            // 从数据部分中 取出医生信息的数据
            JSONArray array = JSONArray.fromObject(obj.get("data").toString());
            // 截取需要的医生信息数据字段
            for(int i=0; i<array.size(); i++) {
                ZSYYDoctorDto dto = new ZSYYDoctorDto();
                // 单条医生信息 转换成JsonObject
                JSONObject docobj = (JSONObject) array.get(i);
                // 医院代码
                dto.setHospitalId(docobj.getString("hospitalId"));
                // 科室编号
                dto.setDepartmentId(docobj.getString("departmentId"));
                // 医生编号
                dto.setDoctorId(docobj.getString("doctorId"));
                // 医生姓名
                dto.setName(docobj.getString("name"));
                // 医生擅长
                dto.setSpeciality(docobj.getString("speciality"));
                // 医生职称
                dto.setTitle(docobj.getString("title"));
                
                // 单条医生信息存入list中
                doctorInfoList.add(dto);
            }
        }
        
        return doctorInfoList;
    }
    
    /**
     * 获取医生挂号信息
     * @param docDto 医生信息
     * @return
     */
    public ArrayList<ZSYYAppointmentDto> getAppointmentInfo(ZSYYDoctorDto docDto) {
        
        // 获取医生挂号信息的基准URL
        String appointmentBaseURL = "http://61.153.209.115:7001/zsyy/?"
                                    + "callback=jQuery111107832739690784365_1440416157601&"
                                    + "cmd=get_yuyues&"
                                    + "hospitalId=10010&"
                                    + "departmentId=deptid&"
                                    + "doctorId=docid&"
                                    + "token=Jh2044695&_=1440416157605";
        // 科室编号
        appointmentBaseURL = appointmentBaseURL.replaceFirst("deptid", docDto.getDepartmentId());
        // 医生编号
        appointmentBaseURL = appointmentBaseURL.replaceFirst("docid", docDto.getDoctorId());
        // 存储医生挂号信息的list
        ArrayList<ZSYYAppointmentDto> appointmentDataList = new ArrayList<>();

        Document doc = null;
        try {
            doc = Jsoup.connect(appointmentBaseURL).ignoreContentType(true).get();
        } catch (IOException e) {
            // 输出错误信息
            e.printStackTrace();
            // 返回空的医生挂号信息
            return appointmentDataList;
        }
        // 查询返回的数据
        String info = doc.text().substring(doc.text().indexOf("(")+1, doc.text().lastIndexOf("")-1);
        // 数据转化成Json object
        JSONObject obj = JSONObject.fromObject(info);
       
        // 如果查询成功
        if(true == obj.getBoolean("success")) {
            // 从数据部分中 取出医生挂号信息的数据
            JSONArray array = JSONArray.fromObject(obj.get("data").toString());
            
            // 截取需要的医生挂号信息数据字段
            for(int i=0; i<array.size(); i++) {
                // 单条医生排班信息 转换成JsonObject
                JSONObject dataobj = (JSONObject) array.get(i);
                ZSYYAppointmentDto dto = new ZSYYAppointmentDto();
                // 医院代码
                dto.setHospitalId(docDto.getHospitalId());
                // 科室编号
                dto.setDepartmentId(docDto.getDepartmentId());
                // 医生编号
                dto.setDoctorId(docDto.getDoctorId());
                // 医生姓名
                dto.setName(docDto.getName());
                // 医生职称
                dto.setTitle(docDto.getTitle());
                // 医生擅长
                dto.setSpeciality(docDto.getSpeciality());
                // 挂号日期
                dto.setRegDate(dataobj.getString("regDate"));
                // 挂号时间
                dto.setRegTime(dataobj.getString("regTime"));
                // 剩余挂号数
                dto.setLeftNum(dataobj.getString("leftNum"));
                // 排班表id
                dto.setScheduleId(dataobj.getString("scheduleId"));
              
                // 单条医生挂号信息存入list中
                appointmentDataList.add(dto);
            }
        }
        
        return appointmentDataList;
    }
    
    /**
     * 预约操作
     * @param request
     * @return
     */
    public String doAppointment(HttpServletRequest request) {
        // 预约的基准URL
        String doAppointmentBaseURL = "http://61.153.209.115:7001/zsyy/?"
                                      + "callback=jQuery11110638106374302879_1440464082585&"
                                      + "cmd=yuyue2&"
                                      + "patientName=pName&"
                                      + "idCardNo=pIDCardNo&"
                                      + "mobile=pMobile&"
                                      + "hospitalId=10010&"
                                      + "departmentId=deptId&"
                                      + "doctorId=docId&"
                                      + "scheduleId=sId&"
                                      + "medicalCardNo=mCardNo&"
                                      + "sxw=sxwId&"
                                      + "token=Jh2044695&_=1440464082590";
        // 患者姓名
        String patientName = request.getParameter("patientName");
        // 患者身份证号
        String idCardNo = request.getParameter("idCardNo");
        // 患者手机号
        String mobile = request.getParameter("mobile");
        // 科室编号
        String departmentId = request.getParameter("departmentId");
        // 医生编号
        String doctorId = request.getParameter("doctorId");
        // 排班表编号
        String scheduleId = request.getParameter("scheduleId");
        // 上下午
        String sxw = request.getParameter("sxw");
        // 挂号的id
        String id = getAppointmentId(departmentId, doctorId, scheduleId);
        System.out.println("patientName: "+patientName);
        System.out.println("idCardNo: "+idCardNo);
        System.out.println("mobile: "+mobile);
        System.out.println("departmentId: "+departmentId);
        System.out.println("doctorId: "+doctorId);
        System.out.println("scheduleId: "+scheduleId);
        System.out.println("id: "+id);
        System.out.println("sxw: "+sxw);
        // 拼预约请求的URL
        doAppointmentBaseURL = doAppointmentBaseURL.replaceFirst("pName", patientName);
        doAppointmentBaseURL = doAppointmentBaseURL.replaceFirst("pIDCardNo", idCardNo);
        doAppointmentBaseURL = doAppointmentBaseURL.replaceFirst("pMobile", mobile);
        doAppointmentBaseURL = doAppointmentBaseURL.replaceFirst("deptId", departmentId);
        doAppointmentBaseURL = doAppointmentBaseURL.replaceFirst("docId", doctorId);
        doAppointmentBaseURL = doAppointmentBaseURL.replaceFirst("sId", scheduleId);
        doAppointmentBaseURL = doAppointmentBaseURL.replaceFirst("mCardNo", id);
        doAppointmentBaseURL = doAppointmentBaseURL.replaceFirst("sxwId", sxw);
        // 预约操作返回的信息
        String msg = "";

        Document doc = null;
        try {
            doc = Jsoup.connect(doAppointmentBaseURL).ignoreContentType(true).get();
        } catch (IOException e) {
            // 输出错误信息
            e.printStackTrace();
            // 返回空的医生挂号信息
            return msg;
        }
//        System.out.println(doc.text());
        // 查询返回的数据
        String info = doc.text().substring(doc.text().indexOf("(")+1, doc.text().lastIndexOf("")-1);
        // 数据转化成Json object
        JSONObject obj = JSONObject.fromObject(info);

        try {
            if(obj.getBoolean("success")) {
                msg = obj.getString("errMsg");
            } else {
                msg = "";
            }
        } catch (Exception e) {
            // 输出错误信息
            e.printStackTrace();
            // 返回空的医生挂号信息
            return msg;
        }
        return msg;
    }
    
   /**
    * 获取医生挂号信息中的挂号号码Id
    * @param deptid 科室编号
    * @param docid 医生编号
    * @param scheduleId 排班表编号
    * @return
    */
   public String getAppointmentId(String deptid, String docid, String scheduleId) {
       
       // 获取医生挂号信息的基准URL
       String appointmentBaseURL = "http://61.153.209.115:7001/zsyy/?"
                                   + "callback=jQuery111107832739690784365_1440416157601&"
                                   + "cmd=get_yuyues&"
                                   + "hospitalId=10010&"
                                   + "departmentId=deptid&"
                                   + "doctorId=docid&"
                                   + "token=Jh2044695&_=1440416157605";
       // 科室编号
       appointmentBaseURL = appointmentBaseURL.replaceFirst("deptid", deptid);
       // 医生编号
       appointmentBaseURL = appointmentBaseURL.replaceFirst("docid", docid);
       // 存储医生挂号的挂号号码
       String apptId = "";
       
       Document doc = null;
       try {
           doc = Jsoup.connect(appointmentBaseURL).ignoreContentType(true).get();
       } catch (IOException e) {
           // 输出错误信息
           e.printStackTrace();
           // 返回空的医生挂号信息
           return apptId;
       }
       // 查询返回的数据
       String info = doc.text().substring(doc.text().indexOf("(")+1, doc.text().lastIndexOf("")-1);
//       System.out.println(info);
       // 数据转化成Json object
       JSONObject obj = JSONObject.fromObject(info);
      
       // 如果查询成功
       if(true == obj.getBoolean("success")) {
           // 从数据部分中 取出医生挂号信息的数据
           JSONArray array = JSONArray.fromObject(obj.get("data").toString());
           
           // 截取需要的医生挂号信息数据字段
           for(int i=0; i<array.size(); i++) {
               // 获取当条排班表信息
               JSONObject dataObj = array.getJSONObject(i);
               // 排班表id与选择的id相同时
               if(scheduleId.equals(dataObj.getString("scheduleId"))) {
                   // 获取本排班表中的挂号信息
                   JSONArray dataArray = JSONArray.fromObject(dataObj.get("times").toString());

                   // 截取挂号信息
                   for(int j=0; j<dataArray.size(); j++) {
                       JSONObject timeObj = dataArray.getJSONObject(j);
                       
                       // 这个号码存在的情况下
                       if(timeObj.getInt("leftNum") > 0) {
                           // 获取次挂号号码
                           apptId = timeObj.getString("id");
                           return apptId;
                       }
                   }
               }
           }
       }
       
       return apptId;
   }
}
