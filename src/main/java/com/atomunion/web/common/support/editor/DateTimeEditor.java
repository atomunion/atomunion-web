package com.atomunion.web.common.support.editor;

import java.beans.PropertyEditorSupport;
import java.text.ParseException;
import java.text.SimpleDateFormat;

/**
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
public class DateTimeEditor extends PropertyEditorSupport {

	private SimpleDateFormat formater = new SimpleDateFormat(
			"yyyy-MM-dd HH:mm:ss");

	@Override
	public void setAsText(String text) throws IllegalArgumentException {
		if (text != null && text.trim().length() > 0) {
			try {
				setValue(formater.parse(text));
			} catch (ParseException ex) {
			}
		}
	}

	@Override
	public String getAsText() {
		return (getValue() == null) ? "" : formater.format(getValue());
	}
}
