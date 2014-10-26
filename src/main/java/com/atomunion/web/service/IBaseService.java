package com.atomunion.web.service;

import java.util.List;

import com.atomunion.web.common.pagination.Page;

/**
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
public interface IBaseService<M extends java.io.Serializable, PK extends java.io.Serializable> {

	M save(M model);

	void saveOrUpdate(M model);

	void update(M model);

	void remove(PK id);

	void delete(M model);
	
	void merge(M model);

	M get(PK id);
	
	M load(PK id);

	int count();

	List<M> list();

	Page<M> page(int pn);

	Page<M> page(int pn, int pageSize);
	
	Page<M> page(final String hql, final int pn, final int pageSize,
			final Object... paramlist);

	Page<M> previous(PK pk, int pn);
	
	Page<M> previous(PK pk, int pn, int pageSize);

	Page<M> next(PK pk, int pn);
	
	Page<M> next(PK pk, int pn, int pageSize);
}
