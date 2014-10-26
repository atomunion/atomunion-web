package com.atomunion.web.common.io.servlet;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
/**
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
public abstract class OutputResponse extends ServletOutputStream {

	protected boolean closed = false;

	protected OutputStream os = null;
	protected HttpServletResponse response = null;
	protected ServletOutputStream output = null;

	public abstract void close() throws IOException;

	public OutputResponse(HttpServletResponse response) throws IOException {
		super();
		this.closed = false;
		this.response = response;
		this.output = response.getOutputStream();
	}
	
	@Override
	public void flush() throws IOException {
		if (closed) {
			throw new IOException("Cannot flush a closed output stream");
		}
		os.flush();
	}

	@Override
	public void write(int b) throws IOException {
		if (closed) {
			throw new IOException("Cannot write to a closed output stream");
		}
		os.write((byte) b);
	}

	@Override
	public void write(byte b[]) throws IOException {
		write(b, 0, b.length);
	}

	@Override
	public void write(byte b[], int off, int len) throws IOException {
		if (closed) {
			throw new IOException("Cannot write to a closed output stream");
		}
		os.write(b, off, len);
	}

	public boolean closed() {
		return (this.closed);
	}
}
