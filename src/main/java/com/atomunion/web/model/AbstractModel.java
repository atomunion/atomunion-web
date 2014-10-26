package com.atomunion.web.model;

import java.lang.reflect.InvocationTargetException;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.hibernate.annotations.GenericGenerator;

import com.atomunion.core.util.BeanUtils;
import com.atomunion.core.util.Validate;
import com.atomunion.web.service.ICommonService;
import com.atomunion.web.util.SpringContextUtil;

/**
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
@MappedSuperclass
public abstract class AbstractModel implements java.io.Serializable {
	@Id
	@GeneratedValue(generator = "idGenerator")
	@GenericGenerator(name = "idGenerator", strategy = "native")
	@Column(name = "ID_", unique = true, nullable = false)
	protected Long id;

	@Column(name = "MODUAL_")
	protected String modual;

	public AbstractModel() {
		super();
	}

	public AbstractModel(Long id) {
		super();
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		if (Validate.notNull(id) && id > 0l) {
			this.id = id;
		}
	}

	public String getModual() {
		return modual;
	}

	public void setModual(String modual) {
		this.modual = modual;
	}
	
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

	public void save() {
		ICommonService commonService = SpringContextUtil
				.getBean("CommonService");
		commonService.save(this);
	}

	public void delete() {
		ICommonService commonService = SpringContextUtil
				.getBean("CommonService");
		commonService.delete(this);
	}

	public void update() {
		ICommonService commonService = SpringContextUtil
				.getBean("CommonService");
		commonService.update(this);
	}
	
	public void load() {
		if(Validate.notNull(this.getId())){
			ICommonService commonService = SpringContextUtil
					.getBean("CommonService");
			AbstractModel model = commonService.get(this.getClass(),this.getId());
			if(Validate.notNull(model)){
				try {
					BeanUtils.copyProperties(this, model);
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					e.printStackTrace();
				}
			}
		}
		
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		AbstractModel other = (AbstractModel) obj;
		if (id == null || id == 0l) {
			return false;
		}
		return id.equals(other.id);
	}
}
