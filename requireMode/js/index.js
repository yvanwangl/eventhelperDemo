requirejs.config({
    baseUrl: 'lib',
    paths: {
        js: '../js'
    }
});

require(['eventhelper', 'js/time', 'js/imageList', 'js/concurrent'], function(eventhelper, time, imageList){

    let emmiter = new eventhelper();
    let images = [];
    let stepSize = 10;
    let current = 1;
    let arr = imageList.images;
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
    emmiter.on('start', (current)=>{
        arr.slice((current-1)*stepSize, current*stepSize).map(image=> loadImg(image, emmiter.group('load')));
    });

    emmiter.on('finish', (data)=>{
        console.log(data);
    });

    emmiter.after('load', 10, (result)=> {
        images = images.concat(result);
        if(images.length==stepSize){
            emmiter.emit('start', current++);
        }else if(images.length==current*stepSize){
            emmiter.emit('finish', images);
        }

    });

    //emmiter.emit('start', current);

});