package com.atomunion.web.dao.jdbc;

import javax.annotation.Resource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

/**
 * @author lico
 * @version 1.0.001 At Dec 12, 2013 7:09:00 PM
 */
@Component("JdbcBaseDao")
public class JdbcBaseDao {
	@Resource(name="jdbcTemplate")
	private JdbcTemplate jdbcTemplate;

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
}
