const url = "http://economia.awesomeapi.com.br/json/last/USD-BRL";
var abriu = 0;
async function getCotacao() {;
  
    return await fetch(url)
      .then(response => response.json())
      .then(data => {
        const valor = Object.values(data);


        return valor


    })
};


function modalCotacao(){
    if (abriu == 0){
        document.getElementById('modalCotacao').style.display = 'flex';
        abriu += 1;
    } else {
        document.getElementById('modalCotacao').style.display = 'none';
        abriu -= 1;
    }
    getCotacao()
        .then((resultado) => {
            var dolar = Math.ceil(Number(resultado[0]['ask']));
            var dolarformatado = dolar.toFixed(2);

            document.getElementById('textcotacao').innerHTML = 'Dolar atual = US$ ' + dolarformatado;

        });
}

function calc(){
    getCotacao()
        .then((resultado) => {
            var dropdown = document.getElementById('tipodeconversor').value;

            if (dropdown == 'dolar pra real'){
        
                var dolar = Math.ceil(Number(resultado[0]['ask']));
    
                var digitado = Number(document.getElementById('dolar').value);
    
                var realconv = dolar * digitado;
    
                var formreal = realconv.toFixed(2);
    
                document.getElementById('real').value = 'R$ ' + formreal;
               
        
            } else if (dropdown == 'real pra dolar'){
        
                
                var dolar = Math.ceil(Number(resultado[0]['ask']));
    
                var digitado = Number(document.getElementById('dolar').value);
    
                var realconv = digitado / dolar;
    
                var formreal = realconv.toFixed(2);
    
                document.getElementById('real').value = 'US$ ' + formreal;
            }



        });
}


function verificarmodal(){
    var escolha = document.getElementById('tipodeconversor').value;
    var inputdolar = document.getElementById('dolar');

    if (escolha == 'dolar pra real'){
        
        inputdolar.setAttribute('placeholder', 'Digite o valor do Dólar');
       

    } else if (escolha == 'real pra dolar'){

        
        inputdolar.setAttribute('placeholder', 'Digite o valor do Real');
    }
}
