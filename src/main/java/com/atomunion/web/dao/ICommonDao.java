package com.atomunion.web.dao;

import java.io.Serializable;
import java.util.List;
import java.util.Map.Entry;

import org.hibernate.Criteria;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.type.Type;

import com.atomunion.web.model.AbstractModel;
import com.atomunion.web.util.CriteriaBuilder;

/**
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
public interface ICommonDao {

	<M extends AbstractModel> M save(M model);

	<M extends AbstractModel> void saveOrUpdate(M model);

	<M extends AbstractModel> void update(M model);

	<M extends AbstractModel, PK extends Serializable> void remove(
			Class<M> entityClass, PK id);

	<M extends AbstractModel> void delete(M model);

	<M extends AbstractModel> void merge(M model);

	<M extends AbstractModel> void evict(M entity);

	<M extends AbstractModel> void persist(M model);

	<M extends AbstractModel, PK extends Serializable> M get(
			Class<M> entityClass, PK id);

	<M extends AbstractModel, PK extends Serializable> M load(
			Class<M> entityClass, PK id);

	<M extends AbstractModel> int count(Class<M> entityClass);

	<M extends AbstractModel, PK extends java.io.Serializable> boolean exists(
			Class<M> entityClass, PK id);

	<M extends AbstractModel> String getIdentifierPropertyName(
			Class<M> entityClass);

	<M extends AbstractModel> List<M> list(Class<M> entityClass);

	<M extends AbstractModel> List<M> list(final String sql,
			final Object... paramlist);

	<M extends AbstractModel> List<M> query(Class<M> entityClass, int pn,
			int pageSize);

	<M extends AbstractModel> List<M> query(final String hql, final int pn,
			final int pageSize, final Object... paramlist);

	<M extends AbstractModel> List<M> query2(final String hql, final int start,
			final int length, final Object... paramlist);

	<M extends AbstractModel> M unique(final String hql,
			final Object... paramlist);

	<M extends AbstractModel> boolean isUnique(M entity,
			String... uniquePropertyNames);
}
