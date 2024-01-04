import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

// react-icons 图标库导入并引用md集合的组件MdOutlineClose
import { AnimatePresence, motion } from 'framer-motion'
import { MdOutlineClose } from 'react-icons/md'
import { v4 as uuid } from 'uuid'
import styles from '../styles/modules/modal.module.scss'
import Button from './Button'
import { addTodo, updateTodo } from '../slices/todoSlice'

const dropIn = {
	hidden: {
		opacity: 0,
		transform: 'scale(0.9)',
	},
	visible: {
		transform: 'scale(1)',
		opacity: 1,
		transition: {
			duration: 0.1,
			type: 'spring',
			damping: 25,
			stiffness: 500,
		},
	},
	exit: {
		transform: 'scale(0.9)',
		opacity: 0,
	},
}

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
	// 获取显示框里的title和status
	const [title, setTitle] = useState('')
	const [status, setStatus] = useState('incomplete')
	const dispatch = useDispatch() // 在函数式组件中获取redux的dispatch函数，用于派发actions 以触发状态的更新

	// 使用useEffect hook 来进行监视特定的依赖项， 并在这些依赖项发生变化的时候执行函数 useEffect(function,[要监视的依赖项])
	useEffect(() => {
		if (type === 'update' && todo) {
			setTitle(todo.title)
			setStatus(todo.status)
		} else {
			setTitle('')
			setStatus('incomplete')
		}
	}, [type, todo, modalOpen])

	// 再点击了上交按钮后，阻止浏览器的默认提交，转而输出现在的title,status变量
	// 这里制定了一个hook函数
	const handleSubmit = (event) => {
		event.preventDefault()
		if (title === '') {
			toast.error('Please enter a title')
			return
		}
		// console.log({ title, status });
		// 将数据添加到local storage, add to react redux
		// redux 用来管理应用程序的状态和数据流
		if (title && status) {
			if (type === 'add') {
				// 传递payload 调用dispatch(action)触发动作
				dispatch(
					addTodo({
						id: uuid(), // 唯一标识符uuid
						title,
						status,
						time: new Date().toLocaleString(),
					})
				)
				toast.success('Task Added Successfully')
			}
			if (type === 'update') {
				// console.log('updating');
				// match old todo and the new
				if (todo.title !== title || todo.status !== status) {
					dispatch(updateTodo({ ...todo, title, status }))
				} else {
					toast.error('No Changes Made')
					return // 在发现没有变化的时候不会关闭窗口
				}
			}
			setModalOpen(false)
		}
		// else {
		// 	toast.error("TItle shouldn't be empty");
		// }
	}

	return (
		<AnimatePresence>
			{/* // modalOpen true 就打开modal，false 关闭modal */}
			{modalOpen && (
				<motion.div
					className={styles.wrapper}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}>
					<motion.div
						className={styles.container}
						variants={dropIn}
						initial="hidden"
						animate="visible"
						exit="exit">
						{/* 设计关闭图标,tabIndex={0}：这个属性将 <div> 元素设置为可获取焦点的元素。这意味着用户可以使用键盘的 Tab 键导航到这个元素，并且按下 Enter 键或 Space 键可以触发点击事件,通常，这是为了使按钮能够接收键盘交互。role 则是将div元素定义为一个button角色，可以接受交互事件 */}
						<motion.div
							className={styles.closeButton}
							onClick={() => setModalOpen(false)}
							onKeyDown={() => setModalOpen(false)}
							tabIndex={0}
							role="button"
							initial={{ top: 40, opacity: 0 }}
							animate={{ top: -10, opacity: 1 }}
							exit={{ top: 40, opacity: 0 }}>
							{/* 给close button指定一个icon */}
							<MdOutlineClose />
						</motion.div>

						<form
							className={styles.form}
							onSubmit={(event) => handleSubmit(event)}>
							<h1 className={styles.formTitle}>
								{type === 'update' ? 'Update' : 'Add'} Task
							</h1>
							<label htmlFor="title">
								Title
								<input
									type="text"
									id="title"
									value={title}
									onChange={(event) => setTitle(event.target.value)}
								/>
							</label>
							<label htmlFor="status">
								Status
								<select
									name="status"
									id="status"
									value={status}
									// 当内容改变的时候setStatus获取元素value然后重新渲染status
									onChange={(event) => setStatus(event.target.value)}>
									<option value="incomplete">Incomplete</option>
									<option value="complete">Complete</option>
								</select>
							</label>
							<div className={styles.buttonContainer}>
								{/* 引入Button组件 */}
								<Button type="submit" variant="primary">
									{type === 'update' ? 'Update' : 'Add'} Task
								</Button>
								<Button
									type="button"
									variant="secondary"
									onClick={() => setModalOpen(false)}
									onKeyDown={() => setModalOpen(false)}>
									Cancel
								</Button>
							</div>
						</form>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default TodoModal
