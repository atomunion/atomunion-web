package com.atomunion.web.common.pagination;

import java.util.ArrayList;
import java.util.List;

/**
 * 查询返回所有记录的分页实现.
 * 
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
public class PageContext<T> implements IPageContext<T> {

	private int pageSize;// 每页包含的记录数
	private List<T> items;

	public PageContext(List<T> items) {
		this(items, DEFAULT_PAGE_SIZE);
	}

	public PageContext(List<T> items, int pageSize) {
		if (items == null) {
			throw new IllegalArgumentException("Items should not be null!");
		}
		this.items = items;
		this.pageSize = pageSize;
	}

	public Page<T> getPage(int index) {
		Page<T> page = new Page<T>();
		List<T> pageItems = new ArrayList<T>();
		page.setContext(this);
		page.setHasNext(index < getPageCount());
		page.setHasPre(index > 1);
		page.setIndex(index);

		List<T> items = getItems();
		int total = items.size();
		int start = (index - 1) * getPageSize();
		if (start > total - 1) {
			start = 0;
			page.setHasPre(false);
			page.setIndex(1);
		}
		int toIndex = start + getPageSize();
		if (toIndex > total) {
			toIndex = total;
		}

		pageItems = items.subList(start, toIndex);
		page.setItems(pageItems);
		return page;
	}

	/**
	 * 计算总页数.
	 * 
	 * @return
	 */
	public int getPageCount() {
		int size = getItems().size();
		int div = size / getPageSize();
		int result = (size % getPageSize() == 0) ? div : div + 1;

		return result;
	}

	public int getPageSize() {
		if (this.pageSize <= 0) {
			this.pageSize = DEFAULT_PAGE_SIZE;
		}
		return this.pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public List<T> getItems() {
		return this.items;
	}

	public void setItems(List<T> items) {
		this.items = items;
	}

	public int getTotal() {
		return getItems().size();
	}

}
