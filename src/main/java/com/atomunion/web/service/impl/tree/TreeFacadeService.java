package com.atomunion.web.service.impl.tree;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import com.atomunion.core.util.Validate;
import com.atomunion.web.common.bean.vo.VoBean;
import com.atomunion.web.dao.IBaseDao;
import com.atomunion.web.dao.hibernate4.TreeFacade;
import com.atomunion.web.dao.tree.ITreeFacadeDao;
import com.atomunion.web.model.AbstractTreeNode;
import com.atomunion.web.service.IBaseService;
import com.atomunion.web.service.impl.BaseService;
import com.atomunion.web.service.tree.ITreeFacadeService;

/**
 * @author lico
 * 
 * @version 1.0.000 At Jul 11, 2013
 */
public abstract class TreeFacadeService<M extends AbstractTreeNode, PK extends Serializable>
		extends BaseService<M, PK> implements ITreeFacadeService<M, PK>, IBaseService<M, PK> {
	
	protected ITreeFacadeDao<M, PK> treeDao;

	public TreeFacadeService() {
		// TODO Auto-generated constructor stub
	}

	public VoBean<Collection<M>> getGenerationsJsonList(M node, Map<String, String> keys)
			throws IllegalArgumentException, SecurityException, IllegalAccessException,
			InvocationTargetException, NoSuchMethodException {
		List<M> roots = treeDao.getGenerationsList(node);

		VoBean<Collection<M>> vo = new VoBean<Collection<M>>(TreeFacade.JSON_ROOT);
		vo.push(roots, setNodeKeys(keys));

		return vo;
	}

	public VoBean<Collection<M>> getGenerationsJsonTree(M node, Map<String, String> keys,
			String... children) throws Exception {
		List<M> root = treeDao.getGenerationsTree(node);
		keys = setNodeKeys(keys);

		VoBean<Collection<M>> vo = new VoBean<Collection<M>>(TreeFacade.JSON_ROOT);
		vo.push(root, keys).recursion(
				root,
				TreeFacade.JSON_CHILDREN,
				(Validate.notEmpty(children) && Validate.hasText(children[0])) ? children[0]
						: TreeFacade.JSON_CHILDREN, keys);

		return vo;
	}

	public VoBean<Collection<M>> getGenerationsJsonList(Class<? extends M> className,
			Map<String, String> keys) throws InstantiationException, IllegalAccessException,
			IllegalArgumentException, SecurityException, InvocationTargetException,
			NoSuchMethodException {
		List<M> roots = treeDao.getGenerationsList(className);
		VoBean<Collection<M>> vo = new VoBean<Collection<M>>(TreeFacade.JSON_ROOT);
		vo.push(roots, setNodeKeys(keys));
		return vo;
	}

	public VoBean<Collection<M>> getGenerationsJsonTree(Class<? extends M> className,
			Map<String, String> keys, String... children) throws IllegalArgumentException,
			SecurityException, IllegalAccessException, InvocationTargetException,
			NoSuchMethodException, InstantiationException {
		List<M> root = treeDao.getGenerationsTree(className);
		keys = setNodeKeys(keys);
		VoBean<Collection<M>> vo = new VoBean<Collection<M>>(TreeFacade.JSON_ROOT);

		vo.recursion(root, TreeFacade.JSON_CHILDREN, (Validate.notEmpty(children) && Validate
				.hasText(children[0])) ? children[0] : TreeFacade.JSON_CHILDREN, keys);

		return vo;
	}

	protected Map<String, String> setNodeKeys(Map<String, String> keys) {
		Map<String, String> map = TreeFacade.getNodeKeys();
		if (Validate.notEmpty(keys)) {
			map.putAll(keys);
		}
		return map;
	}

	@Override
	public void setBaseDao(IBaseDao<M, PK> baseDao) {
		this.treeDao = (ITreeFacadeDao<M, PK>) baseDao;
		super.setBaseDao(baseDao);
	}

}
