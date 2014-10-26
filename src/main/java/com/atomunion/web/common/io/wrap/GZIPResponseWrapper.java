package com.atomunion.web.common.io.wrap;

import java.io.IOException;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import com.atomunion.web.common.io.servlet.GZIPResponse;
/**
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
public class GZIPResponseWrapper extends ResponseWrapper {

    public GZIPResponseWrapper(HttpServletResponse response) {
        super(response);
    }

    public ServletOutputStream createOutputStream() throws IOException {
        return (new GZIPResponse(super.response));
    }
}
