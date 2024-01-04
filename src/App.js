import React from 'react'
import { Toaster } from 'react-hot-toast'
import PageTitle from './components/PageTitle.js'
import styles from './styles/modules/app.module.scss'
import AppHeader from './components/AppHeader.js'
import AppContent from './components/AppContent.js'

function App() {
	return (
		<>
			<div className="container">
				<PageTitle>To do list</PageTitle>
				{/* 将app样式导入 */}
				<div className={styles.app__wrapper}>
					<AppHeader />
					<AppContent />
				</div>
			</div>
			<Toaster
				// position="bottom-right"
				toastOptions={{
					style: {
						fontSize: '1.4rem',
					},
				}}
			/>
		</>
	)
}

export default App
