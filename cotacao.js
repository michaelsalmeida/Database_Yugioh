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

function calcCot(){
    getCotacao()
        .then((resultado) => {
            var dolar = Math.ceil(Number(resultado[0]['ask']));

            var digitado = Number(document.getElementById('dolar').value);

            var realconv = dolar * digitado;

            var formreal = realconv.toFixed(2);

            document.getElementById('real').value = formreal;

        });
}

function calcDol(){
    getCotacao()
        .then((resultado) => {
            var dolar = Math.ceil(Number(resultado[0]['ask']));

            var digitado = Number(document.getElementById('real').value);

            var realconv = digitado / dolar;

            var formreal = realconv.toFixed(2);

            document.getElementById('dolar').value = formreal;

        });
}

