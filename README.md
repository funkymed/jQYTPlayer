#YT-Player

jQYTPlayer is a player that will display a Youtube player you can customize.

Demo : http://www.cyrilpereira.com/yt-player

GitHub : http://github.com/funkymed/yt-player

##Documentation

###How to use

~~~
$('#videos').YTPlayer('mxfmxi-boyo');
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
$('#videos').YTPlayer('mxfmxi-boyo', options);
~~~

###Interface