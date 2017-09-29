requirejs.config({
    baseUrl: 'js',
    path: {

    }
});

require(['eventhelper', 'time', '../test'], function(eventhelper, time, test){

    let emmiter = new eventhelper();
    let images = [];
    let arr = new Array(20).map((item, index)=> `images/${index+1}.jpg`);
    let loadImg = (url, callback)=> {
        let img = new Image();
        img.onload = ()=>{
            callback(null, img);
        };
        img.onerror = (error)=>{
            callback(error, null);
        };
        img.src = url;
    };
    
    /**
     * current: 当前下载的批次，从1开始
     * size: 每次下载图片的数量
    */
    emmiter.on('start', (current, size)=>{
        arr.slice((current-1)*size, current*size).map(image=> loadImg(imgage, emmiter.group('load')));
    });

    emmiter.after('load', 10, (result)=> {
        images = images.concat(result);
        if(images.length==10){
            emmiter.emit('start', 2, 10);
        }else if(images.length==20){
            emmiter.emit('finish', images);
        }

    });

    emmiter.emit('start', 1, 10);

    emmiter.on('finish', (data)=>{
        console.log(data);
    });
})