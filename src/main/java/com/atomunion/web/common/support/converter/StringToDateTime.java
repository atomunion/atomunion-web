package com.atomunion.web.common.support.converter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.core.convert.converter.Converter;

import com.atomunion.core.util.Validate;

/**
 * @author lico
 * 
 * @version 1.0.000 At Jul 18, 2013
 */
public class StringToDateTime implements Converter<String, Date> {

	private Pattern pattern = Pattern
			.compile("(19|20)\\d{2}-(0?\\d|1[012])-(0?\\d|[12]\\d|3[01]) (\\d{2}:\\d{2}:\\d{2})");

	public StringToDateTime() {
	}

	@Override
	public Date convert(String source) {
		if (!Validate.hasLength(source)) {
			return null;
		}
		Matcher matcher = pattern.matcher(source);

		if (matcher.matches()) {
			try {

				return new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")
						.parse(source);
			} catch (ParseException e) {
			}
		}
		throw new IllegalArgumentException(String.format(
				" 类型转换失败， 需要格式[yyyy-MM-dd hh:mm:ss]，但格式是[%s]", source));
	}
}
