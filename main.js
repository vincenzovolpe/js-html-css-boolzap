$(document).ready(function() {
    // Setto le width degli avater presenti nelle notifiche
    var heightNotificheAvatar = $('.utenti-notifiche-avatar').height();
    $('.utenti-notifiche-avatar').width(heightNotificheAvatar);

    var heightHeaderAvatar = $('.utenti-header-avatar img').height();
    $('.utenti-header-avatar img').width(heightHeaderAvatar);

    var heightListaAvatar = $('.utenti-lista-avatar img').height();
    $('.utenti-header-avatar img').width(heightHeaderAvatar);

    var heightListaAvatar = $('.messaggi-header-avatar img').height();
    $('.messaggi-header-avatar img').width(heightHeaderAvatar);
    // Fine settaggio delle larghezzhe

    // Evento click sul microfono
    $('.messaggio-vocale').click(function(){
        inviaMessaggio();
        tempoRisposta();
    });

    // Evento enter nell'input del messaggio che mi crea il messaggio
    $('.msg').keypress(function(event){
    	if(event.which == '13'){
            inviaMessaggio();
            tempoRisposta();
    	}
    });

    // Cambio icona del microfono in base al fatto che scrivo o meno nell'input del messaggio
    $('.msg').keyup(function(event){
        var risposta = $('.msg').val();
        if (risposta.length != 0) {
            $('.messaggio-vocale>span').removeClass('fas fa-microphone').addClass('fas fa-paper-plane');
        } else {
            $('.messaggio-vocale>span').addClass('fas fa microphone').removeClass('fas fa-paper-plane');
        }
    });

    // Ricerca persone quando scrivo nell'input per la ricerca
    $('.cerca').on("keyup", function(){
    	var nomecercato = $('.cerca').val().toLowerCase();
        console.log(nomecercato);

        $('.utenti-lista-riga').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(nomecercato) > -1)
        });
    });
});

var check;

function tempoRisposta() {
  check = setTimeout(inviaRisposta, 1000);
}

function inviaRisposta() {
    message = "<div class='messaggio ricevuto bianco'>ok</div>";
    $(message).appendTo($('.messaggi-main'));
    $('.msg').val('');
}

function inviaMessaggio() {
    risposta = $('.msg').val();
    if (risposta.length != 0) {
        message = "<div class='messaggio spedito verde'>" + risposta + "</div>";
        $(message).appendTo($('.messaggi-main'));
        $('.msg').val('');
    }
}
