var	express	    =	require('express'),
    app         =	express();

app.set('port',	(process.env.PORT	||	11112));


// MAIN PAGE
app.use('/',            express.static('./dist/', {
        'index' : 'index.html'
}));
app.use('/category',    express.static('./dist/', {
        'index' : 'category.html'
}));
app.use('/cart',        express.static('./dist/', {
        'index' : 'cart.html'
}));
app.use('/product',     express.static('./dist/', {
        'index' : 'product.html'
}));
app.use('/track',       express.static('./dist/', {
        'index' : 'track.html'
}));
app.use('/support',     express.static('./dist/', {
        'index' : 'support.html'
}));
app.use('/policies',    express.static('./dist/', {
        'index' : 'policies.html'
}));
app.use('/faq',         express.static('./dist/', {
        'index' : 'faq.html'
}));


app.listen(app.get('port'),	function()	{
    console.log('Server	started:	http://localhost:'	+	app.get('port')	+	'/');
});