package GetHospitalZSYY;

import java.io.IOException;
import java.util.ArrayList;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class test {

    public static void main(String[] args) {
        // TODO Auto-generated method stub
        test t = new test();
        System.out.println(t.getDocAppData("20102"));
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
        System.out.println(obj.toString());
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
        System.out.println(obj.toString());
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
}
