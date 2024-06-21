const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const storedUser = localStorage.getItem(username);

  if (storedUser) {
    const user = JSON.parse(storedUser);

    if (user.password === password) {
      alert('Đăng nhập thành công!');
      window.location.href = 'index.html';
    } else {
      alert('Sai mật khẩu!');
    }
  } else {
    alert('Người dùng không tồn tại!');
    container.classList.add("sign-up-mode");
  }
});

document.getElementById('signup-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  if (localStorage.getItem(username)) {
    alert('Tên đăng nhập đã tồn tại!');
    container.classList.remove("sign-up-mode");
  } else {
    const user = {
      username: username,
      email: email,
      password: password
    };

    localStorage.setItem(username, JSON.stringify(user));
    alert('Đăng ký thành công!');
    container.classList.remove("sign-up-mode");
  }
});

const userDropdown = document.getElementById('user-dropdown');
const loginMessage = document.getElementById('login-message');

function isLoggedIn() {
  return localStorage.getItem('currentUser') !== null;
}

function updateUserDropdown(username) {
  userDropdown.innerHTML = `
      <ul>
        <li><a>Tài khoản của ${username}</a></li>
        <li><a id="logout-btn">Đăng xuất</a></li>
      </ul>
    `;
  document.getElementById('logout-btn').addEventListener('click', handleLogout);
}

function handleLogout(e) {
  e.preventDefault();
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}

if (!isLoggedIn()) {
  loginMessage.style.display = 'block';
  window.location.href = 'login.html';
} else {
  const currentUser = localStorage.getItem('currentUser');
  updateUserDropdown(currentUser);
  loginMessage.style.display = 'none';
}

document.getElementById('navbar-logout').addEventListener('click', handleLogout);
document.getElementById('sidebar-logout').addEventListener('click', handleLogout);




function openTab(evt, tabId) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    tabcontent[i].classList.remove("active");
  }

  tablinks = document.getElementsByClassName("tab-link");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  document.getElementById(tabId).style.display = "block";
  document.getElementById(tabId).classList.add("active");
  evt.currentTarget.classList.add("active");
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".tab-link.active").click();
});

document.addEventListener('DOMContentLoaded', function () {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      const productId = button.getAttribute('data-id');
      const productName = button.getAttribute('data-name');
      const productImage = button.getAttribute('data-image');
      const productPrice = parseFloat(button.getAttribute('data-price'));
      const productRating = parseFloat(button.getAttribute('data-rating'));
      const quantityInput = button.parentElement.querySelector('.product-quantity');
      const quantity = parseInt(quantityInput.value);

      if (isNaN(quantity) || quantity <= 0) {
        alert('Vui lòng nhập số lượng hợp lệ.');
        return;
      }
      const newItem = {
        id: productId,
        name: productName,
        image: productImage,
        price: productPrice,
        rating: productRating,
        count: quantity
      };
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const existingItem = cartItems.find(item => item.id === productId);
      if (existingItem) {
        existingItem.count += quantity;
      } else {
        cartItems.push(newItem);
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      updateCartCount(cartItems.length);
    });
  });

  function updateCartCount(count) {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = count.toString();
    }
  }

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
    var idProducts = JSON.parse(localStorage.getItem('products')) || [];

    var existingItem = menuItems.find(item => item.id.toLowerCase() === id.toLowerCase());
    var existingProduct = idProducts.find(product => product.id.toLowerCase() === id.toLowerCase());

    if (existingItem || existingProduct) {
      alert('ID này đã tồn tại. Vui lòng nhập ID khác.');
      return;
    }

    var newItem = {
      id: id,
      name: name,
      image: image,
      rating: rating,
      sold: sold,
      price: price
    };

    menuItems.push(newItem);
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    alert('Đã thêm món ăn mới thành công!');
    addDetailsIndex(newItem);
  }

  function addDetailsIndex(item) {
    var productList = document.getElementById('product-list');
    var productHTML = `
          <div class="images">
              <div class="add-cart">
                  <a href="chitietsanpham.html">
                      <img src="${item.image}" alt="${item.name}" />
                      <span>${item.name}</span><br />
                      <span>Đánh giá: ${item.rating} <i class='bx bx-star'></i></span><br />
                      <span>Đã bán ${item.sold}</span><br />
                      <span>${item.price}</span>
                  </a>
              </div>
              <div class="add-cart">
                  <input type="submit" value="Thêm vào giỏ hàng" data-id="${item.id}" data-name="${item.name}" data-image="${item.image}" data-price="${item.price}" data-rating="${item.rating}"><br />
              </div>
          </div>
      `;
    productList.insertAdjacentHTML('beforeend', productHTML);
  }
  document.getElementById('addItemForm').addEventListener('submit', function (event) {
    event.preventDefault();
    addNewMenuItem();
    this.reset();
  });
  document.addEventListener('DOMContentLoaded', function () {
    var menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
    menuItems.forEach(item => {
      addDetailsIndex(item);
    });
  });
});
