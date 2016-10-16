var models = require('../models');
var controller = {
  index: index,
  render: render,
  create: create,
  update: update
}

module.exports = controller;

function index (req,res,next){
  res.render('new-ticket');
}

function render (req,res,next){
  models.Ticket.findOne({
    where: {id: req.params.ticket},
    include: [ models.Update ]
  })
  .then(function(ticket){
    res.render('view-ticket', {ticket: ticket});
  })
  .catch(function(err){
     next(new Error('failed to load ticket'));
  });
}

function create (req,res,next){
  // Set author to anonymous if no email in the request body
  var author = req.body.author !== '' ? req.body.author : 'anonymous' ;

  var ticket = {
    description: req.body.description,
    category: '',
    status: 'open',
    author: author
  };

  models.Ticket.create(ticket)
  .then(function(ticket){
    // Fire socket.io event
    res.io.emit('newTicket', ticket);
    // redirect to view
    res.redirect('/ticket/' + ticket.id);
  })
  .catch(function(err){
    next(new Error(err));
  });
}

function update (req,res,next){
  // Get original ticket author
  models.Ticket.findById(req.params.ticket)
  .then(function(ticket){

    var update = {
      author: ticket.author,
      data:   req.body.update,
      timestamp: new Date(),
      TicketId: req.params.ticket
    };
    models.Update.create(update)
    .then(function(update){

      // Fire socket.io event
      res.io.emit('updatedTicket', {});

      // redirect to view
      res.redirect('/ticket/' + req.params.ticket);
    })
  })
  .catch(function(err){
    next(new Error(err));
  })
}
