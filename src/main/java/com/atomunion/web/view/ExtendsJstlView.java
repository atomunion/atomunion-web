package com.atomunion.web.view;


import org.springframework.web.servlet.view.JstlView;


/**
 * 添加对于ContentNegotiatingViewResolver.java 的content-type支持
 * 
 * @author lico
 * @version 1.0.000 At Oct 20, 2012
 */

public class ExtendsJstlView extends JstlView {

	public static final String DEFAULT_CONTENT_TYPE = "text/html;charset=UTF-8";

	private String contentType = DEFAULT_CONTENT_TYPE;
	
	@Override
	public String getContentType() {
		return contentType;
	}

}
