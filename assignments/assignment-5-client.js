Store.prototype.queryProducts = function(query, callback){
	var self = this;
	var queryString = Object.keys(query).reduce(function(acc, key){
			return acc + (query[key] ? ((acc ? '&':'') + key + '=' + query[key]) : '');
		}, '');
	ajaxGet(this.serverUrl+"/products?"+queryString,
		function(products){
			Object.keys(products)
				.forEach(function(itemName){
					var rem = products[itemName].quantity - (self.cart[itemName] || 0);
					if (rem >= 0){
						self.stock[itemName].quantity = rem;
					}
					else {
						self.stock[itemName].quantity = 0;
						self.cart[itemName] = products[itemName].quantity;
						if (self.cart[itemName] === 0) delete self.cart[itemName];
					}
					
					self.stock[itemName] = Object.assign(self.stock[itemName], {
						price: products[itemName].price,
						label: products[itemName].label,
						imageUrl: products[itemName].imageUrl
					});
				});
			self.onUpdate();
			callback(null, products);
		},
		function(error){
			callback(error);
		}
	)
}

function renderMenu(container, storeInstance){
	while (container.lastChild) container.removeChild(container.lastChild);
	if (!container._filters) {
		container._filters = {
			minPrice: null,
			maxPrice: null,
			category: ''
		};
		container._refresh = function(){
			storeInstance.queryProducts(container._filters, function(err, products){
					if (err){
						alert('Error occurred trying to query products');
						console.log(err);
					}
					else {
						displayed = Object.keys(products);
						renderProductList(document.getElementById('productView'), storeInstance);
					}
				});
		}
	}

	var box = document.createElement('div'); container.appendChild(box);
		box.id = 'price-filter';
		var input = document.createElement('input'); box.appendChild(input);
			input.type = 'number';
			input.value = container._filters.minPrice;
			input.min = 0;
			input.placeholder = 'Min Price';
			input.addEventListener('blur', function(event){
				container._filters.minPrice = event.target.value;
				container._refresh();
			});

		input = document.createElement('input'); box.appendChild(input);
			input.type = 'number';
			input.value = container._filters.maxPrice;
			input.min = 0;
			input.placeholder = 'Max Price';
			input.addEventListener('blur', function(event){
				container._filters.maxPrice = event.target.value;
				container._refresh();
			});

	var list = document.createElement('ul'); container.appendChild(list);
		list.id = 'menu';
		var listItem = document.createElement('li'); list.appendChild(listItem);
			listItem.className = 'menuItem' + (container._filters.category === '' ? ' active': '');
			listItem.appendChild(document.createTextNode('All Items'));
			listItem.addEventListener('click', function(event){
				container._filters.category = '';
				container._refresh()
			});
	var CATEGORIES = [ 'Clothing', 'Technology', 'Office', 'Outdoor' ];
	for (var i in CATEGORIES){
		var listItem = document.createElement('li'); list.appendChild(listItem);
			listItem.className = 'menuItem' + (container._filters.category === CATEGORIES[i] ? ' active': '');
			listItem.appendChild(document.createTextNode(CATEGORIES[i]));
			listItem.addEventListener('click', (function(i){
				return function(event){
					container._filters.category = CATEGORIES[i];
					container._refresh();
				}
			})(i));
	}
}