package com.atomunion.web.common.support.support.validator;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import com.atomunion.web.common.support.support.validator.by.DateTimeFormatValidator;

/**
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
@Target({ METHOD, FIELD, ANNOTATION_TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = DateTimeFormatValidator.class)
@Documented
public @interface DateTimeFormat {
	String message() default "datetime.format.error";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};

	String value() default "(19|20)\\d{2}-(0?\\d|1[012])-(0?\\d|[12]\\d|3[01]) (\\d{2}:\\d{2}:\\d{2})";
}
