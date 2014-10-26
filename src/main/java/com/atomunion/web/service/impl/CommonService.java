package com.atomunion.web.service.impl;

import java.io.Serializable;
import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.atomunion.web.common.pagination.Page;
import com.atomunion.web.common.pagination.PageUtil;
import com.atomunion.web.constants.Constants;
import com.atomunion.web.dao.ICommonDao;
import com.atomunion.web.model.AbstractModel;
import com.atomunion.web.service.ICommonService;

/**
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
@Service("CommonService")
public class CommonService implements ICommonService {
	protected static final Logger LOG = LoggerFactory
			.getLogger(CommonService.class);
	@Resource(name = "hibernate4CommonDao")
	private ICommonDao commonDao;

	public <T extends AbstractModel> T save(T model) {
		return commonDao.save(model);
	}

	public <T extends AbstractModel> void saveOrUpdate(T model) {
		commonDao.saveOrUpdate(model);

	}

	public <T extends AbstractModel> void update(T model) {
		commonDao.update(model);
	}

	public <T extends AbstractModel> void merge(T model) {
		commonDao.merge(model);
	}

	public <T extends AbstractModel, PK extends Serializable> void remove(
			Class<T> entityClass, PK id) {
		commonDao.remove(entityClass, id);
	}

	public <T extends AbstractModel> void delete(T model) {
		commonDao.delete(model);
	}

	public <T extends AbstractModel, PK extends Serializable> T get(
			Class<T> entityClass, PK id) {
		return commonDao.get(entityClass, id);

	}

	public <T extends AbstractModel> int count(Class<T> entityClass) {
		return commonDao.count(entityClass);
	}

	public <T extends AbstractModel> List<T> list(Class<T> entityClass) {
		return commonDao.list(entityClass);
	}

	public <T extends AbstractModel> Page<T> page(Class<T> entityClass, int pn) {
		return page(entityClass, pn, Constants.DEFAULT_PAGE_SIZE);
	}

	public <T extends AbstractModel> Page<T> page(Class<T> entityClass, int pn,
			int pageSize) {
		int total = count(entityClass);
		List<T> items = commonDao.query(entityClass, pn, pageSize);
		return PageUtil.getPage(total, pn, items, pageSize);
	}

	public <T extends AbstractModel> List<T> list(String sql, Object... paramlist) {
		return commonDao.list(sql, paramlist);
	}

}
