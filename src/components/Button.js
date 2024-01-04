import React from 'react';
import styles from '../styles/modules/button.module.scss';
// 引入生成类名的函数
import { getClasses } from '../utils/getClasses';

const buttonTypes = {
	primary: 'primary',
	secondary: 'secondary',
};

function Button({ children, type, variant, ...rest }) {
	return (
		<button
			className={getClasses([styles.button, styles[`button--${variant}`]])}
			type={type === 'submit' ? 'submit' : 'button'}
			{...rest}
		>
			{children}
		</button>
	);
}

function SelectButton({ children, id, ...rest }) {
	return (
		<select
			className={getClasses([styles.button, styles.button__select])}
			{...rest}
		>
			{children}
		</select>
	);
}

// default export 只能导出一个变量，一个模块只能由一个默认导出，命名导出可以同时导出多个成员
export { SelectButton };
export default Button;
