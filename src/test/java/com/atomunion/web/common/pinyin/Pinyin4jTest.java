package com.atomunion.web.common.pinyin;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

/**
 * @author lico
 * @version 1.0.001 At Dec 8, 2013 11:05:57 PM
 */
public class Pinyin4jTest {

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
	public void testCombinationPinyin(){
		String chinese = "刘继超";
		
		System.out.println(Pinyin4j.combinationPinyin(chinese, ","));
		
	}

}
