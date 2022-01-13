//elementos da dom
var cards = document.querySelectorAll('.card');
var backs = document.querySelectorAll('.back');


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
var text_pontos_jogador1 = document.querySelector(".pontos1");
var text_pontos_jogador2 = document.querySelector(".pontos2");
var qual_jogador = document.querySelector(".qual_jogador");
qual_jogador.value = 1;

function flip(div){
    text_pontos_jogador1.style.animation = '0';
    text_pontos_jogador2.style.animation = '0';

    if(div.classList.length == 2){
        return;
    }
   
    if(cartas_viradas == 0){
        div.classList.toggle('flip');
        card_virada_1 = div;
        cartas_viradas += 1;
        return;
    }

    if(cartas_viradas == 1){
        div.classList.toggle('flip');
        card_virada_2 = div;
        cartas_viradas  += 1;
       
        var card1_id = card_virada_2.children[1].id;
        var card2_id = card_virada_1.children[1].id;


        if(card1_id  == card2_id){
            if(qual_jogador.value == 1){
                pontos_jogador1 += 1;
                text_pontos_jogador1.innerHTML = "Pontos: " + pontos_jogador1;
                text_pontos_jogador1.style.animation = 'pontos 0.5s';
                cartas_viradas = 0;
                return;
            }
    
            if(qual_jogador.value == 2){
                pontos_jogador2 += 1;
                text_pontos_jogador2.innerHTML = "Pontos: " + pontos_jogador2;
                text_pontos_jogador2.style.animation = 'pontos 0.5s';
                cartas_viradas = 0;
                return;
            }

        
        }else{
            console.log(qual_jogador.value);
            if(qual_jogador.value == 1){
                qual_jogador.value = '2';
                qual_jogador.innerHTML = "jogador 2";
                setTimeout(desvirar, 1000);
                cartas_viradas = 0;
            }else{
                qual_jogador.value = '1';
                qual_jogador.innerHTML = "jogador 1";
                setTimeout(desvirar, 1000);
                cartas_viradas = 0;
            }
        }
    }   
    
    
          
}


function desvirar(){
    card_virada_1.classList.toggle('flip');
    card_virada_2.classList.toggle('flip');
}