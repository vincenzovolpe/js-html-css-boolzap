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

    // Recupero l'html del template del messaggio
    var template_html = $('#template').html();
    // Compilo l'html  con la funzione di handlebars
    var template_function = Handlebars.compile(template_html);

    // Recupero l'html del template della conversazione
    var template_conversazione_html = $('#template-conversazione').html();
    // Compilo l'html  con la funzione di handlebars
    var template_conversazione_function = Handlebars.compile(template_conversazione_html);

    // Popoliamo i contenitori dei messaggi
    // Scorro tutte le chat contenute nell'oggetto conversazioni
    for (var codice_conversazione in conversazioni) {
        var variabili_conversazione = {
            'codice': codice_conversazione
        };
        var contenitore_messaggi = template_conversazione_function(variabili_conversazione);
        $('.messaggi-main').append(contenitore_messaggi);
        //var contenitore_messaggi = '<div  data-chat="' + codice_conversazione +'" class="chat"></div>';
        //var contenitore_messaggi = $('.template .chat').clone();
        //contenitore_messaggi.attr('data-chat', codice_conversazione);

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

            var variabili = {
                'testo': testo_messaggio,
                'direzione': tipo_messaggio
            };
            var nuovo_messaggio = template_function(variabili);
            /*
            // Clono il template del messaggio
            var nuovo_messaggio = $('.template .messaggio').clone();
            // Inserisco nello span corretto il testo del messaggio
            nuovo_messaggio.children('.messaggio-testo').text(testo_messaggio);
            // Aggiungo le classi corrette al div messaggio
            nuovo_messaggio.addClass(tipo_messaggio);
            // Inserisco il messaggio all'interno del container
            */
            $('.chat[data-chat="' + codice_conversazione + '"]').append(nuovo_messaggio);
        }
    }

    // Evento click sul microfono
    $(document).on('click', '.messaggio-vocale', function(){
        inviaMessaggioDue();
        $('.messaggio-vocale i').removeClass('fas fa-2x fa-paper-plane').addClass('fas fa-2x fa-microphone');
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
            $('.messaggio-vocale i').removeClass('fas fa-2x fa-paper-plane').addClass('fas fa-2x fa-microphone');
        }
    });

    // Ricerca persone quando scrivo nell'input per la ricerca
    $('.cerca').keyup(function(){
        // recupero il testo digitato nella ricerca
    	var nomecercato = $('.cerca').val().toLowerCase();
        console.log(nomecercato);
        // Verifico se ci sono valori di testo che corrispondono al valore del campo di input. Il metodo toggle () nasconde la riga che non corrisponde alla ricerca. Usiamo il metodo toLowerCase() per convertire il testo in lettere minuscole, il che rende insensibile il caso di ricerca
        $('.utenti-lista-riga').filter(function() {
            // Memorizzo il percorso giusto dove cercareossia soltanto all'interno del nome presente in h4
            var percorso = $(this).children('.utenti-lista-msg').children('.utenti-lista-msg-nome').children('h4');
            $(this).toggle(percorso.text().toLowerCase().indexOf(nomecercato) > -1);
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
        // Imposto la scroll bar sempre al bottom nell'area messaggi
        $('.messaggi-main').scrollTop($('.messaggi-main').prop("scrollHeight"));
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
            tempo = '<small class="messaggio-tempo">' + time + '</small>';
            icona = '<i class="fa fa-chevron-down"></i>';
            pannello = '<div class="messaggio-pannello"><div class="messaggio-pannello-info">Info messaggio</div><div class="messaggio-pannello-cancella">Cancella messaggio</div></div>';
            message = "<div class='messaggio spedito verde'><span>" + risposta + "</span>" + icona + tempo + pannello + "</div>";
            $(message).appendTo($('.messaggi-main .chat.attivo'));
            tempoRisposta();
            $('.msg').val('');
        }
    }*/
    function tempoRisposta() {
      setTimeout(inviaRispostaDue, 1000);
  }
    // Funzione inviaMessaggio funzionante con il template
    function inviaMessaggioDue() {
        risposta = $('.msg').val();
        if (risposta.length != 0) {
            // Chiamo la funzione per il calcolo dell'orario di invio del messaggio
            var orarioInvio = oraInvio();
            // Preparo le variabili da sostituire nel template
            var variabili = {
                'testo': risposta,
                'tempo': orarioInvio,
                'direzione': 'spedito verde'
            };
            var nuovo_messaggio = template_function(variabili);
            // Clono il template del messaggio
            /*var nuovo_messaggio = $('.template .messaggio').clone();
            // Inserisco nello span corretto il testo del messaggio
            nuovo_messaggio.children('.messaggio-testo').text(risposta);
            // Inserisco nell'elemento small l'orario in cui viene inviato il messaggio
            nuovo_messaggio.children('.messaggio-tempo').text(orarioInvio);
            // Aggiungo le classi corrette al div messaggio
            nuovo_messaggio.addClass('spedito verde');
            */
            // Inserisco il messaggio all'interno del container
            $('.chat.attivo').append(nuovo_messaggio);
            // Risposta del pc coon scritto ok mandata dopo 1 secondo
            tempoRisposta();
            $('.msg').val('');

            // Fissiamo la scrollbar in basso nell'area messaggio
        }
    }

    // Funzione inviaRispostaDue funzionante con il template
    function inviaRispostaDue() {
        // Chiamo la funzione per il calcolo dell'orario di invio del messaggio
        var orarioRisposta = oraInvio();
        // Preparo le variabili da sostituire nel template
        var variabili = {
            'testo': 'ok',
            'tempo': orarioRisposta,
            'direzione': 'ricevuto bianco'
        };
        var messaggio_risposta = template_function(variabili);
        /*// Clono il template del messaggio
        var messaggio_risposta = $('.template .messaggio').clone();
        // Inserisco nello span corretto il testo del messaggio
        messaggio_risposta.children('.messaggio-testo').text('ok');
        // Inserisco nell'elemento small l'orario in cui viene inviato il messaggio di risposta
        messaggio_risposta.children('.messaggio-tempo').text(orarioRisposta);
        // Aggiungo le classi corrette al div messaggio
        messaggio_risposta.addClass('ricevuto bianco');
        */
        // Inserisco il messaggio all'interno del container
        $('.chat.attivo').append(messaggio_risposta);
        // Imposto la scroll bar sempre al bottom nell'area messaggi
        $('.messaggi-main').scrollTop($('.messaggi-main').prop("scrollHeight"));
        // Inserisco nell'elemento h4 dell'utente attivo i primi 50 caratteri dell'ultimo messaggio che ha ricevuto
        $('.utenti-lista-riga.attivo').children('.utenti-lista-msg').children('.utenti-lista-msg-testo').children('p').text(risposta.slice(0,80) + '...');
        // Inserisco nell'elemento small dell'utente attivo l'orario dell'ultimo messaggio che ha ricevuto
        $('.utenti-lista-riga.attivo').children('.utenti-lista-msg').children('.utenti-lista-msg-nome').children('small').text(orarioRisposta);
        // Inserisco nell'elemento small dell'utente attivo l'orario dell'ultimo accesso che ha ricevuto
        $('.messaggi-header-accesso').children('p').children('span').text(orarioRisposta);
    }

    function oraInvio() {
        data = new Date();
        // Ottengo orario e minuto; sui minuti uso una funzione per farmi restituire lo zero davanti se miuti è minore di 10
        time = data.getHours() + ":" + String(data.getMinutes()).padStart(2, '0');
        return time;
    }

    // Simulo il click sul contatto per avere appena apro la pagina una conversazione attiva
    $('.utenti-lista-riga.attivo').trigger('click');

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
