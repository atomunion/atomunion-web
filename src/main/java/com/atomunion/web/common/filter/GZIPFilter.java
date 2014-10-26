package com.atomunion.web.common.filter;

import java.io.IOException;

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

import com.atomunion.web.common.io.wrap.GZIPResponseWrapper;

/**
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
public class GZIPFilter implements Filter {

	private static final Logger LOG = LoggerFactory.getLogger(GZIPFilter.class);

	public void doFilter(ServletRequest req, ServletResponse res,
			FilterChain chain) throws IOException, ServletException {
		if (req instanceof HttpServletRequest) {
			HttpServletRequest request = (HttpServletRequest) req;
			HttpServletResponse response = (HttpServletResponse) res;
			String ae = request.getHeader("accept-encoding");
			if (ae != null && ae.indexOf("gzip") != -1) {
				LOG.debug("GZIP supported, compressing.");
				GZIPResponseWrapper wrapped = new GZIPResponseWrapper(response);
				chain.doFilter(req, wrapped);
				wrapped.close();
				return;
			}
		}
		chain.doFilter(req, res);
	}

	public void init(FilterConfig filterConfig) {
		// noop
	}

	public void destroy() {
		// noop
	}
}
