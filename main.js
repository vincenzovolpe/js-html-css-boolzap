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
    $(document).on('click', '.messaggio-vocale', function(){
        inviaMessaggio();
    });

    // Evento enter nell'input del messaggio che mi crea il messaggio
    $(document).on('keypress', '.msg', function(){
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
    $('.cerca').keyup(function(){
        // recupero il testo digitato nella ricerca
    	var nomecercato = $('.cerca').val().toLowerCase();
        console.log(nomecercato);
        // Verifico se ci sono valori di testo che corrispondono al valore del campo di input. Il metodo toggle () nasconde la riga che non corrisponde alla ricerca. Usiamo il metodo toLowerCase() per convertire il testo in lettere minuscole, il che rende insensibile il caso di ricerca
        $('.utenti-lista-riga').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(nomecercato) > -1);
        });
    });

    // Intercetto il click su un singolo utente nella lista degli utenti per visualizzare la relativa chat
    $(document).on('click', '.utenti-lista-riga', function(){
        // Metto in una variabile il data attributes dell'utente attuale
        var utentecliccato = $(this).data("chat");
        // Rimuovo lo sfondo da un utente selezionato in precedenza
        $(this).siblings().removeClass('attivo');
        // Ciclo all'interno della chat dei messaggi dell'utente cliccato
        $('.chat').each(function(index){
            // Controllo se l'indice del ciclo è uguale al data attribute dell'utente cliccato
            if (utentecliccato == index + 1) {
                $('.chat').eq(index).siblings().removeClass('attivo')
                $('.chat').eq(index).addClass('attivo');
                return false;
            }
        });
        // Imposto lo sfondo alla riga utente cliccata
        $(this).addClass('attivo');
    });

    // Evento click sull'icona nel messaggio verde
    $(document).on('click', '.messaggio i', function(){
        // Faccio in modo che l'icona rimane fissa quando esco dall'hover e scompare dopo il click
        $(this).toggleClass("selected");
        // Rendo visibile il pannello al click sull' icona e lo faccio scomparire se faccio di nuovo click sull'icona
        $(this).siblings('.messaggio-pannello').toggle();
    });

    // Evento click su cancella messaggio
    $(document).on('click', '.messaggio-pannello-cancella', function(){
        // Cancello il primo antenato del div .messaggio-pannello-cancella
        $(this).closest('.messaggio').remove();
    });

    function tempoRisposta() {
      setTimeout(inviaRisposta, 1000);
    }

    function inviaRisposta() {
        message = "<div class='messaggio ricevuto bianco'>ok</div>";
        $(message).appendTo($('.messaggi-main .chat.attivo'));
        $('.msg').val('');
    }

    function inviaMessaggio() {
        risposta = $('.msg').val();
        if (risposta.length != 0) {
            data = new Date();
            time = data.getHours() + ":" + data.getMinutes();
            console.log(time);
            tempo = '<small class="messaggio-tempo">' + time + '</small>';
            icona = '<i class="fa fa-chevron-down"></i>';
            pannello = '<div class="messaggio-pannello"><div class="messaggio-pannello-info">Info messaggio</div><div class="messaggio-pannello-cancella">Cancella messaggio</div></div>';
            message = "<div class='messaggio spedito verde'><span>" + risposta + "</span>" + icona + tempo + pannello + "</div>";
            $(message).appendTo($('.messaggi-main .chat.attivo'));
            tempoRisposta();
            $('.msg').val('');
        }
    }
});
