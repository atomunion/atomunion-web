package com.atomunion.web.dao.hibernate4;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import com.atomunion.core.util.Validate;
import com.atomunion.web.dao.tree.ITreeFacadeDao;
import com.atomunion.web.model.AbstractTreeNode;

/**
 * @author lico
 * @version 1.0.001 At Nov 28, 2013 4:08:33 PM
 */
public abstract class TreeFacade<M extends AbstractTreeNode, PK extends Serializable> extends
		Hibernate4BaseDao<M, PK> implements ITreeFacadeDao<M, PK> {
	public static final String JSON_ROOT = "tree";
	public static final String JSON_CHILDREN = "children";

	private static final Map<String, String> NODEKEYS = new HashMap<String, String>();

	public TreeFacade() {
		super();
	}

	static {
		NODEKEYS.put("lft", "lft");
		NODEKEYS.put("rgt", "rgt");
		NODEKEYS.put("level", "depth");
		NODEKEYS.put("expanded", "expanded");
		NODEKEYS.put("loaded", "loaded");
		NODEKEYS.put("leaf", "leaf");
		NODEKEYS.put("root", "root");
		NODEKEYS.put("tagName", "tagName");
		NODEKEYS.put("parent.id", "parentId");
	}
	
	/**
	 * 获取M的隐含属性
	 * */
	public static Map<String, String> getNodeKeys() {
		Map<String, String> keys = new HashMap<String, String>();
		keys.putAll(NODEKEYS);
		return keys;
	}

	/**
	 * 设置M的隐含属性
	 * */
	public static void setNodeKeys(Map<String, String> keys) {
		if (Validate.notEmpty(keys)) {
			NODEKEYS.putAll(keys);
		}
	}
}
