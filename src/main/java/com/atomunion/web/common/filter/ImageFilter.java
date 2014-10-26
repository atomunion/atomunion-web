package com.atomunion.web.common.filter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.atomunion.web.common.io.wrap.ImageResponseWrapper;

/**
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
public class ImageFilter implements Filter {

	private static final Map<String, String> contentTypes = new HashMap<String, String>();

	private static final Logger LOG = LoggerFactory.getLogger(ImageFilter.class);

	public void init(FilterConfig config) throws ServletException {
		contentTypes.put("image/bmp", "bmp");
		contentTypes.put("image/gif", "gif");
		contentTypes.put("image/jpeg", "jpeg");
		contentTypes.put("image/png", "png");
		contentTypes.put("image/vnd.wap.wbmp", "bmp");
	}

	public void doFilter(ServletRequest req, ServletResponse res,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;

		if (isFilter(request)) {
			HttpServletResponse response = (HttpServletResponse) res;
			ImageResponseWrapper wrapped = new ImageResponseWrapper(response,
					getImageType(request));
			chain.doFilter(req, wrapped);
			wrapped.close();
			return;
		}
		chain.doFilter(req, res);
	}

	private String getImageType(HttpServletRequest request) {
		String accept = request.getHeader("Accept");
		for (String c : contentTypes.keySet()) {
			if (accept.contains(c)) {
				return contentTypes.get(c);
			}
		}
		return "jpeg";
	}

	private boolean isFilter(HttpServletRequest request) {
		String accept = request.getHeader("Accept");
		for (String c : contentTypes.keySet()) {
			if (accept.contains(c)) {
				if (LOG.isDebugEnabled()) {
					LOG.debug("{} is image request,Accept:{}",
							request.getRequestURI(), accept);
				}
				return true;
			}
		}
		return false;
	}

	public void destroy() {

	}
}
