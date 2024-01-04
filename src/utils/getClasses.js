export const getClasses = (classes) =>
	classes
		.filter((item) => item !== '')
		.join(' ')
		.trim()

// 过滤空字符类名,确保只有非空的类名被保留
// join将过滤后保留的类名组合成一个字符串，然后每个类名之间用空格分隔
// trim去除合并后字符串两侧的空格，以保证最终返回的字符串没有不必要的空格
// 这个函数可以用来动态的生成元素的类名，将传递过来的数组返回字符串应用于元素的className
