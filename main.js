$(document).ready(function() {
    // Setto le width degli avatar presenti nelle notifiche
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
    });

    // Evento enter nell'input del messaggio che mi crea il messaggio
    $('.msg').keypress(function(event){
    	if(event.which == '13'){
            inviaMessaggio();
    	}
    });

    // Cambio icona del microfono in base al fatto che scrivo o meno nell'input del messaggio
    $('.msg').keyup(function(event){
        var risposta = $('.msg').val();
        if (risposta.length != 0) {
            $('.messaggio-vocale i').removeClass('fas fa-2x fa-microphone').addClass('fas fa-2x fa-paper-plane');
        } else {
            $('.messaggio-vocale i').addClass('fas fa-2x fa-microphone').removeClass('fas fa-2x fa-paper-plane');
        }
    });

    // Ricerca persone quando scrivo nell'input per la ricerca
    $('.cerca').on("keyup", function(){
    	var nomecercato = $('.cerca').val().toLowerCase();
        console.log(nomecercato);

        $('.utenti-lista-riga').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(nomecercato) > -1);
        });
    });
});

function tempoRisposta() {
  setTimeout(inviaRisposta, 1000);
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
        tempoRisposta();
        $('.msg').val('');
    }
}
