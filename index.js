// Main JavaScript for AgriShop Frontend
        // Sample orders data
        const orders = [
            {
                id: "ORD001",
                customer: "Ramesh Kumar",
                date: "2023-10-15",
                total: 1250,
                status: "delivered"
            },
            {
                id: "ORD002",
                customer: "Priya Sharma",
                date: "2023-10-16",
                total: 890,
                status: "processing"
            },
            {
                id: "ORD003",
                customer: "Amit Patel",
                date: "2023-10-17",
                total: 2100,
                status: "shipped"
            }
        ];

        // Sample users data
        const users = [
            {
                id: "USR001",
                name: "Ramesh Kumar",
                email: "ramesh@example.com",
                phone: "9876543210",
                registrationDate: "2023-01-15",
                status: "active"
            },
            {
                id: "USR002",
                name: "Priya Sharma",
                email: "priya@example.com",
                phone: "9876543211",
                registrationDate: "2023-02-20",
                status: "active"
            },
            {
                id: "USR003",
                name: "Amit Patel",
                email: "amit@example.com",
                phone: "9876543212",
                registrationDate: "2023-03-10",
                status: "inactive"
            }
        ];

        // Categories data for the new circular design
        const categories = [
            { name: "Offers", img: "Category-images/offer-image.webp", category: "offers" },
            { name: "Insecticides", img: "Category-images/Insecticides.webp", category: "insecticides" },
            { name: "Nutrients", img: "Category-images/Nutrients.webp", category: "nutrients" },
            { name: "Fungicides", img: "Category-images/Fungicides.webp", category: "fungicides" },
            { name: "Vegetable & Fruit Seeds", img: "Category-images/Vegetables&FruitSeeds.webp", category: "seeds" },
            { name: "Herbicides", img: "Category-images/Herbicides.webp", category: "herbicides" },
            { name: "Growth Promoters", img: "Category-images/Growth Promoters.webp", category: "growth-promoters" },
            { name: "Farm Machinery", img: "Category-images/Farm Machinery.webp", category: "tools" },
            { name: "Flower Seeds", img: "Category-images/Flower Seeds.webp", category: "seeds" },
            { name: "Organic Farming", img: "Category-images/Organic Farming.webp", category: "organic" },
            { name: "Animal Husbandry", img: "Category-images/Animal Husbandry.webp", category: "animal-husbandry" },
            { name: "New Arrivals", img: "Category-images/New Arrivals.webp", category: "new-arrivals" },
        ];

        // Cart data
        let cart = [];
        let currentView = 'home';
        let isAdmin = false;
        let brandCarouselPosition = 0;
        let feedbackCarouselPosition = 0;

        // Initialize the app
        document.addEventListener('DOMContentLoaded', function () {
            loadFeaturedProducts();
            loadInventoryTable();
            loadRentalTools();
            loadCategories();
            updateCartCount();
            setupAutoSwipe();

            // Set up form submissions
            // document.getElementById('user-login-form').addEventListener('submit', handleUserLogin);
            // document.getElementById('admin-login-form').addEventListener('submit', handleAdminLogin);
            // document.getElementById('registration-form').addEventListener('submit', handleRegistration);
            document.getElementById('contact-form').addEventListener('submit', handleContactForm);
            document.getElementById('add-product-form').addEventListener('submit', handleAddProduct);

            // Set up chatbot input
            document.getElementById('chatbot-input').addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        });

        // Load categories with circular design
        function loadCategories() {
            const container = document.getElementById("categories");

            categories.forEach(cat => {
                const card = document.createElement("div");
                card.classList.add("category-card");
                card.onclick = () => filterByNewCategory(cat.category);

                card.innerHTML = `
                    <div class="category-image" style="background-color:${getRandomColor()}">
                        <img src="${cat.img}" alt="${cat.name}">
                    </div>
                    <div class="category-name">${cat.name}</div>
                `;
                container.appendChild(card);
            });
        }

        // Get random color for category background
        function getRandomColor() {
            const colors = ["#FFD966", "#A2C4C9", "#EAD1DC", "#CFE2F3", "#F9CB9C", "#FCE5CD", "#D9EAD3", "#C9DAF8", "#F6B26B", "#B4A7D6", "#EA9999", "#FFE599"];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        // Filter by new category
        function filterByNewCategory(category) {
            // Map new categories to existing ones
            const categoryMap = {
                'offers': 'all',
                'insecticides': 'pesticides',
                'nutrients': 'fertilizers',
                'fungicides': 'pesticides',
                'seeds': 'seeds',
                'herbicides': 'pesticides',
                'growth-promoters': 'fertilizers',
                'tools': 'tools',
                'organic': 'all',
                'animal-husbandry': 'all',
                'new-arrivals': 'all'
            };

            const mappedCategory = categoryMap[category] || 'all';
            filterByCategory(mappedCategory);
        }

        // Load featured products
        function loadFeaturedProducts() {
            const featuredProductsContainer = document.getElementById('featured-products');
            featuredProductsContainer.innerHTML = '';

            // Get first 4 products as featured
            const featuredProducts = products.slice(0, 6);

            featuredProducts.forEach(product => {
                const productCard = createProductCard(product);
                featuredProductsContainer.appendChild(productCard);
            });
        }

        // Load rental tools
        function loadRentalTools() {
            const toolsGrid = document.getElementById('tools-grid');
            if (!toolsGrid) return;

            toolsGrid.innerHTML = '';

            rentalTools.forEach(tool => {
                const toolCard = createToolRentalCard(tool);
                toolsGrid.appendChild(toolCard);
            });
        }

        // Create tool rental card element
        function createToolRentalCard(tool) {
            const card = document.createElement('div');
            card.className = 'tool-rental-card';

            card.innerHTML = `
                <div class="tool-image-container">
                    <img src="${tool.image}" alt="${tool.name}" class="tool-image">
                </div>
                <h3 class="font-semibold text-lg mb-2">${tool.name}</h3>
                <p class="text-gray-600 mb-3">${tool.description}</p>
                <div class="flex items-center mb-3">
                    <span class="text-xl font-bold text-green-600 mr-4">₹${tool.price}/day</span>
                    <div class="flex text-yellow-400">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                        <span class="text-gray-600 ml-2">(${tool.rating})</span>
                    </div>
                </div>
                <div class="flex items-center mb-3">
                    <i class="fas fa-map-marker-alt text-gray-500 mr-2"></i>
                    <span class="text-sm text-gray-600">${tool.location}</span>
                </div>
                <div class="flex items-center mb-4">
                    <i class="fas fa-user text-gray-500 mr-2"></i>
                    <span class="text-sm text-gray-600">${tool.owner}</span>
                </div>
                <button class="w-full ${tool.available ? 'modern-button' : 'bg-gray-400 cursor-not-allowed'} text-white py-2 rounded-lg transition" ${!tool.available ? 'disabled' : ''}>
                    ${tool.available ? 'Rent Now' : 'Not Available'}
                </button>
            `;

            return card;
        }

        // Create product card element
        function createProductCard(product) {
            const card = document.createElement('div');
            card.className = 'product-card bg-white rounded-xl shadow-lg overflow-hidden';

            // Determine stock status
            let stockStatus, stockClass;
            if (product.stock === 0) {
                stockStatus = 'Out of Stock';
                stockClass = 'out-of-stock';
            } else if (product.stock < 10) {
                stockStatus = 'Low Stock';
                stockClass = 'low-stock';
            } else {
                stockStatus = 'In Stock';
                stockClass = 'in-stock';
            }

            card.innerHTML = `
                <div class="product-image-container relative">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <span class="stock-indicator ${stockClass}">${stockStatus}</span>
                </div>
                <div class="p-4 flex-grow">
                    <h3 class="font-semibold text-lg mb-1">${product.name}</h3>
                    <p class="text-gray-600 text-sm mb-2">${product.brand}</p>
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-xl font-bold text-green-600">₹${product.price}</span>
                        <div class="flex text-yellow-400 text-sm">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                        </div>
                    </div>
                    <button onclick="showProductDetail(${product.id})" class="w-full modern-button">
                        View Details
                    </button>
                </div>
            `;

            return card;
        }

        // Load inventory table
        function loadInventoryTable() {
            const tableBody = document.getElementById('inventory-table-body');
            if (!tableBody) return;

            tableBody.innerHTML = '';

            products.forEach(product => {
                const row = document.createElement('tr');

                // Determine stock status
                let stockStatus, stockClass;
                if (product.stock === 0) {
                    stockStatus = 'Out of Stock';
                    stockClass = 'out-of-stock';
                } else if (product.stock < 10) {
                    stockStatus = 'Low Stock';
                    stockClass = 'low-stock';
                } else {
                    stockStatus = 'In Stock';
                    stockClass = 'in-stock';
                }

                // Calculate stock percentage for visualization
                const maxStock = 100;
                const stockPercentage = Math.min((product.stock / maxStock) * 100, 100);
                let stockBarClass = 'stock-bar';
                if (product.stock === 0) {
                    stockBarClass = 'stock-bar out-of-stock-bar';
                } else if (product.stock < 10) {
                    stockBarClass = 'stock-bar low-stock-bar';
                }

                row.innerHTML = `
                    <td>
                        <div class="flex items-center">
                            <img src="${product.image}" alt="${product.name}" class="w-12 h-12 object-cover rounded mr-3">
                            <div>
                                <div class="font-semibold">${product.name}</div>
                                <div class="text-sm text-gray-600">${product.brand}</div>
                            </div>
                        </div>
                    </td>
                    <td>${product.category}</td>
                    <td>₹${product.price}</td>
                    <td>${product.stock}</td>
                    <td><span class="px-2 py-1 rounded text-xs font-semibold ${stockClass}">${stockStatus}</span></td>
                    <td>
                        <div class="stock-visualization">
                            <div class="${stockBarClass}" style="width: ${stockPercentage}%"></div>
                        </div>
                    </td>
                    <td>
                        <div class="flex space-x-2">
                            <button onclick="editProduct(${product.id})" class="text-blue-600 hover:text-blue-800">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="deleteProduct(${product.id})" class="text-red-600 hover:text-red-800">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;

                tableBody.appendChild(row);
            });
        }

        // Show product detail
        function showProductDetail(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;

            document.getElementById('detail-image').src = product.image;
            document.getElementById('detail-name').textContent = product.name;
            document.getElementById('detail-category').textContent = `${product.category} • ${product.brand}`;
            document.getElementById('detail-price').textContent = `₹${product.price}`;
            document.getElementById('detail-description').textContent = product.description;

            // Load additional details
            document.getElementById('detail-brand').textContent = product.brand;
            document.getElementById('detail-sku').textContent = product.sku;
            document.getElementById('detail-weight').textContent = product.weight;
            document.getElementById('detail-dimensions').textContent = product.dimensions;
            document.getElementById('detail-origin').textContent = product.origin;
            document.getElementById('detail-shelf-life').textContent = product.shelfLife;
            document.getElementById('detail-usage').textContent = product.usage;
            document.getElementById('detail-safety').textContent = product.safety;

            // Load features
            const featuresContainer = document.getElementById('detail-features');
            featuresContainer.innerHTML = '';
            product.features.forEach(feature => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-check text-green-600 mr-2"></i> ${feature}`;
                featuresContainer.appendChild(li);
            });

            // Load related products
            loadRelatedProducts(product.category, productId);

            showView('product-detail');
        }

        // Load related products
        function loadRelatedProducts(category, excludeId) {
            const relatedContainer = document.getElementById('related-products');
            relatedContainer.innerHTML = '';

            // Get products from same category, excluding current product
            const relatedProducts = products.filter(p => p.category === category && p.id !== excludeId).slice(0, 3);

            relatedProducts.forEach(product => {
                const productCard = createProductCard(product);
                relatedContainer.appendChild(productCard);
            });
        }

        // Show view
        function showView(viewName) {
            // Hide all views
            document.querySelectorAll('.view').forEach(view => {
                view.classList.add('hidden');
            });

            // Show selected view
            document.getElementById(`${viewName}-view`).classList.remove('hidden');
            currentView = viewName;

            // Handle header visibility based on view
            const mainHeader = document.getElementById('main-header');
            const mainNav = document.getElementById('main-nav');

            if (viewName === 'products' || viewName === 'product-detail') {
                // Hide horizontal navigation for product pages
                mainNav.classList.add('hidden');
                // Show vertical navigation
                if (viewName === 'products') {
                    toggleVerticalNav();
                }
            } else {
                // Show horizontal navigation for other pages
                mainNav.classList.remove('hidden');
                // Hide vertical navigation
                document.getElementById('vertical-nav').classList.remove('active');
            }

            // Load products if products view
            if (viewName === 'products') {
                loadProducts();
            }

            // Update cart if cart view
            if (viewName === 'cart') {
                updateCartView();
            }

            // Update checkout if checkout view
            if (viewName === 'checkout') {
                updateCheckoutView();
            }

            // Load rental tools if tools-rental view
            if (viewName === 'tools-rental') {
                loadRentalTools();
            }

            // Load inventory table if inventory-management view
            if (viewName === 'inventory-management') {
                loadInventoryTable();
            }

            // Scroll to top
            window.scrollTo(0, 0);
        }


        // Load products
        function loadProducts() {
            const productsGrid = document.getElementById('products-grid');
            productsGrid.innerHTML = '';

            products.forEach(product => {
                const productCard = createProductCard(product);
                productsGrid.appendChild(productCard);
            });
        }



        // Filter by category
        function filterByCategory(category) {
            const productsGrid = document.getElementById('products-grid');
            productsGrid.innerHTML = '';

            let filteredProducts = products;
            if (category !== 'all') {
                filteredProducts = products.filter(p => p.category === category);
            }

            filteredProducts.forEach(product => {
                const productCard = createProductCard(product);
                productsGrid.appendChild(productCard);
            });

            showView('products');
        }

        // Filter by subcategory
        function filterBySubcategory(subcategory) {
            const productsGrid = document.getElementById('products-grid');
            productsGrid.innerHTML = '';

            const filteredProducts = products.filter(p => p.subcategory === subcategory);

            filteredProducts.forEach(product => {
                const productCard = createProductCard(product);
                productsGrid.appendChild(productCard);
            });

            showView('products');
        }

        // Filter by brand
        function filterByBrand(brand) {
            const productsGrid = document.getElementById('products-grid');
            productsGrid.innerHTML = '';

            const filteredProducts = products.filter(p => p.brand === brand);

            filteredProducts.forEach(product => {
                const productCard = createProductCard(product);
                productsGrid.appendChild(productCard);
            });

            showView('products');
        }

        // Filter tools
        function filterTools(category) {
            const toolsGrid = document.getElementById('tools-grid');
            toolsGrid.innerHTML = '';

            let filteredTools = rentalTools;
            if (category !== 'all') {
                filteredTools = rentalTools.filter(t => t.category === category);
            }

            filteredTools.forEach(tool => {
                const toolCard = createToolRentalCard(tool);
                toolsGrid.appendChild(toolCard);
            });
        }

        // Sort products
        function sortProducts() {
            const sortValue = document.getElementById('sort-select').value;
            const productsGrid = document.getElementById('products-grid');
            productsGrid.innerHTML = '';

            let sortedProducts = [...products];

            switch (sortValue) {
                case 'price-low':
                    sortedProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    sortedProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'name':
                    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
            }

            sortedProducts.forEach(product => {
                const productCard = createProductCard(product);
                productsGrid.appendChild(productCard);
            });
        }

        // Add to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;

            // Check if product is in stock
            if (product.stock === 0) {
                showNotification('This product is out of stock', 'error');
                return;
            }

            // Check if product already in cart
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                // Check if adding more would exceed stock
                if (existingItem.quantity >= product.stock) {
                    showNotification('Cannot add more items than available in stock', 'error');
                    return;
                }
                existingItem.quantity++;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                });
            }

            updateCartCount();
            showNotification('Product added to cart', 'success');
        }

        // Add to cart from detail view
        function addToCartFromDetail() {
            const quantity = parseInt(document.getElementById('quantity').value);
            const productName = document.getElementById('detail-name').textContent;
            const product = products.find(p => p.name === productName);

            if (!product) return;

            // Check if product is in stock
            if (product.stock === 0) {
                showNotification('This product is out of stock', 'error');
                return;
            }

            // Check if adding more would exceed stock
            if (quantity > product.stock) {
                showNotification('Cannot add more items than available in stock', 'error');
                return;
            }

            // Check if product already in cart
            const existingItem = cart.find(item => item.id === product.id);

            if (existingItem) {
                if (existingItem.quantity + quantity > product.stock) {
                    showNotification('Cannot add more items than available in stock', 'error');
                    return;
                }
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: quantity
                });
            }

            updateCartCount();
            showNotification('Product added to cart', 'success');
        }

        // Update cart count
        function updateCartCount() {
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            document.getElementById('cart-count').textContent = count;
        }

        // Update cart view
        function updateCartView() {
            const cartItemsContainer = document.getElementById('cart-items');
            cartItemsContainer.innerHTML = '';

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p class="text-center py-8">Your cart is empty</p>';
                document.getElementById('cart-subtotal').textContent = '₹0.00';
                document.getElementById('cart-total').textContent = '₹99.00';
                return;
            }

            let subtotal = 0;

            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;

                const cartItem = document.createElement('div');
                cartItem.className = 'flex items-center mb-4 pb-4 border-b';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded mr-4">
                    <div class="flex-grow">
                        <h4 class="font-semibold">${item.name}</h4>
                        <p class="text-gray-600">₹${item.price} × ${item.quantity}</p>
                    </div>
                    <div class="flex items-center">
                        <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})" class="bg-gray-200 px-2 py-1 rounded-l hover:bg-gray-300">
                            <i class="fas fa-minus text-xs"></i>
                        </button>
                        <span class="px-3 py-1 border-t border-b border-gray-200">${item.quantity}</span>
                        <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})" class="bg-gray-200 px-2 py-1 rounded-r hover:bg-gray-300">
                            <i class="fas fa-plus text-xs"></i>
                        </button>
                    </div>
                    <div class="ml-4 font-semibold">₹${itemTotal}</div>
                    <button onclick="removeFromCart(${item.id})" class="ml-4 text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
                    </button>
                `;

                cartItemsContainer.appendChild(cartItem);
            });

            const shipping = 99;
            const total = subtotal + shipping;

            document.getElementById('cart-subtotal').textContent = `₹${subtotal.toFixed(2)}`;
            document.getElementById('cart-total').textContent = `₹${total.toFixed(2)}`;
        }

        // Update checkout view
        function updateCheckoutView() {
            const checkoutItemsContainer = document.getElementById('checkout-items');
            checkoutItemsContainer.innerHTML = '';

            if (cart.length === 0) {
                checkoutItemsContainer.innerHTML = '<p class="text-center py-8">Your cart is empty</p>';
                document.getElementById('checkout-subtotal').textContent = '₹0.00';
                document.getElementById('checkout-tax').textContent = '₹0.00';
                document.getElementById('checkout-total').textContent = '₹99.00';
                return;
            }

            let subtotal = 0;

            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;

                const checkoutItem = document.createElement('div');
                checkoutItem.className = 'flex items-center mb-4 pb-4 border-b';
                checkoutItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded mr-4">
                    <div class="flex-grow">
                        <h4 class="font-semibold">${item.name}</h4>
                        <p class="text-gray-600">₹${item.price} × ${item.quantity}</p>
                    </div>
                    <div class="font-semibold">₹${itemTotal}</div>
                `;

                checkoutItemsContainer.appendChild(checkoutItem);
            });

            const shipping = 99;
            const tax = subtotal * 0.05; // 5% tax
            const total = subtotal + shipping + tax;

            document.getElementById('checkout-subtotal').textContent = `₹${subtotal.toFixed(2)}`;
            document.getElementById('checkout-tax').textContent = `₹${tax.toFixed(2)}`;
            document.getElementById('checkout-total').textContent = `₹${total.toFixed(2)}`;
        }

        // Update cart item quantity
        function updateCartItemQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                removeFromCart(productId);
                return;
            }

            const product = products.find(p => p.id === productId);
            if (!product) return;

            // Check if new quantity exceeds stock
            if (newQuantity > product.stock) {
                showNotification('Cannot add more items than available in stock', 'error');
                return;
            }

            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity = newQuantity;
                updateCartCount();
                updateCartView();
                updateCheckoutView();
                updateSidebarCart();
            }
        }

        // Remove from cart
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartCount();
            updateCartView();
            updateCheckoutView();
            updateSidebarCart();
        }

        // Toggle cart sidebar
        function toggleCart() {
            const cartSidebar = document.getElementById('cart-sidebar');
            cartSidebar.classList.toggle('translate-x-full');

            if (!cartSidebar.classList.contains('translate-x-full')) {
                updateSidebarCart();
            }
        }

        // Update sidebar cart
        function updateSidebarCart() {
            const sidebarCartItems = document.getElementById('sidebar-cart-items');
            sidebarCartItems.innerHTML = '';

            if (cart.length === 0) {
                sidebarCartItems.innerHTML = '<p class="text-center py-8">Your cart is empty</p>';
                document.getElementById('sidebar-cart-total').textContent = '₹0.00';
                return;
            }

            let total = 0;

            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                const cartItem = document.createElement('div');
                cartItem.className = 'flex items-center mb-4 pb-4 border-b';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded mr-3">
                    <div class="flex-grow">
                        <h4 class="font-semibold text-sm">${item.name}</h4>
                        <p class="text-gray-600 text-sm">₹${item.price} × ${item.quantity}</p>
                    </div>
                    <div class="font-semibold text-sm">₹${itemTotal}</div>
                `;

                sidebarCartItems.appendChild(cartItem);
            });

            document.getElementById('sidebar-cart-total').textContent = `₹${total.toFixed(2)}`;
        }

        // Show checkout
        function showCheckout() {
            if (cart.length === 0) {
                showNotification('Your cart is empty', 'error');
                return;
            }
            showView('checkout');
        }

        // Place order
        function placeOrder() {
            // In a real app, this would submit the order to a server
            showNotification('Order placed successfully!', 'success');
            cart = [];
            updateCartCount();
            showView('home');
        }

        // Toggle mobile menu
        function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.toggle('hidden');
        }

        // Toggle vertical navigation
        function toggleVerticalNav() {
            const verticalNav = document.getElementById('vertical-nav');
            verticalNav.classList.toggle('active');
        }

        // Handle search keypress
        function handleSearchKeypress(event) {
            if (event.key === 'Enter') {
                const searchTerm = document.getElementById('search-input').value.toLowerCase();
                if (searchTerm) {
                    searchProducts(searchTerm);
                }
            }
        }

        // Search products
        function searchProducts(searchTerm) {
            const productsGrid = document.getElementById('products-grid');
            productsGrid.innerHTML = '';

            const searchResults = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm) ||
                product.brand.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );

            if (searchResults.length === 0) {
                productsGrid.innerHTML = '<p class="col-span-4 text-center py-8">No products found</p>';
            } else {
                searchResults.forEach(product => {
                    const productCard = createProductCard(product);
                    productsGrid.appendChild(productCard);
                });
            }

            showView('products');
        }

        // Open camera search
        function openCameraSearch() {
            showNotification('Camera search feature is coming soon!', 'info');
            // In a real app, this would open the camera for image-based search
        }

        // Increase quantity
        function increaseQuantity() {
            const quantityInput = document.getElementById('quantity');
            quantityInput.value = parseInt(quantityInput.value) + 1;
        }

        // Decrease quantity
        function decreaseQuantity() {
            const quantityInput = document.getElementById('quantity');
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        }

        // Show login modal
        function showLogin() {
            document.getElementById('login-modal').classList.add('active');
        }
        // Handle contact form
        function handleContactForm(event) {
            event.preventDefault();
            // In a real app, this would submit the form to a server
            showNotification('Message sent successfully!', 'success');
            event.target.reset();
        }

        // Show admin section
        function showAdminSection(section) {
            // Hide all admin sections
            document.querySelectorAll('.admin-section').forEach(sec => {
                sec.classList.add('hidden');
            });

            // Show selected section
            document.getElementById(`${section}-section`).classList.remove('hidden');

            // Update nav buttons
            document.querySelectorAll('.admin-nav-btn').forEach(btn => {
                btn.classList.remove('bg-green-500', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-800');
            });

            event.target.classList.remove('bg-gray-200', 'text-gray-800');
            event.target.classList.add('bg-green-500', 'text-white');
        }

        // Show add product modal
        function showAddProductModal() {
            document.getElementById('add-product-modal').classList.add('active');
        }

        // Handle add product
        function handleAddProduct(event) {
            event.preventDefault();
            // In a real app, this would add the product to a database
            showNotification('Product added successfully!', 'success');
            closeModal('add-product-modal');
            loadInventoryTable();
        }

        // Edit product
        function editProduct(productId) {
            // In a real app, this would open a modal with product details
            showNotification(`Edit product with ID: ${productId}`, 'info');
        }

        // Delete product
        function deleteProduct(productId) {
            if (confirm('Are you sure you want to delete this product?')) {
                // In a real app, this would delete the product from a database
                showNotification('Product deleted successfully!', 'success');
                loadInventoryTable();
            }
        }

        // Logout
        function logout() {
            isAdmin = false;
            showNotification('Logged out successfully', 'success');
            showView('home');
        }

        // Show notification
        function showNotification(message, type) {
            const notificationContainer = document.getElementById('notification-container');

            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;

            let icon;
            switch (type) {
                case 'success':
                    icon = 'fa-check-circle';
                    break;
                case 'error':
                    icon = 'fa-exclamation-circle';
                    break;
                case 'info':
                    icon = 'fa-info-circle';
                    break;
            }

            notification.innerHTML = `
                <i class="fas ${icon} mr-3"></i>
                <span>${message}</span>
            `;

            notificationContainer.appendChild(notification);

            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }

        // Carousel functionality
        let slideIndex = 1;

        function currentSlide(n) {
            showSlide(slideIndex = n);
        }

        function showSlide(n) {
            let i;
            const slides = document.getElementsByClassName("carousel-slide");
            const dots = document.getElementsByClassName("carousel-dot");

            if (n > slides.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = slides.length }

            for (i = 0; i < slides.length; i++) {
                slides[i].classList.remove("active");
            }

            for (i = 0; i < dots.length; i++) {
                dots[i].classList.remove("active");
            }

            slides[slideIndex - 1].classList.add("active");
            dots[slideIndex - 1].classList.add("active");
        }

        // Auto-advance carousel
        setInterval(() => {
            slideIndex++;
            showSlide(slideIndex);
        }, 5000);

        // Setup auto-swipe for brand and feedback sections
        function setupAutoSwipe() {
            // Brand carousel
            const brandCarouselTrack = document.getElementById('brand-carousel-track');
            const brandSlides = document.querySelectorAll('.brand-carousel-slide');
            const maxBrandPosition = Math.max(0, brandSlides.length - getVisibleBrandSlides());

            function getVisibleBrandSlides() {
                const width = window.innerWidth;
                if (width < 768) return 2;
                if (width < 1024) return 4;
                return 6;
            }

            function updateBrandCarousel() {
                const slideWidth = 100 / getVisibleBrandSlides();
                brandCarouselTrack.style.transform = `translateX(-${brandCarouselPosition * slideWidth}%)`;
            }

            // Auto-swipe brand carousel
            setInterval(() => {
                brandCarouselPosition = (brandCarouselPosition + 1) % (maxBrandPosition + 1);
                updateBrandCarousel();
            }, 3000);

            // Feedback carousel
            const feedbackCarouselTrack = document.getElementById('feedback-carousel-track');
            const feedbackSlides = document.querySelectorAll('.feedback-carousel-slide');
            const maxFeedbackPosition = Math.max(0, feedbackSlides.length - getVisibleFeedbackSlides());

            function getVisibleFeedbackSlides() {
                const width = window.innerWidth;
                if (width < 768) return 1;
                if (width < 1024) return 2;
                return 3;
            }

            function updateFeedbackCarousel() {
                const slideWidth = 100 / getVisibleFeedbackSlides();
                feedbackCarouselTrack.style.transform = `translateX(-${feedbackCarouselPosition * slideWidth}%)`;
            }

            // Auto-swipe feedback carousel
            setInterval(() => {
                feedbackCarouselPosition = (feedbackCarouselPosition + 1) % (maxFeedbackPosition + 1);
                updateFeedbackCarousel();
            }, 4000);
        }

        // Manual carousel controls
        function moveBrandCarousel(direction) {
            const brandCarouselTrack = document.getElementById('brand-carousel-track');
            const brandSlides = document.querySelectorAll('.brand-carousel-slide');
            const maxPosition = Math.max(0, brandSlides.length - getVisibleBrandSlides());

            function getVisibleBrandSlides() {
                const width = window.innerWidth;
                if (width < 768) return 2;
                if (width < 1024) return 4;
                return 6;
            }

            brandCarouselPosition = Math.max(0, Math.min(brandCarouselPosition + direction, maxPosition));
            const slideWidth = 100 / getVisibleBrandSlides();
            brandCarouselTrack.style.transform = `translateX(-${brandCarouselPosition * slideWidth}%)`;
        }

        function moveFeedbackCarousel(direction) {
            const feedbackCarouselTrack = document.getElementById('feedback-carousel-track');
            const feedbackSlides = document.querySelectorAll('.feedback-carousel-slide');
            const maxPosition = Math.max(0, feedbackSlides.length - getVisibleFeedbackSlides());

            function getVisibleFeedbackSlides() {
                const width = window.innerWidth;
                if (width < 768) return 1;
                if (width < 1024) return 2;
                return 3;
            }

            feedbackCarouselPosition = Math.max(0, Math.min(feedbackCarouselPosition + direction, maxPosition));
            const slideWidth = 100 / getVisibleFeedbackSlides();
            feedbackCarouselTrack.style.transform = `translateX(-${feedbackCarouselPosition * slideWidth}%)`;
        }

        // Chatbot functionality
        function toggleChatbot() {
            const chatbot = document.getElementById('chatbot');
            const toggleBtn = document.getElementById('chatbot-toggle');

            chatbot.classList.toggle('minimized');

            if (chatbot.classList.contains('minimized')) {
                toggleBtn.innerHTML = '<i class="fas fa-comment"></i>';
            } else {
                toggleBtn.innerHTML = '<i class="fas fa-minus"></i>';
            }
        }

        function sendMessage() {
            const input = document.getElementById('chatbot-input');
            const message = input.value.trim();

            if (message === '') return;

            // Add user message
            addMessage(message, 'user');
            input.value = '';

            // Simulate bot response
            setTimeout(() => {
                const response = generateBotResponse(message);
                addMessage(response, 'bot');
            }, 1000);
        }

        function addMessage(message, sender) {
            const messagesContainer = document.getElementById('chatbot-messages');
            const messageElement = document.createElement('div');
            messageElement.className = `message ${sender}-message`;
            messageElement.textContent = message;
            messagesContainer.appendChild(messageElement);

            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function generateBotResponse(message) {
            // Simple keyword-based responses
            const lowerMessage = message.toLowerCase();

            if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
                return 'Hello! How can I help you with your agricultural needs today?';
            } else if (lowerMessage.includes('seed')) {
                return 'We have a wide variety of high-quality seeds available. You can browse our seed collection in the Products section.';
            } else if (lowerMessage.includes('fertilizer')) {
                return 'We offer both organic and chemical fertilizers for all types of crops. Would you like to know more about our fertilizer options?';
            } else if (lowerMessage.includes('tool')) {
                return 'We have a range of farming tools available for purchase and rent. You can check out our Tools section for more details.';
            } else if (lowerMessage.includes('rent')) {
                return 'We offer farming tools for rent at affordable prices. You can browse our rental options in the Tools Rental section.';
            } else if (lowerMessage.includes('order')) {
                return 'You can track your order by logging into your account and visiting the My Orders section. If you need further assistance, please contact our customer support.';
            } else if (lowerMessage.includes('contact')) {
                return 'You can reach us at (020) 1234-5678 or email us at info@agrishop.com. Our store is located at 123 Farm Road, Narhe, Pune.';
            } else {
                return 'Thank you for your message. For more specific assistance, please contact our customer support at info@agrishop.com or call us at (020) 1234-5678.';
            }
        }

        // WhatsApp functionality
        function openWhatsApp() {
            // In a real app, this would open WhatsApp with a pre-filled message
            showNotification('Join our WhatsApp community for farming tips and updates!', 'info');
            window.open("https://chat.whatsapp.com/IPwrXZ5xYvS3lQVBrZ0Izf?mode=wwt", '_blank');
        }

        // FAQ functionality
        function toggleFAQ(element) {
            const faqItem = element.parentElement;
            faqItem.classList.toggle('active');
        }
        // Tool rental functionality
        let selectedTool = null;

        // Open rental modal with tool details
        function openRentalModal(toolId) {
            selectedTool = rentalTools.find(t => t.id === toolId);
            if (!selectedTool) return;

            // Populate tool information
            document.getElementById('rental-tool-image').src = selectedTool.image;
            document.getElementById('rental-tool-name').textContent = selectedTool.name;
            document.getElementById('rental-tool-owner').textContent = `Owner: ${selectedTool.owner}`;
            document.getElementById('rental-tool-location').textContent = `Location: ${selectedTool.location}`;
            document.getElementById('rental-tool-price').textContent = `₹${selectedTool.price}/day`;

            // Update summary
            document.getElementById('summary-tool-name').textContent = selectedTool.name;
            document.getElementById('summary-daily-rate').textContent = `₹${selectedTool.price}`;
            updateRentalSummary();

            // Set minimum date to today
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('rental-date').setAttribute('min', today);

            // Show modal
            document.getElementById('rental-modal').classList.add('active');

            // Add event listener for duration change
            document.getElementById('rental-duration').addEventListener('change', updateRentalSummary);
        }

        // Close rental modal
        function closeRentalModal() {
            document.getElementById('rental-modal').classList.remove('active');
            document.getElementById('rental-form').reset();
            selectedTool = null;
        }

        // Update rental summary
        function updateRentalSummary() {
            if (!selectedTool) return;

            const duration = parseInt(document.getElementById('rental-duration').value);
            const dailyRate = selectedTool.price;
            const deliveryCharges = 200;
            const totalAmount = (dailyRate * duration) + deliveryCharges;

            // Update duration text
            let durationText = '';
            switch (duration) {
                case 1: durationText = '1 Day'; break;
                case 2: durationText = '2 Days'; break;
                case 3: durationText = '3 Days'; break;
                case 5: durationText = '5 Days'; break;
                case 7: durationText = '1 Week'; break;
                case 14: durationText = '2 Weeks'; break;
                case 30: durationText = '1 Month'; break;
                default: durationText = `${duration} Days`;
            }

            document.getElementById('summary-duration').textContent = durationText;
            document.getElementById('summary-total').textContent = `₹${totalAmount}`;
        }

        // Handle rental form submission
        document.getElementById('rental-form').addEventListener('submit', function (e) {
            e.preventDefault();

            if (!selectedTool) return;

            // Collect form data
            const rentalData = {
                toolId: selectedTool.id,
                toolName: selectedTool.name,
                toolOwner: selectedTool.owner,
                renterName: document.getElementById('renter-name').value,
                renterPhone: document.getElementById('renter-phone').value,
                renterEmail: document.getElementById('renter-email').value,
                rentalDate: document.getElementById('rental-date').value,
                duration: document.getElementById('rental-duration').value,
                farmSize: document.getElementById('farm-size').value,
                farmLocation: document.getElementById('farm-location').value,
                purpose: document.getElementById('rental-purpose').value,
                totalAmount: document.getElementById('summary-total').textContent
            };

            // In a real application, you would send this data to a server
            console.log('Rental Request Data:', rentalData);

            // Show success notification
            showNotification('Rental request submitted successfully! The tool owner will contact you soon.', 'success');

            // Close modal
            closeRentalModal();
        });

        // Modify the createToolRentalCard function to include the rent button
        function createToolRentalCard(tool) {
            const card = document.createElement('div');
            card.className = 'tool-rental-card';

            card.innerHTML = `
        <div class="tool-image-container">
            <img src="${tool.image}" alt="${tool.name}" class="tool-image">
        </div>
        <h3 class="font-semibold text-lg mb-2">${tool.name}</h3>
        <p class="text-gray-600 mb-3">${tool.description}</p>
        <div class="flex items-center mb-3">
            <span class="text-xl font-bold text-green-600 mr-4">₹${tool.price}/day</span>
            <div class="flex text-yellow-400">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
                <span class="text-gray-600 ml-2">(${tool.rating})</span>
            </div>
        </div>
        <div class="flex items-center mb-3">
            <i class="fas fa-map-marker-alt text-gray-500 mr-2"></i>
            <span class="text-sm text-gray-600">${tool.location}</span>
        </div>
        <div class="flex items-center mb-4">
            <i class="fas fa-user text-gray-500 mr-2"></i>
            <span class="text-sm text-gray-600">${tool.owner}</span>
        </div>
        <button onclick="openRentalModal(${tool.id})" class="w-full ${tool.available ? 'modern-button' : 'bg-gray-400 cursor-not-allowed'} text-white py-2 rounded-lg transition" ${!tool.available ? 'disabled' : ''}>
            ${tool.available ? 'Rent Now' : 'Not Available'}
        </button>
    `;

            return card;
        }
        // Function to duplicate brand slides for infinite scroll
        function setupInfiniteBrandCarousel() {
            const brandCarouselTrack = document.getElementById('brand-carousel-track');
            const brandSlides = document.querySelectorAll('.brand-carousel-slide');

            if (!brandCarouselTrack || brandSlides.length === 0) return;

            // Clone all brand slides and append them to create the infinite effect
            const originalSlides = Array.from(brandSlides);
            originalSlides.forEach(slide => {
                const clone = slide.cloneNode(true);
                brandCarouselTrack.appendChild(clone);
            });

            // Adjust the width calculation for infinite scroll
            const totalWidth = brandSlides.length * 17; // Each slide is 100% width
            brandCarouselTrack.style.width = `${totalWidth * 2}%`;
        }

        // Call this function when the page loads
        document.addEventListener('DOMContentLoaded', function () {
            setupInfiniteBrandCarousel();
        });
    