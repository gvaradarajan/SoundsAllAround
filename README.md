#SoundsAllAround

SoundsAllAround is a web application for sharing and listening to music. It was
 inspired by SoundCloud and built using Ruby on Rails and React.js.

Explore and Listen [here](http://www.soundsallaround.space/)

###Landing Page:

![landing]

###Home View:

![userhome]

###Technical Details:

####Generating Waveforms
One aspect of SoundCloud that I felt would be interesting to replicate is the use
of a track's waveform as an audio player.

#####Caching The Waveform Data
Originally the plan was to use a library like wavesurfer.js in order to draw the
waveforms on a canvas element. However, such libraries tend to require the buffering
of the entire audio from the source in order to dynamically draw the waveforms.
This leads to egregiously high load times for a page where multiple waveforms need
to be displayed. Instead, I decided to use the ffmpeg library to decode amplitude
information from the track upon upload and then store the amplitudes in database as
part of the track's record.

Below is the additional migration used to support amplitude storage in the database:

```
class AddAmplitudesToTracks < ActiveRecord::Migration
  def change
    add_column :tracks, :amplitudes, :integer, array: true
  end
end

```

To decode the track's amplitudes on upload, it was necessary to run a console
command from within the track controller's create action. In the same function,
I also average over equal sized portions of the raw amplitude list to produce an
array of 140 amplitudes.

```
def create
  @track = Track.new(track_params)

  `ffmpeg -i #{track_params['audio'].path} -ac 1 -filter:a aresample=8000 -map 0:a -c:a pcm_s16le -f data - > temp.txt`

  contents = IO.binread("temp.txt").unpack('s*')

  arr = []

  amps = []

  contents.each_index do |i|
    if i % 2 == 0
      if contents[i] && contents[i+1]
        arr.push((contents[i] - contents[i+1]).abs)
      end
    end
  end

  segsize = arr.length / 140

  (0...140).each do |i|
    j = i * segsize
    total = 0
    while j < ((i+1) * segsize)
      total += arr[j]
      j += 1
    end
    amps.push(total / segsize)
  end

  @track.amplitudes = amps

  `rm temp.txt`

  if @track.save
    render :show
  else
    render @track.errors.full_messages, status: 422
  end
end

```

#####Creating The Waveform
Section to be added soon!

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
