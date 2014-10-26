package com.atomunion.web.common.bean.json;

import java.io.IOException;
import java.io.OutputStream;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.atomunion.core.util.Validate;
import com.atomunion.web.common.bean.container.ContainerBean;
import com.atomunion.web.common.bean.vo.VoBean;

/**
 * @author lico
 * @version 1.0.001 At Oct 25, 2013 5:30:08 PM
 */
public class JsonBean<T> extends VoBean<T> {

	private static volatile ObjectMapper objectMapper = null;

	

	public JsonBean() {
		super();
	}

	public JsonBean(ContainerBean<T> bean) {
		super(bean);
	}

	public JsonBean(String key) {
		super(key);
	}

	private static ObjectMapper getObjectMapper() {
		synchronized (ObjectMapper.class) {
			if (objectMapper == null) {
				objectMapper = new ObjectMapper();
			}
		}
		return objectMapper;
	}

	{
		initTemplate();
	}
	private void initTemplate() {
		setGlobelProperty(true, "success");
	}

	public String toJson() throws JsonGenerationException,
			JsonMappingException, IOException {
		return getObjectMapper().writeValueAsString(this);
	}

	public void toJson(OutputStream os, Boolean... close)
			throws JsonGenerationException, JsonMappingException, IOException {
		getObjectMapper().writeValue(os, this);
		if (Validate.notEmpty(close) && Boolean.TRUE.equals(close[0]))
			os.close();
	}

	public JsonBean<T> setGlobelProperty(boolean success, String msg) {
		this.put("success", success);
		this.put("msg", msg);
		return this;
	}

}
