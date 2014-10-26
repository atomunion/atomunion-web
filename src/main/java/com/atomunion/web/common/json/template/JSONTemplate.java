package com.atomunion.web.common.json.template;

import java.io.IOException;
import java.io.OutputStream;
import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.atomunion.core.reflex.NoSuchGetterMethodException;
import com.atomunion.core.reflex.Reflex;
import com.atomunion.core.reflex.callback.ReflexCallBack;
import com.atomunion.core.util.BeanUtils;
import com.atomunion.core.util.Validate;

/**
 * @author lico
 * @version 1.2.001 At Oct 24, 2013 21:16:54 PM
 */
@Deprecated
public final class JSONTemplate implements Serializable {

	private Map<String, Object> container = new HashMap<String, Object>();

	private String key = "data";

	private static volatile ObjectMapper objectMapper = null;

	{
		initTemplate();
	}

	private static ObjectMapper getObjectMapper() {
		synchronized (ObjectMapper.class) {
			if (objectMapper == null) {
				objectMapper = new ObjectMapper();
			}
		}
		return objectMapper;
	}

	private void initTemplate() {
		this.container.put("success", true);
		this.container.put("msg", "success");
	}

	private void initTemplate(boolean success, String msg) {
		this.container.put("success", success);
		this.container.put("msg", msg);
	}

	public Map<String, Object> getData() {
		return this.container;
	}
	
	public Object toData() {
		return this.container.get(key);
	}
	
	public String toJson() throws JsonGenerationException,
			JsonMappingException, IOException {
		return getObjectMapper().writeValueAsString(container);
	}

	public void toJson(OutputStream os, boolean... close)
			throws JsonGenerationException, JsonMappingException, IOException {
		getObjectMapper().writeValue(os, container);
		if (close != null && close.length > 0 && close[0])
			os.close();
	}

	private void setProperty(Map<String, Object> map, String key, Object value) {
		// TODO 设置converter
		map.put(key, value);
	}

	public JSONTemplate setGlobelProperty(String name, Object object) {
		setProperty(this.container, name, object);
		return this;
	}

	public JSONTemplate setGlobelProperty(Map<String, Object> map) {
		this.container.putAll(map);
		return this;
	}

	public JSONTemplate() {
	}

	public JSONTemplate(boolean success, String msg) {
		set(success, msg);
	}

	public JSONTemplate(Object pojo, String[] mapping)
			throws IllegalArgumentException, SecurityException,
			IllegalAccessException, InvocationTargetException,
			NoSuchMethodException {
		set(pojo, mapping);
	}

	public JSONTemplate(Object pojo, String[] mapping, String[] config)
			throws IllegalArgumentException, SecurityException,
			IllegalAccessException, InvocationTargetException,
			NoSuchMethodException {
		set(pojo, mapping, config);
	}

	public JSONTemplate(Object pojo, String pojoName,
			Map<String, String> mapping) throws IllegalArgumentException,
			SecurityException, IllegalAccessException,
			InvocationTargetException, NoSuchMethodException {
		set(pojo, pojoName, mapping);
	}

	public JSONTemplate(Object pojo, Map<String, String> mapping)
			throws IllegalArgumentException, SecurityException,
			IllegalAccessException, InvocationTargetException,
			NoSuchMethodException {
		set(pojo, mapping);
	}

	public JSONTemplate setSuccess(boolean success) {
		this.container.put("success", success);
		return this;
	}

	public JSONTemplate setMsg(String msg) {
		this.container.put("msg", msg);
		return this;
	}

	public JSONTemplate setKey(String key) {
		this.key = key;
		initTemplate();
		return this;
	}

	public JSONTemplate set(boolean success, String msg) {
		initTemplate(success, msg);
		return this;
	}

	public JSONTemplate set(Object pojo, String pojoName,
			Map<String, String> mapping) throws IllegalArgumentException,
			SecurityException, IllegalAccessException,
			InvocationTargetException, NoSuchMethodException {
		if (mapping != null && mapping.size() > 0) {
			String[][] map = entrys2Array(mapping);
			set(pojo, pojoName, map[0], map[1]);
		}
		return this;
	}

	public JSONTemplate set(Object pojo, Map<String, String> mapping)
			throws IllegalArgumentException, SecurityException,
			IllegalAccessException, InvocationTargetException,
			NoSuchMethodException {
		return set(pojo, null, mapping);
	}

	public JSONTemplate set(Object pojo, Object[] mapping)
			throws IllegalArgumentException, SecurityException,
			IllegalAccessException, InvocationTargetException,
			NoSuchMethodException {
		if (pojo instanceof String[]) {
			String[] keys = (String[]) pojo;
			Object[] values = (Object[]) mapping;
			if (keys != null && keys.length > 0) {

				Map<String, Object> map = (Map<String, Object>) this.container.get(key);
				if (Validate.isNull(map)) {
					map = new HashMap<String, Object>();
					this.container.put(key, map);
				}
				for (int i = 0; i < keys.length; i++) {
					setProperty(map, keys[i],
							(values == null || values.length <= i) ? null
									: values[i]);
				}
			}
			return this;
		} else if (mapping instanceof String[]) {
			return set(pojo, (String[]) mapping, null);
		} else {
			return this;
		}
	}

	/**
	 * pojo中不可以含有非基本类型属性
	 * 
	 * @param pojo
	 *            任意对象或数组
	 * @param mapping
	 *            根据此名称从pojo中取的对应的值,如果config为空则也是对应返回的vo中的对应的名称
	 * @param config
	 *            返回的vo中的对应的名称
	 * @throws InvocationTargetException
	 * @throws IllegalAccessException
	 * @throws SecurityException
	 * @throws IllegalArgumentException
	 *             @ *
	 * @throws NoSuchMethodException
	 */
	public JSONTemplate set(Object pojo, String[] mapping, String[] config)
			throws IllegalArgumentException, SecurityException,
			IllegalAccessException, InvocationTargetException,
			NoSuchMethodException {
		return set(pojo, null, mapping, config);
	}

	public JSONTemplate set(Object pojo, String pojoName, String[] mapping,
			String[] config) throws IllegalArgumentException,
			SecurityException, IllegalAccessException,
			InvocationTargetException, NoSuchMethodException {
		return put(pojo, pojoName, mapping, config);
	}

	private String[][] entrys2Array(Map<String, String> mapping) {
		if (Validate.notEmpty(mapping)) {
			String[][] result = new String[2][mapping.size()];
			int i = 0;
			for (Map.Entry<String, String> e : mapping.entrySet()) {
				result[0][i] = e.getKey();
				result[1][i++] = e.getValue();
			}
			return result;
		}
		return new String[2][0];
	}

	public JSONTemplate setChild(Object pojo, String subMappingName,
			String subConfigName, Map<String, String> mapping)
			throws IllegalArgumentException, SecurityException,
			IllegalAccessException, InvocationTargetException,
			NoSuchMethodException {
		if (mapping != null && mapping.size() > 0) {
			String[][] map = entrys2Array(mapping);
			setChild(pojo, subMappingName, subConfigName, map[0], map[1]);
		}
		return this;
	}

	public JSONTemplate setChild(Object pojo, String subMappingName,
			String subConfigName, String[] subMapping, String[] subConfig)
			throws IllegalArgumentException, SecurityException,
			IllegalAccessException, InvocationTargetException,
			NoSuchMethodException {

		if (Validate.notNull(pojo) && Validate.hasText(subMappingName)) {
			String configNames = subConfigName;
			if (!Validate.hasText(configNames)) {
				configNames = subMappingName;
			}

			BeanUtils.copyProperties(this.container, this.key, pojo,
					subConfigName, subMappingName, subConfig, subMapping);
		}
		return this;
	}

	public JSONTemplate recursionChild(Map<String, Object> map, Object pojo,
			String subMappingName, String subConfigName,
			Map<String, String> mapping) throws IllegalArgumentException,
			SecurityException, IllegalAccessException,
			InvocationTargetException, NoSuchMethodException {
		if (mapping != null && mapping.size() > 0) {
			recursionChild(map, pojo, subMappingName, subConfigName, mapping
					.keySet().toArray(new String[0]),
					mapping.values().toArray(new String[0]));
		}
		return this;
	}

	public JSONTemplate recursionChild(Object pojo, String subMappingName,
			String subConfigName, Map<String, String> mapping)
			throws IllegalArgumentException, SecurityException,
			IllegalAccessException, InvocationTargetException,
			NoSuchMethodException {
		if (mapping != null && mapping.size() > 0) {
			String[][] map = entrys2Array(mapping);
			recursionChild(pojo, subMappingName, subConfigName, map[0], map[1]);
		}
		return this;
	}

	public JSONTemplate recursionChild(Object pojo, String subMappingName,
			String subConfigName, String[] subMapping, String[] subConfig)
			throws IllegalArgumentException, SecurityException,
			IllegalAccessException, InvocationTargetException,
			NoSuchMethodException {
		Object data = this.container.get(key);
		
		if (Validate.isNull(data)) {
			
			
			if (pojo instanceof Collection<?>
			|| pojo instanceof Object[]) {
				data = new ArrayList<Object>();
			}else{
				data = new HashMap<String, Object>();
			}
			
			this.container.put(key, data);
		}
		
		
		if (data instanceof Iterable<?>) {
			Iterable<Map<String, Object>> iterable = (Iterable<Map<String, Object>>) data;
			if (iterable != null) {
				int i = 0;

				for (Map<String, Object> obj : iterable) {
					if (pojo instanceof Collection<?>
							|| pojo instanceof Object[]) {
						if (subMappingName == null
								|| !subMappingName.startsWith("this")) {
							subMappingName = "this["
									+ i
									+ "]"
									+ (Validate.hasText(subMappingName) ? ("." + subMappingName)
											: "");
						} else {
							subMappingName = subMappingName.replaceAll(
									"([\\d]+)", "" + i);
						}
					}
					recursionChild(obj, pojo, subMappingName, subConfigName,
							subMapping, subConfig);
					i++;
				}
			}
		} else {
			recursionChild((Map<String, Object>) data, pojo, subMappingName,
					subConfigName, subMapping, subConfig);
		}
		return this;
	}

	public JSONTemplate recursionChild(final Map<String, Object> map,
			Object pojo, final String subMappingName,
			final String subConfigName, final String[] subMapping,
			final String[] subConfig) throws IllegalArgumentException,
			SecurityException, IllegalAccessException,
			InvocationTargetException, NoSuchMethodException {

		final JSONTemplate voTemplate = this;
		Reflex.reflexGetter(pojo, subMappingName,
				new ReflexCallBack<Object, Object, Object, Object>() {
					public Object execute(Object value, Object previous,
							Object root, String name, String key)
							throws IllegalArgumentException, SecurityException,
							IllegalAccessException, InvocationTargetException,
							NoSuchMethodException {
						String subName = Validate.hasText(subConfigName) ? subConfigName
								: key;
						voTemplate.put(map, value, subName, subMapping,
								subConfig);

						Object property = map.get(subName);
						if (property == null
								|| value == null
								|| (value instanceof Map<?, ?> && ((Map<?, ?>) value)
										.size() <= 0)
								|| (value instanceof Collection<?> && ((Collection<?>) value)
										.size() <= 0)
								|| (value instanceof Object[] && ((Object[]) value).length <= 0)) {
							return value;
						} else {
							Map<String, Object> subs = null;
							if (property instanceof Map<?, ?>) {
								subs = (Map<String, Object>) property;
								recursionChild(subs, value, subMappingName,
										subConfigName, subMapping, subConfig);
							} else if (property instanceof Collection<?>) {
								Object[] objs = ((Collection<?>) property)
										.toArray(new Object[0]);
								/*
								 * Object[] vals = ((Collection<?>) value)
								 * .toArray(new Object[0]);
								 */
								String mapping = subMappingName;
								for (int i = 0; i < objs.length; i++) {
									if (value instanceof Collection<?>
											|| value instanceof Object[]) {
										if (!mapping.startsWith("this")) {
											mapping = "this[" + i + "]."
													+ mapping;
										} else {
											mapping = mapping.replaceAll(
													"([\\d]+)", "" + i);
										}
									}
									recursionChild(
											(Map<String, Object>) objs[i],
											value, mapping, subConfigName,
											subMapping, subConfig);
								}
							} else {
								return value;
							}
						}
						return value;
					}
				}, Reflex.LOOSE);
		return voTemplate;
	}

	private JSONTemplate put(Map<String, Object> map, Object pojo,
			String pojoName, String[] mapping, String[] config)
			throws IllegalArgumentException, SecurityException,
			IllegalAccessException, InvocationTargetException,
			NoSuchMethodException {
		if (pojo != null && mapping != null && mapping.length > 0) {

			if (pojoName == null || "".equals(pojoName.trim())) {
				pojoName = pojo.getClass().getSimpleName();
			}

			Map<String, Object> sub = null;
			if (pojo instanceof Iterable<?>) {
				Iterable<?> iterable = (Iterable<?>) pojo;
				if (iterable != null) {
					List<Object> list = new ArrayList<Object>();
					for (Object obj : iterable) {
						list.add(reflex(obj, mapping, config));
					}
					// map.put(pojoName, list);
					setProperty(map, pojoName, list);
				}
			} else {
				sub = new HashMap<String, Object>();
				// map.put(pojoName, sub);
				setProperty(map, pojoName, sub);
				sub.putAll(reflex(pojo, mapping, config));
			}
		}
		return this;
	}

	private JSONTemplate put(Object pojo, String pojoName, String[] mapping,
			String[] config) throws IllegalArgumentException,
			SecurityException, IllegalAccessException,
			InvocationTargetException, NoSuchMethodException {

		if (pojo != null && mapping != null && mapping.length > 0) {
			if (pojo instanceof Iterable<?>) {
				Iterable<?> iterable = (Iterable<?>) pojo;
				if (iterable != null) {
					List<Map<String, Object>> list = null;
					if (Validate.isNull(this.container.get(key))) {
						list = new ArrayList<Map<String, Object>>();
						this.container.put(key, list);
					} else {
						list = (List<Map<String, Object>>) this.container
								.get(key);
					}

					for (Object obj : iterable) {
						list.add(reflex(obj, mapping, config));
					}
				}
			} else {
				Map<String, Object> map = null;
				if (Validate.isNull(this.container.get(key))) {
					map = new HashMap<String, Object>();
					this.container.put(key, map);
				}else{
					map = (Map<String, Object>) this.container.get(key);
				}
				map.putAll(reflex(pojo, mapping, config));
			}
		}
		return this;
	}

	private Map<String, Object> reflex(Object pojo, String[] mapping,
			String[] config) throws IllegalArgumentException,
			SecurityException, IllegalAccessException,
			InvocationTargetException, NoSuchMethodException {
		Map<String, Object> properties = null;
		if (pojo != null && mapping != null) {
			properties = new HashMap<String, Object>();
			for (int i = 0; i < mapping.length; i++) {
				properties.put(
						(config != null && config.length > i) ? config[i]
								: mapping[i], Reflex.reflexGetter(pojo,
								mapping[i], null, Reflex.LOOSE));
			}
		} else {
			throw new NoSuchGetterMethodException("can't reflex object \""
					+ pojo + "\" using the key \"" + mapping + "\"");
		}
		return properties;

	}
}
