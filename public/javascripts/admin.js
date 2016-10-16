var socket = io('//localhost:3000');

ion.sound({
    sounds: [
        {
            name: "bell_ring"
        },
        {
            name: "button_tiny",
        }
    ],
    volume: 0.5,
    path: "/sounds/",
    preload: true
});
socket.on('newTicket', function(data){
  ion.sound.play("bell_ring");
  notifier.notify('info', 'A new ticket was just submitted by ' + data.author);
});

socket.on('updatedTicket', function(data){
  ion.sound.play("button_tiny");

});
