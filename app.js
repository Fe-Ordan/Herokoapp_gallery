var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
//var imgur = require('imgur');
var index = require('./routes/index');
//var users = require('./routes/users');
const firebase = require('firebase');
var app = express();
if (firebase.apps.length === 0){
  firebase.initializeApp({
    serviceAccount:"./DiscordProject-dcf90e0b626f.json",
    databaseURL:"https://discordproject-260511.firebaseio.com/"
  });
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/myimgur', index);
//app.use('/users', users);
app.get('/SharedGallery',(res,req,next) =>{
  var uniquShareID = req.req.query.id; 
 //var string = JSON.stringify(req);
 //var objectValue = JSON.parse(string);
// objectValue['mm'];
  console.log('this is request : ',req.req.query)
  //console.log('this is request2 : ',objectValue['query'])
  firebase.database().ref("SharedImgurAlbums").child(uniquShareID).once('value',function(snapshot){
   
      if(snapshot.hasChildren()){

        if(JSON.stringify(snapshot.val()) != null){
          galleryList = snapshot.val().id.linksofAlbum;
          if(galleryList){
            res.render('gallery', { imgs: galleryList, layout:false});
          }
        }
      }
   
    
    })
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
