import EventHelper from 'eventhelper';

let emmiter = new EventHelper();
emmiter.on('time300', (data)=> console.log(data));

setTimeout(()=> emmiter.emit('time300', 'after 300ms'), 300);