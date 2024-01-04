// todo 归纳器
import { createSlice } from '@reduxjs/toolkit';

// 定义一个函数getInitialTodo 返回本地存储中的todoList 数据，将其解析为js对象后返回
// 函数主要目的是再应用程序初始化时尝试从本地存储中获取之前保存的todoList数据
const getInitialTodo = () => {
	const localTodoList = window.localStorage.getItem('todoList');
	// 如果获取成功将json字符串解析为js对象
	if (localTodoList) {
		return JSON.parse(localTodoList);
	}
	// 如果没有todo，就直接添加一个todo，创建一个空的待办事项列表，并将其存储到本地存储中
	window.localStorage.setItem('todoList', JSON.stringify([]));
	return [];
};

const initialValue = {
	filterStatus: 'all',
	// 需要从local storage 获取初始数据,每当程序运行的时候获取
	// 每当程序开始运行的时候就会调用
	todoList: getInitialTodo(),
};

// reducer 尝试从本地存储中获取todoList 的数据， 让后将新的待办事项数据添加到该数组中，并将更新后的数组重新保存到本地存储中
export const todoSlice = createSlice({
	// slice名字，用于表示他所管理的状态
	name: 'todo',
	// 初始化定义
	initialState: initialValue,
	// reducer函数对象，用于处理状态相关的action
	reducers: {
		// state当前状态，action携带关于action的数据，将待办事项数据添加到state.todoList里
		addTodo: (state, action) => {
			state.todoList.push(action.payload);
			const todoList = window.localStorage.getItem('todoList');
			if (todoList) {
				const todoListArr = JSON.parse(todoList);
				todoListArr.push({
					...action.payload,
				});
				window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
			}
			// 添加一个空的todolist上面已经声明了
			else {
				window.localStorage.setItem(
					'todoList',
					// [{id: 1, text: 'Buy groceries'},{payload}...] 将一些列的action.payload 对象状态更新后存储到列表里面
					JSON.stringify([{ ...action.payload }])
				);
			}
		},
		// 调用这个方法的时候，检查当前这个对象存不存在，如果存在确定这个对象是不是与自己想要删除的对象是同一个id，如果是同一个id那么就用splice方法将对应index的元素删除一个元素，并在最后更新本地数据，反映已经删除了payload
		deleteTodo: (state, action) => {
			// 从本地存储空间获取密钥名为'todoList‘的数据，也就是id，status,time,title
			const todoList = window.localStorage.getItem('todoList');
			if (todoList) {
				// 如果成功获取todoList就将这串JSON字符串解析为js数组存储到todoListArr列表里，这里面包含了payload内容
				const todoListArr = JSON.parse(todoList);
				todoListArr.forEach((todo, index) => {
					// 检查payload里面的id是否是todo的id
					if (todo.id === action.payload) {
						todoListArr.splice(index, 1);
					}
				});
				window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
				state.todoList = todoListArr; // 更新redux状态，将redux设置为更新过的todoListArr,以确保当前的state状态与本地存储中的一致
			}
		},
		updateTodo: (state, action) => {
			const todoList = window.localStorage.getItem('todoList');
			if (todoList) {
				const todoListArr = JSON.parse(todoList);
				todoListArr.forEach((todo, index) => {
					if (todo.id === action.payload.id) {
						todo.title = action.payload.title;
						todo.status = action.payload.status;
					}
				});
				window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
				state.todoList = todoListArr;
			}
		},
		// 将更新后的filterStatus 重新赋值给state 状态树, action.payload 里面包含了 filterStatus and todoList
		updateFilterStatus: (state, action) => {
			state.filterStatus = action.payload;
		},
	},
});

// action.payload 时redux的常见约定， 用于携带action相关数据， action时一个描述发生事件的普通js对象， 它必须包含一个type 属性用于描写动作的类型， payload属性携带于动作相关的数据

export const { addTodo, deleteTodo, updateTodo, updateFilterStatus } =
	todoSlice.actions;
export default todoSlice.reducer;
