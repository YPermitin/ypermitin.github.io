(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[772],{3162:function(e,t,a){var n,r,l;r=[],void 0!==(l="function"==typeof(n=function(){"use strict";function t(e,t,a){var n=new XMLHttpRequest;n.open("GET",e),n.responseType="blob",n.onload=function(){o(n.response,t,a)},n.onerror=function(){console.error("could not download file")},n.send()}function n(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch(e){}return 200<=t.status&&299>=t.status}function r(e){try{e.dispatchEvent(new MouseEvent("click"))}catch(a){var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var l="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof a.g&&a.g.global===a.g?a.g:void 0,s=l.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),o=l.saveAs||("object"!=typeof window||window!==l?function(){}:"download"in HTMLAnchorElement.prototype&&!s?function(e,a,s){var o=l.URL||l.webkitURL,i=document.createElement("a");a=a||e.name||"download",i.download=a,i.rel="noopener","string"==typeof e?(i.href=e,i.origin===location.origin?r(i):n(i.href)?t(e,a,s):r(i,i.target="_blank")):(i.href=o.createObjectURL(e),setTimeout(function(){o.revokeObjectURL(i.href)},4e4),setTimeout(function(){r(i)},0))}:"msSaveOrOpenBlob"in navigator?function(e,a,l){if(a=a||e.name||"download","string"!=typeof e){var s;navigator.msSaveOrOpenBlob((void 0===(s=l)?s={autoBom:!1}:"object"!=typeof s&&(console.warn("Deprecated: Expected third argument to be a object"),s={autoBom:!s}),s.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\uFEFF",e],{type:e.type}):e),a)}else if(n(e))t(e,a,l);else{var o=document.createElement("a");o.href=e,o.target="_blank",setTimeout(function(){r(o)})}}:function(e,a,n,r){if((r=r||open("","_blank"))&&(r.document.title=r.document.body.innerText="downloading..."),"string"==typeof e)return t(e,a,n);var o="application/octet-stream"===e.type,i=/constructor/i.test(l.HTMLElement)||l.safari,d=/CriOS\/[\d]+/.test(navigator.userAgent);if((d||o&&i||s)&&"undefined"!=typeof FileReader){var u=new FileReader;u.onloadend=function(){var e=u.result;e=d?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),r?r.location.href=e:location=e,r=null},u.readAsDataURL(e)}else{var c=l.URL||l.webkitURL,p=c.createObjectURL(e);r?r.location=p:location.href=p,r=null,setTimeout(function(){c.revokeObjectURL(p)},4e4)}});l.saveAs=o.saveAs=o,e.exports=o})?n.apply(t,r):n)&&(e.exports=l)},7632:function(e,t,a){"use strict";a.d(t,{Z:function(){return i}});for(var n,r={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)},l=new Uint8Array(16),s=[],o=0;o<256;++o)s.push((o+256).toString(16).slice(1));var i=function(e,t,a){if(r.randomUUID&&!t&&!e)return r.randomUUID();var o=(e=e||{}).random||(e.rng||function(){if(!n&&!(n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)))throw Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return n(l)})();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,t){a=a||0;for(var i=0;i<16;++i)t[a+i]=o[i];return t}return function(e,t=0){return(s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]).toLowerCase()}(o)}},3414:function(e,t,a){"use strict";a.d(t,{Y:function(){return i}});var n=a(1780),r=a(5893),l=e=>(0,r.jsx)("svg",{"aria-hidden":"true",focusable:"false",height:"1em",role:"presentation",viewBox:"0 0 24 24",width:"1em",...e,children:(0,r.jsx)("path",{d:"M12 2a10 10 0 1010 10A10.016 10.016 0 0012 2zm3.36 12.3a.754.754 0 010 1.06.748.748 0 01-1.06 0l-2.3-2.3-2.3 2.3a.748.748 0 01-1.06 0 .754.754 0 010-1.06l2.3-2.3-2.3-2.3A.75.75 0 019.7 8.64l2.3 2.3 2.3-2.3a.75.75 0 011.06 1.06l-2.3 2.3z",fill:"currentColor"})}),s=a(7294),o=(0,a(5607).Gp)((e,t)=>{let{Component:a,label:o,description:i,isClearable:d,startContent:u,endContent:c,labelPlacement:p,hasHelper:m,isOutsideLeft:f,shouldLabelBeOutside:b,errorMessage:g,isInvalid:h,getBaseProps:v,getLabelProps:y,getInputProps:w,getInnerWrapperProps:x,getInputWrapperProps:C,getMainWrapperProps:P,getHelperWrapperProps:j,getDescriptionProps:S,getErrorMessageProps:k,getClearButtonProps:D}=(0,n.G)({...e,ref:t}),R=o?(0,r.jsx)("label",{...y(),children:o}):null,E=(0,s.useMemo)(()=>d?(0,r.jsx)("span",{...D(),children:c||(0,r.jsx)(l,{})}):c,[d,D]),U=(0,s.useMemo)(()=>m?(0,r.jsx)("div",{...j(),children:h&&g?(0,r.jsx)("div",{...k(),children:g}):i?(0,r.jsx)("div",{...S(),children:i}):null}):null,[m,h,g,i,j,k,S]),A=(0,s.useMemo)(()=>(0,r.jsxs)("div",{...x(),children:[u,(0,r.jsx)("input",{...w()}),E]}),[u,E,w,x]),N=(0,s.useMemo)(()=>b?(0,r.jsxs)("div",{...P(),children:[(0,r.jsxs)("div",{...C(),children:[f?null:R,A]}),U]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{...C(),children:[R,A]}),U]}),[p,U,b,R,A,g,i,P,C,k,S]);return(0,r.jsxs)(a,{...v(),children:[f?R:null,N]})});o.displayName="NextUI.Input";var i=o},8255:function(e,t,a){"use strict";a.d(t,{l:function(){return r}});var n=a(262);function r(...e){return t=>{e.forEach(e=>(function(e,t){if(null!=e){if((0,n.mf)(e)){e(t);return}try{e.current=t}catch(a){throw Error(`Cannot assign value '${t}' to ref '${e}'`)}}})(e,t))}}},8781:function(e,t,a){"use strict";a.d(t,{i:function(){return j}});var n=a(7294),r=a(6733),l=a(5607),s=a(8255),o=a(3387),i=a(8419),d=a(9935),u=a(9488),c=a(5512),p=(0,u.tv)({slots:{base:"group relative max-w-fit inline-flex items-center justify-start cursor-pointer touch-none tap-highlight-transparent",wrapper:["px-1","relative","inline-flex","items-center","justify-start","flex-shrink-0","overflow-hidden","bg-default-200","rounded-full",...c.ID],thumb:["z-10","flex","items-center","justify-center","bg-white","shadow-small","rounded-full","origin-right"],startContent:"z-0 absolute left-1.5 rtl:right-1.5 rtl:left-[unset] text-current",endContent:"z-0 absolute right-1.5 rtl:left-1.5 rtl:right-[unset] text-default-600",thumbIcon:"text-black",label:"relative text-foreground select-none"},variants:{color:{default:{wrapper:["group-data-[selected=true]:bg-default-400","group-data-[selected=true]:text-default-foreground"]},primary:{wrapper:["group-data-[selected=true]:bg-primary","group-data-[selected=true]:text-primary-foreground"]},secondary:{wrapper:["group-data-[selected=true]:bg-secondary","group-data-[selected=true]:text-secondary-foreground"]},success:{wrapper:["group-data-[selected=true]:bg-success","group-data-[selected=true]:text-success-foreground"]},warning:{wrapper:["group-data-[selected=true]:bg-warning","group-data-[selected=true]:text-warning-foreground"]},danger:{wrapper:["group-data-[selected=true]:bg-danger","data-[selected=true]:text-danger-foreground"]}},size:{sm:{wrapper:"w-10 h-6 mr-2 rtl:ml-2 rtl:mr-[unset]",thumb:["w-4 h-4 text-tiny","group-data-[selected=true]:ml-4 rtl:group-data-[selected=true]:ml-0 rtl:group-data-[selected=true]:mr-4"],endContent:"text-tiny",startContent:"text-tiny",label:"text-small"},md:{wrapper:"w-12 h-7 mr-2 rtl:ml-2 rtl:mr-[unset]",thumb:["w-5 h-5 text-small","group-data-[selected=true]:ml-5 rtl:group-data-[selected=true]:ml-0 rtl:group-data-[selected=true]:mr-5"],endContent:"text-small",startContent:"text-small",label:"text-medium"},lg:{wrapper:"w-14 h-8 mr-2 rtl:ml-2 rtl:mr-[unset]",thumb:["w-6 h-6 text-medium","group-data-[selected=true]:ml-6 rtl:group-data-[selected=true]:ml-0 rtl:group-data-[selected=true]:mr-6"],endContent:"text-medium",startContent:"text-medium",label:"text-large"}},isDisabled:{true:{base:"opacity-disabled pointer-events-none"}},disableAnimation:{true:{wrapper:"transition-none",thumb:"transition-none"},false:{wrapper:"transition-background",thumb:"transition-all",startContent:["opacity-0","scale-50","transition-transform-opacity","group-data-[selected=true]:scale-100","group-data-[selected=true]:opacity-100"],endContent:["opacity-100","transition-transform-opacity","group-data-[selected=true]:translate-x-3","group-data-[selected=true]:opacity-0"]}}},defaultVariants:{color:"primary",size:"md",isDisabled:!1},compoundVariants:[{disableAnimation:!1,size:"sm",class:{thumb:["group-data-[pressed=true]:w-5","group-data-[selected]:group-data-[pressed]:ml-3"]}},{disableAnimation:!1,size:"md",class:{thumb:["group-data-[pressed=true]:w-6","group-data-[selected]:group-data-[pressed]:ml-4"]}},{disableAnimation:!1,size:"lg",class:{thumb:["group-data-[pressed=true]:w-7","group-data-[selected]:group-data-[pressed]:ml-5"]}}]}),m=a(7127),f=a(1086),b=a(9037),g=a(9869),h=a(262),v=a(1801),y=a(4619),w=a(2459),x=a(3699),C=a(5893),P=(0,l.Gp)((e,t)=>{let{Component:a,children:u,startContent:c,endContent:P,thumbIcon:j,getBaseProps:S,getInputProps:k,getWrapperProps:D,getThumbProps:R,getThumbIconProps:E,getLabelProps:U,getStartContentProps:A,getEndContentProps:N}=function(e={}){var t,a;let u=(0,r.w)(),[c,x]=(0,l.oe)(e,p.variantKeys),{ref:C,as:P,name:j,value:S="",isReadOnly:k=!1,autoFocus:D=!1,startContent:R,endContent:E,defaultSelected:U,isSelected:A,children:N,thumbIcon:I,className:O,classNames:M,onChange:B,onValueChange:L,...T}=c,z=(0,n.useRef)(null),F=(0,n.useRef)(null),W=null!=(a=null!=(t=e.disableAnimation)?t:null==u?void 0:u.disableAnimation)&&a,H=(0,n.useId)(),_=(0,n.useMemo)(()=>{let t=T["aria-label"]||"string"==typeof N?N:void 0;return{name:j,value:S,children:N,autoFocus:D,defaultSelected:U,isSelected:A,isDisabled:!!e.isDisabled,isReadOnly:k,"aria-label":t,"aria-labelledby":T["aria-labelledby"]||H,onChange:L}},[S,j,H,N,D,k,A,U,e.isDisabled,T["aria-label"],T["aria-labelledby"],L]),G=(0,y.l)(_);(0,o.G)(()=>{if(!F.current)return;let e=!!F.current.checked;G.setSelected(e)},[F.current]);let{inputProps:V,isPressed:X,isReadOnly:q}=function(e,t,a){let{labelProps:n,inputProps:r,isSelected:l,isPressed:s,isDisabled:o,isReadOnly:i}=(0,v.O)(e,t,a);return{labelProps:n,inputProps:{...r,role:"switch",checked:l},isSelected:l,isPressed:s,isDisabled:o,isReadOnly:i}}(_,G,F),{focusProps:K,isFocused:$,isFocusVisible:Y}=(0,w.F)({autoFocus:V.autoFocus}),{hoverProps:Z,isHovered:J}=(0,i.X)({isDisabled:V.disabled}),Q=_.isDisabled||q,[ee,et]=(0,n.useState)(!1),{pressProps:ea}=(0,d.r)({isDisabled:Q,onPressStart(e){"keyboard"!==e.pointerType&&et(!0)},onPressEnd(e){"keyboard"!==e.pointerType&&et(!1)}}),en=!Q&&(ee||X),er=V.checked,el=V.disabled,es=(0,n.useMemo)(()=>p({...x,disableAnimation:W}),[(0,b.Xx)(x),W]),eo=(0,g.W)(null==M?void 0:M.base,O),ei=(0,n.useCallback)((e={})=>({...e,"aria-hidden":!0,className:(0,g.W)(es.wrapper({class:(0,g.W)(null==M?void 0:M.wrapper,null==e?void 0:e.className)}))}),[es,null==M?void 0:M.wrapper]),ed=(0,n.useCallback)((e={})=>({...e,className:es.thumb({class:(0,g.W)(null==M?void 0:M.thumb,null==e?void 0:e.className)})}),[es,null==M?void 0:M.thumb]),eu=(0,n.useCallback)((e={})=>({...e,id:H,className:es.label({class:(0,g.W)(null==M?void 0:M.label,null==e?void 0:e.className)})}),[es,null==M?void 0:M.label,el,er]),ec=(0,n.useCallback)((e={includeStateProps:!1})=>(0,m.d)({width:"1em",height:"1em",className:es.thumbIcon({class:(0,g.W)(null==M?void 0:M.thumbIcon)})},e.includeStateProps?{isSelected:er}:{}),[es,null==M?void 0:M.thumbIcon,er]),ep=(0,n.useCallback)((e={})=>({width:"1em",height:"1em",...e,className:es.startContent({class:(0,g.W)(null==M?void 0:M.startContent,null==e?void 0:e.className)})}),[es,null==M?void 0:M.startContent,er]),em=(0,n.useCallback)((e={})=>({width:"1em",height:"1em",...e,className:es.endContent({class:(0,g.W)(null==M?void 0:M.endContent,null==e?void 0:e.className)})}),[es,null==M?void 0:M.endContent,er]);return{Component:P||"label",slots:es,classNames:M,domRef:z,children:N,thumbIcon:I,startContent:R,endContent:E,isHovered:J,isSelected:er,isPressed:en,isFocused:$,isFocusVisible:Y,isDisabled:el,getBaseProps:e=>({...(0,m.d)(Z,ea,T,e),ref:z,className:es.base({class:(0,g.W)(eo,null==e?void 0:e.className)}),"data-disabled":(0,h.PB)(el),"data-selected":(0,h.PB)(er),"data-readonly":(0,h.PB)(q),"data-focus":(0,h.PB)($),"data-focus-visible":(0,h.PB)(Y),"data-hover":(0,h.PB)(J),"data-pressed":(0,h.PB)(en)}),getWrapperProps:ei,getInputProps:(e={})=>({...(0,m.d)(V,K,e),ref:(0,s.l)(F,C),id:V.id,onChange:(0,f.t)(B,V.onChange)}),getLabelProps:eu,getThumbProps:ed,getThumbIconProps:ec,getStartContentProps:ep,getEndContentProps:em}}({...e,ref:t}),I="function"==typeof j?j(E({includeStateProps:!0})):j&&(0,n.cloneElement)(j,E()),O=c&&(0,n.cloneElement)(c,A()),M=P&&(0,n.cloneElement)(P,N());return(0,C.jsxs)(a,{...S(),children:[(0,C.jsx)(x.T,{elementType:"span",children:(0,C.jsx)("input",{...k()})}),(0,C.jsxs)("span",{...D(),children:[c&&O,(0,C.jsx)("span",{...R(),children:j&&I}),P&&M]}),u&&(0,C.jsx)("span",{...U(),children:u})]})});P.displayName="NextUI.Switch";var j=P},1801:function(e,t,a){"use strict";a.d(t,{O:function(){return i}});var n=a(7127),r=a(3136),l=a(5952),s=a(1080),o=a(9935);function i(e,t,a){let{isDisabled:i=!1,isReadOnly:d=!1,value:u,name:c,children:p,"aria-label":m,"aria-labelledby":f,validationState:b="valid",isInvalid:g}=e;null!=p||null!=m||null!=f||console.warn("If you do not provide children, you must specify an aria-label for accessibility");let{pressProps:h,isPressed:v}=(0,o.r)({isDisabled:i}),{pressProps:y,isPressed:w}=(0,o.r)({isDisabled:i||d,onPress(){t.toggle()}}),{focusableProps:x}=(0,s.k)(e,a),C=(0,n.d)(h,x),P=(0,r.z)(e,{labelable:!0});return(0,l.y)(a,t.isSelected,t.setSelected),{labelProps:(0,n.d)(y,{onClick:e=>e.preventDefault()}),inputProps:(0,n.d)(P,{"aria-invalid":g||"invalid"===b||void 0,"aria-errormessage":e["aria-errormessage"],"aria-controls":e["aria-controls"],"aria-readonly":d||void 0,onChange:e=>{e.stopPropagation(),t.setSelected(e.target.checked)},disabled:i,...null==u?{}:{value:u},name:c,type:"checkbox",...C}),isSelected:t.isSelected,isPressed:v||w,isDisabled:i,isReadOnly:d,isInvalid:g||"invalid"===b}}},3699:function(e,t,a){"use strict";a.d(t,{T:function(){return o}});var n=a(7127),r=a(7294),l=a(4971);let s={border:0,clip:"rect(0 0 0 0)",clipPath:"inset(50%)",height:"1px",margin:"-1px",overflow:"hidden",padding:0,position:"absolute",width:"1px",whiteSpace:"nowrap"};function o(e){let{children:t,elementType:a="div",isFocusable:o,style:i,...d}=e,{visuallyHiddenProps:u}=function(e={}){let{style:t,isFocusable:a}=e,[n,o]=(0,r.useState)(!1),{focusWithinProps:i}=(0,l.L)({isDisabled:!a,onFocusWithinChange:e=>o(e)}),d=(0,r.useMemo)(()=>n?t:t?{...s,...t}:s,[n]);return{visuallyHiddenProps:{...i,style:d}}}(e);return r.createElement(a,(0,n.d)(d,u),t)}},4619:function(e,t,a){"use strict";a.d(t,{l:function(){return r}});var n=a(9373);function r(e={}){let{isReadOnly:t}=e,[a,r]=(0,n.z)(e.isSelected,e.defaultSelected||!1,e.onChange);return{isSelected:a,setSelected:function(e){t||r(e)},toggle:function(){t||r(!a)}}}}}]);