// get catetogy list
fetch ('https://dummyjson.com/products/category-list') 
    .then (response => response.json())
    .then (listCategorise => {
        var htmls = listCategorise.map(category => {
            return `
                <div class="col-100div8">
                    <div class="header__option" id="option-${category}">
                        ${category}
                    </div>
                </div>
            `;
        }, '');

        document.querySelector('#headerNav .row').innerHTML = htmls.join('');
    });

// get products
function renderProducts (link) {
    fetch (link)
    .then (response => response.json())
    .then (myProducts => {
        var htmls = myProducts.products.map(product => {
            return `
                <div class="col-100div6">
                    <div class="main__product">
                        <img src="${product.images}" alt="The image of ${product.title}" class="main__img">
                        <h4 class="main__name">${product.title}</h4>
                        <div class="main__desc">
                            <p class="main__price">${product.price}$</p>
                            <p class="main__amount">Số lượng còn lại: ${product.stock}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        htmls = htmls.join('');
        if (htmls.includes('img') == false) {
            document.querySelector('#mainProducts .row').innerHTML = '<h2 style="text-align: center;width: 100%;font-size: 2.6rem;margin-top: 6px;margin-bottom: 6px;">---------- Không tìm thấy sản phẩm ----------</h2>';
        }
        else {
            document.querySelector('#mainProducts .row').innerHTML = htmls;
        }
        // document.querySelector('#mainProducts .row').innerHTML = htmls;
    });
}
renderProducts('https://dummyjson.com/products?limit=15');

var numberPages = document.querySelectorAll('div[class*="footer"]');
[...numberPages].forEach((page) => {
    page.addEventListener("click", () => {
        renderProducts(`https://dummyjson.com/products?limit=15&skip=${(page.innerHTML - 1) * 15}`);
    });
});

//get product by selection!

setTimeout(() => {
    var selectionProducts = document.querySelectorAll('div[id*="option-"]');
    
    [...selectionProducts].forEach(selectionProduct => {
        selectionProduct.addEventListener('click', () => {
            console.log(selectionProduct.id);
            renderProducts(`https://dummyjson.com/products/category/${selectionProduct.id.replace('option-', '')}`);
        });
    });

}, 1000);

var searchInput = document.querySelector('#search');
searchInput.addEventListener('input', () => {
    var buttonSearch = document.querySelector('#btnSearch');
    buttonSearch.addEventListener('click', () => {
        renderProducts(`https://dummyjson.com/products/search?q=${searchInput.value}`);

    });
});

var asc = document.querySelector('#asc');
var desc = document.querySelector('#desc');
var sort = document.querySelector('#sortBtn');
var order = document.querySelector('#sort');

sort.addEventListener("click", () => {
    console.log(order.value);
    if (asc.checked) {
        renderProducts(`https://dummyjson.com/products?sortBy=${order.value}&order=asc`);
    }
    else if (desc.checked) {
        renderProducts(`https://dummyjson.com/products?sortBy=${order.value}&order=desc`);
    }
});