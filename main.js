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
        var utentecliccato = $(this).data("lista");
        // Rimuovo lo sfondo dalla riga utente che era attiva prima del click
        $('.utenti-lista-riga').removeClass('attivo');
        // Nascondo la conversazione attiva al momento dell click
        $('.chat').removeClass('attivo')
        // Recupero il pannello con il data-chat corrispondente al data-list del contatto su cui ho cliccato e lo visualizzo
        $('.chat[data-chat="' + utentecliccato +'"]').addClass('attivo');
        // Imposto lo sfondo alla riga utente cliccata
        $(this).addClass('attivo');
        // Recupero il nome dell'utente cliccato
        var nomeutente = $(this).find('.utenti-lista-msg-nome h4').text();
        // Setto il nome utente  della barra in alto nei messaggi uguale a quello dell'utente cliccato
        $('.messaggi-header-nome h4').text(nomeutente);
        // Recupero l'immagine dell'utente cliccato
        var immagineutente = $(this).find('.utenti-lista-avatar img').attr('src');
        // Setto l'immagine utente della barra in alto nei messaggi uguale a quello dell'utente cliccato
        $('.messaggi-header-avatar img').attr('src', immagineutente);
        // Sposto all'inizio della  lista l'utente cliccato
        $(this).prependTo('.utenti-lista');
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
