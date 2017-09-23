require(['eventhelper', 'a/time'], function(eventhelper, time){

    let emmiter = new eventhelper();
    emmiter.on('time300', (data)=> console.log(data + time));
    
    setTimeout(()=> emmiter.emit('time300', 'after 300ms'), 300);
})