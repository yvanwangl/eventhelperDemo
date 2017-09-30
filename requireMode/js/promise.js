define(['js/imageList'], function(imageList){
    let arr = imageList.images;
    let loadImg = (url)=> {
        return new Promise((resolve, reject)=> {
            let img = new Image();
            img.onload = ()=> {
                resolve(img);
            };
            img.onerror = reject;
            img.src = url;
        });
    };
    function loadImages(urls, handler, limit){
        let squence = [...urls];
        //包装的作用是在Promise完成后决议值是一个对象，包含对该promise对象的引用
        let wrapHandler = (url)=> {
            let promise = handler(url).then((img)=> ({
                img,
                index: promise
            }));
            return promise;
        };
        let promises = squence.splice(0, limit).map(wrapHandler);
        //如果请求并发数大于总请求的数量，则并发全部请求
        if(squence.length<=0){
            return Promise.all(promises);
        }
        return squence.reduce((last, url)=> {
            return last
                    .then(()=> Promise.race(promises))
                    .then(({img, promise}) => {
                        let finishIndex = promises.findIndex(item=> item==promise);
                        promises.splice(finishIndex, 1);
                        promises.push(wrapHandler(url));
                    });
        }, Promise.resolve()).then(()=> Promise.all(promises));

    }
    loadImages(arr, loadImg, 5);
});