package com.atomunion.web.service.tree;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.util.Collection;
import java.util.Map;

import com.atomunion.web.common.bean.vo.VoBean;
import com.atomunion.web.common.json.template.JSONTemplate;
import com.atomunion.web.model.AbstractTreeNode;
import com.atomunion.web.service.IBaseService;

/**
 * @author lico
 * 
 * @version 1.0.000 At Jul 11, 2013
 */
public interface ITreeFacadeService<M extends AbstractTreeNode, PK extends Serializable>
		extends IBaseService<M, PK> {
	/**
	 * 查询任意节点下的所有子孙节点，组装成平面有序JSON数据
	 * 
	 * @throws NoSuchMethodException
	 * @throws InvocationTargetException
	 * @throws IllegalAccessException
	 * @throws SecurityException
	 * @throws IllegalArgumentException
	 * */
	VoBean<Collection<M>> getGenerationsJsonList(M node, Map<String, String> keys)
			throws IllegalArgumentException, SecurityException,
			IllegalAccessException, InvocationTargetException,
			NoSuchMethodException;

	/**
	 * 查询任意节点下的所有子孙节点，组装为JSON树形结构数据
	 * 
	 * @throws Exception
	 * */
	VoBean<Collection<M>> getGenerationsJsonTree(M node, Map<String, String> keys,
			String... children) throws Exception;

	/**
	 * 查询任意节点下的所有子孙节点，组装成平面有序JSON数据
	 * 
	 * @throws NoSuchMethodException
	 * @throws InvocationTargetException
	 * @throws SecurityException
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 * */
	VoBean<Collection<M>> getGenerationsJsonList(Class<? extends M> className,
			Map<String, String> keys) throws InstantiationException,
			IllegalAccessException, IllegalArgumentException,
			SecurityException, InvocationTargetException, NoSuchMethodException;

	/**
	 * 查询任意节点下的所有子孙节点，组装为JSON树形结构数据
	 * 
	 * @throws InstantiationException
	 * @throws NoSuchMethodException
	 * @throws InvocationTargetException
	 * @throws IllegalAccessException
	 * @throws SecurityException
	 * @throws IllegalArgumentException
	 * */
	VoBean<Collection<M>> getGenerationsJsonTree(Class<? extends M> className,
			Map<String, String> keys, String... children)
			throws IllegalArgumentException, SecurityException,
			IllegalAccessException, InvocationTargetException,
			NoSuchMethodException, InstantiationException;

}
