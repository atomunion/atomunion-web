package com.atomunion.web.common.io.servlet;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.GZIPOutputStream;

import javax.servlet.http.HttpServletResponse;

/**
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
public class GZIPResponse extends OutputResponse {

	protected ByteArrayOutputStream baos = null;

	public GZIPResponse(HttpServletResponse response) throws IOException {
		super(response);
		this.baos = new ByteArrayOutputStream();
		super.os = new GZIPOutputStream(baos);
	}

	@Override
	public void close() throws IOException {
		if (closed) {
			throw new IOException("This output stream has already been closed");
		}
		((GZIPOutputStream)super.os).finish();

		byte[] bytes = this.baos.toByteArray();

		response.setContentLength(bytes.length);
		response.setCharacterEncoding("gzip");

		output.write(bytes);
		output.flush();
		output.close();
		closed = true;
	}

}
