(function(ENV) {
  const client_id = ENV.client_id;

  SC.initialize({
    client_id: client_id
  });

  var randomINTSC = Math.ceil(Math.random() * 10000);

  SC.get('/tracks/', {
    q: randomINTSC
  }).then(function(tracks) {



    var songSC = tracks[0];

    console.log(songSC);

    SC.stream('/tracks/' + songSC.id).then(function(player) {
      var playSC = document.querySelector('.play');
      playSC.addEventListener('click', function() {
        player.play();
      });

      var pauseSC = document.querySelector('.pause');
      pauseSC.addEventListener('click', function() {
        player.pause();
      });

      var seekBackwardSC = document.querySelector('.seek-back');
      seekBackwardSC.addEventListener('click', function() {
        var currentTime = player.currentTime();
        var seekBackward = currentTime - 15000;
        player.seek(seekBackward);
      });

      var seekForwardSC = document.querySelector('.seek-forward');
      seekForwardSC.addEventListener('click', function() {
        var currentTime = player.currentTime();
        var seekForward = currentTime + 15000;
        player.seek(seekForward);
      });

      var randomSC = document.querySelector('.random');
      randomSC.addEventListener('click', function() {
        location.reload(true);
        player.play();
      });

      var volUpSC = document.querySelector('.vol-up');
      volUpSC.addEventListener('click', function() {
        volUp = player.getVolume() + 0.10;
        if (player.getVolume() <= 0.99) {
          player.setVolume(volUp);
        } else {
          player.setVolume(1);
        }
      });

      var volDownSC = document.querySelector('.vol-down');
      volDownSC.addEventListener('click', function() {
        volDown = player.getVolume() - 0.10;
        if (player.getVolume() >= 0.01) {
          player.setVolume(volDown);
        } else {
          player.setVolume(0);
        }
        console.log(player.getVolume());
      });

      var artistSC = document.querySelector('.artist');
      artistSC.innerHTML = 'Artist: ' + songSC.user.username;

      var artistURLSC = document.querySelector('.artist-url');
      artistURLSC.setAttribute('href', ('http://soundcloud.com/' + songSC.user.permalink));
      artistURLSC.innerHTML = 'Artist URL: http://soundcloud.com/' + songSC.user.permalink;

      var songTitleSC = document.querySelector('.song-title');
      songTitleSC.innerHTML = 'Song Title: ' + songSC.title;

      var songURLSC = document.querySelector('.song-url');
      songURLSC.setAttribute('href', songSC.permalink_url);
      songURLSC.innerHTML = 'Song URL: ' + songSC.permalink_url;

      var descriptionSC = document.querySelector('.description');
      descriptionSC.innerHTML = 'Description: ' + songSC.description;

      var genreSC = document.querySelector('.genre');
      genreSC.innerHTML = 'Genre: ' + songSC.genre;

      var createdSC = document.querySelector('.created');
      createdSC.innerHTML = 'Released: ' + songSC.created_at;

      var artworkSC = document.querySelector('.artwork');
      artworkSC.setAttribute('src', songSC.artwork_url.replace('large', 't300x300'));

    }).catch();

  });





})(ENV)
