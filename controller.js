
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
	firebase.initializeApp({
		serviceAccount:"./DiscordProject-dcf90e0b626f.json",
		databaseURL:"https://discordproject-260511.firebaseio.com/"
	});
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
            list.push('https://i.imgur.com/55qFWAj.jpg')
          
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
