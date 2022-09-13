const getters = {
    token: state => state.user.token,
    projectId: state => state.user.projectId,
    userName: state => state.user.userName,
    empno: state => state.user.empno,
    userId: state => state.user.userId,
    avatar: state => state.user.avatar,
	sex: state => state.user.sex,
	email: state => state.user.email,
	phone: state => state.user.phone,
	defKey: state => state.user.defKey,
}
export default getters