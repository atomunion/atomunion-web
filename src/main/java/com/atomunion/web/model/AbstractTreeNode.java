package com.atomunion.web.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

import com.atomunion.core.util.Validate;

/**
 * @author lico
 * @version 1.0.000 At Nov 1, 2010 10:36:28 AM
 */
@MappedSuperclass
public abstract class AbstractTreeNode extends AbstractModel {
	@Column(name = "LFT_")
	protected Long lft;

	@Column(name = "RGT_")
	protected Long rgt;

	@Transient
	protected Long level;

	@Transient
	protected Boolean checked;

	@Transient
	protected Boolean expanded;

	@Transient
	protected Boolean readOnly = false;

	@Transient
	protected String tagName;

	@Transient
	protected AbstractTreeNode parent;

	@Transient
	protected List<AbstractTreeNode> children = new ArrayList<AbstractTreeNode>();

	public AbstractTreeNode() {
		super();
	}

	public AbstractTreeNode(Long _id) {
		super(_id);
	}

	public AbstractTreeNode(Long _id, Long _lft, Long _rgt) {
		super();
		this.id = _id;
		this.lft = _lft;
		this.rgt = _rgt;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getLft() {
		return lft;
	}

	public void setLft(Long lft) {
		this.lft = lft;
	}

	public Long getRgt() {
		return rgt;
	}

	public void setRgt(Long rgt) {
		this.rgt = rgt;
	}

	public Long getLevel() {
		return level;
	}

	public void setLevel(Long level) {
		this.level = level;
	}

	public AbstractTreeNode getParent() {
		return parent;
	}

	public void setParent(AbstractTreeNode parent) {
		this.parent = parent;
	}

	public List<AbstractTreeNode> getChildren() {
		return children;
	}

	public void setChildren(List<AbstractTreeNode> children) {
		this.children = children;
	}

	public Boolean getChecked() {
		return checked;
	}

	public void setChecked(Boolean checked) {
		this.checked = checked;
	}

	public Boolean getReadOnly() {
		return readOnly;
	}

	public void setReadOnly(Boolean readOnly) {
		this.readOnly = readOnly;
	}

	@Transient
	public boolean getRoot() {
		return (Validate.notNull(this.id) && id == 0l)
				|| (Validate.notNull(this.lft) && this.lft == 1l);
	}

	@Transient
	public boolean getLoaded() {
		return getExpanded();
	}

	public void setExpanded(Boolean expanded) {
		this.expanded = expanded;
	}

	public boolean getExpanded() {
		if (Validate.notNull(this.expanded)) {
			return this.expanded;
		}
		return true;
	}

	@Transient
	public boolean getLeaf() {
		return this.children.size() <= 0;
	}

	@Transient
	public String setTagName(String tagName) {
		return this.tagName = tagName;
	}

	@Transient
	public String getTagName() {
		return Validate.notNull(this.tagName) ? this.tagName : this.getClass().getSimpleName();
	}

	public void setValue(Long value) {
		this.lft = value + 1;
		this.rgt = value + 2;
	}

	/**
	 * allowDrop allowDrag parentId index depth expanded expandable checked leaf
	 * cls iconCls icon root isLast isFirst allowDrop allowDrag loaded loading
	 * href hrefTarget qtip qtitle children
	 * */
	@Transient
	private Boolean allowDrop;
	@Transient
	private Boolean allowDrag;

	public void setAllowDrop(Boolean allowDrop) {
		this.allowDrop = allowDrop;
	}

	public void setAllowDrag(Boolean allowDrag) {
		this.allowDrag = allowDrag;
	}

	public Boolean getAllowDrop() {
		return allowDrop;
	}

	public Boolean getAllowDrag() {
		return allowDrag;
	}
}
