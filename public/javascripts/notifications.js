var noteContainer = document.querySelectorAll('.note-container').item(0);

var notifier = {
  notify: notify,
  dismiss: dismiss
}

function notify(status, message){
  dismiss();
  noteContainer.classList.add('open');
  noteContainer.classList.add(status);
  noteContainer.innerText = message;
}

function dismiss(){
  noteContainer.className = 'note-container';
  noteContainer.innerHtml = '';
}
