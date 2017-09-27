requirejs.config({
    baseUrl: 'js',
    path: {

    }
});

require(['eventhelper', 'time', '../test'], function(eventhelper, time, test){

    let emmiter = new eventhelper();
    emmiter.on('time300', (data)=> console.log(data + time + test));
    
    setTimeout(()=> emmiter.emit('time300', 'after 300ms'), 300);
})