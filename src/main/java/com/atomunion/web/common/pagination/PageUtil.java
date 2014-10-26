package com.atomunion.web.common.pagination;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.WeakHashMap;

import javax.persistence.Id;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.atomunion.core.util.Synchronizer;

/**
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
public class PageUtil {

	private static final Logger LOG = LoggerFactory.getLogger(PageUtil.class);
	/**
	 * 获取主键时缓存
	 */
	private static Map<Class<?>, Field> classPKMap = new WeakHashMap<Class<?>, Field>();

	public static int validatePageNo(int pageNumber) {
		return (pageNumber <= 0) ? 1 : pageNumber;
	}

	public static int validatePageSize(int pageSize) {
		return (pageSize <= 0) ? PageContext.DEFAULT_PAGE_SIZE : pageSize;
	}

	public static int getPageNo(int start,int limit){
		
		return (int) Math.ceil(start/limit);
	}
	
	/**
	 * 不关心总记录数
	 * 
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public static int getPageStart(int pageNumber, int pageSize) {
		pageNumber = validatePageNo(pageNumber);
		pageSize = validatePageSize(pageSize);
		return (pageNumber - 1) * pageSize;
	}

	/**
	 * 计算分页获取数据时游标的起始位置
	 * 
	 * @param totalCount
	 *            所有记录总和
	 * @param pageNumber
	 *            页码,从1开始
	 * @return
	 */
	public static int getPageStart(int totalCount, int pageNumber, int pageSize) {
		pageNumber = validatePageNo(pageNumber);
		pageSize = validatePageSize(pageSize);
		int start = (pageNumber - 1) * pageSize;
		if (start >= totalCount) {
			start = 0;
		}

		return start;
	}

	/**
	 * 构造分页对象
	 * 
	 * @param totalCount
	 *            满足条件的所有记录总和
	 * @param pageNumber
	 *            本次分页的页码
	 * @param items
	 * @return
	 */
	public static <E> Page<E> getPage(int totalCount, int pageNumber,
			List<E> items, int pageSize) {
		pageNumber = validatePageNo(pageNumber);
		pageSize = validatePageSize(pageSize);
		IPageContext<E> pageContext = new QuickPageContext<E>(totalCount,
				pageSize, items);
		return pageContext.getPage(pageNumber);
	}

	public static Field getPkField(Class<?> cls) {
		Field pkField = classPKMap.get(cls);
		if (pkField == null) {
			synchronized (Synchronizer.acquire(cls)) {
				Field[] fields = cls.getDeclaredFields();
				for (Field field : fields) {
					if (field.isAnnotationPresent(Id.class)) {
						pkField = field;
						pkField.setAccessible(true);
						classPKMap.put(cls, pkField);
					}
				}
			}
		}
		if (pkField == null) {
			LOG.error("page error,{} : pk null", cls);
		}
		return pkField;
	}

	public static <T> String getIdValue(T obj) {
		if (obj == null) {
			return "";
		}
		String retVal = "";
		Field pkField = getPkField(obj.getClass());
		try {
			retVal = pkField.get(obj).toString();
		} catch (Exception e) {
			LOG.error("page error,{} : get id value", obj);
		}
		return retVal;
	}

	public static <T> String getIdName(T obj) {
		if (obj == null) {
			return "";
		}
		String retVal = "";
		Field pkField = getPkField(obj.getClass());
		try {
			retVal = pkField.getName();
		} catch (Exception e) {
			LOG.error("page error,{} : get id name", obj);
		}
		return retVal;
	}
}
