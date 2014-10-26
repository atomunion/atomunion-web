package com.atomunion.web.service.impl;

import java.util.List;

import org.springframework.util.Assert;

import com.atomunion.web.common.pagination.Page;
import com.atomunion.web.common.pagination.PageUtil;
import com.atomunion.web.constants.Constants;
import com.atomunion.web.dao.IBaseDao;
import com.atomunion.web.service.IBaseService;

/**
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
public abstract class BaseService<M extends java.io.Serializable, PK extends java.io.Serializable>
		implements IBaseService<M, PK> {

	protected IBaseDao<M, PK> baseDao;

	public void setBaseDao(IBaseDao<M, PK> baseDao){
		this.baseDao = baseDao;
	}
	
	public M save(M model) {
		baseDao.save(model);
		return model;
	}

	
	public void merge(M model) {
		baseDao.merge(model);
	}

	
	public void saveOrUpdate(M model) {
		baseDao.saveOrUpdate(model);
	}

	
	public void update(M model) {
		baseDao.update(model);
	}

	
	public void remove(PK id) {
		baseDao.remove(id);
	}

	
	public void delete(M model) {
		baseDao.delete(model);
	}

	
	public M get(PK id) {
		return baseDao.get(id);
	}
	
	
	public M load(PK id) {
		return baseDao.load(id);
	}
	
	public int count() {
		return baseDao.count();
	}
	
	public List<M> list() {
		return baseDao.list();
	}
	
	public Page<M> page(int pn) {
		return this.page(pn, Constants.DEFAULT_PAGE_SIZE);
	}

	public Page<M> page(int pn, int pageSize) {
		
		Integer count = count();
		List<M> items = baseDao.query(pn, pageSize);
		return PageUtil.getPage(count, pn, items, pageSize);
	}
	
	public Page<M> page(String hql, int pn, int pageSize,Object... paramlist){
		Assert.hasText(hql);

		pn = PageUtil.validatePageNo(pn);
		pageSize = PageUtil.validatePageSize(pageSize);
		
		int count = baseDao.getTotal(hql, paramlist);
		
		List<M> items = baseDao.query(hql,pn, pageSize,paramlist);
		return PageUtil.getPage(count, pn, items, pageSize);
	}
	
	public Page<M> page2(String hql, int start, int limit,Object... paramlist){
		Assert.hasText(hql);

		int pn = PageUtil.getPageNo(start,limit);
		 pn = PageUtil.validatePageNo(pn);
		limit = PageUtil.validatePageSize(limit);
		
		int count = baseDao.getTotal(hql, paramlist);
		
		List<M> items = baseDao.query2(hql,start, limit,paramlist);
		return PageUtil.getPage(count, start, items, limit);
	}
	
	public Page<M> previous(PK pk, int pn) {
		return previous(pk, pn, Constants.DEFAULT_PAGE_SIZE);
	}
	
	public Page<M> previous(PK pk, int pn, int pageSize) {
		Integer count = count();
		List<M> items = baseDao.previous(pk, pn, pageSize);
		return PageUtil.getPage(count, pn, items, pageSize);
	}
	
	public Page<M> next(PK pk, int pn) {
		return next(pk, pn, Constants.DEFAULT_PAGE_SIZE);
	}

	public Page<M> next(PK pk, int pn, int pageSize) {
		Integer count = count();
		List<M> items = baseDao.next(pk, pn, pageSize);
		return PageUtil.getPage(count, pn, items, pageSize);
	}

}
