package com.atomunion.web.dao.hibernate4.tree.presorting.herited;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.atomunion.core.util.Validate;
import com.atomunion.web.dao.hibernate4.tree.presorting.Presorting;
import com.atomunion.web.dao.tree.IllegalTreeNodeArgumentException;
import com.atomunion.web.model.AbstractTreeNode;

/**
 * @author lico
 * 
 * @version 1.0.000 At May 29, 2013
 */
public class HeritedPresorting<M extends AbstractTreeNode, PK extends Serializable>
		extends Presorting<M, PK> {

	public HeritedPresorting() {
		super();
	}

	protected String getSuperHeritedClassName() {
		return entity.getSimpleName();
	}

	public List<M> getAncestorNodes(M node) {
		node = before(node);

		return list("from " + getSuperHeritedClassName() + " where lft < "
				+ node.getLft() + " and rgt > " + node.getRgt()
				+ " order by lft asc");
	}

	public List<M> getPosterityNodes(M node) {
		node = before(node);
		return list("from " + getSuperHeritedClassName() + " where lft > "
				+ node.getLft() + " and rgt < " + node.getRgt()
				+ " order by lft asc");
	}

	protected void removeNode(M node) {
		long count = getPosterityCount(node) + 1;
		String name = getSuperHeritedClassName();
		int rows = executeUpdate("delete " + name + " where lft between "
				+ node.getLft() + " and " + node.getRgt());
		if (rows > 0) {
			long value = node.getRgt();
			executeUpdate("update " + name + " set lft = lft - " + (count * 2)
					+ " where lft > " + value);

			executeUpdate("update " + name + " set rgt = rgt - " + (count * 2)
					+ " where rgt > " + value);
		}
	}

	protected void updateTreeNode(M newNode, long value) {
		String name = getSuperHeritedClassName();

		executeUpdate("update " + name + " set lft = lft + 2 where lft > "
				+ value);

		executeUpdate("update " + name + " set rgt = rgt + 2 where rgt > "
				+ value);
	}

	public M getNodeById(M node) {
		if (Validate.isNull(node) || Validate.isNull(node.getId())) {
			throw new IllegalTreeNodeArgumentException(
					"You gived me a empty reference node. Please comfirm the reference node's properties \"id\" is set.");
		}
		List<M> roots = list("from " + getSuperHeritedClassName()
				+ " where id = " + node.getId());

		return (Validate.notEmpty(roots)) ? roots.get(0) : null;
	}

	public M getNodeByLftRgt(M node) {
		if (Validate.isNull(node) || Validate.isNull(node.getLft())
				|| Validate.isNull(node.getRgt())) {
			throw new IllegalTreeNodeArgumentException(
					"You gived me a empty reference node. Please comfirm the reference node's properties \"lft\" and \"rgt\" is set.");
		}
		List<M> roots = list("from " + getSuperHeritedClassName()
				+ " where lft = " + node.getLft() + " and rgt = "
				+ node.getRgt());
		return (Validate.notEmpty(roots)) ? roots.get(0) : null;
	}

	public M getRootNode(Class<? extends M> className)
			throws InstantiationException, IllegalAccessException {
		List<M> roots = list("from " + getSuperHeritedClassName()
				+ " where lft = 1");

		if (Validate.notEmpty(roots)) {
			return roots.get(0);
		} else {
			M root = className.newInstance();
			root.setValue(0l);
			root.setId(0l);
			return root;
		}
	}

	public M getRootNode(Class<? extends M> className,
			Class<? extends M> newClassName) throws InstantiationException,
			IllegalAccessException {
		List<M> roots = list("from " + getSuperHeritedClassName()
				+ " where lft = 1");

		if (Validate.notEmpty(roots)) {
			return roots.get(0);
		} else {
			M root = newClassName.newInstance();
			root.setValue(0l);
			root.setId(0l);
			return root;
		}
	}

	protected List<M> getGenerations(M root) {
		root = before(root);
		List<M> generation = list("from " + getSuperHeritedClassName()
				+ " where lft between " + root.getLft() + " and "
				+ root.getRgt() + " order by lft asc");
		if (!Validate.notEmpty(generation)) {
			generation = new ArrayList<M>();
			generation.add(root);
		}
		return generation;
	}

	public void shiftNode(M node, M oldParent, M newParent, Integer index) {
		node = before(node);
		oldParent = before(oldParent);
		newParent = before(newParent);

		if (node.getLft() < newParent.getLft()
				&& node.getRgt() > newParent.getRgt()) {
			return;
		}

		List<M> list = getGenerations(node);

		long value1 = node.getRgt(), value2 = newParent.getRgt();

		List<M> children = getChildrenNodes(newParent);
		M child = null;
		int size = children.size();
		if (index != size - 1 || newParent.getId() != oldParent.getId()) {
			for (int i = size - 1 - index; i >= 0 && i < size; i--) {
				child = children.get(i);
				// if (child.getId() != node.getId()) {
				value2 -= 2 * (getPosterityCount(child) + 1);
				// }
			}
		}
		long count = list.size();
		String name = getSuperHeritedClassName();

		if (value2 > value1) {
			value2 -= (count * 2);
		}
		long dif = value2 - node.getLft();

		executeUpdate("update " + name + " set lft = lft - " + (count * 2)
				+ " where lft > " + value1);

		executeUpdate("update " + name + " set rgt = rgt - " + (count * 2)
				+ " where rgt > " + value1);

		executeUpdate("update " + name + " set lft = lft + " + (count * 2)
				+ " where lft >= " + value2);

		executeUpdate("update " + name + " set rgt = rgt + " + (count * 2)
				+ " where rgt >= " + value2);

		for (M newNode : list) {
			executeUpdate("update " + name + " set lft = "
					+ (newNode.getLft() + dif) + ",rgt = "
					+ (newNode.getRgt() + dif) + " where id = "
					+ newNode.getId());

		}
	}
}
