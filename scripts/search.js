function search(){
  var search = document.getElementById("searchbar").value;
  var link = "https://google-in-1998-node.jenekif499.repl.co/search?query=" + encodeURIComponent(search);
  if ((search?.trim()?.length || 0) > 0) {
    window.location.href = link;
  }
}
function lucky() {
  var query = document.getElementById("searchbar").value;
  window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(query) + '&btnI&noredirect=1';
}