package com.news.dto;

public class NewsDetailDto {
    
    // 链接
    private String href;

    // 标题
    private String title;
    
    // 副标题
    private String subtitle;
    
    // 短内容
    private String shorttext;
    
    // 完整内容
    private String text;
    
    // 图片
    private String img;

    /**
     * @return the href
     */
    public String getHref() {
        return href;
    }

    /**
     * @return the title
     */
    public String getTitle() {
        return title;
    }

    /**
     * @return the subtitle
     */
    public String getSubtitle() {
        return subtitle;
    }

    /**
     * @return the shorttext
     */
    public String getShorttext() {
        return shorttext;
    }

    /**
     * @return the text
     */
    public String getText() {
        return text;
    }

    /**
     * @return the img
     */
    public String getImg() {
        return img;
    }

    /**
     * @param href the href to set
     */
    public void setHref(String href) {
        this.href = href;
    }

    /**
     * @param title the title to set
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * @param subtitle the subtitle to set
     */
    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    /**
     * @param shorttext the shorttext to set
     */
    public void setShorttext(String shorttext) {
        this.shorttext = shorttext;
    }

    /**
     * @param text the text to set
     */
    public void setText(String text) {
        this.text = text;
    }

    /**
     * @param img the img to set
     */
    public void setImg(String img) {
        this.img = img;
    }

}
