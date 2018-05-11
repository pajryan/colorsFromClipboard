import "./stylesheets/main.css";

// Small helpers you might want to keep
import "./helpers/context_menu.js";
import "./helpers/external_links.js";

// ----------------------------------------------------------------------------
// Everything below is just to show you how it works. You can delete all of it.
// ----------------------------------------------------------------------------

import { remote } from "electron";
import jetpack from "fs-jetpack";
import env from "env";

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());


// const RGBaster = require('rgbaster');

// Holy crap! This is browser window with HTML and stuff, but I can read
// files from disk like it's node.js! Welcome to Electron world :)
const manifest = appDir.read("package.json", "json");


const pasteImage = require('./imageFromPaste/pasteImage');
const extractColors = require('./colorsFromImage/colorExtract');
const _ = require("lodash");
const rgb2hex = require('rgb2hex');
const {clipboard} = require('electron')

// Listen for all image paste events on a page
pasteImage.on('paste-image', function (source) {

  //clear existing
  let tgt = document.getElementById("img")
  tgt.innerHTML = "";

  // console.log("returned:", source)

  var pastedImage = new Image();
  pastedImage.id = "pastedImage";
  pastedImage.onload = function () {
    // Have the image loaded, get colors
    getImageColors();
    // self.emit('paste-image', pastedImage);
  };
  pastedImage.src = source;
  tgt.appendChild(pastedImage);

});


function getImageColors(){
  var img = document.getElementById('pastedImage');

  extractColors.colors(img, {
    success: function(payload) {

      let cc = []
      for(let itm in payload.colors){
        cc.push({
          rgb: itm,
          count: payload.colors[itm]
        });
      }
      cc = cc.filter(o => o.count>0);
      cc = _.orderBy(cc, ["count"], ['desc']);

      buildcolorUI(cc)
    }
  });
}



function buildcolorUI(cc){
  var ch = document.getElementById("colorInfo");
  document.getElementById("clipText").style.display="block";
  cc.forEach((c,i) => {
    
    var dv = document.createElement("div");
    dv.className = "keyWrap"

    var kb = document.createElement("div");
    kb.className = "keyBox"
    kb.style.background = "rgb("+c.rgb+")";
    dv.appendChild(kb);

    var rgbStr = "rgb("+c.rgb+")";

    var spn = document.createElement("span");
    var spnH = document.createElement("span"); spnH.className = "hex";
    var spnR = document.createElement("span"); spnR.className = "rgb";
    spnH.innerHTML = rgb2hex(rgbStr).hex;
    spnR.innerHTML = "rgb("+c.rgb+")";
    spn.appendChild(spnH);
    spn.appendChild(spnR);
    spn.className = "keyText"
    dv.appendChild(spn)

    spnH.addEventListener('click', e => {clipboard.writeText(e.target.innerHTML)})
    spnR.addEventListener('click', e => {clipboard.writeText(e.target.innerHTML)})

    ch.appendChild(dv)
  })

}


