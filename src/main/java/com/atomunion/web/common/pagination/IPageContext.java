package com.atomunion.web.common.pagination;


/**
 * 分页上下文环境。用于计算Page。
 * 
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
public interface IPageContext<T> {

	/**
	 * 默认设定每页显示记录数为10
	 */
	public static final int DEFAULT_PAGE_SIZE = 10;

	/**
	 * 计算总页数.
	 * 
	 * @return
	 */
	public int getPageCount();

	/**
	 * 返回 Page 对象.
	 * 
	 * @param index
	 * @return
	 */
	public Page<T> getPage(int index);

	/**
	 * 每页显示的记录数量
	 * 
	 * @return
	 */
	public int getPageSize();

	/**
	 * 计算总记录数
	 * 
	 * @return
	 */
	public int getTotal();

}
