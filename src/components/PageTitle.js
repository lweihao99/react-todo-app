import React from 'react'
import style from '../styles/modules/title.module.scss'

function PageTitle({ children, ...rest }) {
	// 传入scss title module里的title类选择器名
	return (
		<p className={style.title} {...rest}>
			{children}
		</p>
	)
}

export default PageTitle
