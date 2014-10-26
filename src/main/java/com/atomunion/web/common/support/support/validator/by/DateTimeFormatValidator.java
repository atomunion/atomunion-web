package com.atomunion.web.common.support.support.validator.by;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Pattern;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.atomunion.web.common.support.support.validator.DateFormat;

/**
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
public class DateTimeFormatValidator implements
		ConstraintValidator<DateFormat, Date> {

	private Pattern pattern;

	public void initialize(DateFormat dateFormat) {
		this.pattern = Pattern.compile(dateFormat.value());
	}

	public boolean isValid(Date date,
			ConstraintValidatorContext constraintContext) {
		if (date == null) {
			return false;
		}

		if (this.pattern.matcher(
				new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date))
				.matches()) {
			return true;
		}

		return false;
	}

}