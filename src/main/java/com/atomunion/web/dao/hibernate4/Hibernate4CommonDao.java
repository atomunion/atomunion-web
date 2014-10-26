package com.atomunion.web.dao.hibernate4;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;

import org.apache.commons.beanutils.PropertyUtils;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.metadata.ClassMetadata;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import org.springframework.util.ReflectionUtils;

import com.atomunion.web.common.pagination.PageUtil;
import com.atomunion.web.dao.ICommonDao;
import com.atomunion.web.model.AbstractModel;

/**
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
@Component("hibernate4CommonDao")
public class Hibernate4CommonDao implements ICommonDao {
	protected static final Logger LOG = LoggerFactory
			.getLogger(Hibernate4CommonDao.class);
	@Resource(name="sessionFactory")
	private SessionFactory sessionFactory;

	protected Session getSession() {
		return sessionFactory.getCurrentSession();
	}

	public <M extends AbstractModel> M save(M model) {
		getSession().save(model);
		return model;
	}

	public <M extends AbstractModel> void saveOrUpdate(M model) {
		getSession().saveOrUpdate(model);

	}

	public <M extends AbstractModel> void update(M model) {
		getSession().update(model);
	}

	public <M extends AbstractModel> void merge(M model) {
		getSession().merge(model);
	}

	public <M extends AbstractModel, PK extends Serializable> void remove(
			Class<M> entityClass, PK id) {
		getSession().delete(get(entityClass, id));
	}

	public <M extends AbstractModel> void delete(M model) {
		getSession().delete(model);
	}

	public <M extends AbstractModel, PK extends Serializable> M get(
			Class<M> entityClass, PK id) {
		return (M) getSession().get(entityClass, id);

	}

	public <M extends AbstractModel, PK extends Serializable> M load(
			Class<M> entityClass, PK id) {
		return (M) getSession().load(entityClass, id);
	}

	public <M extends AbstractModel> int count(Class<M> entityClass) {
		Criteria criteria = getSession().createCriteria(entityClass);
		criteria.setProjection(Projections.rowCount());
		return ((Long) criteria.uniqueResult()).intValue();
	}

	public <M extends AbstractModel> void evict(M entity) {
		getSession().evict(entity);
	}

	public <M extends AbstractModel> void persist(M entity) {
		getSession().persist(entity);
	}

	public <M extends AbstractModel> String getIdentifierPropertyName(
			Class<M> entityClass) {
		ClassMetadata meta = this.sessionFactory.getClassMetadata(entityClass);
		Assert.notNull(meta, "Class " + entityClass
				+ " not define in hibernate session factory.");
		String idName = meta.getIdentifierPropertyName();
		Assert.hasText(idName, entityClass.getSimpleName()
				+ " has no identifier property define.");
		return idName;
	}

	public <M extends AbstractModel, PK extends Serializable> boolean exists(
			Class<M> entityClass, PK id) {
		return get(entityClass, id) != null;
	}

	public <M extends AbstractModel> List<M> list(String sql,
			Object... paramlist) {
		return query(sql, -1, -1, paramlist);
	}

	@SuppressWarnings("unchecked")
	public <M extends AbstractModel> List<M> list(Class<M> entityClass) {
		Criteria criteria = getSession().createCriteria(entityClass);
		return criteria.list();
	}

	@SuppressWarnings("unchecked")
	public <M extends AbstractModel> List<M> query(Class<M> entityClass, int pn,
			int pageSize) {
		Criteria criteria = getSession().createCriteria(entityClass);
		criteria.setFirstResult(PageUtil.getPageStart(pn, pageSize));
		return criteria.list();
	}

	public <M extends AbstractModel> List<M> query(String hql, int pn,
			int pageSize, Object... paramlist) {
		Query query = getSession().createQuery(hql);
		setParameters(query, paramlist);
		if (pn > -1 && pageSize > -1) {
			query.setMaxResults(pageSize);
			int start = PageUtil.getPageStart(pn, pageSize);
			if (start != 0) {
				query.setFirstResult(start);
			}
		}
		if (pn < 0) {
			query.setFirstResult(0);
		}
		return query.list();
	}

	public <M extends AbstractModel> List<M> query2(String hql, int start,
			int length, Object... paramlist) {
		Query query = getSession().createQuery(hql);
		setParameters(query, paramlist);

		if (start > -1 && length > -1) {
			query.setMaxResults(length);
			if (start != 0) {
				query.setFirstResult(start);
			}
		}
		return query.list();
	}

	public <M extends AbstractModel> M unique(String hql, Object... paramlist) {
		Query query = getSession().createQuery(hql);
		if (paramlist != null) {
			setParameters(query, paramlist);
		}

		return (M) query.uniqueResult();
	}

	public <M extends AbstractModel> boolean isUnique(M entity,
			String... uniquePropertyNames) {
		Assert.notNull(entity);
		Assert.notEmpty(uniquePropertyNames);
		Assert.noNullElements(uniquePropertyNames);

		Criteria criteria = getSession().createCriteria(entity.getClass())
				.setProjection(Projections.rowCount());
		try {
			for (String name : uniquePropertyNames) {
				criteria.add(Restrictions.eq(name,
						PropertyUtils.getProperty(entity, name)));
			}

			String pk = getIdentifierPropertyName(entity.getClass());
			if (pk != null) {
				Serializable id = (Serializable) PropertyUtils.getProperty(
						entity, pk);

				if (id != null)
					criteria.add(Restrictions.not(Restrictions.eq(pk, id)));
			}

		} catch (Exception e) {
			ReflectionUtils.handleReflectionException(e);
		}

		return (Integer) criteria.uniqueResult() == 0;
	}

	protected final void setParameters(Query query, Object[] paramlist) {
		if (paramlist != null) {
			Object param = null;
			for (int i = 0; i < paramlist.length; i++) {
				param = paramlist[i];
				if (param instanceof Date) {
					// TODO 难道这是bug 使用setParameter不行？？
					query.setTimestamp(i, (Date) param);
				} else if (param instanceof Map) {
					for (Entry<String, Collection<?>> e : ((Map<String, Collection<?>>) param)
							.entrySet()) {
						query.setParameterList(e.getKey(), e.getValue());
					}
				} else {
					query.setParameter(i, param);
				}
			}
		}
	}
}
