package com.atomunion.web.common.support.converter;

import java.util.Date;

import org.springframework.core.convert.converter.Converter;

import com.atomunion.core.util.Validate;

/**
 * @author lico
 * 
 * @version 1.0.000 At Jul 18, 2013
 */
public class LongToDateTime implements Converter<String, Date> {

	public LongToDateTime() {
	}

	@Override
	public Date convert(String source) {

		if (!Validate.hasLength(source)) {
			return null;
		}
		Long time = null;
		try {
			time = Long.parseLong(source);
			return new Date(time);
		} catch (NumberFormatException e) {
			throw new IllegalArgumentException(String.format(
					" 类型转换失败， 需要格式为long型，但格式是[%s]", source));
		}
	}

}
