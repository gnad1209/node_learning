function menu({
  TrangChu = "",
  GioiThieu = "",
  SanPham = "",
  Blog = "",
  LienHe = "",
}) {
  const main = document.getElementById("menu");
  if (main) {
    const menu = document.createElement("div");
    menu.onclick = function (e) {
      if (e.target.closest(".menu__close") || e.target.closest(".menu")) {
        main.removeChild(menu);
        clearTimeout(autoremove);
      }
    };
    menu.classList.add("menu");
    menu.style.animation = `slideInleft ease .5s`;
    menu.innerHTML = `
    <div class="menu">
                <div class="menu_main">
                    <div class="menu_narbar">
                        <ul>
                            <li><a class="text_narbar" href="/">${TrangChu}</a></li>
                            <li><a class="text_narbar" href="/recommend">${GioiThieu}</a></li>
                            <li><a class="text_narbar" href="/products">${SanPham}</a></li>
                            <li><a class="text_narbar" href="#">${Blog}</a></li>
                            <li><a class="text_narbar" href="#">${LienHe}</a></li>
                        </ul>
                    </div>
                </div>
                <i class="fa-solid fa-x menu__close"></i>
            </div>
    `;
    main.appendChild(menu);
  }
}
var cart_frame = document.getElementById("cart_frame");
var cart = document.getElementById("test");

ShowCart = function () {
    cart_frame.classList.add("Cart_frame1");
    cart.classList.add("testcart1");
};

//function Cart({ }) {
//    const main = document.getElementById("menu");
//    if (main) {
//        const menu = document.createElement("div");
//        menu.onclick = function (e) {
//            if (e.target.closest(".menu")) {
//                main.removeChild(menu);
//                clearTimeout(autoremove);
//            }
//        };
//        menu.classList.add("menu");
//        menu.style.animation = `slideInTop ease .6s`;
//        menu.innerHTML = `
//    <div class="MainCart">

//    </div>
//    `;
//        main.appendChild(menu);
//    }
//}

var counter = 1;
setInterval(() => {
  document.getElementById("radio" + counter).checked = true;
  counter++;
  if (counter > 3) {
    counter = 1;
  }
}, 5000);

var index = 1;
slider_left = function () {
  if (index < 2) {
    index = 4;
  }
  index--;
  document.getElementById("radioSP" + index).checked = true;
};
slider_right = function () {
  if (index > 2) {
    index = 0;
  }
  index++;
  document.getElementById("radioSP" + index).checked = true;
};
