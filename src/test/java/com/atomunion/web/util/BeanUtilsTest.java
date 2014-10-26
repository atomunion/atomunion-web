package com.atomunion.web.util;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

/**
 * @author lico
 * 
 * @version 1.0.000 At May 29, 2013
 */
public class BeanUtilsTest {

	private User source;
	private User target;

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
	}

	@Before
	public void setUp() throws Exception {
		source = new User(null, "source", "sss");
		target = new User(1l, "target", null);
	}

	@After
	public void tearDown() throws Exception {
		System.out.println("source：" + source);
		System.out.println("target：" + target);
	}

	@Test
	public void testCopyPropertiesIgnoreNull() {
		BeanUtils.copyPropertiesIgnoreNull(source, target);

	}
}

class User {

	private String name;
	private Long id;
	private String desc;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User(Long id, String name, String desc) {
		super();
		this.name = name;
		this.id = id;
		this.desc = desc;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return "id=" + this.id + ",name=" + this.name + ",desc=" + this.desc;
	}

}
