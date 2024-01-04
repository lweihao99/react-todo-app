import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../slices/todoSlice';

// store 存储器

export const store = configureStore({
	reducer: {
		// todo reducer,一个归纳器
		// 归纳器是一个存函数，用于根据当前状态和动作(action) 来计算新的状态， redux 可以有多个归纳器，负责管理程序不同部分的状态
		todo: todoReducer,
	},
});
