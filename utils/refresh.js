// 用于来判断提交修改等操作之后返，回上一页是否进行页面刷新

//当前页修改refresh为True
export function refreshT() {
	let pages = getCurrentPages()
	let prevPage = pages[pages.length - 2]; //上一页页面
	prevPage.$vm.refresh = true
}

//上一页获取refresh
export function getRefresh() {
	let pages = getCurrentPages();
	let currPage = pages[pages.length - 1]; // 当前页的实例
	return currPage.$vm.refresh
}

//上一页修改refresh为false
export function refreshF() {
	let pages = getCurrentPages();
	let currPage = pages[pages.length - 1]; // 当前页的实例
	currPage.$vm.refresh = false
}
