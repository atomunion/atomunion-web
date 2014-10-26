package com.atomunion.web.dao.tree;

import com.atomunion.web.model.AbstractTreeNode;

/**
 * @author lico
 * @version 1.0.001 At Dec 5, 2013 4:09:37 PM
 */
public interface TreeNodeParser<M extends AbstractTreeNode> {
	M parse(M m);
}
