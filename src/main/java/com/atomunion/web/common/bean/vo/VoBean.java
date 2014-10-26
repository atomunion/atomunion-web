package com.atomunion.web.common.bean.vo;

import com.atomunion.core.util.Validate;
import com.atomunion.web.common.bean.container.ContainerBean;

/**
 * @author lico
 * @version 1.0.001 At Oct 25, 2013 11:10:11 AM
 */
public class VoBean<T> extends ContainerBean<T> {

	public VoBean() {
		super();
	}

	public VoBean(String key) {
		super(key);
	}

	public VoBean(ContainerBean<T> bean) {
		super();
		if (Validate.notEmpty(bean)) {
			this.putAll(bean);
		}
	}
}