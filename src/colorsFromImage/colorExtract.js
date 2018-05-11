
  "use strict";

  // Helper functions.
  var getContext = function(imgObj){
    let cv = document.createElement("canvas");
    cv.width = imgObj.width;
    cv.height = imgObj.height;
    // document.body.appendChild(cv)
    return cv.getContext('2d');
  };

  var getImageData = function(img, loaded){

    var imgObj = new Image();
    var imgSrc = img.src || img;

    // Can't set cross origin to be anonymous for data url's
    // https://github.com/mrdoob/three.js/issues/1305
    if ( imgSrc.substring(0,5) !== 'data:' )
      imgObj.crossOrigin = "Anonymous";

    imgObj.onload = function(){
      var context = getContext(imgObj);
      context.drawImage(imgObj, 0, 0);

      var imageData = context.getImageData(0, 0, imgObj.width, imgObj.height);
      loaded && loaded(imageData.data);
    };

    imgObj.src = imgSrc;

  };

  var makeRGB = function(name){
    return ['rgb(', name, ')'].join('');
  };

  var mapPalette = function(palette){
    return palette.map(function(c){ return makeRGB(c.name); });
  };


  // RGBaster Object
  // ---------------
  //
  var BLOCKSIZE = 5;

  var RGBaster = function () {
  };

  RGBaster.prototype.colors = function(img, opts){

    opts = opts || {};
    var exclude = opts.exclude || [ ]; // for example, to exclude white and black:  [ '0,0,0', '255,255,255' ]

    getImageData(img, function(data){

      var length = data.length, //( img.width * img.height ) || data.length,
          colors = {},
          rgb = [],
          rgbString = "";
          

      // Loop over all pixels, in BLOCKSIZE iterations.
      var i = 0;
      while ( i < length ) {
        rgb[0] = data[i];
        rgb[1] = data[i+1];
        rgb[2] = data[i+2];
        rgbString = rgb.join(",");

        // skip undefined data
        if (rgb.indexOf(undefined) !== -1) {
          // Increment!
          i += BLOCKSIZE * 4;
          continue;
        }

        // Keep track of counts.
        if ( rgbString in colors ) {
          colors[rgbString] = colors[rgbString] + 1;
        }
        else{
          colors[rgbString] = 1;
        }

        // Increment!
        i += BLOCKSIZE * 4;
      }


      if ( opts.success ) {
        opts.success({
          colors: colors
        });
      }
    });
  };

  module.exports = new RGBaster();

