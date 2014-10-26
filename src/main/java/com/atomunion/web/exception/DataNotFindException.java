package com.atomunion.web.exception;

import org.hibernate.HibernateException;

/**
 * @author lico
 * 
 * @version 1.0.000 At May 29, 2013
 */
public class DataNotFindException extends HibernateException {
	public DataNotFindException(String message) {
		super(message);
	}

	public DataNotFindException(Throwable root) {
		super(root);
	}

	public DataNotFindException(String message, Throwable root) {
		super(message, root);
	}
}
