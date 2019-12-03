$(document).ready(function() {
    // Setto la width dell'avater present nelle notifiche
    var heightNotificheAvatar = $('.utenti-notifiche-avatar').height();
    $('.utenti-notifiche-avatar').width(heightNotificheAvatar);

    var heightHeaderAvatar = $('.utenti-header-avatar img').height();
    $('.utenti-header-avatar img').width(heightHeaderAvatar);

    var heightListaAvatar = $('.utenti-lista-avatar img').height();
    $('.utenti-header-avatar img').width(heightHeaderAvatar);

    var heightListaAvatar = $('.messaggi-header-avatar-cerchio img').height();
    $('.messaggi-header-avatar-cerchio img').width(heightHeaderAvatar);


    // Evento enter nell'input del messaggio
    $('.msg').keypress(function(event){
    	var keycode = (event.keyCode ? event.keyCode : event.which);
    	if(keycode == '13'){
            risposta = $('.msg').val();
            message = "<div class='messaggio spedito verde'>" + risposta + "</div>";
            $(message).appendTo($('.messaggi-main'));
            $(this).val('');
    	}
    });
});
