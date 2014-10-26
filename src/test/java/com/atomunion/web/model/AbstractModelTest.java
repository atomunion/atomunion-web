package com.atomunion.web.model;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

public class AbstractModelTest {

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
	}

	@Before
	public void setUp() throws Exception {
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void testEquals() {
		class Model extends AbstractModel{
			Model(){
				super();
			}
			Model(Long id){super(id);}
		}
		
		Model m1 = new Model();
		Model m2 = new Model();
		
		Model m3 = new Model(1l);
		Model m4 = new Model(1l);
		Model m5 = new Model(2l);
		assertFalse(m1.equals(m2));
		assertTrue(m3.equals(m4));
		assertFalse(m3.equals(m5));
		assertFalse(m1.equals(m3));
	}

}
