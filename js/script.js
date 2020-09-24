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
  var index = searchById(id, T);
  T.splice(index, 1);
  localStorage.setItem("produit", JSON.stringify(T));
  location.reload();
}
function searchById(id, T) {
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
function searchUserById(id) {
  var T = JSON.parse(localStorage.getItem("userJ") || "[]");
  var user;
  for (var i = 0; i < T.length; i++) {
    if (T[i].id == id) {
      user = T[i];
    }
  }
  return user;
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
  var index = searchById(id, allProducts);
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
    var pr = T[i];
    render += ` 
    
<div class="col-lg-4 margin" >
    <div class="card" style="width: 18rem;" >
    <img src="panier.jpg" class="card-img-top" alt="...">
    <div class="card-body">
    <p class="card-text">${pr.nameJ}</p>
    <p class="card-text">Price: ${pr.prixJ} TND</p>
    <p class="card-text">Stock: ${pr.stockJ} pieces</p>

    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal" onclick="displayModal(${pr.id})">Reserve</button>
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

function signUp() {
  var name = document.getElementById("name").value;
  var x = verifLength(name, 3);
  if (!x) {
    document.getElementById("nameMsg").innerHTML =
      "First name must have at least 3 charachters";
  } else {
    document.getElementById("nameMsg").innerHTML = "";
  }

  var lastName = document.getElementById("lastName").value;
  var y = verifLength(lastName, 3);
  if (!y) {
    document.getElementById("lastNameMsg").innerHTML =
      "Last name must have at least 3 charachters";
  } else {
    document.getElementById("lastNameMsg").innerHTML = "";
  }

  var email = document.getElementById("emailSignup").value;
  var a = verifEmail(email);
  if (a) {
    document.getElementById("emailMsg").innerHTML = "email exist";
  }

  var password = document.getElementById("pswdSignup").value;
  var confirmPsw = document.getElementById("confirmPsw").value;
  var z = verifLength(password, 9);
  var w = compare(password, confirmPsw);

  if (!z) {
    document.getElementById("passwordMsg").innerHTML =
      "password must have at least 8 caracters";
  } else {
    document.getElementById("passwordMsg").innerHTML = "";
  }
  if (!w) {
    document.getElementById("confirmPswMsg").innerHTML =
      "password does not much";
  } else {
    document.getElementById("confirmPswMsg").innerHTML = "";
  }

  var tel = document.getElementById("tel").value;
  var k = verifNumber(tel);
  if (k) {
    document.getElementById("telMsg").innerHTML = "Telephone number not valid";
  } else {
    document.getElementById("telMsg").innerHTML = "";
  }
  var userType = document.getElementById("userType").value;
  var idU = localStorage.getItem("idU") || "1";
  var user = {
    id: Number(idU),
    fName: name,
    lName: lastName,
    email: email,
    pwd: password,
    confirmPsw: confirmPsw,
    tel: tel,
    userType: userType,
  };
  if (x && y && z && w && !k && !a) {
    var T = JSON.parse(localStorage.getItem("userJ") || "[]");
    T.push(user);
    localStorage.setItem("userJ", JSON.stringify(T));
    localStorage.setItem("idU", Number(idU) + 1);
  }
}
function compare(ch1, ch2) {
  return ch2 == ch1;
}

function verifLength(ch, n) {
  return ch.length > n;
}
function verifNumber(ch) {
  return isNaN(ch);
}

// if (x && y && z && !w) {
//     alert('tout va bien');
// }
// else{
//     alert('erreur');
// }

function verifEmail(email) {
  var users = JSON.parse(localStorage.getItem("userJ") || "[]");
  var i = 0;
  while (i < users.length && users[i].email != email) {
    i++;
  }
  if (i == users.length) {
    return false;
  } else {
    return users[i].email == email;
    // or return true ;
  }
}

//script of login.html
function login() {
  var email = document.getElementById("email").value;
  var pwd = document.getElementById("psw").value;
  var i = 0;
  var T = JSON.parse(localStorage.getItem("userJ") || "[]");

  while (i < T.length && (T[i].email != email || T[i].pwd != pwd)) {
    i++;
  }
  if (i == T.length) {
    return null;
  } else {
    if (T[i].userType == "0") {
      location.replace("productList.html");
      localStorage.setItem("connectedUser", JSON.stringify(T[i]));
    } else {
      location.replace("productInfo.html");
      localStorage.setItem("connectedUser", JSON.stringify(T[i]));
    }
    return T[i];
  }
}
//gestion utilisateur
function gestion() {
  var T = JSON.parse(localStorage.getItem("userJ") || "[]");
  render = `<table class="table">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">First name</th>
      <th scope="col">Last name</th>
      <th scope="col">Email</th>
      <th scope="col">Password</th>
      <th scope="col">Telephon number</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody></tbody>`;
  for (var i = 0; i < T.length; i++) {
    render += `<tr>
    <th scope="row">${T[i].id}</th>
    <td>${T[i].fName}</td>
    <td>${T[i].lName}</td>
    <td>${T[i].email}</td>
    <td>${T[i].pwd}</td>
    <td>${T[i].tel}</td>
    <td><a href="displayUser.html" class="btn btn-secondary btn-lg active" role="button" aria-pressed="true" onclick=displayUser(${T[i].id})>Display</a>
    <button type="button" class="btn btn-warning" onclick=editU(${T[i].id})>Edit</button>
      <button type="button" class="btn btn-info"onclick=deleteU(${T[i].id})>Delete</button></td>
  </tr>`;
  }
  render += `</tbody>
  </table>`;
  document.getElementById("gestionId").innerHTML = render;
}
function deleteU(id) {
  var T = JSON.parse(localStorage.getItem("userJ") || "[]");
  var index = researchIndexId(id);
  T.splice(index, 1);
  localStorage.setItem("userJ", JSON.stringify(T));
  location.reload();
}
function researchIndexId(id) {
  var T = JSON.parse(localStorage.getItem("userJ") || "[]");
  var index;
  for (var i = 0; i < T.length; i++) {
    if (T[i].id == id) {
      index = i;
    }
    return index;
  }
}
function editU(id) {
  var user = searchUserById(id);
  var render = `<form>
  <div class="form-group">
    <label>Email</label>
    <input type="email" class="form-control" id="emailId" aria-describedby="emailHelp" value=${user.email}>
  </div>
  <div class="form-group">
    <label>Password</label>
    <input type="password" class="form-control" id="pwdId" value=${user.pwd}>
  </div>
  
  <button type="submit" class="btn btn-primary" onclick=submitEdit(${user.id})>Submit</button>
</form>`;
  document.getElementById("editUser").innerHTML = render;
}
function submitEdit(id) {
  var nvEmail = document.getElementById("emailId").value;
  var nvPwd = document.getElementById("pwdId").value;
  var user = searchUserById(id);
  var userNew = {
    id: user.id,
    fName: user.fName,
    lName: user.lName,
    email: nvEmail,
    pwd: nvPwd,
    confirmPsw: user.confirmPsw,
    tel: user.tel,
  };
  var T = JSON.parse(localStorage.getItem("userJ") || "[]");
  var index = researchIndexId(id);
  T.splice(index, 1);
  T.splice(index, 0, userNew);
  localStorage.setItem("userJ", JSON.stringify(T));
  location.reload();
}
function displayUser(id) {
  var user = searchUserById(id);
  console.log("displayUser -> user", user);

  var render = `
   
  <p> Name: ${user.fName}</p> 
  <p> Email: ${user.lName}</p> 
  <p> tel: ${user.tel}</p> 
  
  `;
  console.log("displayUser -> render", render);
  console.log(
    "displayUser -> innerhtml",
    document.getElementById("displayId").innerHTML
  );

  document.getElementById("dispUserId").innerHTML = render;
}
//gestion pc
function characteristic() {
  var name = document.getElementById("namePc").value;
  var x = verifLength(name, 2);
  if (!x) {
    document.getElementById("namePcMsg").innerHTML =
      "name must have at least 2 caracters";
  }
  var ram = document.getElementById("ramPc").value;
  var y = verifNumber(ram);
  if (y) {
    document.getElementById("ramPcMsg").innerHTML = "ram must be a number";
  }
  var rom = document.getElementById("romPc").value;
  var z = verifNumber(rom);
  if (z) {
    document.getElementById("romPcMsg").innerHTML = "rom must be a number";
  }
  var ecran = document.getElementById("ecranPc").value;
  var w = verifNumber(ecran);
  if (w) {
    document.getElementById("ecranPcMsg").innerHTML =
      "screen dimensions must be a number";
  }
  var price = document.getElementById("prixPc").value;
  var t = verifNumber(price);
  if (t) {
    document.getElementById("pricePcMsg").innerHTML = "price must be a number";
  }
  var idP = localStorage.getItem("idP") || "1";
  var pc = {
    id: Number(idP),
    nameP: name,
    ramP: ram,
    romP: rom,
    ecranP: ecran,
    priceP: price,
  };
  if (x && !y && !z && !w && !t) {
    var T = JSON.parse(localStorage.getItem("pc") || "[]");
    T.push(pc);
    localStorage.setItem("pc", JSON.stringify(T));
    localStorage.setItem("idP", Number(idP) + 1);
  }
}
function Rname() {
  var name = document.getElementById("nameR").value;
  var x = verifNameExist(name);
  if (!x) {
    document.getElementById("nameRMsg").innerHTML =
      "name does not exist try again";
  }
  var pc = researchByName(name);
  var render = `
  <div class="form-row">
      <div class="form-group col-md-6">
          <label>ID</label>
          <input type="text" class="form-control" id="idR" value=${pc.id} >
      </div>
      <div class="form-group col-md-6">
          <label>RAM</label>
          <input type="text" class="form-control" id="ramR" value=${pc.ramP} >
      </div>
      <div class="form-group col-md-6">
          <label>ROM</label>
          <input type="number" class="form-control" id="romR" value=${pc.romP} >
      </div>
      <div class="form-group col-md-6">
          <label>Price</label>
          <input type="number" class="form-control" id="priceR" value=${pc.priceP} >
      </div>
      <div class="form-group col-md-6">
          <label>Ecran</label>
          <input type="number" class="form-control" id="ecranR" value=${pc.ecranP} >
      </div>
      
  </div>
`;
  document.getElementById("researchPcDiv").innerHTML = render;
}
function researchByName(name) {
  var T = JSON.parse(localStorage.getItem("pc") || "[]");
  var pc = Array();
  for (var i = 0; i < T.length; i++) {
    if (T[i].nameP == name) {
      pc.push(T[i]);
    }
  }
  return pc;
}
function verifNameExist(name) {
  var T = JSON.parse(localStorage.getItem("pc") || "[]");
  var i = 0;
  while (i < T.length && T[i].nameP != name) {
    i++;
  }
  if (i == T.length) return false;
  else {
    return true;
  }
}
function returnPcInfo() {
  var T = JSON.parse(localStorage.getItem("pc") || "[]");

  var render = `
  <table class="table table-striped">
  <thead>
  <tr>
    <th scope="col">Id</th>
    <th scope="col">Name</th>
    <th scope="col">Ram</th>
    <th scope="col">Rom</th>
    <th scope="col">Ecran</th>
    <th scope="col">Price</th>
  </tr>
</thead>
<tbody>`;
  for (var i = 0; i < T.length; i++) {
    render += `<tr>
  <th scope="row">${T[i].id}</th>
  <td>${T[i].nameP}</td>
  <td>${T[i].ramP}</td>
  <td>${T[i].romP}</td>
  <td>${T[i].ecranP}</td>
  <td>${T[i].priceP}</td>
  <td>

  <button type="button" class="btn btn-info" onclick=deletePc(${T[i].id})>Delete</button></td>
  
  </tr>`;
  }
  render += `</tbody>
</table>`;
  document.getElementById("pcTable").innerHTML = render;
}
function deletePc(id) {
  var T = JSON.parse(localStorage.getItem("pc") || "[]");
  var index = researchIndexId(id);
  T.splice(index, 1);
  localStorage.setItem("pc", JSON.stringify(T));
  location.reload();
}
function displayUserParams() {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  document.getElementById("navFirstName").innerHTML = connectedUser.fName;
  document.getElementById("navLastName").innerHTML = connectedUser.lName;
}

function displayModal(id) {
  var product = searchProductById(id);
  var render = `
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Command</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <label>Quantity</label>
      <span id='test21'></span>
      <input type="text" id="qtyToCmd" class='form-control'>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="validateCmd(${id})">Validate</button>
      </div>
    </div>
  </div>
 </div>
  `;
  document.getElementById("modalId").innerHTML = render;
  document.getElementById("test21").innerHTML = product.stockJ;
}

function validateCmd(id) {
  var idC = localStorage.getItem("idC") || "1";
  var qty = document.getElementById("qtyToCmd").value;
  var user = JSON.parse(localStorage.getItem("connectedUser"));

  var product = searchProductById(id);

  if (qty > product.stockJ || qty <= 0) {
    alert("Stock Indisponible");
  } else {
    var cmd = {
      id: Number(idC),
      qty: qty,
      price: product.prixJ,
      idProduct: product.id,
      idUser: user.id,
    };

    // MAJ product
    var newPr = {
      id: product.id,
      nameJ: product.nameJ,
      codej: product.codej,
      prixJ: product.prixJ,
      stockJ: Number(product.stockJ) - Number(qty),
      categorieJ: product.categorieJ,
    };

    var allProducts = JSON.parse(localStorage.getItem("produit"));
    var index = searchById(id, allProducts);
    allProducts.splice(index, 1);
    allProducts.splice(index, 0, newPr);
    localStorage.setItem("produit", JSON.stringify(allProducts));

    var T = JSON.parse(localStorage.getItem("myCommands") || "[]");
    T.push(cmd);
    localStorage.setItem("myCommands", JSON.stringify(T));
    localStorage.setItem("idC", Number(idC) + 1);
    location.reload();
  }
}
function displayCommands(idUser) {
  var T = JSON.parse(localStorage.getItem("myCommands") || "[]");
  var userCmd = Array();
  for (var i = 0; i < T.length; i++) {
    if (T[i].idUser == idUser) {
      userCmd.push(T[i]);
    }
  }

  var render = `
  <table class="table table-striped" id="myCmdTable>
  <thead>
  <tr>
    <th scope="col">Id</th>
    <th scope="col">Qty</th>
    
    <th scope="col">unit price</th>
    <th scope="col">total price HT</th>
    <th scope="col">total price TTC</th>
    <th scope="col">Action</th>

  </tr>
</thead>
<tbody>`;
  for (var i = 0; i < userCmd.length; i++) {
    cmd = userCmd[i];
    // var productJ=searchProductById(cmd.idProduct)
    render += `<tr>
    <td>${cmd.id}</td>
 
  <td>${cmd.qty}</td>
  <td>${cmd.price}</td>
  <td>${userCmd.prixJ}</td>
  <td>${Number(cmd.price) * Number(cmd.qty)}</td>
  <td>${Number(cmd.price) * Number(cmd.qty) * 1.19}</td>
  <td>
  <button type="button" class="btn btn-info" onclick=deleteCmd(${
    cmd.id
  })>Delete</button></td>
  
  </tr>`;
  }
  render += `</tbody>
</table>`;
  document.getElementById("commandsTable").innerHTML = render;
}
function deleteCmd(id) {
  var T = JSON.parse(localStorage.getItem("myCommands") || "[]");
  var index = searchById(id, T);
  T.splice(index, 1);
  localStorage.setItem("myCommands", JSON.stringify(T));
  location.reload();
}
