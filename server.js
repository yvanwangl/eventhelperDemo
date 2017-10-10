let express = require('express');
let app = express();
let EventHelper = require('eventhelper');
let fs = require('mz/fs');
let path = require('path');

//app.use(express.static(path.join(__dirname, '/assets')));
//app.use(express.static(path.join(__dirname, '/importMode/dist')));
app.use(express.static(path.join(__dirname, '/requireMode')));
let emmiter = new EventHelper();
emmiter.on('read', (data)=> console.log(data));
emmiter.all('read', 'readMore', (read, readMore)=> console.log(`${read}--${readMore}`))

fs.readFile('./mock/read.txt', 'utf-8', emmiter.done('read'));
fs.readFile('./mock/readMore.txt', 'utf-8', emmiter.done('readMore'));

app.get('/', (req, res)=>{
    res.sendfile('index.html');
})

app.listen(3000);