let musicInfo = [];
$('#errorEmptyQuery').hide();

function addSongFromField(event) {
  event.preventDefault();

  const info = $('#musicField').eq(0).val();

  if (info == "") {
    $('#errorEmptyQuery').show();
  } else {
    $('#errorEmptyQuery').hide();
    musicInfo.push(info);
    renderList();
    $('#musicField').eq(0).val('');
  }
}

$('#addButton').click(addSongFromField);
$('#musicField').keyup(function(event) {
  if (event.which == 13) { // User presses Enter
    addSongFromField(event);
  }
});

function renderList() {
  const $list = $('.info').eq(0);
  $list.empty();
  for (const info of musicInfo) {
    const $item = $('<li class="list-group-item">').text(info);
    $item.append("<input type='button' value='delete' class='del'>");
    $list.append($item);
    let objToDelete = [];
    let textToDelete = [];
    $(".del").click(function() {
      objToDelete = $(this).parent(); 
      textToDelete.push(objToDelete.text());
      objToDelete.remove();
      let newMusicInfo = musicInfo.filter(function(x) {
        return x != textToDelete;
      }); console.log("new" + newMusicInfo)
      musicInfo = newMusicInfo;
    });
  }
}

$('#getPlaylistBtn').click(function (event) {
  // TODO: Display a list of music.
  // You may use anything from musicInfo.
  //console.log('Testing Music Call');
  let searchKey = musicInfo.join('+');
  console.log(searchKey);

  $.ajax({
    url: "http://itunes.apple.com/search?" + "term=" + searchKey + "&limit=10",
    dataType: 'json'
  }).then(function (json) {
    $("#playlist").empty();
    if((json.results).length === 0) {
      $("#playlist").append('<p>No results found!</p>')
    }
    $.each(json.results, function( key, value ) {        
      $("#playlist").append($("<p>").text(value.trackName + " by " + value.artistName));
  });
  }).catch(function (err) {
    console.error( 'something went wrong', err );
  });

});