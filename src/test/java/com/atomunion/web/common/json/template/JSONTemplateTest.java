package com.atomunion.web.common.json.template;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.antlr.grammar.v3.TreeToNFAConverter.set_return;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import com.atomunion.web.common.bean.json.JsonBeanTest.CT;

public class JSONTemplateTest {

	public class CC {
		private String name;

		public CC(String name) {
			super();
			this.name = name;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}
	}

	public class CB {
		private String name;

		private CC cc;

		private Set<CC> ccs = new HashSet<CC>();

		public CB(String name, CC cc, Set<CC> ccs) {
			super();
			this.name = name;
			this.cc = cc;
			this.ccs = ccs;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public CC getCc() {
			return cc;
		}

		public void setCc(CC cc) {
			this.cc = cc;
		}

		public Set<CC> getCcs() {
			return ccs;
		}

		public void setCcs(Set<CC> ccs) {
			this.ccs = ccs;
		}
	}

	public class CA {
		private String name;

		private CB cb;

		private Set<CB> cbs = new HashSet<CB>();

		public CA(String name, CB cb, Set<CB> cbs) {
			super();
			this.cb = cb;
			this.name = name;
			this.cbs = cbs;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public Set<CB> getCbs() {
			return cbs;
		}

		public void setCbs(Set<CB> cbs) {
			this.cbs = cbs;
		}

		public CB getCb() {
			return cb;
		}

		public void setCb(CB cb) {
			this.cb = cb;
		}

	}

	
	
	public class CT {
		private String name;

		private Set<CT> children;
		
		private CT child;
		
		public CT(){
			
		}
		
		public CT(String name,CT child,Set<CT> children) {
			this.name =name;
			this.child = child;
			this.children=children;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public Set<CT> getChildren() {
			return children;
		}

		public void setChildren(Set<CT> children) {
			this.children = children;
		}

		public CT getChild() {
			return child;
		}

		public void setChild(CT child) {
			this.child = child;
		}
		
	}
	
	
	
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
	public void testSetChild() {

		CC cc1 = new CC("cc1");
		CC cc2 = new CC("cc2");
		CC cc3 = new CC("cc3");
		Set<CC> set1 = new HashSet<CC>();
		set1.add(cc2);
		set1.add(cc3);
		CB cb = new CB("cb1", cc1, set1);

		Set<CB> set2 = new HashSet<CB>();
		set2.add(cb);
		CA ca = new CA("ca1", cb, set2);

		Map<String, String> map1 = new HashMap<String, String>();
		map1.put("cb", "cb");

		Map<String, String> map2 = new HashMap<String, String>();
		map2.put("cc", "cc");

		Map<String, String> map3 = new HashMap<String, String>();
		map3.put("name", "name");
		
		
		
		CT ct0 = new CT();
		CT ct00 = new CT();
		Set<CT> set10 = new HashSet<CT>();
		set10.add(ct0);
		set10.add(ct00);
		CT ct000 = new CT();
		CT ct1 = new CT("111",ct000,set10);
		
		
		CT ct2 = new CT();
		Set<CT> set11 = new HashSet<CT>();
		set11.add(ct1);
		set11.add(ct2);
		CT ct3 = new CT();
		CT ct11 = new CT("ct11",ct1,set11);
		
		
		
		CT ct4 = new CT("ct4",null,null);
		CT ct5 = new CT("ct5",ct3,new HashSet<CT>());
		CT ct6 = new CT("ct6",ct11,new HashSet<CT>());
		Set<CT> set12 = new HashSet<CT>();
		set12.add(ct11);
		set12.add(ct5);
		set12.add(ct4);
		CT ct12 = new CT("ct12",ct6,set12);
		
		Set<CT> set13 = new HashSet<CT>();
		set13.add(ct12);
		
		
		
		try {

//			System.out.println(new JSONTemplate(set2, new String[] { "name" })
//					.toJson());
//
//			System.out.println(new JSONTemplate().set(ca, map3)
//					.setChild(ca, "cbs", "cbs", map3).toJson());
//
//			System.out.println(new JSONTemplate().setChild(ca, "cb.cc",
//					"cb.cc", map3).toJson());
//
//			System.out.println(new JSONTemplate().set(ca, map3)
//					.setChild(ca, "cbs.cc", "cbs.cc", map3).toJson());
//
//			System.out.println(new JSONTemplate().setChild(ca, "cbs.ccs",
//					"cbs.ccs", map3).toJson());
//
//			System.out.println(new JSONTemplate()
//					.setChild(cb, "cc", "cc", map3).toJson());
//
//			System.out.println(new JSONTemplate(set2, new String[] { "name" })
//					.setChild(set2, "cc", "cc", map3).toJson());
//
//			System.out.println(new JSONTemplate(set2, new String[] { "name" })
//					.setChild(set2, "ccs", "ccs", map3).toJson());

			System.out.println(new JSONTemplate().recursionChild(ct12, "child", "child", map3).toJson());
			
			System.out.println(new JSONTemplate().recursionChild(ct12, "children", "children", map3).toJson());

			System.out.println(new JSONTemplate().recursionChild(set13, "children", "children", map3).toJson());

			
			
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
