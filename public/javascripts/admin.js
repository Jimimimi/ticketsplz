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
  console.log('New ticket:', data);
  ion.sound.play("bell_ring");
});

socket.on('updatedTicket', function(data){
  console.log('Updated Ticket:', data);
  ion.sound.play("button_tiny");

});
