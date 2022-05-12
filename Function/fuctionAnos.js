export function calculaIdade() {
    //o mes de janeiro é = 0
    var atual = new Date();
    var nascimento = new Date(2001, 6 , 3);
    
    //analisa os anos
    var anos = atual.getFullYear() - nascimento.getFullYear();

    //analisa os meses
    if(atual.getMonth() != nascimento.getMonth()){
        if(atual.getMonth() < nascimento.getMonth()){
            anos--
        }
    }else{
        //analise do dia
        if(atual.getDate() < nascimento.getDate()){
            anos--
        } 
    }

    console.log(anos + " anos")
}


