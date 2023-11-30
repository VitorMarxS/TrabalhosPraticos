fetch ('https://fakestoreapi.com/products/')
 .then(res => res.json ())
 .then(data => {
      let str = ''
      for (let i = 0; i < data.length; i++) {
          let produto = data[i];
          str += `<div class="col-md-4 mb-4">
          <div class="card h-100">
              <img src="${produto.image}" class="card-img-top" width="700" height="200">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${produto.title}</h5>
                <h6 class="text-primary">${produto.price}</h6>
                <p class="card-text" style="overflow: hidden; height: 100px">${produto.description}</p>
                <a href="" target="_blank" class="btn btn-primary mt-auto" onclick="pegaID(${produto.id})">Mais detalhes</a>
              </div>
            </div>
          </div>`;
      }
      document.getElementById('tela').innerHTML = str;
  })
var item;
var chamandoDetalhe;
function pegaID(n){
  item = 'https://fakestoreapi.com/products/'+n;
  window.location.href='detalhe.html?item=' + encodeURIComponent(item);
}

function mostraDetalhe(){
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  item = urlParams.get('item');

  fetch (item)
    .then(res => res.json ())
    .then(data => {
    let img = ''; 
    let str = ''; 
    let produto = data;
    img = `<img src="${produto.image}" class="card-img-top"style="margin-top: 20px;"></img>`
    str = `<div style="margin-top: 20px">
              <h3>${produto.title}</h3>
              <h4>Preço: ${produto.price}</h4>
              <p>Descrção: ${produto.description}</p>
              <p>Categoria: ${produto.category}</p>
              <p>Avaliação: ${produto.rating.rate}</p>
            </div>` 

            document.getElementById('imagem').innerHTML = img;
            document.getElementById('telaDetalhe').innerHTML = str;
    }) 
}

function searchProducts() {
      var termo = document.getElementById('search').value.toLowerCase();
      fetch ('https://fakestoreapi.com/products/')
        .then(res => res.json ())
        .then(data => {
              let str = ''
              for (let i = 0; i < data.length; i++) {
                  let produto = data[i];
                  let titulo = produto.title;
                  if(verificaSimilaridade(termo,titulo)){
                    str += `<div class="col-md-4 mb-4 ">
                    <div class="card h-100">
                        <img src="${produto.image}" class="card-img-top">
                        <div class="card-body d-flex flex-column">
                          <h5 class="card-title">${produto.title}</h5>
                          <h6 class="text-primary">${produto.price}</h6>
                          <p class="card-text" style="overflow: hidden; height: 100px">${produto.description}</p>
                          <a href="" target="_blank" class="btn btn-primary mt-auto" onclick="pegaID(${produto.id})">Mais detalhes</a>
                        </div>
                      </div>
                    </div>`;
                  }
              }
          document.getElementById('pesquisa').innerHTML = str;
  })
}

function verificaSimilaridade(texto, stringAlvo) {
  return stringAlvo.toLowerCase().includes(texto);
} 