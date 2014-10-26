package com.atomunion.web.common.io.servlet;

import java.awt.color.ColorSpace;
import java.awt.image.BufferedImage;
import java.awt.image.ColorConvertOp;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;

/**
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
public class ImageResponse extends OutputResponse {

	protected String imageType = null;
	protected ByteArrayOutputStream read = null;
	protected ByteArrayOutputStream write = null;

	public ImageResponse(HttpServletResponse response, String imageType)
			throws IOException {
		super(response);
		read = new ByteArrayOutputStream();
		write = new ByteArrayOutputStream();
		super.os = new BufferedOutputStream(read);
		this.imageType = imageType;
	}

	@Override
	public void close() throws IOException {
		if (closed) {
			throw new IOException("This output stream has already been closed");
		}
		super.os.flush();
		byte[] bytes = read.toByteArray();
		BufferedImage srcImage = ImageIO.read(new ByteArrayInputStream(bytes));
		BufferedImage descImage = srcImage;

		if (srcImage.getType() == BufferedImage.TYPE_BYTE_BINARY) {
			descImage = new BufferedImage(srcImage.getWidth(),
					srcImage.getHeight(), BufferedImage.TYPE_INT_RGB);
			descImage.createGraphics().drawImage(srcImage, null, 0, 0);
		}
		ColorSpace cs = ColorSpace.getInstance(ColorSpace.CS_GRAY);
		ColorConvertOp colorConvert = new ColorConvertOp(cs, cs, null);
		colorConvert.filter(descImage, descImage);
		ImageIO.write(descImage, this.imageType, write);

		bytes = write.toByteArray();

		response.setContentLength(bytes.length);

		output.write(bytes);
		output.flush();
		output.close();
		closed = true;

	}

}
