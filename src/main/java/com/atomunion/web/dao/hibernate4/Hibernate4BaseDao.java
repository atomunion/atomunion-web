package com.atomunion.web.dao.hibernate4;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.ParameterizedType;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.persistence.Id;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.PropertyUtils;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.engine.spi.SessionFactoryImplementor;
import org.hibernate.hql.internal.ast.QueryTranslatorImpl;
import org.hibernate.metadata.ClassMetadata;
import org.hibernate.type.Type;
import org.springframework.util.Assert;
import org.springframework.util.ReflectionUtils;

import com.atomunion.core.util.Validate;
import com.atomunion.web.common.pagination.PageUtil;
import com.atomunion.web.dao.IBaseDao;
import com.atomunion.web.util.CriteriaBuilder;

/**
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
public abstract class Hibernate4BaseDao<M extends Serializable, PK extends Serializable> implements
		IBaseDao<M, PK> {

	protected final Class<M> entity;
	protected final String pk;

	private final String HQL_LIST;
	private final String HQL_COUNT;

	private final String HQL_OPTIMIZE_PRE_LIST;
	private final String HQL_OPTIMIZE_NEXT_LIST;

	@Resource(name = "sessionFactory")
	private SessionFactory sessionFactory;

	@SuppressWarnings("unchecked")
	public Hibernate4BaseDao() {
		this.entity = (Class<M>) ((ParameterizedType) (getClass().getGenericSuperclass()))
				.getActualTypeArguments()[0];

		String id = null;
		Class<?> pclass = this.entity;
		do {
			Field[] fields = pclass.getDeclaredFields();
			for (Field f : fields) {
				if (f.isAnnotationPresent(Id.class)) {
					id = f.getName();
					break;
				}
			}
			pclass = pclass.getSuperclass();
		} while (pclass != null && pclass != Object.class);
		pk = id;
		Assert.notNull(pk);

		String entityName = this.entity.getSimpleName();

		HQL_LIST = "from " + entityName + " order by " + pk + " desc";
		HQL_OPTIMIZE_PRE_LIST = "from " + entityName + " where " + pk + " > ? order by " + pk
				+ " asc";
		HQL_OPTIMIZE_NEXT_LIST = "from " + entityName + " where " + pk + " < ? order by " + pk
				+ " desc";
		HQL_COUNT = "select count(" + pk + ") from " + entityName;
	}

	protected final Session getSession() {
		// 事务必须是开启的(Required)，否则获取不到
		return sessionFactory.getCurrentSession();
	}

	@SuppressWarnings("unchecked")
	public final PK save(M model) {
		return (PK) getSession().save(model);
	}

	public final void saveOrUpdate(M model) {
		getSession().saveOrUpdate(model);
	}

	public final void update(M model) {
		getSession().update(model);

	}

	public final void persist(M model) {
		getSession().persist(model);
	}

	public final void merge(M model) {
		getSession().merge(model);
	}

	public final void evict(M entity) {
		getSession().evict(entity);
	}

	public final void remove(PK id) {
		getSession().delete(this.get(id));

	}

	public final void delete(M model) {
		getSession().delete(model);

	}

	public final void flush() {
		getSession().flush();
	}

	public final void clear() {
		getSession().clear();
	}

	public final boolean exists(PK id) {
		return get(id) != null;
	}

	public final M copy(PK id) {
		M obj = null;
		try {
			obj = this.entity.newInstance();
			BeanUtils.copyProperties(obj, get(id));
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		} catch (java.lang.InstantiationException e) {
			e.printStackTrace();
		}
		return obj;
	}

	@SuppressWarnings("unchecked")
	public final M get(PK id) {
		return (M) getSession().get(this.entity, id);
	}

	@SuppressWarnings("unchecked")
	public final M load(PK id) {
		return (M) getSession().load(this.entity, id);
	}

	public final int count() {
		Query query = getSession().createQuery(HQL_COUNT);
		return ((Number) query.uniqueResult()).intValue();
	}

	public final String getPKName() {
		return this.pk;
	}

	public final String getIdentifierPropertyName() {
		ClassMetadata meta = this.sessionFactory.getClassMetadata(this.entity);
		Assert.notNull(meta, "Class " + this.entity + " not define in hibernate session factory.");
		String idName = meta.getIdentifierPropertyName();
		Assert.hasText(idName, this.entity.getSimpleName() + " has no identifier property define.");
		return idName;
	}

	public final List<M> previous(PK pk, int pn, int pageSize) {
		if (pk == null) {
			return query(HQL_LIST, pn, pageSize);
		}
		// 倒序，重排
		List<M> result = query(HQL_OPTIMIZE_PRE_LIST, 1, pageSize, pk);
		if (Validate.notEmpty(result)) {
			Collections.reverse(result);
		}
		return result;
	}

	public final List<M> next(PK pk, int pn, int pageSize) {
		if (pk == null) {
			return query(HQL_LIST, pn, pageSize);
		}
		return query(HQL_OPTIMIZE_NEXT_LIST, 1, pageSize, pk);
	}

	public final List<M> list() {
		return list(HQL_LIST);
	}

	public final List<M> list(final String hql, final Object... paramlist) {
		Assert.hasText(hql);

		Query query = getSession().createQuery(hql);
		setParameters(query, paramlist);

		return query.list();
	}

	@SuppressWarnings("unchecked")
	public final List<M> list(Criteria criteria) {
		return criteria.list();
	}

	public final List<M> list(CriteriaBuilder builder) {
		return list(builder);
	}

	public final List<M> list(DetachedCriteria criteria) {
		return list(criteria.getExecutableCriteria(getSession()));
	}

	public int getTotal(final String hql, final Object[] values) {

		// 将HQL语句 转换为SQL
		Assert.hasText(hql);
		hql.replaceAll("fetch", " ");

		QueryTranslatorImpl queryTranslator = new QueryTranslatorImpl(hql, hql,
				Collections.EMPTY_MAP, (SessionFactoryImplementor) sessionFactory);
		queryTranslator.compile(Collections.EMPTY_MAP, false);
		String tempSQL = queryTranslator.getSQLString();

		// 将对应转换完成的SQL语句 套入查询模版
		String countSQL = "select count(1) from (" + tempSQL + ") tmp_count_t";

		// 创建Query 对象
		Query query = getSession().createSQLQuery(countSQL);

		// 添加参数
		setParameters(query, values);

		// 执行查询
		List<?> list = query.list();
		// 获取结果集
		return (Validate.notEmpty(list)) ? new Integer(list.get(0).toString()) : 0;
	}

	public final List<M> query(int pn, int pageSize) {
		return query(HQL_LIST, pn, pageSize);
	}

	@SuppressWarnings("unchecked")
	public final List<M> query(final String hql, int pageNumber, int pageSize,
			final Object... paramlist) {
		Assert.hasText(hql);


		Query query = getSession().createQuery(hql);
		setParameters(query, paramlist);
		if (pageNumber != -1 || pageSize != -1) {
			query.setFirstResult(PageUtil.getPageStart(pageNumber, pageSize));
			query.setMaxResults(PageUtil.validatePageSize(pageSize));
		}
		return query.list();
	}

	@SuppressWarnings("unchecked")
	public final List<M> query(CriteriaBuilder builder, final int pn, final int pageSize){
		Criteria criteria = getSession().createCriteria(this.entity);
		builder.build(criteria);
		criteria.setFirstResult(PageUtil.getPageStart(pn, pageSize));
		criteria.setMaxResults(PageUtil.validatePageSize(pageSize));
		return criteria.list();
	}

	@SuppressWarnings("unchecked")
	public final List<M> query2(final String hql, final int start, final int length,
			final Object... paramlist) {
		Assert.hasText(hql);
		Query query = getSession().createQuery(hql);
		setParameters(query, paramlist);

		if (start != -1 || length != -1) {
			query.setFirstResult((start < 0) ? 0 : start);
			query.setMaxResults(PageUtil.validatePageSize(length));
		}
		return query.list();
	}

	public final M unique(DetachedCriteria criteria) {
		return (M) unique(criteria.getExecutableCriteria(getSession()));
	}

	@SuppressWarnings("unchecked")
	public final M unique(Criteria criteria) {
		return (M) criteria.uniqueResult();
	}

	public final boolean isUnique(M entity, String... uniquePropertyNames) {
		Assert.notEmpty(uniquePropertyNames);
		Assert.noNullElements(uniquePropertyNames);
		Criteria criteria = getSession().createCriteria(this.entity).setProjection(
				Projections.rowCount());
		try {
			for (String name : uniquePropertyNames) {
				criteria.add(Restrictions.eq(name, PropertyUtils.getProperty(entity, name)));
			}

			Serializable id = (Serializable) PropertyUtils.getProperty(entity, this.pk);

			if (id != null)
				criteria.add(Restrictions.not(Restrictions.eq(this.pk, id)));
		} catch (Exception e) {
			ReflectionUtils.handleReflectionException(e);
		}

		return (Integer) criteria.uniqueResult() == 0;
	}

	/**
	 * 根据查询条件返回唯一一条记录
	 */
	@SuppressWarnings("unchecked")
	public final M unique(final String hql, final Object... paramlist) {
		Assert.hasText(hql);
		Query query = getSession().createQuery(hql);
		if (paramlist != null) {
			setParameters(query, paramlist);
		}

		return (M) query.uniqueResult();
	}

	@SuppressWarnings("unchecked")
	public final M uniqueBySQL(final String natvieSQL, final List<Entry<String, Type>> scalarList,
			final Object... paramlist) {
		Assert.hasText(natvieSQL);
		SQLQuery query = getSession().createSQLQuery(natvieSQL);
		if (scalarList != null) {
			for (Entry<String, Type> entity : scalarList) {
				query.addScalar(entity.getKey(), entity.getValue());
			}
		}

		setParameters(query, paramlist);

		return (M) query.uniqueResult();
	}

	public final List<M> listBySQL(final String nativeSQL,
			final List<Entry<String, Class<?>>> entityList,
			final List<Entry<String, Type>> scalarList, final Object... paramlist) {
		return listBySQL(nativeSQL, -1, -1, entityList, scalarList, paramlist);
	}

	@SuppressWarnings("unchecked")
	public final List<M> listBySQL(final String nativeSQL, final int pn, final int pageSize,
			final List<Entry<String, Class<?>>> entityList,
			final List<Entry<String, Type>> scalarList, final Object... paramlist) {

		Assert.hasText(nativeSQL);

		SQLQuery query = getSession().createSQLQuery(nativeSQL);
		if (entityList != null) {
			for (Entry<String, Class<?>> entity : entityList) {
				query.addEntity(entity.getKey(), entity.getValue());
			}
		}
		if (scalarList != null) {
			for (Entry<String, Type> entity : scalarList) {
				query.addScalar(entity.getKey(), entity.getValue());
			}
		}

		setParameters(query, paramlist);

		if (pn != -1 || pageSize != -1) {
			query.setFirstResult(PageUtil.getPageStart(pn, pageSize));
			query.setMaxResults(PageUtil.validatePageSize(pageSize));
		}

		return query.list();
	}

	/**
	 * 执行批处理语句.如 之间insert, update, delete 等.
	 */
	protected final int executeUpdate(final String hql, final Object... paramlist) {
		Assert.hasText(hql);
		Query query = getSession().createQuery(hql);
		setParameters(query, paramlist);
		return query.executeUpdate();
	}

	protected final int executeUpdateBySQL(final String natvieSQL, final Object... paramlist) {
		Assert.hasText(natvieSQL);
		Query query = getSession().createSQLQuery(natvieSQL);
		setParameters(query, paramlist);
		return query.executeUpdate();
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

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

}
