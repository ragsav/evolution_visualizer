(this.webpackJsonpgenetic_algorithm=this.webpackJsonpgenetic_algorithm||[]).push([[0],{67:function(t,e,n){},68:function(t,e,n){},75:function(t,e,n){"use strict";n.r(e);var o=n(0),i=n.n(o),a=n(10),r=n.n(a),s=(n(67),n.p,n(68),n(76),n(71),n(40)),c=n(13),l=n(118),d=n(3),u=i.a.createContext(void 0),h=i.a.createContext(void 0),p=function(t){var e=t.children,n=Object(o.useRef)([]),i=Object(o.useState)(null),a=Object(c.a)(i,2),r=a[0],p=a[1],f=Object(o.useState)(50),b=Object(c.a)(f,2),j=b[0],g=b[1],x=Object(o.useState)("Paused"),O=Object(c.a)(x,2),m=O[0],y=O[1],v=Object(o.useState)(!0),F=Object(c.a)(v,2),C=F[0],w=F[1],S=Object(o.useState)(.5),P=Object(c.a)(S,2),T=P[0],k=P[1],z=Object(o.useState)(50),A=Object(c.a)(z,2),D=A[0],W=A[1],E=Object(o.useState)("none"),M=Object(c.a)(E,2),R=M[0],I=M[1],B=Object(o.useState)(null),L=Object(c.a)(B,2),V=L[0],H=L[1],N=Object(o.useState)(1e4),q=Object(c.a)(N,2),G=q[0],J=q[1],Q=Object(o.useState)(100),U=Object(c.a)(Q,2),Y=U[0],_=U[1],X=Object(o.useState)(6),K=Object(c.a)(X,2),Z=K[0],$=K[1],tt=Object(o.useState)([]),et=Object(c.a)(tt,2),nt=et[0],ot=et[1],it=Object(o.useRef)([]),at=Object(o.useState)(null),rt=Object(c.a)(at,2),st=rt[0],ct=rt[1],lt=Object(o.useState)("none"),dt=Object(c.a)(lt,2),ut=dt[0],ht=dt[1],pt=Object(o.useState)(70),ft=Object(c.a)(pt,2),bt=ft[0],jt=ft[1],gt=Object(o.useState)([]),xt=Object(c.a)(gt,2),Ot=xt[0],mt=xt[1],yt=Object(o.useRef)([]);return Object(o.useEffect)((function(){yt.current.length<5&&st&&function(){var t={id:Object(l.a)(),type:ut,position:st,size:bt},e=yt.current;e.push(t),yt.current=e,mt(Object(s.a)(e))}()}),[st]),Object(o.useEffect)((function(){if(it.current.length<5&&V){var t=function(){var t=Object(l.a)(),e={id:t,type:R,position:V,duration:G,amplitude:Z,size:Y,start:Date.now()},n=it.current;return n.push(e),it.current=n,ot(Object(s.a)(n)),t}(),e=setInterval((function(){!function(t){for(var e=it.current,n=e.length,o=0;o<n;o++)if(0===e[o].id.localeCompare(t)){e.splice(o,1);break}it.current=e,0===e.length&&H(null),ot(Object(s.a)(e))}(t)}),[G]);if(0===it.current.length)return function(){clearInterval(e)}}}),[V]),Object(o.useEffect)((function(){n.current.push({time:Date.now(),population:D})}),[D]),Object(o.useEffect)((function(){C&&p(n.current)}),[C]),Object(d.jsx)(u.Provider,{value:{initialPopulation:j,status:m,speed:T,restarted:C,totalPopulation:D,calamityType:R,calamityAmplitude:Z,calamityDuration:G,calamityPosition:V,calamitySize:Y,calamities:nt,resourcePosition:st,resources:Ot,resourceType:ut,resourceSize:bt,chartData:r},children:Object(d.jsx)(h.Provider,{value:{setInitialPopulation:g,setStatus:y,setSpeed:k,setRestart:w,setTotalPopulation:W,setCalamityType:I,setCalamityAmplitude:$,setCalamityDuration:J,setCalamityPosition:H,setCalamitySize:_,removeResourceById:function(t){for(var e=yt.current,n=e.length,o=0;o<n;o++)if(0===e[o].id.localeCompare(t)){e.splice(o,1);break}yt.current=e,0===e.length&&ct(null),mt(Object(s.a)(e))},setResourcePosition:ct,setResourceType:ht,setResourceSize:jt},children:e})})},f=function(){var t=i.a.useContext(u);if(void 0===t)throw new Error("useGlobalState error");return t},b=function(){var t=i.a.useContext(h);if(void 0===t)throw new Error("useGlobalActions error");return t},j=n(24),g=n(25),x=function(){function t(e,n){Object(j.a)(this,t),this.x=e,this.y=n}return Object(g.a)(t,[{key:"add",value:function(e){return new t(this.x+e.x,this.y+e.y)}},{key:"subtr",value:function(e){return new t(this.x-e.x,this.y-e.y)}},{key:"mag",value:function(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))}},{key:"mult",value:function(e){return new t(this.x*e,this.y*e)}},{key:"normal",value:function(){return new t(-this.y,this.x).unit()}},{key:"unit",value:function(){return 0===this.mag()?new t(0,0):new t(this.x/this.mag(),this.y/this.mag())}},{key:"drawVec",value:function(t,e,n,o,i){t.beginPath(),t.moveTo(e,n),t.lineTo(e+this.x*o,n+this.y*o),t.strokeStyle=i,t.stroke(),t.closePath()}}],[{key:"dot",value:function(t,e){return t.x*e.x+t.y*e.y}}]),t}(),O=function(){function t(e,n,o,i,a){Object(j.a)(this,t),this.id=Object(l.a)(),this.pos=new x(e,n),this.r=o,this.orignalR=o,this.gender=i,this.vel=new x(0,0),this.acc=new x(0,0),this.acceleration=0,this.birth=Date.now(),this.color="#ffffff",this.isAdult=!1,this.lastBirth=Date.now(),this.isAbleToMate=!1,this.isFoodFound=!1,this.foundFoodPosition=null,this.foodId=null,this.lastFoodTime=Date.now(),this.canEatFood=!1,this.isInfected=!1,this.infectionTime=null,a.current.push(this)}return Object(g.a)(t,[{key:"updateToAdult",value:function(){this.birth+1e4<Date.now()&&(this.isAdult=!0)}},{key:"updateAbleToMate",value:function(){this.lastBirth+1e4<Date.now()&&(this.isAbleToMate=!0)}},{key:"updateNotAbleToMate",value:function(){this.isAbleToMate=!1,this.lastBirth=Date.now()}},{key:"updateFoodFound",value:function(t,e){this.isFoodFound=!0,this.foundFoodPosition=t,this.foodId=e}},{key:"updateFoodEaten",value:function(){this.r=1.5*this.r,this.isFoodFound=!1,this.foundFoodPosition=null,this.foodId=null}},{key:"updateFoodNotFound",value:function(){this.isFoodFound=!1,this.foundFoodPosition=null,this.foodId=null}},{key:"updateLastFoodTime",value:function(){this.lastFoodTime=Date.now()}},{key:"updateCanEatFood",value:function(){this.lastFoodTime+1e4<Date.now()?(this.canEatFood=!0,this.r=this.orignalR):this.canEatFood=!1}},{key:"canDie",value:function(){return this.lastFoodTime+2e4+5e3*Math.random()<Date.now()}},{key:"infect",value:function(){this.isInfected||(this.isInfected=!0,this.infectionTime=Date.now())}},{key:"disInfect",value:function(){this.isInfected&&this.infectionTime+1e4<Date.now()&&(this.isInfected=!1,this.infectionTime=null)}},{key:"updateColor",value:function(){this.isInfected?this.color="#FF0000":this.isAdult?this.color="F"==this.gender?"#FF75BF":"#2ED9FF":this.color="#ffffff"}},{key:"drawBall",value:function(t){t.beginPath(),t.arc(this.pos.x,this.pos.y,this.r,0,2*Math.PI),t.fillStyle=this.color,t.fill(),t.closePath()}},{key:"reposition",value:function(t,e){var n=[1,-1],o=Math.floor(2*Math.random()),i=Math.floor(2*Math.random());this.isFoodFound&&this.pos.subtr(this.foundFoodPosition).mag()<2&&this.updateFoodNotFound(),this.isFoodFound?this.vel=this.foundFoodPosition.subtr(this.pos).unit():(Math.random()>.991&&(this.vel=this.vel.add(new x(n[o]*e,n[i]*e))),this.vel=this.vel.mult(.99));var a={x:this.pos.add(this.vel).x,y:this.pos.add(this.vel).y},r=!1;a.x+this.r+10>window.innerWidth-300&&(a.x=window.innerWidth-300-this.r-10,r=!0),a.y+this.r+10>window.innerHeight&&(a.y=window.innerHeight-this.r-10,r=!0),a.x<10&&(a.x=10+this.r,r=!0),a.y<10&&(a.y=10+this.r,r=!0),r&&(this.vel=this.vel.mult(-1),a={x:this.pos.add(this.vel).x,y:this.pos.add(this.vel).y}),this.pos=new x(a.x,a.y)}}]),t}(),m=function(){function t(e,n,o){Object(j.a)(this,t),this.id=Object(l.a)(),this.pos=new x(e,n),o.current.push(this)}return Object(g.a)(t,[{key:"drawFood",value:function(t){t.beginPath(),t.arc(this.pos.x,this.pos.y,1,0,2*Math.PI),t.fillStyle="#2BFF00",t.fill(),t.closePath()}}]),t}();function y(t,e){return Math.floor(Math.random()*(e-t+1))+t}function v(t,e){var n,o;null===t||void 0===t||t.clearRect(0,0,null===e||void 0===e||null===(n=e.current)||void 0===n?void 0:n.clientWidth,null===e||void 0===e||null===(o=e.current)||void 0===o?void 0:o.clientHeight)}var F=function(){var t=Object(o.useRef)(null),e=Object(o.useState)(null),n=Object(c.a)(e,2),i=n[0],a=n[1],r=Object(o.useRef)([]),s=Object(o.useRef)([]),l=Object(o.useRef)(.5),u=(Object(o.useRef)([]),f()),h=u.restarted,p=(u.calamityType,u.calamities,u.resources,u.resourceType,u.status),j=u.speed,g=u.initialPopulation,F=b().setTotalPopulation,C=Object(o.useRef)(p);function w(e){var n;0===C.current.localeCompare("Playing")&&(v(i,t),n=s,r.current.forEach((function(t,e){if(!t.isFoodFound&&t.canEatFood)for(var o=0;o<n.current.length;o++){var i=n.current[o];if(i.pos.subtr(t.pos).mag()<20){t.updateFoodFound(i.pos,i.id);break}}else if(t.isFoodFound&&t.canEatFood&&t.pos.subtr(t.foundFoodPosition).mag()<5){for(var a=-1,r=0;r<n.current.length;r++)if(0===n.current[r].id.localeCompare(t.foodId)){a=r;break}-1!==a&&(n.current.splice(a,1),t.updateFoodEaten(),t.updateLastFoodTime())}})),function(t){for(var e=0;e<t.current.length;e++)t.current[e].canDie()&&t.current.splice(e,1)}(r),function(t){for(var e=t.current.length,n=0;n<e;n++){var o=t.current[n];if(o.isInfected)for(var i=n+1;i<e;i++){var a=t.current[i];o.pos.subtr(a.pos).mag()<7&&a.infect()}}}(r),function(t){for(var e=Array(t.current.length).fill(!1),n=[],o=t.current.length,i=0;i<o;i++){var a=t.current[i];if(!e[i]&&"F"==a.gender&&a.isAdult&&a.isAbleToMate){e[i]=!0;for(var r=i+1;r<o;r++){var s=t.current[r];if(!e[r]&&"M"==s.gender&&s.isAdult&&a.pos.subtr(s.pos).mag()<5){n.push({mother:a,father:s}),e[r]=!0;break}}}}n.forEach((function(e){var n=e.mother,o=e.father;new O((n.pos.x+o.pos.x)/2,(n.pos.y+o.pos.y)/2,(n.r+o.r)/2,Math.random()>.5?"F":"M",t),n.updateNotAbleToMate()}))}(r),r.current.forEach((function(t,e){t.reposition(i,l.current),t.updateToAdult(),t.updateAbleToMate(),t.updateCanEatFood(),t.updateColor(),t.drawBall(i)})),s.current.forEach((function(t,e){t.drawFood(i)})),function(t){Math.random()>.8&&new m(y(10,window.innerWidth-300-10),y(10,window.innerHeight-10),t)}(s),F(r.current.length),requestAnimationFrame(w))}return Object(o.useEffect)((function(){l.current=j}),[j]),Object(o.useEffect)((function(){if(t&&t.current){var e=document.getElementById("canvas").getContext("2d");t.current.focus(),a(e)}}),[t]),Object(o.useEffect)((function(){i&&(v(i,t),function(t,e){e.current=[];for(var n=0;n<t;n++)new O(y(10,window.innerWidth-300-10),y(10,window.innerHeight-10),2,Math.random()>.5?"F":"M",e)}(g,r),function(t){t.current=[];for(var e=0;e<50;e++)new m(y(10,window.innerWidth-300-10),y(10,window.innerHeight-10),t)}(s),r.current[0].infect())}),[i,h,g]),Object(o.useEffect)((function(){var t=null;return C.current=p,0===p.localeCompare("Playing")&&(t=requestAnimationFrame(w)),function(){t&&cancelAnimationFrame(t)}}),[p]),Object(d.jsx)("canvas",{onClick:function(t){console.log("clicked");var e=new x(t.clientX,t.clientY);console.log(e);for(var n=r.current.length,o=0;o<n;o++){var i=r.current[o];i.pos.subtr(e).mag()<10&&i.infect()}},tabIndex:1,id:"canvas",ref:t,width:window.innerWidth-300,height:window.innerHeight,style:{backgroundColor:"#222222"}})},C=n(7),w=n(117),S=n(110),P=n(111),T=n(122),k=n(121),z={adultCreatureColor:"#FF4489",babyCreatureColor:"#E8FF95",earthColor:"#2A2A2A",optionsColor:"#FFFFFF",optionsFontColor:"#545454",optionsBorderColor:"#ACACAC",buttonTheme:"dark"},A=i.a.createContext(void 0),D=i.a.createContext(void 0),W=function(t){var e=t.children,n=Object(o.useState)(z),i=Object(c.a)(n,2),a=i[0],r=i[1];return Object(d.jsx)(A.Provider,{value:{theme:a},children:Object(d.jsx)(D.Provider,{value:{setTheme:r},children:e})})},E=n(120),M=n(112),R=n(114),I=n(115),B=n(116),L=n(113);function V(t){var e=t.children,n=t.open,o=t.value;return Object(d.jsx)(k.a,{open:n,enterTouchDelay:0,placement:"top",title:o,children:e})}var H=function(t){var e,n,o,a,r,s,c=b(),l=c.setInitialPopulation,u=c.setStatus,h=c.setSpeed,p=c.setRestart,j=c.setCalamityType,g=c.setCalamityAmplitude,x=c.setCalamityDuration,O=c.setCalamitySize,m=c.setResourceType,y=c.setResourceSize,v=f(),F=v.initialPopulation,k=v.status,z=v.speed,D=v.restarted,W=v.totalPopulation,H=v.calamityType,N=v.calamityAmplitude,q=v.calamityDuration,G=v.calamitySize,J=v.resourceType,Q=v.resourceSize,U=function(){var t=i.a.useContext(A);if(void 0===t)throw new Error("useThemeState must be used within a ThemeProvider");return t}().theme;return Object(d.jsxs)(w.a,{style:{padding:4,borderRadius:0,width:300,overflowY:"scroll",height:"100%",minWidth:300,border:"none",backgroundColor:U.optionsColor},children:[Object(d.jsxs)(S.a,{style:{margin:0,padding:4},children:[Object(d.jsxs)(P.a,{children:[Object(d.jsx)(E.a,{variant:U.buttonTheme,style:{padding:"2px 8px 2px 8px",boxShadow:"none",fontSize:12},onClick:function(t){t.preventDefault(),p(!1),0===k.localeCompare("Playing")?u("Paused"):u("Playing")},children:0===k.localeCompare("Playing")?"Pause":"Play"}),Object(d.jsx)(E.a,{disabled:D,variant:U.buttonTheme,style:{padding:"2px 8px 2px 8px",boxShadow:"none",fontSize:12},onClick:function(t){t.preventDefault(),u("Paused"),p(!0)},children:"Stop"})]}),Object(d.jsx)("span",{style:{fontWeight:"600",fontSize:12,padding:2,margin:2},children:"Total Population : ".concat(W)})]}),Object(d.jsx)(M.a,{style:{backgroundColor:U.optionsBorderColor}}),Object(d.jsx)(S.a,{style:{margin:0,padding:4},children:Object(d.jsxs)(L.a,{container:!0,spacing:2,style:{padding:0,margin:0},children:[Object(d.jsx)(L.a,{item:!0,xs:6,style:{padding:4,margin:0,fontSize:12,fontWeight:"500",textAlign:"start",color:U.optionsFontColor},children:"Initial Population"}),Object(d.jsx)(L.a,{item:!0,xs:6,style:{padding:"4px 16px 4px 16px",margin:0,fontSize:10,fontWeight:"500"},children:Object(d.jsx)(T.a,(e={style:{boxShadow:"none",color:U.optionsFontColor}},Object(C.a)(e,"style",{padding:0}),Object(C.a)(e,"ValueLabelComponent",V),Object(C.a)(e,"value",F),Object(C.a)(e,"min",1),Object(C.a)(e,"max",200),Object(C.a)(e,"onChange",(function(t,e){t.preventDefault(),l(e)})),e))})]})}),Object(d.jsx)(M.a,{style:{backgroundColor:U.optionsBorderColor}}),Object(d.jsx)(S.a,{style:{margin:0,padding:4},children:Object(d.jsxs)(L.a,{container:!0,spacing:2,style:{padding:0,margin:0},children:[Object(d.jsx)(L.a,{item:!0,xs:6,style:{padding:4,margin:0,fontSize:12,fontWeight:"500",textAlign:"start",color:U.optionsFontColor},children:"Creature speed"}),Object(d.jsx)(L.a,{item:!0,xs:6,style:{padding:"4px 16px 4px 16px",margin:0,fontSize:10,fontWeight:"500"},children:Object(d.jsx)(T.a,(n={style:{boxShadow:"none",color:U.optionsFontColor}},Object(C.a)(n,"style",{padding:0}),Object(C.a)(n,"ValueLabelComponent",V),Object(C.a)(n,"value",z),Object(C.a)(n,"min",0),Object(C.a)(n,"step",.1),Object(C.a)(n,"max",10),Object(C.a)(n,"onChange",(function(t,e){t.preventDefault(),h(e)})),n))})]})}),Object(d.jsxs)("div",{style:{borderRadius:4,border:"1px solid ".concat(U.optionsBorderColor),padding:2,margin:2},children:[Object(d.jsx)(S.a,{style:{margin:0,padding:"8px 4px 4px 4px"},children:Object(d.jsx)(R.a,{style:{width:"100%",padding:0,borderColor:U.optionsBorderColor},size:"small",children:Object(d.jsxs)(I.a,{disableUnderline:!0,value:H,onChange:function(t){t.preventDefault(),m("none"),j(t.target.value)},style:{padding:0,margin:0,fontSize:12,fontWeight:"600",borderRadius:4,color:U.optionsFontColor,border:"1px solid ".concat(U.optionsBorderColor)},children:[Object(d.jsx)(B.a,{value:"none",style:{padding:4,margin:0,fontSize:12,fontWeight:"600",color:U.optionsFontColor},children:"None"}),Object(d.jsx)(B.a,{value:"radiation",style:{padding:4,margin:0,fontSize:12,fontWeight:"600",color:U.optionsFontColor},children:"Radiation"}),Object(d.jsx)(B.a,{value:"earthQuake",style:{padding:4,margin:0,fontSize:12,fontWeight:"600",color:U.optionsFontColor},children:"Earth Quake"}),Object(d.jsx)(B.a,{value:"volcano",style:{padding:4,margin:0,fontSize:12,fontWeight:"600",color:U.optionsFontColor},children:"Volcano"})]})})}),Object(d.jsx)(S.a,{style:{margin:0,padding:4},children:Object(d.jsxs)(L.a,{container:!0,spacing:2,style:{padding:0,margin:0},children:[Object(d.jsx)(L.a,{item:!0,xs:6,style:{padding:4,margin:0,fontSize:12,fontWeight:"500",textAlign:"start",color:U.optionsFontColor},children:"Calamity size"}),Object(d.jsx)(L.a,{item:!0,xs:6,style:{padding:"4px 16px 4px 16px",margin:0,fontSize:10,fontWeight:"500"},children:Object(d.jsx)(T.a,(o={style:{boxShadow:"none",color:U.optionsFontColor}},Object(C.a)(o,"style",{padding:0}),Object(C.a)(o,"ValueLabelComponent",V),Object(C.a)(o,"value",G),Object(C.a)(o,"min",10),Object(C.a)(o,"max",500),Object(C.a)(o,"step",1),Object(C.a)(o,"onChange",(function(t,e){t.preventDefault(),O(e)})),o))})]})}),Object(d.jsx)(S.a,{style:{margin:0,padding:4},children:Object(d.jsxs)(L.a,{container:!0,spacing:2,style:{padding:0,margin:0},children:[Object(d.jsx)(L.a,{item:!0,xs:6,style:{padding:4,margin:0,fontSize:12,fontWeight:"500",textAlign:"start",color:U.optionsFontColor},children:"Calamity amplitude"}),Object(d.jsx)(L.a,{item:!0,xs:6,style:{padding:"4px 16px 4px 16px",margin:0,fontSize:10,fontWeight:"500"},children:Object(d.jsx)(T.a,(a={style:{boxShadow:"none",color:U.optionsFontColor}},Object(C.a)(a,"style",{padding:0}),Object(C.a)(a,"ValueLabelComponent",V),Object(C.a)(a,"value",N),Object(C.a)(a,"min",1),Object(C.a)(a,"max",10),Object(C.a)(a,"step",1),Object(C.a)(a,"onChange",(function(t,e){t.preventDefault(),g(e)})),a))})]})}),Object(d.jsx)(S.a,{style:{margin:0,padding:4},children:Object(d.jsxs)(L.a,{container:!0,spacing:2,style:{padding:0,margin:0},children:[Object(d.jsx)(L.a,{item:!0,xs:6,style:{padding:4,margin:0,fontSize:12,fontWeight:"500",textAlign:"start",color:U.optionsFontColor},children:"Calamity duration"}),Object(d.jsx)(L.a,{item:!0,xs:6,style:{padding:"4px 16px 4px 16px",margin:0,fontSize:10,fontWeight:"500"},children:Object(d.jsx)(T.a,(r={style:{boxShadow:"none",color:U.optionsFontColor}},Object(C.a)(r,"style",{padding:0}),Object(C.a)(r,"ValueLabelComponent",V),Object(C.a)(r,"value",q),Object(C.a)(r,"min",2e3),Object(C.a)(r,"max",1e5),Object(C.a)(r,"step",1e3),Object(C.a)(r,"onChange",(function(t,e){t.preventDefault(),x(e)})),r))})]})})]}),Object(d.jsxs)("div",{style:{borderRadius:4,border:"1px solid ".concat(U.optionsBorderColor),padding:2,margin:2},children:[Object(d.jsx)(S.a,{style:{margin:0,padding:"8px 4px 4px 4px"},children:Object(d.jsx)(R.a,{style:{width:"100%",padding:0},size:"small",children:Object(d.jsxs)(I.a,{disableUnderline:!0,value:J,onChange:function(t){t.preventDefault(),j("none"),m(t.target.value)},style:{padding:0,margin:0,fontSize:12,fontWeight:"600",borderRadius:4,color:U.optionsFontColor,border:"1px solid ".concat(U.optionsBorderColor)},children:[Object(d.jsx)(B.a,{value:"none",style:{padding:4,margin:0,fontSize:12,fontWeight:"600",color:U.optionsFontColor},children:"None"}),Object(d.jsx)(B.a,{value:"waterBody",style:{padding:4,margin:0,fontSize:12,fontWeight:"600",color:U.optionsFontColor},children:"Water body"})]})})}),Object(d.jsx)(S.a,{style:{margin:0,padding:4},children:Object(d.jsxs)(L.a,{container:!0,spacing:2,style:{padding:0,margin:0},children:[Object(d.jsx)(L.a,{item:!0,xs:6,style:{padding:4,margin:0,fontSize:12,fontWeight:"500",textAlign:"start",color:U.optionsFontColor},children:"Resource size"}),Object(d.jsx)(L.a,{item:!0,xs:6,style:{padding:"4px 16px 4px 16px",margin:0,fontSize:10,fontWeight:"500"},children:Object(d.jsx)(T.a,(s={style:{boxShadow:"none",color:U.optionsFontColor}},Object(C.a)(s,"style",{padding:0}),Object(C.a)(s,"ValueLabelComponent",V),Object(C.a)(s,"value",Q),Object(C.a)(s,"min",10),Object(C.a)(s,"max",300),Object(C.a)(s,"step",1),Object(C.a)(s,"onChange",(function(t,e){t.preventDefault(),y(e)})),s))})]})})]})]})};var N=function(){return Object(d.jsx)("div",{className:"App",children:Object(d.jsx)(W,{children:Object(d.jsxs)(p,{children:[Object(d.jsx)(H,{style:{position:"absolute",top:5,left:5}}),Object(d.jsx)(F,{})]})})})},q=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,123)).then((function(e){var n=e.getCLS,o=e.getFID,i=e.getFCP,a=e.getLCP,r=e.getTTFB;n(t),o(t),i(t),a(t),r(t)}))};r.a.render(Object(d.jsx)(i.a.StrictMode,{children:Object(d.jsx)(N,{})}),document.getElementById("root")),q()}},[[75,1,2]]]);
//# sourceMappingURL=main.14afa4cd.chunk.js.map