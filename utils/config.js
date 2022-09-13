let baseUrl = '';
const env = process.env;
if (env.NODE_ENV === 'development') { 
	baseUrl = `http://192.168.11.142`; //本地环境地址 
} else if (env.NODE_ENV === 'production') {
    baseUrl = `http://192.168.11.142`; //生产环境地址 
} else if (env.NODE_ENV === '') {
    baseUrl = `http://192.168.11.142`; //测试环境地址
}
export default baseUrl