(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{560:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return c}));var r=n(70);const o=Symbol("implicit");function c(){var e=new Map,t=[],n=[],i=o;function u(r){var c=r+"",u=e.get(c);if(!u){if(i!==o)return i;e.set(c,u=t.push(r))}return n[(u-1)%n.length]}return u.domain=function(n){if(!arguments.length)return t.slice();t=[],e=new Map;for(const r of n){const n=r+"";e.has(n)||e.set(n,t.push(r))}return u},u.range=function(e){return arguments.length?(n=Array.from(e),u):n.slice()},u.unknown=function(e){return arguments.length?(i=e,u):i},u.copy=function(){return c(t,n).unknown(i)},r.b.apply(u,arguments),u}},563:function(e,t,n){"use strict";t.a=function(e,t){let n,r;if(void 0===t)for(const t of e)null!=t&&(void 0===n?t>=t&&(n=r=t):(n>t&&(n=t),r<t&&(r=t)));else{let o=-1;for(let c of e)null!=(c=t(c,++o,e))&&(void 0===n?c>=c&&(n=r=c):(n>c&&(n=c),r<c&&(r=c)))}return[n,r]}},598:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return s}));var r=n(1),o=n.n(r),c=n(573),i=n(5),u=n(574),a=n(2);function l(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,o=!1,c=void 0;try{for(var i,u=e[Symbol.iterator]();!(r=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,c=e}finally{try{r||null==u.return||u.return()}finally{if(o)throw c}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function f(e){var t=e.data,n=e.iterate,l=Object(r.useMemo)((function(){return{devicePixelRatio:window.devicePixelRatio,height:window.innerHeight,width:window.innerWidth}}),[]),f=l.devicePixelRatio,s=l.height,d=l.width,h=Object(r.useRef)(null);Object(r.useEffect)((function(){if(document.querySelector("#offscreen-canvas")){var e=new u.RenderWorker;h.current=e;var r=document.querySelector("#offscreen-canvas").transferControlToOffscreen();e.postMessage({type:"init",payload:{canvas:r,data:t,debugLogs:!0,devicePixelRatio:f,exclude:["label"],height:s,iterate:n,width:d}},[r]),e.onmessage=function(e){console.log(e)}}}),[t,f,s,n,d]);var b=Object(u.useUMAP)({data:t,debugLogs:!1,exclude:Object(r.useMemo)((function(){return["label"]}),[]),iterate:n}),v=b.computing,g=b.coordinates,p=b.error,w=b.iteration,y=b.nEpochs;return Object(r.useEffect)((function(){h.current&&g&&h.current.postMessage({type:"compute",payload:{coordinates:g}},[g])}),[g]),Object(a.c)(o.a.Fragment,null,Object(a.c)(c.a,null),Object(a.c)("div",{style:{height:"100vh",width:"100vw"}},Object(a.c)("canvas",{height:s*f,id:"offscreen-canvas",style:{height:s,width:d},width:d*f}),v&&!w?Object(a.c)(i.f,null,"Computing..."):null,v&&w?Object(a.c)(i.f,null,"Iteration ".concat(w+1).concat(y?" of ".concat(y):"")):null,p?Object(a.c)(i.f,null,p.message||"Unknown error 😭"):null))}function s(e){var t=l(Object(r.useState)(!1),2),n=t[0],o=t[1];return n?Object(a.c)(f,e):Object(a.c)(i.e,{onClick:function(){return o(!0)}},"Let's UMAP!")}}}]);