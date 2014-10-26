package com.atomunion.web.service;

import java.io.Serializable;
import java.util.List;

import com.atomunion.web.common.pagination.Page;
import com.atomunion.web.model.AbstractModel;

/**
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
public interface ICommonService {

	<T extends AbstractModel> T save(T model);

	<T extends AbstractModel> void saveOrUpdate(T model);

	<T extends AbstractModel> void update(T model);

	<T extends AbstractModel> void merge(T model);

	<T extends AbstractModel, PK extends Serializable> void remove(
			Class<T> entityClass, PK id);

	<T extends AbstractModel> void delete(T model);

	<T extends AbstractModel, PK extends Serializable> T get(
			Class<T> entityClass, PK id);

	<T extends AbstractModel> int count(Class<T> entityClass);

	<T extends AbstractModel> List<T> list(Class<T> entityClass);

	<T extends AbstractModel> List<T> list(String sql,
			Object... paramlist) ;
	
	<T extends AbstractModel> Page<T> page(Class<T> entityClass, int pn);

	<T extends AbstractModel> Page<T> page(Class<T> entityClass, int pn,
			int pageSize);

}
