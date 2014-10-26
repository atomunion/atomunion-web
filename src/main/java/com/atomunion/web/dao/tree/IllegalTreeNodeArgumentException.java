package com.atomunion.web.dao.tree;

/**
 * @author lico
 * 
 * @version 1.0.000 At May 29, 2013
 */
public class IllegalTreeNodeArgumentException extends IllegalArgumentException {

	public IllegalTreeNodeArgumentException(String message) {
		super(message);
	}

	public IllegalTreeNodeArgumentException() {
		super();
	}

	public IllegalTreeNodeArgumentException(String message, Throwable cause) {
		super(message, cause);
	}

	public IllegalTreeNodeArgumentException(Throwable cause) {
		super(cause);
	}

}
