import http from '@/utils/request.js'

export function upLoadImg(url) {
	return http.upload("/fastdfs/file/upload/form", {
		filePath: url,
		name:"file"
	})
}
