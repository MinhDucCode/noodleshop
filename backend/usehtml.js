function headerNav() {
    document.write(`
    <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'>
    <header class="header">
        <div class="logo">
            <i class="bx bx-menu toggle"></i>
            <a href="index.html">
                <img src="images/logo.jpg" alt="Logo">
                <span>Noodle Shop</span>
            </a>
        </div>
        <nav class="nav">
            <div class="search-box">
                <input type="text" placeholder="Tìm kiếm...">
                <i class='bx bx-search icon'></i>
            </div>
            <i class='bx bx-microphone'></i>
        </nav>

        <nav class="navbar">
            <div class="nav-item cart">
                <a href="giohang.html"><i class='bx bx-cart icon'></i></a>
                <div class="dropdown-menu">
                    <!-- Cart items will be dynamically added here -->
                </div>
            </div>
            <div class="nav-item notifications">
                <i class="bx bx-bell"></i>
                <div class="dropdown-menu">
                    <ul>
                        <li>
                            <div class="notification-item">
                                <span class="notification-title">Đơn hàng mới</span>
                                <span class="notification-time">5 phút trước</span>
                                <p>Bạn vừa nhận được một đơn hàng mới từ khách hàng A.</p>
                            </div>
                        </li>
                        <li>
                            <div class="notification-item">
                                <span class="notification-title">Bình luận mới</span>
                                <span class="notification-time">10 phút trước</span>
                                <p>Khách hàng B đã bình luận về sản phẩm của bạn.</p>
                            </div>
                        </li>
                        <li>
                            <div class="notification-item">
                                <span class="notification-title">Cập nhật hệ thống</span>
                                <span class="notification-time">30 phút trước</span>
                                <p>Hệ thống sẽ bảo trì vào lúc 2 giờ sáng ngày mai.</p>
                            </div>
                        </li>
                        <li>
                            <div class="notification-item">
                                <span class="notification-title">Khuyến mãi mới</span>
                                <span class="notification-time">1 giờ trước</span>
                                <p>Bạn có một khuyến mãi mới cho sản phẩm XYZ.</p>
                            </div>
                        </li>
                    </ul>
                    <!-- Notifications content -->
                </div>
            </div>
            <div class="nav-item user">
                <i class='bx bx-user'></i>
                <div class="dropdown-menu">
                    <ul>
                        <li><a href="caidat.html">Tài khoản của tôi</a></li>
                        <li><a href="#">Đăng xuất</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <nav class="sidebar close">
        <div class="menu-bar">
            <div class="menu">
                <ul class="menu-links">
                    <li class="nav-link"><a href="index.html"><i class='bx bx-home-alt icon'></i><span
                                class="text nav-text">Trang Chủ</span></a></li>
                    <li class="nav-link"><a href="giohang.html"><i class='bx bx-cart icon'></i><span
                                class="text nav-text">Giỏ Hàng</span></a></li>
                    <li class="nav-link"><a href="lichsu.html"><i class='bx bx-history icon'></i><span
                                class="text nav-text">Lịch Sử</span></a></li>
                    <!--<li class="nav-link"><a href="naptien.html"><i class='bx bx-money-withdraw icon'></i><span
                                class="text nav-text">Nạp Tiền</span></a></li>
                    <li class="nav-link"><a href="gioithieu.html"><i class='bx bx-pie-chart-alt icon'></i><span
                                class="text nav-text">Giới Thiệu</span></a></li>-->
                    <li class="nav-link"><a href="gopy.html"><i class='bx bx-heart icon'></i><span
                                class="text nav-text">Góp Ý</span></a></li>
                    <li class="nav-link"><a href="caidat.html"><i class='bx bx-cog icon'></i><span
                                class="text nav-text">Cài Đặt</span></a></li>
                </ul>
            </div>
            <div class="bottom-content">
                <li><a href="loginRegister.html"><i class='bx bx-log-in icon'></i><span class="text nav-text" style="font-size: 16px; margin-left: -8px;">Đăng nhập/Đăng ký</span></a></li>
                <!--<li class="mode">
                    <div class="sun-moon"><i class='bx bx-moon icon moon'></i><i class='bx bx-sun icon sun'></i></div>
                    <span class="mode-text text">Chế độ tối</span>
                    <div class="toggle-switch"><span class="switch"></span></div>
                </li>-->
            </div>
        </div>
    </nav>
  `)
}

function addCart() {
    document.write(`
    <div class="add-cart">
        <input type="submit" value="+" onclick="addCartHang()"><br />
        <span>Thêm vào giỏ</span>
    </div>
  `)
}