package com.atomunion.web.common.bean.container;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

import com.atomunion.core.util.BeanUtils;
import com.atomunion.core.util.Validate;

/**
 * @author lico
 * @version 1.0.001 At Oct 25, 2013 5:35:52 PM
 */
public class ContainerBean<T> extends HashMap<String, Object> {

	private String key = "data";

	public ContainerBean() {
		super();
	}

	public ContainerBean(String key) {
		this();
		this.key = key;
	}

	private String[][] validate(Map<String, String> keyMappings){
		if (Validate.notEmpty(keyMappings)) {
			String[][] result = new String[2][keyMappings.size()];
			int i = 0;
			for (Map.Entry<String, String> e : keyMappings.entrySet()) {
				result[0][i] = e.getKey();
				result[1][i++] = e.getValue();
			}
			return result;
		}
		return new String[2][0];
	}
	
	public ContainerBean<T> push(Object orig, Map<String, String> keyMappings)
			throws IllegalArgumentException, SecurityException,
			IllegalAccessException, InvocationTargetException,
			NoSuchMethodException {
		String[][] keyMapping = validate(keyMappings);
		return push(orig, keyMapping[0],keyMapping[1]);
	}

	public ContainerBean<T> push(Object orig, String[] keys)
			throws IllegalArgumentException, SecurityException,
			IllegalAccessException, InvocationTargetException,
			NoSuchMethodException {
		return push(orig, keys,keys);
	}

	public ContainerBean<T> push(Object orig, String[] keys, String[] mappings)
			throws IllegalArgumentException, SecurityException,
			IllegalAccessException, InvocationTargetException,
			NoSuchMethodException {
		
		if (Validate.notNull(orig) && Validate.notEmpty(keys)) {
			if (!Validate.notEmpty(keys)) {
				mappings = keys;
			}
			BeanUtils.copyProperties((Map<String, Object>) this, this.key, orig, mappings, keys);
		}
		return this;
	}
	
	public ContainerBean<T> push(Object orig, String key, String[] keys)
			throws IllegalArgumentException, SecurityException,
			IllegalAccessException, InvocationTargetException,
			NoSuchMethodException {
		return push(orig, key,key,keys,keys);
	}
	
	public ContainerBean<T> push(Object orig, String key, String mapping,
			Map<String, String> keyMappings) throws IllegalArgumentException,
			SecurityException, IllegalAccessException,
			InvocationTargetException, NoSuchMethodException {
		String[][] keyMapping = validate(keyMappings);
		return push(orig, key,mapping,keyMapping[0],keyMapping[1]);
	}
	
	@SuppressWarnings("unchecked")
	public ContainerBean<T> push(Object orig, String key, String mapping,
			String[] keys, String[] mappings) throws IllegalArgumentException,
			SecurityException, IllegalAccessException,
			InvocationTargetException, NoSuchMethodException {
		if (Validate.notNull(orig) && Validate.hasText(key)) {
			if (!Validate.hasText(mapping)) {
				mapping = key;
			}
			BeanUtils.copyProperties((Map<String, Object>) this, this.key, orig,
					mapping, key, mappings, keys);
		}
		return this;
	}

	
	public ContainerBean<T> recursion(Object orig, String key, String[] keys)
			throws IllegalArgumentException, SecurityException,
			IllegalAccessException, InvocationTargetException,
			NoSuchMethodException {
		return recursion(orig, key,key, keys,keys);
	}
	
	public ContainerBean<T> recursion(Object orig, String key, String mapping,
			Map<String, String> keyMappings) throws IllegalArgumentException,
			SecurityException, IllegalAccessException,
			InvocationTargetException, NoSuchMethodException {
		String[][] keyMapping = validate(keyMappings);
		return recursion(orig, key,mapping, keyMapping[0],keyMapping[1]);
	}

	public ContainerBean<T> recursion(Object orig, String key, String mapping,
			String[] keys, String[] mappings) throws IllegalArgumentException,
			SecurityException, IllegalAccessException,
			InvocationTargetException, NoSuchMethodException {
		//TODO
		BeanUtils.recursionCopyProperties((Map<String, Object>) this, this.key, orig,
				 mapping,  key,
				 mappings, keys);
		
		 return this;
		
	}
	
	public ContainerBean<T> setGlobelProperty(String name, Object object) {
		this.put(name, object);
		return this;
	}

	public ContainerBean<T> setGlobelProperty(Map<String, Object> map) {
		this.putAll(map);
		return this;
	}

	public Object getData(){
		return this.get(key);
	}

}
