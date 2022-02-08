// YOUR NAME HERE
// Salah Eddin Houmadi

// === constants ===
const MAX_QTY = 9;
const productIdKey = "product";
const orderIdKey = "order";
const inputIdKey = "qte";
const productIdInCartKey = "achat";
const removeCartKey = "remove";


// === global variables  ===
// the total cost of selected products 
var total = 0;
var cart = {};

// function called when page is loaded, it performs initializations 
var init = function () {
	createShop();
	// TODO : add other initializations to achieve if you think it is required
	var filterTag = document.getElementById("filter");
	filterTag.addEventListener('input', function(event){
		var term = this.value;
		var condition = new RegExp(term, "i");
		var result = catalog.filter(function (o) {
			return condition.test(o.name);
		});

		createShop(result);

	}, false);
}
window.addEventListener("load", init);


// usefull functions
var renderCartProducts = function() {

	var cartBlocks = document.getElementsByClassName("achats");
	if(cartBlocks.length) {
		var cartBlock = cartBlocks[0];
		cartBlock.innerHTML = "";
		total = 0;

		for (var [productId, value] of Object.entries(cart)){
			var productTag = document.createElement("div");
			var productIdValue = parseInt(productId);
			productTag.className = "achat";
			productTag.id = productIdValue + "-" + productIdInCartKey;

			var product = catalog[productIdValue];
			productTag.appendChild(createFigureBlock(product));
			productTag.appendChild(createBlock("h4", product.name));
			productTag.appendChild(createBlock("div", value.qty, "quantite"));
			productTag.appendChild(createBlock("div", product.price, "prix"));
			productTag.appendChild(removeProductFromCartControlBlock(productIdValue));

			total += value.qty * product.price;
			cartBlock.appendChild(productTag);
		}

		var totalCartTag = document.getElementById("montant");
		totalCartTag.innerHTML = total
	}


}

/*
* create and add all the div.produit elements to the div#boutique element
* according to the product objects that exist in 'catalog' variable
*/
var createShop = function (products) {
	var allProducts = [];
	if(products === undefined) {
		allProducts = catalog;
	}
	else if(products !== 0) {
		allProducts = products;
	}
	console.log(allProducts.length);
	var shop = document.getElementById("boutique");
	shop.innerHTML = "";
	for(var i = 0; i < allProducts.length; i++) {
		shop.appendChild(createProduct(allProducts[i], i));
	}
}

/*
* create the div.produit elment corresponding to the given product
* The created element receives the id "index-product" where index is replaced by param's value
* @param product (product object) = the product for which the element is created
* @param index (int) = the index of the product in catalog, used to set the id of the created element
*/
var createProduct = function (product, index) {
	// build the div element for product
	var block = document.createElement("div");
	block.className = "produit";
	// set the id for this product
	block.id = index + "-" + productIdKey;
	// build the h4 part of 'block'
	block.appendChild(createBlock("h4", product.name));
	
	// /!\ should add the figure of the product... does not work yet... /!\ 
	block.appendChild(createFigureBlock(product));

	// build and add the div.description part of 'block' 
	block.appendChild(createBlock("div", product.description, "description"));
	// build and add the div.price part of 'block'
	block.appendChild(createBlock("div", product.price, "prix"));
	// build and add control div block to product element
	block.appendChild(createOrderControlBlock(index));
	return block;
}


/* return a new element of tag 'tag' with content 'content' and class 'cssClass'
 * @param tag (string) = the type of the created element (example : "p")
 * @param content (string) = the html wontent of the created element (example : "bla bla")
 * @param cssClass (string) (optional) = the value of the 'class' attribute for the created element
 */
var createBlock = function (tag, content, cssClass) {
	var element = document.createElement(tag);
	if (cssClass != undefined) {
		element.className =  cssClass;
	}
	element.innerHTML = content;
	return element;
}

/*
* builds the control element (div.controle) for a product
* @param index = the index of the considered product
*
* TODO : add the event handling, 
*   /!\  in this version button and input do nothing  /!\  
*/
var createOrderControlBlock = function (index) {
	var control = document.createElement("div");
	control.className = "controle";

	// create input quantity element
	var input = document.createElement("input");
	input.id = index + '-' + inputIdKey;
	input.type = "number";
	input.step = "1";
	input.value = "0";
	input.min = "0";
	input.max = MAX_QTY.toString();
	// add input to control as its child
	control.appendChild(input);
	
	// create order button
	var button = document.createElement("button");
	button.className = 'commander';
	button.id = index + "-" + orderIdKey;
	// add control to control as its child
	control.appendChild(button);
	button.addEventListener('click', function(event){

		var currentId = parseInt(this.id);
		var currentQtyTag = currentId + "-qte";
		var currentQty = document.getElementById(currentQtyTag);
		var currentQtyVal = currentQty.value;
		var currentProductTag = currentId + "-product";

		cart[currentProductTag] = {
			"qty": currentQtyVal
		};

		renderCartProducts();

	}, false);

	// the built control div node is returned
	return control;
}

var removeProductFromCartControlBlock = function (index) {

	var remove = document.createElement("div");
	remove.className = "controle";
	var button = document.createElement("button");
	button.className = 'retirer';
	button.id = index + "-" + removeCartKey;
	remove.appendChild(button);
	button.addEventListener('click', function(event){

		var currentId = parseInt(this.id);
		var currentProductId = currentId + "-product";
		delete cart[currentProductId];

		renderCartProducts();

	}, false)

	return remove;
}
/*
* create and return the figure block for this product
* see the static version of the project to know what the <figure> should be
* @param product (product object) = the product for which the figure block is created
*
* DONE : write the correct code
*/
var createFigureBlock = function (product) {
	// this is absolutely not the correct answer !

	// <figure><img src="images/nounours1.jpg" alt="Nounours marron"></figure>
	var image = document.createElement("img");
	image.src = product["image"];
	image.alt = product["name"];

	return createBlock("figure", image.outerHTML);
}
