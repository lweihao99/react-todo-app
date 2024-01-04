import { format } from 'date-fns/esm';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import { deleteTodo, updateTodo } from '../slices/todoSlice';
import TodoModal from './TodoModal';
import CheckButton from './CheckButton';

const child = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
};

function TodoItem({ todo }) {
	const dispatch = useDispatch();
	const [checked, setChecked] = useState(false);
	const [updateModalOpen, setUpdateModalOpen] = useState(false);

	// check the change of checkbutton
	useEffect(() => {
		if (todo.status === 'complete') {
			setChecked(true);
		} else {
			setChecked(false);
		}
	}, [todo.status]);

	// delete and edit todo
	const handleDelete = () => {
		// console.log('deleting');
		dispatch(deleteTodo(todo.id));
		toast.success('Todo Deleted Successfully');
	};
	const handleUpdate = () => {
		// console.log('Updating');
		setUpdateModalOpen(true);
	};

	// check box change update
	const handleCheck = () => {
		// console.log('update todo');
		setChecked(!checked);
		dispatch(
			updateTodo({
				...todo,
				status: checked ? 'incomplete' : 'complete',
			})
		);
	};

	return (
		<>
			<motion.div className={styles.item} variants={child}>
				<div className={styles.todoDetails}>
					<CheckButton checked={checked} handleCheck={handleCheck} />
					<div className={styles.texts}>
						<p
							className={getClasses([
								styles.todoText,
								todo.status === 'complete' && styles['todoText--completed'],
							])}
						>
							{todo.title}
						</p>
						<p className={styles.time}>
							{format(new Date(todo.time), 'p,MM/dd/yyyy')}
						</p>
					</div>
				</div>
				<div className={styles.todoActions}>
					<div
						className={styles.icon}
						onClick={handleDelete}
						onKeyDown={handleDelete}
						role="button"
						tabIndex={0}
					>
						<MdDelete />
					</div>
					<div
						className={styles.icon}
						onClick={handleUpdate}
						onKeyDown={handleUpdate}
						role="button"
						tabIndex={0}
					>
						<MdEdit />
					</div>
				</div>
			</motion.div>

			<TodoModal
				type="update"
				todo={todo}
				modalOpen={updateModalOpen}
				setModalOpen={setUpdateModalOpen}
			/>
		</>
	);
}

export default TodoItem;
