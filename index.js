function handleSubmit(){
  $('.submit').on('click', '.submitButton', function(e){
    e.preventDefault();
    console.log('click');
    search();
    document.getElementById('search').reset();
    
  } );
}

function renderPage(item){
  let videoId = item.id.videoId;
  let title = item.snippet.title;
  let description = item.snippet.description;
  let thumb = item.snippet.thumbnails.default.url;

  let output = `<li>
                ${title} <br>
                <a href="https://www.youtube.com/watch?v=${videoId}"><img src="${thumb}"</a>
                </li>`
  return output;
}
function search(){

  //get form input
  q=$('.query').val();
  console.log(q);
  
  //handle get request
  
  $.get(
      "https://www.googleapis.com/youtube/v3/search",{
        maxResults: 5,
        part: 'snippet, id',
        q: q,
        type: 'video',
        key: 'AIzaSyCERdgBz7tm-gzGzK__3aT17qRUMV8aAS0'},
        function(data){
          console.log(data);


          //  output render to screen  
          $.each(data.items, function(i, item){
            let render = renderPage(item);
            
            //show new results
            $('#results').append(render);
          })
        }
    );
}
$(handleSubmit);
