#SoundsAllAround

SoundsAllAround is a web application for sharing and listening to music. It was
 inspired by SoundCloud and built using Ruby on Rails and React.js.

Explore and Listen [here](http://www.soundsallaround.space/)

###Landing Page:

![landing]

###Home View:

![userhome]

###Technical Details:

####Track Items
In order to minimize the number of React components required in the application,
 many of the components have been designed to be reusable. Perhaps the best example
 is the component used to display tracks in a collection (called `TrackIndexItem`).
 It takes as one of its props a string with one of two values ("portrait" or "landscape").
 Based on the prop, the component returns a different set of HTML elements in its
 `render` function, as can be seen in the below functions belonging to the component.

```
generatePlayButton: function () {
  var button = "";
  var id = this.props.track.id;
  if (this.props.orientation === "portrait") {
    button = (
      <div id={'play-'+id} className="play-button-container"
        onClick={this.changePlayState}>
      </div>
    );
  }
  else {
    button = (
      <div id={'play-'+id} className="play-button-container"
        onClick={this.sendTicker}>
      </div>
    );
  }
  return button;
}

...

producePlayer: function () {
  var els = "";
  var id = this.props.track.id;
  if (this.props.orientation === "landscape") {
    els = (
      <canvas id={"canvas-" + id} className="index-canvas" width="500" height="100"
              onClick={this.seek} />
    );
  }
  return els;
}
...

render: function() {
  var orient = this.props.orientation;
  var track = this.props.track;
  var title = track && track.title;
  var artist = track && track.artist;
  return (
    <li className={"track-" + orient + " group"} id={track.id}>
      <img className="track-img" src={track ? track.image : ""}
            onClick={this.changePlayState} />
      {orient === "portrait" ? this.generatePlayButton() : ""}
      <div className="track-nopic">
        {orient === "landscape" ? this.generatePlayButton() : ""}
        <div className="track-info">
          <h2><a onClick={this.linkToArtistShow}>{artist}</a></h2>
          <h1><a onClick={this.linkToTrackShow}>{title}</a></h1>
          <audio ref="audio_tag"
                 id={"track-audio" + track.id}
                 src={track.audio}
                 preload="metadata"
                 onEnded={this.receiveEndOfAudio}></audio>
               {this.producePlayer()}
        </div>
      </div>
    </li>
  );
}
```

Landscape views are for viewing tracks of a particular playlist and include a track
 player. The portrait views are for viewing all of the recent tracks or the tracks
 of a particular artist. All of these cases are handled by a single component.  


###Features
* Sign up/in with email
* Playing and pausing tracks (with accompanying visual)
* Upload your own tracks
* Create playlists of your or others' tracks

###To-Do:
* [ ] Implement following other users and liking tracks
* [ ] OAuth for Facebook login
* [ ] Notifications
* [ ] Waveform visualization
* [ ] Click to skip inside of a track
* [ ] Infinite scroll
* [ ] Search
* [ ] Multiple Sessions
* [ ] Comments
* [ ] Tags
* [ ] Playlists
* [ ] Reposts

[Original Design Docs](./docs/README.md)

[landing]: ./docs/images/landing.png
[userhome]: ./docs/images/userhome.png
