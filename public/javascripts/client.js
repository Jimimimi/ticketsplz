var anonAnchor = document.querySelectorAll('a.anon').item(0);
var authorInput = document.querySelectorAll('input.author').item(0);

authorInput.addEventListener('blur', function(){
  if (authorInput.value === '')
    resetAuthor();
});

anonAnchor.addEventListener('click', editAuthor);

function editAuthor(){
  anonAnchor.style.display = 'none';
  authorInput.style.display = 'inline-block'
  authorInput.focus();
}

function resetAuthor(){
  anonAnchor.style.display = 'inline';
  authorInput.style.display = 'none'
}
