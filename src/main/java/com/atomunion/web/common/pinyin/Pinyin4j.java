package com.atomunion.web.common.pinyin;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.HanyuPinyinVCharType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

import com.atomunion.core.util.Validate;

/**
 * @author lico
 * @version 1.0.001 At Dec 8, 2013 4:30:35 PM
 */
public class Pinyin4j {

	/**
	 * 字符串集合转换字符串(逗号分隔)
	 */
	public static String join(Collection<String> ss, String... separter) {
		String sep = null;
		if (Validate.notEmpty(separter) && Validate.noNullElements(separter)) {
			sep = separter[0];
		} else {
			sep = ",";
		}
		if (Validate.notEmpty(ss)) {
			StringBuffer str = new StringBuffer();
			for (String s : ss) {
				str.append(sep).append(s);
			}
			return str.substring(sep.length(), str.length()).toLowerCase();
		}
		return null;
	}

	public static String[] getPinyin(char c, HanyuPinyinOutputFormat format) {

		try {

			return PinyinHelper.toHanyuPinyinStringArray(c, format);

		} catch (BadHanyuPinyinOutputFormatCombination e) {
			e.printStackTrace();
		}
		// 如果c不是汉字，toHanyuPinyinStringArray会返回null
		return null;
	}

	public static String combinationPinyin(String chinese, String... separter) {
		return join(getPinyin(chinese));
	}

	/**
	 * 获取拼音集合
	 */
	public static Collection<String> getPinyin(String chinese) {
		if (Validate.hasText(chinese)) {
			char[] src = chinese.toCharArray();
			// 汉语拼音格式输出类
			HanyuPinyinOutputFormat hanYuPinOutputFormat = new HanyuPinyinOutputFormat();

			// 输出设置，大小写，音标方式等
			hanYuPinOutputFormat.setCaseType(HanyuPinyinCaseType.LOWERCASE);
			hanYuPinOutputFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
			hanYuPinOutputFormat.setVCharType(HanyuPinyinVCharType.WITH_V);

			List<String[]> spell = new ArrayList<String[]>();
			List<String[]> initial = new ArrayList<String[]>();
			for (int i = 0; i < src.length; i++) {
				char c = src[i];
				String[] emp = getPinyin(c, hanYuPinOutputFormat);
				if (Validate.notEmpty(emp)) {
					spell.add(emp);
					int len = emp.length;
					String[] temp = new String[len];
					for (int j = 0; j < len; j++) {
						temp[j] = (Validate.hasText(emp[j])) ? emp[j].substring(0, 1) : "";
					}
					initial.add(temp);
				} else {
					spell.add(new String[] { String.valueOf(c) });
					initial.add(new String[] { String.valueOf(c) });
				}
			}

			Collection<String> pys = new HashSet<String>();
			String[] pingyin = combination(spell);
			for (String py : pingyin) {
				pys.add(py);
			}

			pingyin = combination(initial);
			for (String py : pingyin) {
				pys.add(py);
			}

			return pys;
		}
		return null;
	}

	/**
	 * 递归
	 */
	private static String[] combination(List<String[]> list) {
		if (!Validate.notEmpty(list)) {
			return null;
		} else if (list.size() >= 2) {
			String[] l1 = list.get(0), l2 = list.get(1);
			int index = 0, len1 = l1.length, len2 = l2.length;
			String[] temp = new String[len1 * len2];
			for (int i = 0; i < len1; i++) {
				for (int j = 0; j < len2; j++) {
					temp[index] = l1[i] + l2[j];
					index++;
				}
			}

			list.remove(0);
			list.set(0, temp);

			return combination(list);
		} else if (list.size() == 1) {
			return list.get(0);
		} else {
			return null;
		}

	}

}
