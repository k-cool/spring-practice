console.log("product.js loaded");

// entry
const productList = document.getElementById("product-list");
const addBtn = document.getElementById("add-btn");
const deleteBtn = document.getElementById("delete-btn");
const deleteInput = document.getElementById("delete-input");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const modal = document.getElementById("myModal");
const updateBtn = document.getElementById("update-btn");
const updateSelect = document.getElementById("update-select");
loadProducts();

addBtn.addEventListener("click", addProduct);

deleteBtn.addEventListener("click", () => {
    deleteProduct(deleteInput.value);
    deleteInput.value = "";
});

openModalBtn.addEventListener("click", () => {
    modal.showModal();
});

closeModalBtn.addEventListener("click", () => {
    modal.close();
});

updateBtn.addEventListener("click", () => {
    updateProduct(updateSelect.value);
})


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

                const no = item.querySelector(".no");
                const name = item.querySelector(".name");
                const price = item.querySelector(".price");

                no.innerText = product.p_no;
                name.innerText = product.p_name;
                price.innerText = product.p_price;
                no.dataset.no = product.p_no;
                no.dataset.name = product.p_name;
                no.dataset.price = product.p_price;

                item.classList.remove("temp");

                item.lastElementChild.addEventListener("click", (e) => {
                    console.log("clicked", product.p_no);

                    deleteProduct(product.p_no);
                })

                productList.appendChild(item);
            });

        }).then(() => {


        const openModalNo = document.querySelectorAll(".no");

        openModalNo.forEach(noEl => {

            noEl.addEventListener("click", (e) => {
                document.querySelector(".modal-no").innerText = e.target.dataset.no;
                document.querySelector(".modal-name").innerText = e.target.dataset.name;
                document.querySelector(".modal-price").innerText = e.target.dataset.price;
                modal.showModal();
            });

        });

        const selectEl = document.querySelector("select[name='p_no']");

        let optionEl = "";

        openModalNo.forEach(noEl => {
            let no = noEl.innerText;
            optionEl += `<option value='${no}'>No. ${no}</option>`;
        });

        selectEl.innerHTML = optionEl;


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

function updateProduct(pk) {
    const nameInput = document.getElementById("update-name");
    const priceInput = document.getElementById("update-price");

    const obj = {
        p_no: pk,
        p_name: nameInput.value.trim(),
        p_price: priceInput.value.trim()
    };

    fetch(`/api/product/${pk}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    })
        .then(() => {
            loadProducts();
            nameInput.value = "";
            priceInput.value = "";
        })
        .catch(console.error);
}