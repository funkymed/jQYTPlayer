#jQYTPlayer

jQYTPlayer is a player that will display a Youtube player you can customize.

Demo : http://www.cyrilpereira.com/jQYTPlayer

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

###Interface