//calcula a idade do usuaria para saber se ele possui mais de 20 anos.
var calculaIdade = function(dataAtual,dataNascimento) {
    //o mes de janeiro é = 0
    //analisa os anos
    var anos = dataAtual.getFullYear() - dataNascimento.getFullYear();

    //analisa os meses
    if (dataAtual.getMonth() != dataNascimento.getMonth()) {
        if (dataAtual.getMonth() < dataNascimento.getMonth()) {
            anos--
        }
    } else {
        //analise do dia
        if (dataAtual.getDate() < dataNascimento.getDate()) {
            anos--
        }
    }

    return anos ;
}

console.log(calculaIdade(new Date, new Date(2001,0,02)))

module.exports = calculaIdade;