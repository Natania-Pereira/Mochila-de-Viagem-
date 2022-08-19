const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || []
//Pelo LocalStorage é possível armazenar as informações do formulário no navegador
//Ao recarregar a página o array itens só será inicializado com valor vazio, caso não exista itens armazenados em localStorage
//Para transformar a string que o localStorage.getItem("itens") retorna em array é necessário utilizar JSON.parse

// toda vez que eu preciso fazer um loop de um array eu posso usar um foreach
itens.forEach((elemento) =>{

    criaElemento(elemento)

})


form.addEventListener("submit", (evento)=> {

    //preventDefault está sendo utilizado para impedir o comportamento padrão de envio de informações de um formulário.
    evento.preventDefault()

    //Acessando os campos do formulário e armazenando o valor em uma const
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    //const existe - para verificar se aque item adicionado na mochila já existe
    const existe = itens.find( elemento => elemento.nome === nome.value)
    //O código acima verifica se existe algum elemento com o mesmo nome. 
    //Caso exista, ele guarda o objeto na const existe, ou undefined caso não exista.
  

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {

        itemAtual.id = existe.id;
        atualizaElemento(itemAtual)
        //para sobrecresver o conteúdo salvo no localStorage
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual

    }else{

        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;
      
      //itens.push é a função para inserir um elemento no array
        criaElemento(itemAtual);
        itens.push(itemAtual);
    }

    

    //É preciso transformar esse elemento em uma string e fazemos isso através do json.stringify
    localStorage.setItem("itens", JSON.stringify(itens));

    //Esvaziar o formulário após os valores serem submetidos
    nome.value = "";
    quantidade.value = "";
    
})

// Por meio da função criaelemento será criado o item da lista que será adicionado no HTML

function criaElemento(item) {

    // <li class="item"><strong>7</strong>Camisas</li>

    //Armazendando o elemento li em novoItem e adicionando classe item
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    //Por meio do innerHTML a quantidade e nome será exibida no HTML
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
   
   numeroItem.dataset.id = item.id
    //A função appendChild() insere um elemento filho (children) ao elemento pai (parent) na última posição.
    //No caso novoItem é o elemento e numeroItem é o elemento filho.
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;
    
    novoItem.appendChild(botaoDeleta(item.id))
    //A lista é a tag <ul> que contem todos os <li>
    lista.appendChild(novoItem);
    
    
    
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id){

    const elementoBotao = document.createElement("button")

    elementoBotao.innerText = "X";

    elementoBotao.addEventListener("click", function () {
        deletaElemento(this. parentNode,id)
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    localStorage.setItem("itens", JSON.stringify(itens));
}