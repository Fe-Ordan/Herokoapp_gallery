
module.exports.home = (req,res,next)=>{
	var paths = ['images/a.jpg','images/b.jpg','images/c.jpg','https://i.imgur.com/jiZqayk.jpg'];
	const firebase = require('firebase');
    //  Initialize Firebase
    //   var config = {
    //     apiKey: 'xxxxxxx',
    //     authDomain: 'xxxxxxx',
    //     databaseURL: 'xxxxxxx',
    //     projectId: 'xxxxxxx'
    //   };
	//   firebase.initializeApp(config);
  let list = [];
  console.log('this is request: '+req)
  if (firebase.apps.length === 0){
    firebase.initializeApp({
      serviceAccount:"./DiscordProject-dcf90e0b626f.json",
      databaseURL:"https://discordproject-260511.firebaseio.com/"
    });
  }

      var rootRef = firebase
        .database()
        .ref()
        //.child('FilesSent')
        //.child('-LytqNOFMA1Ghym4bA1E');
        rootRef.child("Memes").orderByChild('memeLink').limitToFirst(10).once('value',snapshot =>{
   
        
            snapshot.forEach(function(snap){
              valuepost = snap.val();
              list.push(valuepost.memeLink);
           //   console.log(JSON.stringify(snap))
              console.log(valuepost.memeLink)


            })
            console.log('This is the list1 : '+list)
             list.push('https://i.imgur.com/cnLk26O.png')
             list.push("https://scontent.xx.fbcdn.net/v/t1.15752-9/83862981_497671327558111_185033702282100736_n.png?_nc_cat=109&_nc_oc=AQmG-YP0bxjrjQr42QLe2Du91hR2BZBhFPDNnqSgL00Evbb5bflzDAqaMNGZOuaYJOo1Z9PFcjLRIQsZeRqNgCx9&_nc_ad=z-m&_nc_cid=0&_nc_zor=9&_nc_ht=scontent.xx&oh=8def52d2baab9f8e5d238201d4aa4efe&oe=5ED8B947")
            // list.push('https://i.imgur.com/55qFWAj.jpg')
          
            return list;
        }).then(val =>{
          res.render('gallery', { imgs: list, layout:false});
        })

    //   var urlParams = new URLSearchParams(window.location.search);
    //   var dbNodeID = urlParams.get('id');
		
    //   rootRef.once('value')
    //     .then(function(snapshot) {
		//   var dataItem1 = snapshot.val();

		//   console.log('Items : '+dataItem1)
		// //  document.getElementById('content').innerHTML = dataItem1;
		//  res.render('gallery', { imgs: paths, layout:false});
    //     });
   
	
};
