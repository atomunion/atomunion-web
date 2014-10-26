package com.atomunion.web.util;

import org.hibernate.Criteria;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;

import java.util.ArrayList;
import java.util.List;

/**
 * @author lico
 * @version 1.0.000 At Apr 10, 2013
 * */
public class CriteriaBuilder {

	private List<Criterion> criterions = new ArrayList<Criterion>();

	private List<Order> orders = new ArrayList<Order>();

	public CriteriaBuilder add(Criterion criterion) {
		criterions.add(criterion);
		return this;
	}

	public CriteriaBuilder add(Order order) {
		orders.add(order);
		return this;
	}

	public void build(Criteria criteria) {
		for (Criterion criterion : criterions) {
			criteria.add(criterion);
		}

		for (Order order : orders) {
			criteria.addOrder(order);
		}
	}
}
