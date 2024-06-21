document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector(".bx-menu");
    const sidebar = document.querySelector(".sidebar");

    // Check and apply sidebar state from localStorage
    if (localStorage.getItem('sidebarClosed') === 'true') {
        sidebar.classList.add('close');
    } else {
        sidebar.classList.remove('close');
    }

    adjustImageContainer();

    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("close");
        localStorage.setItem('sidebarClosed', sidebar.classList.contains('close') ? 'true' : 'false');
        adjustImageContainer();
    });

    function adjustImageContainer() {
        const images = document.querySelectorAll('.home .all-images .images');
        images.forEach(image => {
            if (sidebar.classList.contains('close')) {
                image.style.width = 'calc(25% - 20px)';
            } else {
                image.style.width = 'calc(33.33% - 20px)';
            }
        });
    }

    function checkWindowSize() {
        const sidebarWidth = sidebar.classList.contains('close') ? 88 : 250;
        const availableWidth = window.innerWidth - sidebarWidth;
        const imageWidth = 390;

        if (availableWidth < imageWidth * 3) {
            sidebar.classList.add('close');
        } else {
            sidebar.classList.remove('close');
        }
        adjustImageContainer();
    }

    window.addEventListener('resize', checkWindowSize);
    checkWindowSize();

    const cartDropdown = document.querySelector('.cart .dropdown-menu');
    let savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    function updateCartDropdown() {
        cartDropdown.innerHTML = '';
        if (savedCartItems.length === 0) {
            cartDropdown.innerHTML = '<div class="cart-item">Giỏ hàng trống</div>';
        } else {
            cartDropdown.innerHTML = '<button><a href="giohang.html">Xem Giỏ Hàng</a></button>'
            savedCartItems.forEach(item => {
                const productHTML = `
                    <div class="cart-item">
                        <span><a href="chitietsanpham.html">${item.name}</a></span>
                        <span>${item.rating.toLocaleString()} đ</span>
                        <!--<span>Số lượng: ${item.count}</span>-->
                    </div>
                `;
                cartDropdown.insertAdjacentHTML('beforeend', productHTML);
            });
        }
    }

    updateCartDropdown();

    document.addEventListener('click', function (event) {
        if (event.target.matches('.add-cart input[type="submit"]')) {
            event.preventDefault();
            const button = event.target;
            const productId = button.getAttribute('data-id');
            const existingItem = savedCartItems.find(item => item.id === productId);

            if (existingItem) {
                existingItem.count++;
            } else {
                const productContainer = button.closest('.images');
                const imgElement = productContainer.querySelector('img');
                const productName = productContainer.querySelector('span:nth-of-type(1)').textContent;
                const productRating = productContainer.querySelector('span:nth-of-type(6)').textContent;
                const srcValue = imgElement.src;

                const newItem = {
                    id: productId,
                    purchaseTime: new Date().toLocaleString(),
                    name: productName,
                    image: srcValue,
                    rating: parseFloat(productRating),
                    count: 1
                };

                savedCartItems.push(newItem);
            }

            localStorage.setItem('cartItems', JSON.stringify(savedCartItems));
            updateCartDropdown();
        }
    });

    fetch('backend/products.json')
        .then(response => response.json())
        .then(products => {

            localStorage.setItem('products', JSON.stringify(products));
            var products = JSON.parse(localStorage.getItem('products')) || [];

            const idProducts = products.map(product => product.id);
            localStorage.setItem('idProducts', JSON.stringify(idProducts));

        }
    );
    const cartTable = document.getElementById('cart-table');
    const tbody = cartTable.querySelector('tbody');
    const clearCartBtn = document.getElementById('clear-cart-btn');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutAllBtn = document.getElementById('checkout-all-btn');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];

    function populateCart() {
        tbody.innerHTML = '';
        cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartItems.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = '<td colspan="7">Giỏ hàng trống. Vui lòng thêm sản phẩm vào giỏ hàng</td>';
            tbody.appendChild(tr);
        } else {
            cartItems.forEach((item, index) => {
                const tr = document.createElement('tr');
                const totalPrice = parseFloat(item.rating);
                tr.innerHTML = `
                    <td><input type="checkbox" class="checkout-checkbox" data-index="${index}"></td>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td><img src="${item.image}" style="width: 50px;"></td>
                    <td>${item.count}</td>
                    <td>${(totalPrice * item.count).toLocaleString()} đ</td>
                    <td><button class="delete-btn" data-index="${index}"><i class='bx bx-trash'></i></button></td>
                `;
                tbody.appendChild(tr);
                console.log((totalPrice));

            });
        }
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.getAttribute('data-index'));
                cartItems.splice(index, 1);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                populateCart();
                updateCartDropdown();
            });
        });

        const checkoutCheckboxes = document.querySelectorAll('.checkout-checkbox');
        checkoutCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const index = parseInt(checkbox.getAttribute('data-index'));
                cartItems[index].checked = checkbox.checked;
            });
        });
    }

    populateCart();

    clearCartBtn.addEventListener('click', () => {
        cartItems = [];
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        populateCart();
        updateCartDropdown();
    });

    checkoutBtn.addEventListener('click', () => {
        const itemsToCheckout = cartItems.filter(item => item.checked);
        if (itemsToCheckout.length > 0) {
            alert('Thanh toán thành công!');
            purchaseHistory = purchaseHistory.concat(itemsToCheckout);
            cartItems = cartItems.filter(item => !item.checked);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
            populateCart();
            updateCartDropdown();
        } else {
            alert('Vui lòng chọn ít nhất một sản phẩm để thanh toán.');
        }
    });

    checkoutAllBtn.addEventListener('click', () => {
        if (cartItems.length > 0) {
            alert('Thanh toán toàn bộ sản phẩm thành công!');
            purchaseHistory = purchaseHistory.concat(cartItems);
            cartItems = [];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
            populateCart();
            updateCartDropdown();
        } else {
            alert('Không có sản phẩm trong giỏ hàng để thanh toán.');
        }
    });

    populatePurchaseHistory();
});
document.addEventListener('DOMContentLoaded', function () {
    function populatePurchaseHistory() {
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = '';
        const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
        purchaseHistory.forEach((item, index) => {

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.purchaseTime}</td>
                <td>${item.name}</td>
                <td><img src="${item.image}" alt="${item.name}" style="width: 50px;"></td>
                <td>${(item.rating * item.count).toLocaleString()} đ</td>
                <td>${item.count}</td>
            `;
            historyList.appendChild(tr);
        });
        if (purchaseHistory.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = '<td colspan="6">Chưa có sản phẩm nào được mua.</td>';
            historyList.appendChild(tr);
        }
    }
    populatePurchaseHistory();
});
