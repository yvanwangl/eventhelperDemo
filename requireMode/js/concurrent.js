define(['eventhelper','js/imageList'], function(EventHelper, imageList){
    let emmiter = new EventHelper();
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
    emmiter.concurrent('load', 5, loadImg, imageList.images);
    emmiter.on('loadFinish', (result)=> {
        //var imgs = result.map(img=> img.src);
        console.log(result);
    });
});