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
 `render` function.

```
To be replaced with key portions of code
```


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
