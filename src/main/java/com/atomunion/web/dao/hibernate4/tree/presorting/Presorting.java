package com.atomunion.web.dao.hibernate4.tree.presorting;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Stack;

import com.atomunion.core.util.Validate;
import com.atomunion.web.dao.hibernate4.TreeFacade;
import com.atomunion.web.dao.tree.IllegalTreeNodeArgumentException;
import com.atomunion.web.dao.tree.TreeNodeParser;
import com.atomunion.web.exception.DataNotFindException;
import com.atomunion.web.model.AbstractTreeNode;
import com.atomunion.web.util.BeanUtils;

/**
 * @author lico
 * @version 1.0.000 At Oct 20, 2010 10:13:26 AM Description:
 */
public abstract class Presorting<M extends AbstractTreeNode, PK extends Serializable> extends TreeFacade<M,PK>{

	public Presorting() {
		super();
	}

	public List<M> getAncestorNodes(M node) {
		node = before(node);
		return list("from " + node.getClass().getSimpleName() + " where lft < "
				+ node.getLft() + " and rgt > " + node.getRgt()
				+ " order by lft asc");
	}

	public M getParentNode(M node) {
		List<M> list = getAncestorNodes(node);
		return (Validate.notEmpty(list)) ? list.get(list.size() - 1) : null;
	}

	public long getAncestorCount(M node) {
		List<M> list = getAncestorNodes(node);
		return (Validate.notNull(list)) ? list.size() : 0;
	}

	public long getLevel(M node) {
		List<M> list = getAncestorNodes(node);
		return (Validate.notNull(list)) ? list.size() + 1 : 0;
	}

	public boolean isLeaf(M node) {
		node = before(node);
		return (node.getRgt() - node.getLft() == 1) ? true : false;
	}

	@Override
	public boolean isSelf(M node1, M node2) {
		long id1 = node1.getId();
		long lft1 = node1.getLft();
		long rgt1 = node1.getRgt();

		long id2 = node2.getId();
		long lft2 = node2.getLft();
		long rgt2 = node2.getRgt();
		return (id1 != 0 && id1 == id2)
				|| (lft1 != 0 && rgt1 != 0 && lft1 == lft2 && rgt1 == rgt2);
	}

	@Override
	public boolean isAncestor(M node, M root) {
		long lft1 = node.getLft();
		long rgt1 = node.getRgt();
		long lft2 = root.getLft();
		long rgt2 = root.getRgt();
		return (lft1 > lft2) && (rgt1 < rgt2);
	}

	@Override
	public boolean isPosterity(M node, M posterity) {
		long lft1 = node.getLft();
		long rgt1 = node.getRgt();
		long lft2 = posterity.getLft();
		long rgt2 = posterity.getRgt();
		return (lft1 < lft2) && (rgt1 > rgt2);
	}

	public List<M> getPosterityNodes(M node) {
		node = before(node);
		return list("from " + node.getClass().getSimpleName() + " where lft > "
				+ node.getLft() + " and rgt < " + node.getRgt()
				+ " order by lft asc");
	}

	public List<M> getChildrenNodes(M root) {
		List<M> tree = getPosterityNodes(root);

		if (Validate.notEmpty(tree)) {
			Stack<M> parent = new Stack<M>();
			parent.push(root);
			for (M node : tree) {
				while (parent.size() > 0 && parent.lastElement() != null
						&& parent.lastElement().getRgt() < node.getRgt()) {
					parent.pop();
				}
				if (parent.size() == 1) {
					if (parent.lastElement() != null) {
						parent.lastElement().getChildren().add(node);
					}

				}
				parent.push(node);
			}
		}
		return (List<M>) root.getChildren();
	}

	public long getPosterityCount(M node) {
		node = before(node);
		return (node.getRgt() - node.getLft() - 1) / 2;
	}

	public long getChildrenCount(M node) {
		return getChildrenNodes(node).size();
	}

	public String deleteNodesByIds(Class<? extends M> className, String[] ids)
			throws InstantiationException, IllegalAccessException {
		
		if (Validate.notEmpty(ids)) {
			Set<M> set = new HashSet<M>() {
				public boolean add(M e) {
					if (!this.isEmpty()) {
						java.util.Iterator<M> it = this.iterator();
						while (it.hasNext()) {
							M m = it.next();
							if (isSelf(e, m)) {
								return false;
							} else if (isAncestor(e, m)) {
								return false;
							} else if (isPosterity(e, m)) {
								it.remove();
							}
						}
					}
					return super.add(e);
				}
			};
			for (String id : ids) {
				if (Validate.hasText(id)) {
					M node = className.newInstance();
					node.setId(Long.parseLong(id));
					node = getNodeById(node);
					set.add(node);
				}
			}
			if (set.size() > 0) {
				StringBuffer sb = new StringBuffer();
				for (M node : set) {
					removeNode(node);
					sb.append(node.getId()).append(",");
				}
				return sb.deleteCharAt(sb.length()-1).toString();
			}
		}
		return null;
	}

	protected void removeNode(M node) {
		long count = getPosterityCount(node) + 1;
		String name = node.getClass().getSimpleName();
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

	public void deleteNode(M node) {
		node = before(node);
		removeNode(node);
	}

	public M appendChild(M rootNode, M newNode) throws InstantiationException,
			IllegalAccessException {
		rootNode = before(rootNode, newNode);

		long value = rootNode.getRgt() - 1;

		newNode.setValue(value);

		updateTreeNode(newNode, value);

		this.save(newNode);
		return newNode;
	}

	public M insertChild(M rootNode, M newNode) throws InstantiationException,
			IllegalAccessException {
		rootNode = before(rootNode, newNode);

		long value = rootNode.getLft();

		newNode.setValue(value);

		updateTreeNode(newNode, value);

		this.save(newNode);
		return newNode;
	}

	public M appendBrother(M rootNode, M newNode)
			throws InstantiationException, IllegalAccessException {
		rootNode = before(rootNode, newNode);

		if (rootNode.getLft() == null || rootNode.getLft() == 0
				|| rootNode.getLft() == 1) {
			throw new IllegalTreeNodeArgumentException(
					"Please select a relative position to be inserted/appended longo the node elements.");
		}

		long value = rootNode.getRgt();

		newNode.setValue(value);

		updateTreeNode(newNode, value);

		this.save(newNode);
		return newNode;
	}

	public M insertBrother(M rootNode, M newNode)
			throws InstantiationException, IllegalAccessException {
		rootNode = before(rootNode, newNode);

		if (rootNode.getLft() == null || rootNode.getLft() == 0
				|| rootNode.getLft() == 1) {
			throw new IllegalTreeNodeArgumentException(
					"Please select a relative position to be inserted/appended longo the node elements.");
		}

		long value = rootNode.getLft() - 1;

		newNode.setValue(value);

		updateTreeNode(newNode, value);

		this.save(newNode);
		return newNode;
	}

	protected void updateTreeNode(M newNode, long value) {

		String name = newNode.getClass().getSimpleName();

		executeUpdate("update " + name + " set lft = lft + 2 where lft > "
				+ value);

		executeUpdate("update " + name + " set rgt = rgt + 2 where rgt > "
				+ value);
	}

	protected M before(M node) {
		if (Validate.isNull(node)
				|| (Validate.isNull(node.getId())
						&& Validate.isNull(node.getLft()) && Validate
							.isNull(node.getRgt()))) {
			throw new IllegalTreeNodeArgumentException(
					"You gived me a empty reference node. Please comfirm the reference node's properties \"id\" or \"[lft,rgt]\" is set.");
		} else if (Validate.notNull(node.getLft())
				&& Validate.notNull(node.getRgt())) {
			return node;
		} else {
			Long id = node.getId();
			node = getNodeById(node);
			if (Validate.isNull(node)) {
				throw new DataNotFindException(
						"Can't get the node with properties \"id = " + id
								+ "\"");
			}
			return node;
		}
	}

	public M saveRoot(M node) throws InstantiationException, IllegalAccessException {
		M root = getRootNode((Class<? extends M>) node.getClass());
		if (root.getId() == null || root.getId() == 0l) {
			node.setLft(null);
			node.setRgt(null);
			BeanUtils.copyPropertiesIgnoreNull(node, root);
			save(root);
		}
		return root;
	}
	
	protected M before(M node, M newNode) throws InstantiationException,
			IllegalAccessException {
		if (Validate.isNull(newNode)) {
			throw new IllegalTreeNodeArgumentException(
					"You asked me to save a empty node. Please comfirm the node is not null.");
		}

		if (Validate.isNull(node)
				|| (Validate.isNull(node.getId())
						&& Validate.isNull(node.getLft()) && Validate
							.isNull(node.getRgt()))) {
			throw new IllegalTreeNodeArgumentException(
					"You gived me a empty reference node. Please comfirm the reference node's properties \"id\" or \"[lft,rgt]\" is set.");
		} else if (node.getId() == 0l) {
			return saveRoot(node);
		} else if (Validate.notNull(node.getLft())
				&& Validate.notNull(node.getRgt())) {
			return node;
		} else {
			node = getNodeById(node);
			if (Validate.isNull(node)) {
				throw new DataNotFindException(
						"Can't get the node with properties \"id = "
								+ node.getId() + "\"");
			}
			return node;
		}
	}

	public M getNodeById(M node) {
		if (Validate.isNull(node) || Validate.isNull(node.getId())) {
			throw new IllegalTreeNodeArgumentException(
					"You gived me a empty reference node. Please comfirm the reference node's properties \"id\" is set.");
		}
		List<M> roots = list("from " + node.getClass().getSimpleName()
				+ " where id = " + node.getId());

		return (Validate.notEmpty(roots)) ? roots.get(0) : null;
	}

	public M getNodeByLftRgt(M node) {
		if (Validate.isNull(node) || Validate.isNull(node.getLft())
				|| Validate.isNull(node.getRgt())) {
			throw new IllegalTreeNodeArgumentException(
					"You gived me a empty reference node. Please comfirm the reference node's properties \"lft\" and \"rgt\" is set.");
		}
		List<M> roots = list("from " + node.getClass().getSimpleName()
				+ " where lft = " + node.getLft() + " and rgt = "
				+ node.getRgt());
		return (Validate.notEmpty(roots)) ? roots.get(0) : null;
	}

	public M getRootNode(Class<? extends M> className)
			throws InstantiationException, IllegalAccessException {
		List<M> roots = list("from " + className.getSimpleName()
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
		return getRootNode(className);
	}

	protected List<M> getGenerations(M root) {
		root = before(root);
		List<M> generation = list("from " + root.getClass().getSimpleName()
				+ " where lft between " + root.getLft() + " and "
				+ root.getRgt() + " order by lft asc");
		if (!Validate.notEmpty(generation)) {
			generation = new ArrayList<M>();
			generation.add(root);
		}
		return generation;
	}

	protected List<M> generations(List<M> nodes,TreeNodeParser<M>... parser) {
		if (nodes != null && nodes.size() > 0) {
			Stack<M> parent = new Stack<M>();
			M root = null, first = nodes.get(0);
			if (first.getLft() != 1) {
				root = getParentNode(first);
			}
			parent.push(root);
			for (M node : nodes) {
				while (parent.size() > 0 && parent.lastElement() != null
						&& parent.lastElement().getRgt() < node.getRgt()) {
					parent.pop();
				}
				if (parent.size() > 0) {
					if (parent.lastElement() != null) {
						//增加回调函数
						if(Validate.notEmpty(parser) && Validate.notNull(parser[0])){
							node = parser[0].parse(node);
						}
						parent.lastElement().getChildren().add(node);
					}
					node.setParent(parent.lastElement());
				}
				node.setLevel(parent.size() * 1l);
				parent.push(node);
			}
		}
		return nodes;
	}

	public List<M> getGenerationsTree(M root,TreeNodeParser<M>... parser) {
		List<M> list = new ArrayList<M>();
		list.add(generations(getGenerations(root),parser).get(0));
		return list;
	}

	public List<M> getGenerationsList(M root,TreeNodeParser<M>... parser) {
		return generations(getGenerations(root),parser);
	}

	public List<M> getGenerationsTree(Class<? extends M> className,TreeNodeParser<M>... parser)
			throws InstantiationException, IllegalAccessException {
		List<M> list = new ArrayList<M>();
		list.add(generations(getGenerations(getRootNode(className)),parser).get(0));
		return list;
	}

	public List<M> getGenerationsList(Class<? extends M> className,TreeNodeParser<M>... parser)
			throws InstantiationException, IllegalAccessException {
		return generations(getGenerations(getRootNode(className)),parser);
	}

	public void shiftNode(M node, M oldParent, M newParent, Integer index) {
		node = before(node);
		oldParent = before(oldParent);
		newParent = before(newParent);

		if (node.getLft() < newParent.getLft()
				&& node.getRgt() > newParent.getRgt()) {
			throw new IllegalArgumentException("不可以将一个节点拖到其子节点下面！");
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
		String name = node.getClass().getSimpleName();

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
