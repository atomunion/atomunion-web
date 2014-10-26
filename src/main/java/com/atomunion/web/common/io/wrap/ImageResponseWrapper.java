package com.atomunion.web.common.io.wrap;

import java.io.IOException;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import com.atomunion.web.common.io.servlet.ImageResponse;

/**
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
public class ImageResponseWrapper extends ResponseWrapper {

	protected String imageType = null;

	public ImageResponseWrapper(HttpServletResponse response, String imageType) {
		super(response);
		
		this.imageType = imageType;
	}

	public ServletOutputStream createOutputStream() throws IOException {
		return (new ImageResponse(response, imageType));
	}

	
}
