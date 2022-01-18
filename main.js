//elementos da dom
var cards = document.querySelectorAll('.card');
var backs = document.querySelectorAll('.back');
var text_pontos_jogador1 = document.querySelector(".pontos1");
var text_pontos_jogador2 = document.querySelector(".pontos2");
var text_pontos_jogador1 = document.querySelector(".pontos1");
var text_pontos_jogador2 = document.querySelector(".pontos2");
var qual_jogador = document.querySelector(".qual_jogador");

////adicionando um id a todos cards\\\\

var cont = 0;
[].forEach.call(cards, function(card){card.id = cont+=1;});

////adicionando ids sortidos ao back da carta\\\\

//sendo que, o id se repete 2x cada
//os ids sortidos farom que as imgs sejam distribuidas de forma aleatoria 

var random = [];

 //retorna quantidade de vezes que um item aparece no vetor
function verifica_vetor(random, n){
    var cont = 0;
   
    for (var j in random){
        if(random[j] == n){
            cont = cont + 1;
        }
        
        
    }
    return cont;
}

[].forEach.call(backs, function(back){
    var resposta = 4;
    var n = 0;

    while(resposta >= 2){
        n  =  Math.round(Math.random() * (5 - 1) + 1);
        resposta = verifica_vetor(random, n);
    }

   //verificador para que o id se repita apenas 2x
    if(resposta < 2){
        random.push(n);
        back.id = n;
    }

});


/// adicinar uma img no back dos cards \\\

for(var i = 1; i <= 5; i++){
    [].forEach.call(backs, function(back){
        if(back.id == i){
            let img = document.createElement("img");
            img.src = "img/" + i + ".png";
            back.appendChild(img);           
        }
    })
}

///// FLIP e comparação \\\\\

var card_virada_1;
var card_virada_2;
var pontos_jogador1 = 0;
var pontos_jogador2 = 0;
var cartas_viradas = 0;

qual_jogador.value = 1;

function flip(div){

    if(div.classList.length == 2){
        return;
    }
   
    if(cartas_viradas == 0){
        div.classList.toggle('flip');
        card_virada_1 = div;
        cartas_viradas += 1;
        return;
    }else if(cartas_viradas == 1){
        div.classList.toggle('flip');
        card_virada_2 = div;
        cartas_viradas  += 1;
        var card1_id = card_virada_2.children[1].id;
        var card2_id = card_virada_1.children[1].id;
        comparar_cards(card1_id , card2_id);
    }else{
        card_virada_1.classList.toggle('flip');
        card_virada_2.classList.toggle('flip');
        cartas_viradas = 0;
        troca_jogador();

    }
    
}


////comparando as cartas\\\\\
function comparar_cards(card1_id , card2_id){

    text_pontos_jogador1.style.animation = '0';
    text_pontos_jogador2.style.animation = '0';

    if(card1_id  == card2_id){
        if(qual_jogador.value == 1){
            pontos_jogador1 += 1;
            text_pontos_jogador1.innerHTML = "jogador 1: " + pontos_jogador1;
            text_pontos_jogador1.style.animation = 'pontos 0.5s';
            cartas_viradas = 0;
            verificando_vencedor();
        }
    
        if(qual_jogador.value == 2){
            pontos_jogador2 += 1;
            text_pontos_jogador2.innerHTML = "jogador 1: " + pontos_jogador2;
            text_pontos_jogador2.style.animation = 'pontos 0.5s';
            cartas_viradas = 0;
            verificando_vencedor();
        }
    }
}





////trocando jogador\\\\\

function troca_jogador(){
    if(qual_jogador.value == 1){
        qual_jogador.value = '2';
        qual_jogador.innerHTML = "jogador 2";
        cartas_viradas = 0;             
    }else{
        qual_jogador.value = '1';
        qual_jogador.innerHTML = "jogador 1";
        cartas_viradas = 0;    
    }  
}
 





////verificando vencedor\\\\\
function verificando_vencedor(){
    
    cont = 1;
    [].forEach.call(cards, function(card){
        if(card.classList.length < 2){
            cont = cont - 1;
            console.log(cont)
        }
    })

    if(cont == 1){
        if(pontos_jogador1 > pontos_jogador2){
            qual_jogador.innerHTML = "vencedor: jogador 1";
        }else if(pontos_jogador1 < pontos_jogador2){
            qual_jogador.innerHTML = "vencedor: jogador 2";
        }else if(pontos_jogador1 == pontos_jogador2){
            qual_jogador.innerHTML = "empate";
        }
    }
}



////modal\\\\
function open_modal(castro){
    var modal = document.getElementById('modal');
    modal.style.display = "block";
    
}

  

var tipo_tabela = null;
var qtd_jogadores = null;



function selecionar(button){

    if(tipo_tabela == button.id){
        button.style.backgroundColor = "white";
        tipo_tabela = null;
    }else if(tipo_tabela != button.id && tipo_tabela != null){
        const doc = document.getElementsByTagName('button');
        [].forEach.call(doc, function(docs) {
            if(docs.id == tipo_tabela){
                docs.style.backgroundColor = "white";
            }
        })

        button.style.backgroundColor = "rgba(0,212,255,1)";
        tipo_tabela = button.id;    
    }else{
        button.style.backgroundColor = "rgba(0,212,255,1)";
        tipo_tabela = button.id;
    }

    console.log(tipo_tabela);
    
}


function selecionar_jogadores(button){

    if(qtd_jogadores == button.id){

        button.style.backgroundColor = "white";
        qtd_jogadores = null;

    }else if(qtd_jogadores != button.id && qtd_jogadores != null){

        const doc = document.getElementsByTagName('button');

        [].forEach.call(doc, function(docs) {
            if(docs.id == qtd_jogadores){
                docs.style.backgroundColor = "white";
                button.style.backgroundColor = "rgba(0,212,255,1)";
                qtd_jogadores = button.id;    
            }
        })

    }else{
        button.style.backgroundColor = "rgba(0,212,255,1)";
        qtd_jogadores = button.id;
    }

    console.log(qtd_jogadores);
    
}




function jogar(){
   if(tipo_tabela != null && qtd_jogadores != null){
      if(tipo_tabela == 'facil'){
        window.location.href = ("game_facil.html");
      }else if(tipo_tabela == 'medio'){
        window.location.href = ("game_medio.html");
      }else if(tipo_tabela == 'difícil'){
        window.location.href = ("game_dificil.html");
      }else if(tipo_tabela == 'super_dificil'){
        window.location.href = ("game_super_dificil.html");
      }
   }else if(tipo_tabela != null && qtd_jogadores == null){
        alert("selecione a quantidade de jogadores");
   }else if(tipo_tabela == null && qtd_jogadores != null){
        alert("selecione o nivel de dificuldade");
   }else{
        alert("selecione o nivel de dificuldade e a quantidade de jogadores");
   }
}

