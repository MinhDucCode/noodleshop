function addNewMenuItem() {
    var id = document.getElementById('id').value.trim();
    var name = document.getElementById('name').value.trim();
    var image = document.getElementById('image').value.trim();
    var rating = parseFloat(document.getElementById('rating').value);
    var sold = parseInt(document.getElementById('sold').value);
    var price = parseInt(document.getElementById('price').value);

    if (!id || !name || !image || isNaN(rating) || isNaN(sold) || isNaN(price)) {
        alert('Vui lòng điền đầy đủ thông tin và nhập đúng định dạng cho các trường.');
        return;
    }

    var menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];

    var existingItem = menuItems.find(item => item.id === id);
    if (existingItem) {
        alert('ID này đã tồn tại. Vui lòng nhập ID khác.');
        return;
    }

    var newItem = {
        "id": id,
        "name": name,
        "image": image,
        "rating": rating,
        "sold": sold,
        "price": price
    };

    saveToLocalStorage(newItem);

    addDetailsIndex(newItem);
}

function saveToLocalStorage(item) {
    var menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];

    menuItems.push(item);

    localStorage.setItem('menuItems', JSON.stringify(menuItems));
}

function addDetailsIndex(item) {
    var productList = document.getElementById('product-list');
    var productHTML = `
        <div class="images">
            <div class="add-cart">
                <a href="chitietsanpham.html">
                    <img src="${item.image}" alt="${item.name}" />
                    <span style="display: none;">${item.name}</span><br />
                    <span style="color: #000; font-size: 16px;">Tên sản phẩm: ${item.name}</span><br />
                    <span style="color: #000; font-size: 16px;">Đánh giá: ${item.rating} <i class='bx bx-star'></i></span><br />
                    <span style="color: #000; font-size: 16px;">Đã bán: ${item.sold}</span><br />
                    <span style="color: #000; font-size: 16px;">Giá bán: </span>
                    <span style="display: none;">${item.price}</span>
                    <span style="color: #f26b2c; font-size: 17px">${item.price.toLocaleString()} đ</span>
                </a>
            </div>
            <div class="add-cart">
                <input type="submit" value="Thêm vào giỏ hàng" data-id="${item.id}" data-name="${item.name}" data-image="${item.image}" data-price="${item.price}" data-rating="${item.rating}"><br />
            </div>
        </div>
    `;
    productList.insertAdjacentHTML('beforeend', productHTML);
}
document.addEventListener('DOMContentLoaded', function () {
    var menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
    for (var i = 0; i < menuItems.length; i++) {
        addDetailsIndex(menuItems[i]);
    }
});
document.addEventListener('DOMContentLoaded', function () {
    var products = JSON.parse(localStorage.getItem('products')) || [];
    for (var i = 0; i < products.length; i++) {
        addDetailsIndex(products[i]);
    }
});
document.getElementById('addItemForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn chặn mặc định form submit

    var id = document.getElementById('id').value.trim();
    var name = document.getElementById('name').value.trim();
    var image = document.getElementById('image').value.trim();
    var rating = parseFloat(document.getElementById('rating').value);
    var sold = parseInt(document.getElementById('sold').value);
    var price = parseInt(document.getElementById('price').value);

    if (!id || !name || !image || isNaN(rating) || isNaN(sold) || isNaN(price)) {
      alert('Vui lòng điền đầy đủ thông tin và nhập đúng định dạng cho các trường.');
      return;
    }

    var newItem = {
      "id": id,
      "name": name,
      "image": image,
      "rating": rating,
      "sold": sold,
      "price": price
    };

    saveToLocalStorage(newItem);

    alert('Đã thêm sản phẩm mới thành công!');
    this.reset(); // Đặt lại form sau khi thêm sản phẩm

    // Hiển thị lại danh sách sản phẩm
    displayProducts();
  });

