 const express  = require("express");
 const router=express.Router();


 const { registerUser, loginUser } = require('../middleware/auth');




// router.get('/register', function(req, res) {
//   try {
    
//     res.render('register', { message: 'Este es un mensaje de ejemplo' });
    
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// router.post('/register', registerUser);


 router.get('/login', function(req, res) {
   try {
    
     res.render('login');
    
   } catch (err) {
     res.status(500).send(err);
   }
 });

 router.post('/login', loginUser);

// router.get('/logout', (req, res) => {
//   req.session.destroy(err => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error en el servidor');
//     } else {
//       res.redirect('/login');
//     }
//   });
// });

module.exports=router;