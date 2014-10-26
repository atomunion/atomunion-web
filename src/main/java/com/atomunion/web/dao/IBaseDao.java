package com.atomunion.web.dao;

import java.util.List;
import java.util.Map.Entry;

import org.hibernate.Criteria;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.type.Type;

import com.atomunion.web.util.CriteriaBuilder;

/**
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
public interface IBaseDao<M extends java.io.Serializable, PK extends java.io.Serializable> {

	PK save(M model);

	void saveOrUpdate(M model);

	void update(M model);

	void remove(PK id);

	void delete(M model);

	void merge(M model);

	void evict(M entity);

	void persist(M model);

	void flush();

	void clear();

	M get(PK id);

	M load(PK id);

	int count();

	boolean exists(PK id);

	List<M> list();

	List<M> list(Criteria criteria);

	List<M> list(DetachedCriteria criteria);

	List<M> list(CriteriaBuilder builder);

	List<M> list(final String sql, final Object... paramlist);

	List<M> query(int pn, int pageSize);

	List<M> query(final String hql, final int pn, final int pageSize,
			final Object... paramlist);

	List<M> previous(PK pk, int pn, int pageSize);

	List<M> next(PK pk, int pn, int pageSize);

	List<M> query(CriteriaBuilder builder, final int pn, final int pageSize);

	List<M> query2(final String hql, final int start, final int length, final Object... paramlist);

	M unique(Criteria criteria);

	M unique(DetachedCriteria criteria);

	M unique(final String hql, final Object... paramlist);

	boolean isUnique(M entity, String... uniquePropertyNames);

	String getPKName();

	String getIdentifierPropertyName();

	List<M> listBySQL(final String nativeSQL, final List<Entry<String, Class<?>>> entityList,
			final List<Entry<String, Type>> scalarList, final Object... paramlist);

	List<M> listBySQL(final String nativeSQL, final int pn, final int pageSize,
			final List<Entry<String, Class<?>>> entityList,
			final List<Entry<String, Type>> scalarList, final Object... paramlist);

	M uniqueBySQL(final String natvieSQL, final List<Entry<String, Type>> scalarList,
			final Object... paramlist);

	int getTotal(String hql, Object[] paramlist);

}
