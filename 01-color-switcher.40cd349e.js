const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),a=document.querySelector("body");t.addEventListener("click",(()=>{i.onStart()})),e.addEventListener("click",(()=>{i.onStop()})),e.disabled=!0;const i={isActive:!1,intervalID:null,onStart(){this.isActive?e.disabled=!0:(this.isActive=!0,t.disabled=!0,e.disabled=!1,this.intervalID=setInterval((()=>{a.style.background=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3))},onStop(){clearInterval(this.intervalID),this.isActive=!1,t.disabled=!1,e.disabled=!0}};
//# sourceMappingURL=01-color-switcher.40cd349e.js.map
