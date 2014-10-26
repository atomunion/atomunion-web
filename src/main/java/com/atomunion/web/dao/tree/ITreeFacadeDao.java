package com.atomunion.web.dao.tree;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import com.atomunion.web.dao.IBaseDao;
import com.atomunion.web.model.AbstractTreeNode;

/**
 * @author lico
 * @version 1.0.000 At Oct 20, 2010 10:12:43 AM Description:
 */
public interface ITreeFacadeDao<M extends AbstractTreeNode, PK extends Serializable> extends IBaseDao<M, PK>{
	/**
	 * 根据_id属性查询任意节点
	 * */
	M getNodeById(M node);

	/**
	 * 根据_rgt,_lft属性查询任意节点
	 * */
	M getNodeByLftRgt(M node);

	/**
	 * 查询任意节点的直接父节点
	 * 
	 * @
	 * */
	M getParentNode(M node);

	/**
	 * 查询任意节点的所有祖先节点,丛父亲顺序向上放入list中，也可以用于获取节点完整路径
	 * */
	List<M> getAncestorNodes(M node);

	/**
	 * 查询任意节点的祖先节点总数
	 */
	long getAncestorCount(M node);

	/**
	 * 查询任意节点在其所在的树形结构中的层级数
	 */
	long getLevel(M node);

	/**
	 * 查询任意节点node是否叶子节点
	 * */
	boolean isLeaf(M node);
	
	/**
	 * 查询root节点是否为node节点的祖先节点
	 * */
	boolean isAncestor(M node,M root);
	
	/**
	 * 查询posterity节点是否为node节点的子孙节点
	 * */
	boolean isPosterity(M node,M posterity);
	
	
	/**
	 * 查询任意节点node1是否和node2相同，为自身
	 * */
	boolean isSelf(M node1,M node2);

	/**
	 * 查询任意节点下的所有子孙节点，组装成平面有序数据
	 * */
	Collection<M> getPosterityNodes(M node);

	/**
	 * 查询任意节点下的所有儿子节点，组装成平面无序数据
	 * */
	Collection<M> getChildrenNodes(M node);

	/**
	 * 查询任意节点下子孙节点总数
	 * */
	long getPosterityCount(M node);

	/**
	 * 查询任意节点下儿子总数
	 * */
	long getChildrenCount(M node);
	
	M saveRoot(M node) throws InstantiationException, IllegalAccessException;
	
	/**
	 * 添加末尾子节点
	 * 
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 * */
	M appendChild(M root, M node) throws InstantiationException,
			IllegalAccessException;

	/**
	 * 插入长子节点
	 * 
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 * */
	M insertChild(M root, M node) throws InstantiationException,
			IllegalAccessException;

	/**
	 * 新增弟弟节点
	 * 
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 * */
	M appendBrother(M root, M node) throws InstantiationException,
			IllegalAccessException;

	/**
	 * 新增哥哥节点
	 * 
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 * */
	M insertBrother(M root, M node) throws InstantiationException,
			IllegalAccessException;

	/**
	 * 删除节点
	 * */
	void deleteNode(M node);

	/**
	 * 根据节点的id批量删除节点,返回被删除的节点的id，以逗号分隔
	 * 
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 *
	 * */
	String deleteNodesByIds(Class<? extends M> className, String[] _ids)
			throws InstantiationException, IllegalAccessException;

	/**
	 * 查询当前树的根节点
	 * 
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 * */
	M getRootNode(Class<? extends M> className) throws InstantiationException,
			IllegalAccessException;

	/**
	 * 查询当前树的根节点
	 * 
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 * */
	M getRootNode(Class<? extends M> className,Class<? extends M> newClassName) throws InstantiationException,
			IllegalAccessException;
	/**
	 * 查询任意节点下的所有子节点，组装为树形结构数据
	 * */
	List<M> getGenerationsTree(M node,TreeNodeParser<M>... parser);

	/**
	 * 查询任意节点下的所有子节点，组装成平面有序数据
	 * */
	List<M> getGenerationsList(M root,TreeNodeParser<M>... parser);

	/**
	 * 查询根节点下的所有子节点，组装为树形结构数据
	 * 
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 * */
	List<M> getGenerationsTree(Class<? extends M> className,TreeNodeParser<M>... parser)
			throws InstantiationException, IllegalAccessException;

	/**
	 * 查询根节点下的所有子节点，组装成平面有序数据
	 * 
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 * */
	List<M> getGenerationsList(Class<? extends M> className,TreeNodeParser<M>... parser)
			throws InstantiationException, IllegalAccessException;

	/**
	 * 移动节点至新位置
	 * */
	void shiftNode(M node, M oldParentNode, M newParentNode, Integer index);

}
