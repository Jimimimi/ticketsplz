var models = require('../models');
var controller = {
  index: index,
  find: find,
  render: render,
  update: update,
  updateStatus: updateStatus
}

module.exports = controller;

function index (req,res,next){
  models.Ticket.findAll()
  .then(function(tickets){
    res.render('admin-list-tickets', {tickets:tickets});
  })
  .catch(function(err){
    next(new Error(err));
  })
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
  res.render('admin-view-ticket', {ticket: req.ticket});
}

function update (req,res,next){
  var update = {
    author: req.body.author,
    data:   req.body.update,
    timestamp: new Date(),
    TicketId: req.ticket.id
  };
  models.Update.create(update)
  .then(function(update){
    res.redirect('/admin/ticket/' + req.ticket.id);
  })
  .catch(function(err){
    next(new Error(err));
  })
}

function updateStatus (req,res,next){
  var update = {
    author: req.query.author,
    data:   'Changed the status to ' + req.query.status,
    timestamp: new Date(),
    TicketId: req.ticket.id
  };
  models.Ticket.findById(req.ticket.id)
  .then(function(ticket){
    ticket.status = req.query.status;
    ticket.save()
    .then(function(){
      models.Update.create(update)
      .then(function(update){
        res.redirect('/admin/ticket/' + req.ticket.id);
      })
    })
    .catch(function(err){
      next(new Error(err));
    })
  })

}
