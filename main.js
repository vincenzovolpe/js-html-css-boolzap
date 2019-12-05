$(document).ready(function() {
    // Setto le width degli avatar prespeditoi nelle notifiche
    var heightNotificheAvatar = $('.utenti-notifiche-avatar').height();
    $('.utenti-notifiche-avatar').width(heightNotificheAvatar);

    var heightHeaderAvatar = $('.utenti-header-avatar img').height();
    $('.utenti-header-avatar img').width(heightHeaderAvatar);

    var heightListaAvatar = $('.utenti-lista-avatar img').height();
    $('.utenti-header-avatar img').width(heightHeaderAvatar);

    var heightListaAvatar = $('.messaggi-header-avatar img').height();
    $('.messaggi-header-avatar img').width(heightHeaderAvatar);
    // Fine settaggio delle larghezzhe

    // Popoliamo i contenitori dei messaggi
    // Scorro tutte le chat contenute nell'oggetto conversazioni
    for (var codice_conversazione in conversazioni) {

        //var contenitore_messaggi = '<div  data-chat="' + codice_conversazione +'" class="chat"></div>';
        var contenitore_messaggi = $('.template .chat').clone();
        contenitore_messaggi.attr('data-chat', codice_conversazione);

        // Recupero i messaggi della conversazione corrente
        var messaggi = conversazioni[codice_conversazione];
        // Ciclo tutti i messaggi di questa conversazione
        for (var i = 0; i < messaggi.length; i++) {
            // recupero un messaggio alla volta di questa conversazione
            var singolo_messaggio  = messaggi[i];
            // Recupero il teso del messaggio
            var testo_messaggio = singolo_messaggio.testo;
            // Recupero il tipo di messaggio che diventra la classe spedito verde o ricevuto bianco
            var tipo_messaggio = singolo_messaggio.direzione;
            // Clono il template del messaggio
            var nuovo_messaggio = $('.template .messaggio').clone();
            // Inserisco nello span corretto il testo del messaggio
            nuovo_messaggio.children('.messaggio-testo').text(testo_messaggio);
            // Aggiungo le classi corrette al div messaggio
            nuovo_messaggio.addClass(tipo_messaggio);
            // Inserisco il messaggio all'interno del container
            contenitore_messaggi.append(nuovo_messaggio);
            // Risposta del pc coon scritto ok mandata dopo 1 secondo
        }
        $('.messaggi-main').append(contenitore_messaggi);
    }

    // Evento click sul microfono
    $(document).on('click', '.messaggio-vocale', function(){
        inviaMessaggioDue();
    });

    // Evento enter nell'input del messaggio che mi crea il messaggio
    $(document).on('keypress', '.msg', function(){
    	if(event.which == '13'){
            inviaMessaggioDue();
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
      //setTimeout(inviaRisposta, 1000);
      setTimeout(inviaRispostaDue, 1000);
    }

    // Funzione inviaRisposta funzionante senza il template
    /*function inviaRisposta() {
        message = "<div class='messaggio ricevuto bianco'>ok</div>";
        $(message).appendTo($('.messaggi-main .chat.attivo'));
        $('.msg').val('');
    }

    // Funzione inviaMessaggio funzionante senza il template
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
    }*/

    // Funzione inviaMessaggio funzionante con il template
    function inviaMessaggioDue() {
        risposta = $('.msg').val();
        if (risposta.length != 0) {
            // Clono il template del messaggio
            var nuovo_messaggio = $('.template .messaggio').clone();
            // Inserisco nello span corretto il testo del messaggio
            nuovo_messaggio.children('.messaggio-testo').text(risposta);
            // Aggiungo le classi corrette al div messaggio
            nuovo_messaggio.addClass('spedito verde');
            // Inserisco il messaggio all'interno del container
            $('.chat.attivo').append(nuovo_messaggio);
            // Risposta del pc coon scritto ok mandata dopo 1 secondo
            tempoRisposta();
            $('.msg').val('');
        }
    }

    // Funzione inviaRispostaDue funzionante con il template
    function inviaRispostaDue() {
        // Clono il template del messaggio
        var messaggio_risposta = $('.template .messaggio').clone();
        // Inserisco nello span corretto il testo del messaggio
        messaggio_risposta.children('.messaggio-testo').text('ok');
        // Aggiungo le classi corrette al div messaggio
        messaggio_risposta.addClass('ricevuto bianco');
        // Inserisco il messaggio all'interno del container
        $('.chat.attivo').append(messaggio_risposta);
    }

    // Simulo il click sul contatto per avere appena apro la pagina una conversazione attiva
    $('.utenti-lista-riga attivo').trigger('click');

});


// Contenitore di tutte le conversazioni
// Contiene un oggetto per ogni conversazione, in cui la chiave è l'id della conversazione e il valore un array di oggetti messaggio
var conversazioni = {
    '1' : [
        {
            'testo': 'Ciao Michela',
            'direzione': 'spedito verde'
        },
        {
            'testo': 'Ciao, come stai?',
            'direzione': 'ricevuto bianco'
        }
    ],
    '2' : [
        {
            'testo': 'Ciao Giovanna',
            'direzione': 'spedito verde'
        },
        {
            'testo': 'Ciao, come stai?',
            'direzione': 'ricevuto bianco'
        }
    ],
    '3' : [
        {
            'testo': 'Ciao Martina',
            'direzione': 'spedito verde'
        },
        {
            'testo': 'Ciao, come stai?',
            'direzione': 'ricevuto bianco'
        }
    ],
    '4' : [
        {
            'testo': 'Ciao Lucia',
            'direzione': 'spedito verde'
        },
        {
            'testo': 'Ciao, come stai?',
            'direzione': 'ricevuto bianco'
        }
    ],
    '5' : [
        {
            'testo': 'Ciao Mario',
            'direzione': 'spedito verde'
        },
        {
            'testo': 'Ciao, come stai?',
            'direzione': 'ricevuto bianco'
        }
    ],
    '6' : [
        {
            'testo': 'Ciao Paolo',
            'direzione': 'spedito verde'
        },
        {
            'testo': 'Ciao, come stai?',
            'direzione': 'ricevuto bianco'
        }
    ],
    '7' : [
        {
            'testo': 'Ciao Matteo',
            'direzione': 'spedito verde'
        },
        {
            'testo': 'Ciao, come stai?',
            'direzione': 'ricevuto bianco'
        }
    ],
    '8' : [
        {
            'testo': 'Ciao Claudia',
            'direzione': 'spedito verde'
        },
        {
            'testo': 'Ciao, come stai?',
            'direzione': 'ricevuto bianco'
        }
    ]
};
