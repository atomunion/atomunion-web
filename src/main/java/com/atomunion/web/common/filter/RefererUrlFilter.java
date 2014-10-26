package com.atomunion.web.common.filter;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
/**
 * @author lico
 * @version 1.0.0
 */
public class RefererUrlFilter implements Filter {

	public static final String REFERER_URL = "refererUrl";
	public static final String REQUEST_URL = "requestUrl";

	public void init(FilterConfig filterConfig) throws ServletException {

	}

	public void doFilter(ServletRequest servletRequest,
			ServletResponse servletResponse, FilterChain filterChain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) servletRequest;
		HttpServletResponse response = (HttpServletResponse) servletResponse;
		String backURL = request.getParameter(REFERER_URL);
		if (StringUtils.isEmpty(backURL)) {
			backURL = request.getHeader("Referer");
		}

		request.setAttribute(REFERER_URL, backURL);

		request.setAttribute(REQUEST_URL, getMBackURL(request, response));

		filterChain.doFilter(request, response);

	}

	public static String getMBackURL(HttpServletRequest request,
			HttpServletResponse response) {
		StringBuffer basePath = new StringBuffer();

		basePath.append(request.getScheme()).append("://")
				.append(request.getServerName());

		if (request.getServerPort() != 80) {
			basePath.append(":").append(request.getServerPort());
		}

		basePath.append(request.getRequestURI());

		String queryString = request.getQueryString();
		if (!StringUtils.isEmpty(queryString)) {
			basePath.append("?").append(queryString);
		}

		String backURL = basePath.toString();
		try {
			backURL = response.encodeURL(backURL);
			backURL = URLEncoder.encode(backURL, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return backURL;
	}

	public void destroy() {

	}
}
