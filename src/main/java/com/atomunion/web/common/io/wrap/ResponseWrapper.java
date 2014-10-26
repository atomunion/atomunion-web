package com.atomunion.web.common.io.wrap;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

/**
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
public abstract class ResponseWrapper extends HttpServletResponseWrapper {

	protected HttpServletResponse response = null;
	protected ServletOutputStream stream = null;
	protected PrintWriter writer = null;

	public ResponseWrapper(HttpServletResponse arg0) {
		super(arg0);
		this.response = arg0;
	}

	public void close() {
		try {
			if (writer != null) {
				writer.close();
			} else {
				if (stream != null) {
					stream.close();
				}
			}
		} catch (IOException e) {
		}
	}


	@Override
	public ServletOutputStream getOutputStream() throws IOException {
		if (writer != null) {
			throw new IllegalStateException(
					"getWriter() has already been called!");
		}

		if (stream == null)
			stream = createOutputStream();
		return (stream);
	}

	@Override
	public PrintWriter getWriter() throws IOException {
		if (writer != null) {
			return (writer);
		}

		if (stream != null) {
			throw new IllegalStateException(
					"getOutputStream() has already been called!");
		}

		stream = createOutputStream();
		writer = new PrintWriter(new OutputStreamWriter(stream, "UTF-8"));
		return (writer);
	}

	@Override
	public void flushBuffer() throws IOException {
		stream.flush();
	}



	protected abstract ServletOutputStream createOutputStream() throws IOException;
}
