parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"QvaY":[function(require,module,exports) {
for(var e=document.querySelectorAll("audio"),t=0;t<e.length;t++)e[t].addEventListener("canplaythrough",l,!1),e[t].load();var n=0,r=0;function l(t){if(n++,r=Math.floor(100*n/e.length),document.querySelector(".load_status").innerText=r+"%",document.querySelector(".load_fill").style.width=r+"%",n==e.length){for(var u=0;u<e.length;u++)e[u].removeEventListener("canplaythrough",l);setTimeout(o,1e3)}}function o(){var e=document.getElementById("load_screen");e.style.opacity=0,setTimeout(function(){document.querySelector("body").removeChild(e)},2e3)}var u=document.querySelector(".hours"),a=document.querySelector(".minutes"),c=document.querySelector(".seconds"),i=document.querySelector(".separator"),s=document.querySelectorAll(".play");for(t=0;t<s.length;t++)s[t].addEventListener("click",p,!1);var d=document.querySelectorAll(".volume_bar");for(t=0;t<d.length;t++)d[t].addEventListener("input",g,!1),d[t].style.opacity=0;var m=document.querySelector(".mute_btn a"),y=!1;m.addEventListener("click",h,!1);var v=document.querySelector(".reset_btn a");function p(e){y&&h();var t=e.target||e.srcElement,n=t.parentElement.parentElement.querySelector("audio"),r=t.parentElement.parentElement.querySelector(".volume_bar"),l=t.parentElement.parentElement.querySelector("img");n.paused?(r.style.opacity=1,n.loop=!0,0==r.value&&(r.value=.1),n.volume=r.value,n.play(),l.classList.add("playing")):(r.style.opacity=0,n.pause(),n.currentTime=0,r.value=0,l.classList.remove("playing")),console.log(event.target.type),console.log(n)}function g(e){y&&h();var t=e.target||e.srcElement,n=t.value;t.parentElement.querySelector("audio").volume=n}function f(){var e=new Date;u.innerText=e.getHours()<10?"0"+e.getHours():e.getHours(),a.innerText=e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes()}v.addEventListener("click",E,!1),f();var q=setInterval(f,1e3),S=[];function h(){if(y)y=!1,document.querySelector(".unmuted").style.display="inline",document.querySelector(".muted").style.display="none",S.forEach(function(e){e[0].volume=e[1]});else{S.length=0,y=!0,document.querySelector(".unmuted").style.display="none",document.querySelector(".muted").style.display="inline";for(var e=document.querySelectorAll("audio"),t=0;t<e.length;t++)e[t].paused||S.push([e[t],e[t].volume]);S.forEach(function(e){e[0].volume=0})}}function E(){for(var e=document.querySelectorAll("audio"),t=0;t<e.length;t++)e[t].pause(),e[t].currentTime=0,e[t].value=0;var n=document.querySelectorAll(".start_btn img");for(t=0;t<n.length;t++)n[t].classList.remove("playing");var r=document.querySelectorAll(".volume_bar");for(t=0;t<r.length;t++)r[t].value=0,r[t].style.opacity=0}
},{}]},{},["QvaY"], null)
//# sourceMappingURL=/js.33aa70ef.map