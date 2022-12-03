import {Toast} from "vant";

export default ()=>{
    const onAfterRead=(file,fileList)=>{
        const uploadPromiseTask = [] //定义上传的promise任务栈
        if (fileList.length){

            fileList.map(item=> {
                uploadPromiseTask.unshift({
                    content:item.content,
                    "status": item.status,
                    "message":item.message,
                    file:{
                        type:item.file.type,
                        webkitRelativePath:item.file.webkitRelativePath,
                        size:item.file.size,
                        name:item.file.name,
                        lastModified:item.file.lastModified,
                        lastModifiedDate:item.file.lastModifiedDate,
                    }
                })
            })
        }
        if(uploadPromiseTask.length){
            localStorage.setItem('suploadPromiseTask',JSON.stringify(uploadPromiseTask))
            return uploadPromiseTask.length
        }else{
            Toast('上传失败！')
        }
    }
    return {
        onAfterRead
    }
}
