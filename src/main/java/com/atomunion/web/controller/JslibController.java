package com.atomunion.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author lico
 * @version 1.0.001 Mar 9, 2014 11:41:02 PM
 */

@Controller
public class JslibController {

	@RequestMapping(value = "/web/js/libs/jquery", method = { RequestMethod.GET })
	public String jquery() throws Exception {
		return null;
	}
	
	@RequestMapping(value = "/web/js/libs/extjs", method = { RequestMethod.GET })
	public String extjs() throws Exception {
		return null;
	}
	
	@RequestMapping(value = "/web/js/libs/gridster", method = { RequestMethod.GET })
	public String gridster() throws Exception {
		return null;
	}
	
	@RequestMapping(value = "/web/js/libs/jDigiClock", method = { RequestMethod.GET })
	public String jDigiClock() throws Exception {
		return null;
	}
	
	@RequestMapping(value = "/web/js/libs/corner", method = { RequestMethod.GET })
	public String corner() throws Exception {
		return null;
	}
	
	@RequestMapping(value = "/web/js/libs/qtip2", method = { RequestMethod.GET })
	public String qtip2() throws Exception {
		return null;
	}
	
	@RequestMapping(value = "/web/js/libs/sliderpush", method = { RequestMethod.GET })
	public String sliderpush() throws Exception {
		return null;
	}
	
	
	@RequestMapping(value = "/web/js/libs/store", method = { RequestMethod.GET })
	public String store() throws Exception {
		return null;
	}
	
	
	@RequestMapping(value = "/web/js/libs/template", method = { RequestMethod.GET })
	public String template() throws Exception {
		return null;
	}
}
