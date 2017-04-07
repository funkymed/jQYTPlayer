#jQYTPlayer

jQYTPlayer is a player that will display a Youtube player you can customize.

Demo : http://med.planet-d.net/demo/web/jQYTPlayer/

GitHub : http://github.com/funkymed/jQYTPlayer

##Documentation

###How to use

~~~
$('#videos').jQYTPlayer('mxfmxi-boyo');
~~~

###Options

~~~
var options = {
  width:300,
  height:200,
  loop:false,
  autoplay:true,
  controls:true,
  showinfo:true,
  theme:'dark', // dark or light
  start:0,      // where the video start
  policy:3,     // 1 or 3
  rel:0         // 0 or 1 Display related video at the end
};
$('#videos').jQYTPlayer('mxfmxi-boyo', options);
~~~

###Custom Player

###Loader
~~~
var player = $('#videos').jQYTPlayer('mxfmxi-boyo');
player.loader = $('.loader');
~~~

####Action

Player Action

~~~
var player = $('#videos').jQYTPlayer('mxfmxi-boyo');
player.play();
player.stop();
player.pause();
~~~

Get Progression

~~~
var player = $('#videos').jQYTPlayer('mxfmxi-boyo');
player.onPlaying=function()
{
  var pourcent = this.getProgress();
};
~~~

####Callback

fire callback when ...
~~~
onPause               // video is paused
onPlay                // video is played
onStop                // video is stoppped
onPlaying             // video is playing
onReadyCallback       // player is ready
onLoadDataCallback    // player load data
onStateChangeCallback // player state changed
onEnd                 // video is finished
onBufferize           // player is bufferring
~~~

