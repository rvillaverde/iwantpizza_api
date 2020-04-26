const express = require('express');
const port =  process.env.PORT || 3000;

const path = require('path');

/* ---------------------
-- Express App config --
------------------------ */
let app = express();

const ProductService = require('./lib/productService.js');

/*app.use(compression());
app.use(lessMiddleware(__dirname + '/public',{
  debug: true,
  dest: __dirname,
  force: true
}));*/
app.use(express.static(path.join(__dirname, 'public')));

/*app.use("/assets", express.static(__dirname + '/assets'));
app.use("/node_modules", express.static(__dirname + '/node_modules'));
app.use("/styles", express.static(__dirname + '/styles'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/views', express.static(__dirname + '/views'));*/

/*app.use(bodyParser.urlencoded({ extended: true }));*/
app.use(express.json());
/*app.set('view engine', 'ejs');*/

/*WebResourcesService.getCurrentLocation().then(async function() {
  app.locals.categories = await CategoryService.getCategories();
  startServer();
});*/

startServer();
function startServer() {
  app.listen(port, function() {
    console.log('Server running at port 3000: http://localhost:3000');
  });
}


// GET method for home page
app.get('/products', async function(request, response) {
  let products = await ProductService.getProducts();
  response.status(200).send(products);
});



// GET method to prevent 404 not found
/*app.get('*', function(request, response) { response.redirect('/') });*/
