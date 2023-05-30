var rodoumenu = 0;
var abriu = 0;
// var paginaModalDetalhes = 0;

async function getDados(name = '') {
  const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?';
  const extra = `&fname=${name}`;

  return await fetch(url + extra)
    .then(response => response.json())
    .then(data => {
      // console.log(data);  
      // Percorre a matriz de cards e exibe os nomes
      // Extrai os nomes dos cards do objeto de resposta
      const cardProperties = Object.values(data);
      const nomes = cardProperties.flatMap(cardProperty => cardProperty.map(card => card.name));
      const efeitos = cardProperties.flatMap(cardProperty => cardProperty.map(card => card.desc));
      const atk = cardProperties.flatMap(cardProperty => cardProperty.map(card => card.atk));
      const def = cardProperties.flatMap(cardProperty => cardProperty.map(card => card.def));
      const level = cardProperties.flatMap(cardProperty => cardProperty.map(card => card.level));
      const image_card = cardProperties.flatMap(cardProperty => cardProperty.map(card => card.card_images)[0][0]['image_url']);
      const race = cardProperties.flatMap(cardProperty => cardProperty.map(card => card.race));
      const type = cardProperties.flatMap(cardProperty => cardProperty.map(card => card.type));
      const atr = cardProperties.flatMap(cardProperty => cardProperty.map(card => card.attribute));
      const linkval = cardProperties.flatMap(cardProperty => cardProperty.map(card => card.linkval));
      const sets = cardProperties.flatMap(cardProperty => cardProperty.map(card => card.card_sets));

      // Imagem da carta

      return {
        nomes: nomes,
        image_card: image_card,
        name_card: nomes,
        eff_card: efeitos,
        atk_card: atk,
        def_card: def,
        level_card: level,
        race: race,
        type: type,
        atr: atr,
        linkval: linkval,
        sets: sets
      };

    })

    .catch(error => {
      // Trata o erro caso ocorra
      console.error('Ocorreu um erro:', error);
    });
}
  



function getName(){
    var nome = document.getElementById('nome').value;

    getDados(nome)
      .then((resultado) => {
        var nomes = resultado['nomes'];
        string = ''

        for (let i = 0; i < nomes.length; i++) {
          const nome = nomes[i];
          
          string += `<option value='${nome}'>${nome}</option>`
          
        }

        document.getElementById('cartas').innerHTML = string;

      })
      .catch((erro) => {
        console.log(erro);
      }); 
    

}

function mostrarTudo(){
    var nome = document.getElementById('nome').value;
    
    getDados(nome)
      .then((resultado) => {
        /* only monsters */
        if (resultado['atk_card'].length > 1){
          var atk = resultado['atk_card'][0]
        } else {
          var atk = resultado['atk_card'];

        }

        if (resultado['def_card'].length > 1){
          var def = resultado['def_card'][0];
        } else {
          var def = resultado['def_card'];

        }

        /* water, fire, earth, dark, divine, wind (monsters) */
        if (resultado['atr'].length > 1){
          var atributo = resultado['atr'][0];
        } else {
          var atributo = resultado['atr'];

        }
        if (resultado['race'].length > 1){
          var raca = resultado['race'][0];
        } else {
          var raca = resultado['race'];

        }

        /* fim only monsters */


        if (resultado['eff_card'].length > 1){
          var efeito = resultado['eff_card'][0];
        } else {
          var efeito = resultado['eff_card'];

        }

        /* monster , spell or trap */
        if (resultado['type'].length > 1){
          var tipo = resultado['type'][0];
        } else {
          var tipo = resultado['type'][0];
        }

        if (resultado['linkval'].length > 1){
          var linkval = resultado['linkval'][0];
        } else {
          var linkval = resultado['linkval'];
        }

        document.getElementById('buttonSet').style.display = 'block';
        document.getElementById('imgCarta').setAttribute('src', resultado['image_card']);
        document.getElementById('nome_carta').innerHTML = resultado['nomes'][0];

        /* se a carta for um monstro */
        if (tipo.includes('Monster')){
          /* normal #E9D3AA */
          /* efeito #EDA17C */
          /* link #6CA4D9 */
          /* trap #E490C2 */
          document.getElementById('atkdef').style.justifyContent = 'space-between';
          document.getElementById('desc').style.backgroundImage = 'none';

          document.getElementById('atk').style.display = 'block';
          document.getElementById('def').style.display = 'block';
          document.getElementById('atributo').setAttribute('src', `images/icons/${atributo}.svg`);
          document.getElementById('tipo_carta').innerHTML = tipo;
          document.getElementById('raca').innerHTML = raca;
          document.getElementById('desc').innerHTML = efeito;
          document.getElementById('atk').innerHTML = 'ATK/ ' + atk;

          if (tipo.includes('Link')){
            document.getElementById('def').innerHTML = 'LINK - ' + linkval;  
          } else {
            document.getElementById('def').innerHTML ='DEF/ ' + def;
          }

          if (tipo.includes('Pendulum')){

          }

          switch (tipo){
            case 'Normal Monster':
              document.getElementById('desc').style.backgroundColor = '#E9D3AA';
              break;

            case 'Link Monster':
              document.getElementById('desc').style.backgroundColor = '#6CA4D9';
              break;

            case 'Ritual Monster':
              document.getElementById('desc').style.backgroundColor = '#587EBE';
              break;

            case 'Effect Monster':
              document.getElementById('desc').style.backgroundColor = '#EDA17C';
              break;

            case 'Fusion Monster':
              document.getElementById('desc').style.backgroundColor = '#9453A3';
              break;

            case 'Pendulum Effect Monster':
              document.getElementById('desc').style.backgroundColor = 'none';
              document.getElementById('desc').style.backgroundImage = 'linear-gradient(to bottom, #B96739, #0F847E)';
              break;

            case 'Pendulum Effect Ritual Monster':
              document.getElementById('desc').style.backgroundColor = 'none';
              document.getElementById('desc').style.backgroundImage = 'linear-gradient(to bottom, #829CCD, #0F847E)';
              break;

            case 'Pendulum Effect Fusion Monster':
              document.getElementById('desc').style.backgroundColor = 'none';
              document.getElementById('desc').style.backgroundImage = 'linear-gradient(to bottom, #9453A3, #0F847E)';
              break;

            case 'Pendulum Normal Monster':
              document.getElementById('desc').style.backgroundColor = 'none';
              document.getElementById('desc').style.backgroundImage = 'linear-gradient(to bottom, #E9D3AA, #0F847E)';
              break;

            case 'XYZ Pendulum Effect Monster':
              document.getElementById('desc').style.backgroundColor = 'none';
              document.getElementById('desc').style.backgroundImage = 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), #0F847E)';
              break;

            case 'Synchro Pendulum Effect Monster':
              document.getElementById('desc').style.backgroundColor = 'none';
              document.getElementById('desc').style.backgroundImage = 'linear-gradient(to bottom, #fff, #0F847E)';
              break;

            case 'Trap Card':
              document.getElementById('desc').style.backgroundColor = '#E490C2';
              break;

            case 'Spell Card':
              document.getElementById('desc').style.backgroundColor = '#ABD5D3';
              break;


          }
          
        } else {

          if (tipo == 'Spell Card'){
            document.getElementById('desc').style.backgroundColor = '#ABD5D3';
            document.getElementById('desc').style.backgroundImage = 'none';

          } else if (tipo == 'Trap Card'){
            document.getElementById('desc').style.backgroundColor = '#E490C2';
            document.getElementById('desc').style.backgroundImage = 'none';
          }

          document.getElementById('atkdef').style.justifyContent = 'center';
          document.getElementById('atk').style.display = 'none';
          document.getElementById('def').style.display = 'none';

          document.getElementById('atributo').setAttribute('src', `images/icons/${tipo}.svg`);
          document.getElementById('tipo_carta').innerHTML = tipo;
          document.getElementById('raca').innerHTML = raca;
          document.getElementById('desc').innerHTML = efeito;

        }


      })
      .catch((erro) => {
        console.log(erro);
      }); 

}



// 0 : {id: 34541863, name: '"A" Cell Breeding Device', type: 'Spell Card', frameType: 'spell', desc: 'During each of your Standby Phases, put 1 A-Counter on 1 face-up monster your opponent controls.', …}


function escondeHeader(){
  scroll = window.pageYOffset;
  // console.log(scroll);

  var header = document.getElementById('div_input');
  var menu = document.getElementById('labelmenu');
  var backcristal = document.getElementById('cris');

  if(scroll < 633){
    header.style.backgroundColor= "#000";
    menu.style.color = "#fff";
    backcristal.style.backgroundColor = "#fff";

    backcristal.addEventListener('mouseover', function() {
      backcristal.style.boxShadow = '0 0 30px white';
    });

    backcristal.addEventListener('mouseout', function() {
      backcristal.style.boxShadow = '0 0 0';
    });

  }else if(scroll > 633){
    header.style.backgroundColor= "#fff";
    menu.style.color = "#000";
    backcristal.style.backgroundColor = "#fff";

    backcristal.addEventListener('mouseover', function() {
      backcristal.style.boxShadow = '0 0 20px black';
    });

    backcristal.addEventListener('mouseout', function() {
      backcristal.style.boxShadow = '0 0 0';
    });
  }
}


function abreMenu(){
  var botao = document.getElementById('menuham');
  var menu = document.getElementById('navbar');

  botao.style.transition = '0.2s';
  menu.style.transition = '0.5s';

  if (rodoumenu == 0){
    // botao.src = '../images/cristal_azul.svg';
    botao.style.rotate = '180deg';
    menu.style.left = '0%';
    rodoumenu += 1;
  } else {
    // botao.src = '../images/cristal_vermelho.svg';
    botao.style.rotate = '0deg';
    menu.style.left = '100%';
    rodoumenu -= 1;
  }
}


function fechamenu(){
  paginaModalDetalhes = 0;
  var botao = document.getElementById('menuham');
  var menu = document.getElementById('navbar');

  // botao.src = '../images/cristal_vermelho.svg';
  botao.style.rotate = '0deg';
  menu.style.left = '100%';
  rodoumenu -= 1;

}


function modalSetFechar(){
  if (abriu == 0){
      document.getElementById('modaldetalhes').style.display = 'flex';
      abriu += 1;
  } else {
      document.getElementById('modaldetalhes').style.display = 'none';
      abriu -= 1;
  }

}


function modalSets(pag){
  var nome = document.getElementById('nome').value;
  if (pag == '+'){
    paginaModalDetalhes += 1;
  } else if (pag == '-'){
    paginaModalDetalhes -= 1;
  } else if (pag == 'x'){
    paginaModalDetalhes = 0;
  }

  
  
    
    getDados(nome)
      .then((resultado) => {
        if (resultado['sets'].length > 1){

          var sets = resultado['sets'][0];

        } else {
          var sets = resultado['sets'];

        }
        if (sets.length > 1){
          if (sets.length == 1){
            document.getElementById('cetaVoltar').disabled = true;
        
            document.getElementById('cetaProximo').disabled = true;
          } else if (paginaModalDetalhes == 0){
            document.getElementById('cetaVoltar').disabled = true;
        
            document.getElementById('cetaProximo').disabled = false;
          } else if (paginaModalDetalhes == sets.length - 1){
            document.getElementById('cetaVoltar').disabled = false;
        
            document.getElementById('cetaProximo').disabled = true;
          } else {
            document.getElementById('cetaVoltar').disabled = false;
        
            document.getElementById('cetaProximo').disabled = false;
          }
        } else {
      
          if (sets[0].length == 1){
            document.getElementById('cetaVoltar').disabled = true;
        
            document.getElementById('cetaProximo').disabled = true;
          } else if (paginaModalDetalhes == 0){
            document.getElementById('cetaVoltar').disabled = true;
        
            document.getElementById('cetaProximo').disabled = false;
          } else if (paginaModalDetalhes == sets[0].length - 1){
            document.getElementById('cetaVoltar').disabled = false;
        
            document.getElementById('cetaProximo').disabled = true;
          } else {
            document.getElementById('cetaVoltar').disabled = false;
        
            document.getElementById('cetaProximo').disabled = false;
          }
        }
        console.log(sets);

        if (sets.length > 1) {
          document.getElementById('set_code').innerHTML = sets[paginaModalDetalhes]['set_code'];
          document.getElementById('set_name').innerHTML = sets[paginaModalDetalhes]['set_name'];
          document.getElementById('set_price').innerHTML = 'US$ ' + sets[paginaModalDetalhes]['set_price'];
          document.getElementById('set_rarity').innerHTML = sets[paginaModalDetalhes]['set_rarity'];
          // document.getElementById('set_rarity_code').innerHTML = 'Sigla da raridade: ' + sets[paginaModalDetalhes]['set_rarity_code'];
        } else {
          console.log(sets[0].length);
          
          document.getElementById('set_code').innerHTML = sets[0][paginaModalDetalhes]['set_code'];
          document.getElementById('set_name').innerHTML = sets[0][paginaModalDetalhes]['set_name'];
          document.getElementById('set_price').innerHTML = 'US$ ' + sets[0][paginaModalDetalhes]['set_price'];
          document.getElementById('set_rarity').innerHTML = sets[0][paginaModalDetalhes]['set_rarity'];
          // document.getElementById('set_rarity_code').innerHTML = 'Sigla da raridade: ' + sets[paginaModalDetalhes]['set_rarity_code'];

        }

        

        // if (sets.length == 1){
        //   document.getElementById('cetaVoltar').disabled = true;

        //   document.getElementById('cetaProximo').disabled = true;

        // } else if (paginaModalDetalhes == 0){
        //   document.getElementById('cetaVoltar').disabled = true;
        //   document.getElementById('cetaProximo').disabled = false;

        // } else if (paginaModalDetalhes == sets.length - 1){
        //   document.getElementById('cetaProximo').disabled = true;
        //   document.getElementById('cetaVoltar').disabled = false;

        // } else {
        //   document.getElementById('cetaVoltar').disabled = false;

        //   document.getElementById('cetaProximo').disabled = false;

        // }

        

      })
      .catch((erro) => {
        console.log(erro);
      });
}


// set_code
// : 
// "CT13-EN003"
// set_name
// : 
// "2016 Mega-Tins"
// set_price
// : 
// "6.97"
// set_rarity
// : 
// "Ultra Rare"
// set_rarity_code
// : 
// "(UR)"
