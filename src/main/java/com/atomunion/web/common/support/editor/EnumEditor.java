package com.atomunion.web.common.support.editor;

import java.beans.PropertyEditorSupport;

/**
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
@SuppressWarnings({ "rawtypes", "unchecked" })
public class EnumEditor extends PropertyEditorSupport {

	private Class enumClass;

	public EnumEditor(Class cls) {
		this.enumClass = cls;
	}

	@Override
	public void setAsText(String text) throws IllegalArgumentException {
		if (text != null && text.trim().length() > 0) {
			setValue(Enum.valueOf(enumClass, text));
		}
	}

	@Override
	public String getAsText() {
		return (getValue() == null) ? "" : getValue().toString();
	}
}
