console.log("product.js loaded");

// entry

const productList = document.getElementById("product-list");
const addBtn = document.getElementById("add-btn");

loadProducts();

addBtn.addEventListener("click", addProduct);


function loadProducts() {

    fetch("/api/product/all", {
        method: "GET",
    })
        .then(response => response.json())
        .then(products => {
            console.log(products);

            productList.innerHTML = "";


            products.forEach(product => {
                const item = document.querySelector(".item.temp").cloneNode(true);

                item.querySelector(".no").innerText = product.p_no;
                item.querySelector(".name").innerText = product.p_name;
                item.querySelector(".price").innerText = product.p_price;
                item.classList.remove("temp");

                item.lastElementChild.addEventListener("click", (e) => {
                    console.log("clicked", product.p_no);

                    deleteProduct(product.p_no);
                })

                productList.appendChild(item);
            });

        })
        .catch(console.err);

}

function addProduct() {
    const p_name = document.getElementById("name-input").value.trim();
    const p_price = document.getElementById("price-input").value.trim();
    const body = {p_name, p_price};

    fetch("/api/product", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
        .then(() => {
            loadProducts();
        })
        .catch(console.error);

}


function deleteProduct(pk) {

    fetch(`/api/product/${pk}`, {
        method: "DELETE",
    })
        .then(() => {

            loadProducts();
            // productList.removeChild();
        })
        .catch(console.error);

}