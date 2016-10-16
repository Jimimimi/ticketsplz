var models = require('../models');
var controller = {
  index: index,
  render: render,
  update: update,
  updateStatus: updateStatus
}

module.exports = controller;

function index (req,res,next){
  var filter = '*';
  var query = {};

  if (req.query.filter !== undefined){
    filter = req.query.filter;
    query = {where:{status: filter}};
  }
  
  models.Ticket.findAll(query)
  .then(function(tickets){
    res.render('admin-list-tickets', {tickets:tickets, activeFilter:filter});
  })
  .catch(function(err){
    next(new Error(err));
  })
}

function render (req,res,next){
  models.Ticket.findOne({
    where: {id: req.params.ticket},
    include: [ models.Update ]
  })
  .then(function(ticket){
    res.render('admin-view-ticket', {ticket: ticket});
  })
  .catch(function(err){
     next(new Error('failed to load ticket'));
  });
}

function update (req,res,next){
  var update = {
    author: req.body.author,
    data:   req.body.update,
    timestamp: new Date(),
    TicketId: req.params.ticket
  };
  models.Update.create(update)
  .then(function(update){
    res.redirect('/admin/ticket/' + req.params.ticket);
  })
  .catch(function(err){
    next(new Error(err));
  })
}

function updateStatus (req,res,next){
  var status = req.query.status;
  console.log('This is my status:', status);
  var update = {
    author: 'admin',
    data:   'Changed the status to ' + status,
    timestamp: new Date(),
    TicketId: req.params.ticket
  };
  models.Ticket.find({
    where: {id:req.params.ticket}
  })
  .then(function(ticket){
    ticket.update({
      status: status
    })
    .then(function(ticket){
      console.log('This is my ticket', ticket);
      models.Update.create(update)
      .then(function(update){
        res.redirect('/admin/ticket/' + req.params.ticket);
      })
    })
  })
  .catch(function(err){
    next(new Error(err));
  })

}
