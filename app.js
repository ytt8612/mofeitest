var app = require('mblog');

app.get(/\/blog\/(\d{1,4})\/{0,1}(\d{0,3})$/, 'blog');
// app.get(/\/blog\/(\d{1,4})/, function(req,res){
// 	res.end('sss')

// })

app.start('9999');