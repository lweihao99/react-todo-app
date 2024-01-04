import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import styles from '../styles/modules/app.module.scss';
// 用useSelector hook 从redux store 中选择状态数据,也就是整个状态树state

const container = {
	hidden: { opacity: 1 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const child = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
};

function AppContent() {
	const todoList = useSelector((state) => state.todo.todoList);
	// get filterStatus initial value
	const filterStatus = useSelector((state) => state.todo.filterStatus);
	// console.log(todoList);
	const sortedTodoList = [...todoList];
	sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

	// 将todoList 里面的每一个元素都检查一遍，如果filterStatus = 'all' 也就是filter = true 就将所有payload 返回，不然就对每一个state.status 进行检查如果一样返回true 留下不一样的则剔除
	const filterTodoList = sortedTodoList.filter((item) => {
		if (filterStatus === 'all') {
			return true;
		}
		return item.status === filterStatus;
	});

	// 将根据filterStatus 的值显示界面信息
	return (
		<motion.div
			className={styles.content__wrapper}
			variants={container}
			initial="hidden"
			animate="visible"
		>
			{filterTodoList && filterTodoList.length > 0 ? (
				filterTodoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
			) : (
				<motion.p className={styles.emptyText} variants={child}>
					No Todo Found
				</motion.p>
			)}
		</motion.div>
	);
}

export default AppContent;
