(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["components"],{c853:function(e,t,n){"use strict";n.r(t);var o=n("7a23"),a={class:"app-container"},i=Object(o["createTextVNode"])(" 封装的Dialog "),l=Object(o["createTextVNode"])("打开Dialog"),c=Object(o["createTextVNode"])("打开全屏Dialog");function r(e,t,n,r,u,d){var b=Object(o["resolveComponent"])("ProDialog"),s=Object(o["resolveComponent"])("el-button");return Object(o["openBlock"])(),Object(o["createBlock"])("div",a,[Object(o["createVNode"])(b,{value:r.visible,"onUpdate:value":t[1]||(t[1]=function(e){return r.visible=e}),title:"title","confirm-loading":r.loading,onCancle:r.handleClose,onOk:r.handleOk},{default:Object(o["withCtx"])((function(){return[i]})),_:1},8,["value","confirm-loading","onCancle","onOk"]),Object(o["createVNode"])(s,{style:{display:"block",margin:"20px auto"},type:"primary",onClick:t[2]||(t[2]=function(e){return r.visible=!0})},{default:Object(o["withCtx"])((function(){return[l]})),_:1}),Object(o["createVNode"])(b,{value:r.visible1,"onUpdate:value":t[3]||(t[3]=function(e){return r.visible1=e}),title:"title",fullscreen:"","confirm-loading":r.loading,"confirm-text":"(≧∇≦)ﾉ",onCancle:r.handleClose,onOk:r.handleOk},{default:Object(o["withCtx"])((function(){return[(Object(o["openBlock"])(),Object(o["createBlock"])(o["Fragment"],null,Object(o["renderList"])(40,(function(e){return Object(o["createVNode"])("div",{key:e,style:{margin:"20px auto"}}," 全屏的Dialog "+Object(o["toDisplayString"])(e),1)})),64))]})),_:1},8,["value","confirm-loading","confirm-text","onCancle","onOk"]),Object(o["createVNode"])(s,{style:{display:"block",margin:"20px auto"},type:"primary",onClick:t[4]||(t[4]=function(e){return r.visible1=!0})},{default:Object(o["withCtx"])((function(){return[c]})),_:1})])}n("7f17"),n("f3fc");var u=n("6573"),d=n.n(u),b={name:"ProDialogPage",setup:function(){var e=Object(o["ref"])(!1),t=Object(o["ref"])(!1),n=Object(o["ref"])(!1);function a(){d.a.warning("handleClose")}function i(){n.value=!0,setTimeout((function(){n.value=!1,e.value=!1,t.value=!1,d.a.success("handleOk")}),2e3)}return{visible:e,visible1:t,loading:n,handleClose:a,handleOk:i}}};b.render=r;t["default"]=b}}]);