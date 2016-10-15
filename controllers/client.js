var models = require('../models');
var controller = {
  index: index,
  find: find,
  render: render,
  create: create,
  update: update
}

module.exports = controller;

function index (req,res,next){
  res.render('new-ticket');
}

function find (req,res,next,id){
  models.Ticket.find({id: id, include: [ models.Update ]})
  .then(function(ticket){

    req.ticket = ticket;
    next();
  })
  .catch(function(err){
     next(new Error('failed to load ticket'));
  });
}

function render (req,res,next){
  console.log(req.ticket);req.ticket
  res.render('view-ticket', {ticket: req.ticket});
}

function create (req,res,next){
  var ticket = {
    description: req.body.description,
    category: '',
    status: 'open',
    author: 'anonymous'
  };

  models.Ticket.create(ticket)
  .then(function(ticket){
    // redirect to view
    res.redirect('/ticket/' + ticket.id);
  })
  .catch(function(err){
    next(new Error(err));
  });
}

function update (req,res,next){
  var update = {
    author: req.query.author,
    data:   req.query.update,
    timestamp: new Date(),
    TicketId: req.ticket.id
  };
  models.Update.create(update)
  .then(function(update){
    res.redirect('/ticket/' + req.ticket.id);
  })
  .catch(function(err){
    next(new Error(err));
  })
}
