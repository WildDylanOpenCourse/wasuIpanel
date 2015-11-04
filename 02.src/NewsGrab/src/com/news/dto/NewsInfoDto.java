package com.news.dto;

public class NewsInfoDto {

    private String url;
    
    private String title;

    /**
     * @return the url
     */
    public String getUrl() {
        return url;
    }

    /**
     * @return the title
     */
    public String getTitle() {
        return title;
    }

    /**
     * @param url the url to set
     */
    public void setUrl(String url) {
        this.url = url;
    }

    /**
     * @param title the title to set
     */
    public void setTitle(String title) {
        this.title = title;
    }
}
