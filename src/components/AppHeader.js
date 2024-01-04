import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button, { SelectButton } from './Button'
import styles from '../styles/modules/app.module.scss'
import TodoModal from './TodoModal'
import { updateFilterStatus } from '../slices/todoSlice'

function AppHeader() {
	const [modalOpen, setModalOpen] = useState(false)
	// use useSelector hook to select redux state status tree and get the value of fileterstatus
	const filterStatus = useSelector((state) => state.todo.filterStatus)
	// const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
	const dispatch = useDispatch()

	// dispatch = 分派 = 将一个action 传递给redux 以触发state的更新过程
	const updateFilter = (event) => {
		// 将事件目标event的目标值作为action.payload的值传递给 updateFileterStatus 的action 然后触发方法进行state更新
		dispatch(updateFilterStatus(event.target.value))
	}

	return (
		<div className={styles.appHeader}>
			{/* addtask button 用来打开显示框，所以当我点击的时候setModalOpen(true)，react重新渲染，modalOpen 变为true 那么todoModal 里的modalOpen更新并变为true可以显示 */}
			<Button variant="primary" onClick={() => setModalOpen(true)}>
				Add Task
			</Button>
			<SelectButton id="status" value={filterStatus} onChange={updateFilter}>
				<option value="all">ALL</option>
				<option value="incomplete">Incomplete</option>
				<option value="complete">Complete</option>
			</SelectButton>
			<TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
		</div>
	)
}
export default AppHeader
