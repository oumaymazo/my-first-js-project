function ajout() {
  var name = document.getElementById("productName").value;
  console.log("le nom est=", name);

  var z = verifName(name);

  if (!z) {
    document.getElementById("nameMsg").innerHTML = "verify the name";
  } else {
    document.getElementById("nameMsg").innerHTML = " ";
  }

  var code = document.getElementById("code").value;

  var y = verif(code);
  if (!y) {
    document.getElementById("codeMsg").innerHTML = "verify your code";
  } else {
    document.getElementById("codeMsg").innerHTML = " ";
  }

  var prix = document.getElementById("prix").value;
  console.log(prix);

  var x = prixPositif(prix);
  if (!x) {
    document.getElementById("prixMsg").innerHTML = "price must be positif";
  } else {
    document.getElementById("prixMsg").innerHTML = " ";
  }
  var stock = document.getElementById("stock").value;
  var w = verifStock(stock);
  if (!w) {
    document.getElementById("stockMsg").innerHTML = "verify your stock value";
  } else {
    document.getElementById("stockMsg").innerHTML = " ";
  }

  var categorie = document.getElementById("categorie").value;
  var idL = localStorage.getItem("idL") || "1";
  var produit = {
    id: Number(idL),
    nameJ: name,
    prixJ: prix,
    codej: code,
    stockJ: stock,
    categorieJ: categorie,
  };
  if (x && y && z && w) {
    var T = JSON.parse(localStorage.getItem("produit") || "[]");
    T.push(produit);
    localStorage.setItem("produit", JSON.stringify(T));
    localStorage.setItem("idL", Number(idL) + 1);
  }
}

function prixPositif(N) {
  return N > 0;
}
function verif(ch) {
  console.log(ch);

  return ch[0] == "#";
}
function verifName(ch) {
  return ch.length > 5;
}
function verifStock(s) {
  return s >= 10;
}
function displayProducts() {
  var T = JSON.parse(localStorage.getItem("produit") || "[]");

  var render = `
  <table class="table table-striped">
  <thead>
  <tr>
    <th scope="col">Id</th>
    <th scope="col">Code</th>
    <th scope="col">Name</th>
    <th scope="col">prix</th>
    <th scope="col">stock</th>
    <th scope="col">catgory</th>
    
    
  </tr>
</thead>
<tbody>`;
  for (var i = 0; i < T.length; i++) {
    render += `<tr>
  <th scope="row">${T[i].id}</th>
  <td>${T[i].codej}</td>
  <td>${T[i].nameJ}</td>
  <td>${T[i].prixJ}</td>
  <td>${T[i].stockJ}</td>
  <td>${T[i].categorieJ}</td>
  <td><button type="button" class="btn btn-danger"onclick=displayProduct(${T[i].id})>Display</button>
  <button type="button" class="btn btn-warning" onclick=editProduct(${T[i].id})>Edit</button>
  <button type="button" class="btn btn-info" onclick=deleteProduct(${T[i].id})>Delete</button></td>
  
  </tr>`;
  }
  render += `</tbody>
</table>`;
  document.getElementById("productsTable").innerHTML = render;
}
function deleteProduct(id) {
  var T = JSON.parse(localStorage.getItem("produit") || "[]");
  var index = searchById(id);
  T.splice(index, 1);
  localStorage.setItem("produit", JSON.stringify(T));
  location.reload();
}
function searchById(id) {
  var T = JSON.parse(localStorage.getItem("produit") || "[]");
  var index;
  for (var i = 0; i < T.length; i++) {
    if (T[i].id == id) {
      index = i;
    }
  }
  return index;
}
function editProduct(id) {
  var product = searchProductById(id);
  var render = `
        <div class="form-row">
            <div class="form-group col-md-6">
                <label>Product Name</label>
                <input type="text" class="form-control" id="productNameEdit" value=${product.nameJ} >
            </div>
            <div class="form-group col-md-6">
                <label>Product Price</label>
                <input type="text" class="form-control" id="productPriceEdit" value=${product.prixJ} >
            </div>
            <div class="form-group col-md-6">
                <label>Stock</label>
                <input type="number" class="form-control" id="productStockEdit" value=${product.stockJ} >
            </div>
            <div class="center">
              <button type="submit" class="btn btn-primary" onclick=validateEdit(${product.id})>Edit Product</button>
            </div>
        </div>
  `;
  document.getElementById("editProductDiv").innerHTML = render;
}
function searchProductById(id) {
  var T = JSON.parse(localStorage.getItem("produit") || "[]");
  var product;
  for (var i = 0; i < T.length; i++) {
    if (T[i].id == id) {
      product = T[i];
    }
  }
  return product;
}
function validateEdit(id) {
  var newName = document.getElementById("productNameEdit").value;
  var newStock = document.getElementById("productStockEdit").value;
  var newPrice = document.getElementById("productPriceEdit").value;
  var product = searchProductById(id);
  var newPr = {
    id: product.id,
    nameJ: newName,
    prixJ: newPrice,
    codej: product.codej,
    stockJ: newStock,
    categorieJ: product.categorieJ,
  };
  var allProducts = JSON.parse(localStorage.getItem("produit"));
  var index = searchById(id);
  allProducts.splice(index, 1);
  allProducts.splice(index, 0, newPr);
  localStorage.setItem("produit", JSON.stringify(allProducts));
  location.reload();
}
function displayProduct(id) {
  var product = searchProductById(id);
  localStorage.setItem("searchedPr", JSON.stringify(product));
  location.replace("displayProduct.html");
}
function productInfo() {
  var T = JSON.parse(localStorage.getItem("produit") || "[]");
  var render = `<div class="container">
  <div class="row" >
  
  `;

  for (var i = 0; i < T.length; i++) {
    render += ` 
    
<div class="col-lg-4 margin" >
    <div class="card" style="width: 18rem;" >
    <img src="panier.jpg" class="card-img-top" alt="...">
    <div class="card-body">
    <p class="card-text">${T[i].nameJ}</p>
    <p class="card-text">Price: ${T[i].prixJ} TND</p>
    <p class="card-text">Stock: ${T[i].stockJ} pieces</p>
    <div class="btn-group" role="group" aria-label="Basic example">
    <a href="displayProduct.html" class="btn btn-primary">View</a>
    <a href="#" class="btn btn-success">Reserve</a>
    </div>
    </div>
    </div>
    </div>
    `;
  }
  render += `</div>
  </div>
`;
  document.getElementById("productInfoDiv").innerHTML = render;
}
