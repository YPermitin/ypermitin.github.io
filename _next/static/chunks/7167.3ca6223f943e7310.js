(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7167,8547,1465],{1465:function(e,a,t){"use strict";t.r(a);var r=t(5893),s=t(1664),l=t.n(s),i=t(4275);a.default=e=>{let{href:a,passHref:t=!0,newTab:s=!1,external:c=!1,children:n,className:o}=e;return(0,r.jsx)(r.Fragment,{children:s||c?(0,r.jsx)("a",{href:(0,i.b7)(a),className:o,target:"_blank",rel:"noopener noreferrer",children:n}):(0,r.jsx)(l(),{href:(0,i.b7)(a),passHref:t,className:(0,i.GF)("cursor-pointer hover:text-blue-500",o),children:n})})}},18:function(e,a,t){"use strict";var r=t(5893),s=t(1465);a.Z=e=>{let{category:a}=e;return(0,r.jsx)(r.Fragment,{children:a&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{className:"text-[14px] md:text-[16px] px-2 font-normal",children:"в"}),(0,r.jsx)("p",{className:"font-medium text-[14px] md:text-[16px]",children:(0,r.jsx)(s.default,{href:"/blog?category="+a,children:a})})]})})}},1437:function(e,a,t){"use strict";var r=t(5893),s=t(4275);a.Z=e=>{let{tags:a,center:t=!1}=e;return(0,r.jsx)("div",{className:(0,s.GF)("md:mt-2 flex flex-wrap",t&&"justify-center"),children:a.split(",").map((e,a)=>(0,r.jsxs)("p",{className:"text-[12px] font-normal mr-2 mb-1 inline-block text-gray-500 dark:text-gray-400",children:["#",e.trim()]},a))})}},1421:function(e,a,t){"use strict";var r=t(5893),s=t(4275);a.Z=e=>{let{author:a,className:t}=e;return(0,r.jsx)("div",{className:(0,s.GF)("flex items-center justify-center shadow-xl rounded-full overflow-hidden bg-blue-500 shrink-0",t),children:a.profilePic?(0,r.jsx)("img",{src:a.profilePic,alt:a.name,width:"100%"}):(0,r.jsx)("p",{className:"text-center font-medium text-white",children:a.name[0]})})}},8547:function(e,a,t){"use strict";t.r(a);var r=t(5893),s=t(4275),l=t(3270),i=t.n(l);a.default=e=>{let{line:a=!1,dots:t=!1}=e;return(0,r.jsx)(r.Fragment,{children:a?(0,r.jsx)("div",{className:(0,s.GF)(i().section_seperator_line,"dark:border-white border-black")}):t?(0,r.jsx)("div",{className:(0,s.GF)(i().section_seperator_dots),children:[void 0,void 0,void 0,void 0,void 0].map(e=>(0,r.jsx)("span",{className:"dark:bg-white"},Math.random()))}):(0,r.jsx)("div",{className:(0,s.GF)(i().section_seperator_line,"dark:border-white border-black")})})}},7167:function(e,a,t){"use strict";t.r(a),t.d(a,{default:function(){return J}});var r=t(5893),s=t(2962),l=t(9456),i=t(7105),c=t(4089),n=t.n(c),o=t(1664),d=t.n(o),x=t(7294),h=t(4275),m=t(1465),p=t(2010),b=t(8633),u=t(7771),_=t(1121),j=e=>{let{openDD:a,setOpenDD:t,label:s,floating:l=!1}=e,i=(0,h.CP)();return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsxs)("div",{className:(0,h.GF)("flex items-center cursor-pointer",l?"mx-2":"justify-between"),onClick:()=>t(!a),children:[(0,r.jsx)("p",{className:"my-0",children:s}),(0,r.jsx)(_.OrA,{className:"text-[20px]"})]}),(0,r.jsxs)("div",{className:(0,h.GF)("overflow-auto",l?"absolute w-[180px] z-20 top-[30px] rounded-[4px] shadow-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-0":"relative",a?"h-auto":"h-0 border-0"),children:[(0,r.jsx)(m.default,{href:"/blog",passHref:!0,className:"block text-sm py-2 px-2",children:(0,r.jsx)("span",{onClick:()=>t(!a),children:"Все публикации"})}),i&&i.map(e=>(0,r.jsx)(m.default,{href:"/blog?category="+e,passHref:!0,className:"block text-sm py-2 px-2 border-t border-gray-400",children:(0,r.jsx)("span",{style:{textTransform:"capitalize"},onClick:()=>t(!a),children:e})},e))]})]})})},g=e=>{let{openSearch:a,changeTheme:t,toggleSideMenu:s,openSidebar:l=!1,navSetup:c,onShareClick:o}=e,{navLinks:_,socials:g,logo:f}=c,[N,w]=(0,x.useState)(!1),{theme:v,setTheme:k}=(0,p.F)();return(0,r.jsxs)("div",{className:(0,h.GF)(n().navbar__container,"container flex items-center justify-between","px-2"),children:[(0,r.jsxs)("div",{className:"flex items-center",children:[(0,r.jsx)("div",{className:(0,h.GF)(n().mobileBurgerToggle,"mr-5",l?n().mobileBurgerToggle__close:" "),onClick:()=>s(),children:(0,r.jsx)(u.qTj,{className:"dark:text-white text-black text-2xl"})}),(0,r.jsx)(d(),{href:"/",passHref:!0,legacyBehavior:!0,children:f?f.type===i.nJ.IMAGE?(0,r.jsx)("img",{src:v===i.yU.DARK?(0,h.zS)(f.logoLight):(0,h.zS)(f.logo),alt:"WebExpe",className:"cursor-pointer",width:"100px"}):(0,r.jsx)("a",{className:"text-[22px] font-semibold",children:f.logo}):(0,r.jsx)("a",{className:"text-[22px] font-semibold",children:"Logo"})})]}),(0,r.jsxs)("div",{className:"flex items-center",children:[(0,r.jsxs)("div",{className:"text-[14px] font-normal items-center lg:flex hidden",children:[_.map((e,a)=>"dropdown"!==e.type?e.newTab?(0,r.jsx)("a",{href:e.path,target:"_blank",rel:"noopener noreferrer",className:"d-block mx-2 flex-wrap",children:e.label},e.path+1):(0,r.jsx)(m.default,{href:e.path,passHref:!0,className:"mx-2",children:e.label},a):(0,r.jsx)(j,{label:e.label,openDD:N,setOpenDD:()=>w(!N),floating:!0},a)),g&&(0,r.jsx)("div",{className:"ml-5 pt-1",children:g.map((e,a)=>(0,r.jsx)("a",{href:e.link,target:"_blank",rel:"noopener noreferrer",className:"text-[18px] inline-block mr-4",children:e.icon},a))})]}),(0,r.jsx)("div",{className:(0,h.GF)(n().search_icon_wrapper,"ml-5 dark:text-white"),onClick:()=>a(),children:(0,r.jsx)("button",{name:"search-button","aria-label":"search button",children:(0,r.jsx)(u.RB5,{className:"dark:text-white text-black text-[22px]"})})}),(0,r.jsx)("div",{className:"",onClick:()=>o(),children:(0,r.jsx)("button",{name:"share","aria-label":"share page",children:(0,r.jsx)(b.fRF,{className:"dark:text-white text-black text-[16px] mt-[7px] ml-2 mr-1"})})}),(0,r.jsx)("button",{name:"theme-switch","aria-label":"theme button",className:(0,h.GF)(n().theme_switch,"pl-3 dark:text-white text-black"),onClick:t,children:v&&"dark"===v?(0,r.jsx)(b.UD2,{className:"text-2xl"}):(0,r.jsx)(b.mox,{className:"text-md "})})]})]})},f=e=>{let{openSearch:a,toggleSideMenu:t,openSidebar:s=!1,navSetup:l,onShareClick:c}=e,{navLinks:o,socials:d,logo:_}=l,[g,f]=(0,x.useState)(!1),{theme:N,setTheme:w}=(0,p.F)();return(0,r.jsxs)("div",{className:"container",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between px-3",children:[(0,r.jsxs)("div",{className:"flex",style:{width:"120px"},children:[(0,r.jsx)("div",{className:(0,h.GF)(n().mobileBurgerToggle,"mr-3",s?n().mobileBurgerToggle__close:" "),onClick:()=>t(),children:(0,r.jsx)(u.qTj,{className:"dark:text-white text-black text-2xl"})}),(0,r.jsx)("div",{className:(0,h.GF)(n().search_icon_wrapper),onClick:()=>a(),children:(0,r.jsx)("button",{name:"search","aria-label":"search",className:"dark:text-white text-black",children:(0,r.jsx)(u.RB5,{className:"text-[24px]"})})}),(0,r.jsx)("div",{className:"",onClick:()=>c(),children:(0,r.jsx)("button",{name:"share","aria-label":"share page",children:(0,r.jsx)(b.fRF,{className:"dark:text-white text-black text-[18px] mt-[7px] ml-3"})})})]}),(0,r.jsx)(m.default,{href:"/",passHref:!0,children:_?_.type===i.nJ.IMAGE?(0,r.jsx)("img",{src:N===i.yU.DARK?(0,h.zS)(_.logoLight):(0,h.zS)(_.logo),alt:"WebExpe",className:"cursor-pointer",width:"100px"}):(0,r.jsx)("span",{className:"text-[22px] font-semibold",children:_.logo}):(0,r.jsx)("span",{className:"text-[22px] font-semibold",children:"Logo"})}),(0,r.jsx)("div",{className:"flex justify-end",style:{width:"120px"},children:d&&d.map((e,a)=>(0,r.jsx)("a",{href:e.link,target:"_blank",rel:"noopener noreferrer",className:(0,h.GF)("dark:text-white text-black text-[24px] d-inline-block",a===d.length-1?"ml-3":"mx-3"),children:e.icon},e.link))})]}),(0,r.jsx)("div",{className:"flex justify-center items-center font-regular text-[14px] d-sm-none mt-3",children:o.map((e,a)=>"dropdown"!==e.type?e.newTab?(0,r.jsx)("a",{href:e.path,target:"_blank",rel:"noopener noreferrer",className:"block mx-2 flex-wrap font-normal ",children:e.label},e.path):(0,r.jsx)(m.default,{href:e.path,passHref:!0,className:"mx-2 font-normal",children:e.label},a):(0,r.jsx)(j,{label:e.label,openDD:g,setOpenDD:()=>f(!g),floating:!0},a))})]})},N=t(9305),w=t(80),v=e=>{let{openSidebar:a=!1,closeNavSidebar:t,navSetup:s,changeTheme:l}=e,{theme:c,setTheme:o}=(0,p.F)();(0,x.useEffect)(()=>(a?(0,h.vd)():(0,h.Ep)(),()=>{(0,h.Ep)()}),[a]);let[d,m]=(0,x.useState)(!1);return(0,r.jsxs)(r.Fragment,{children:[a?(0,r.jsx)("div",{className:"backdrop",onClick:t}):null,(0,r.jsxs)("aside",{className:(0,h.GF)(n().nav_sidebar_wrapper,a&&n().open,"dark:bg-slate-900 dark:text-white bg-white text-black"),children:[(0,r.jsxs)("div",{className:"flex items-center justify-between pb-3",onClick:t,children:[(0,r.jsx)("p",{className:"",children:"МЕНЮ"}),(0,r.jsx)("div",{children:(0,r.jsx)(w.lTq,{className:"text-slate-800 dark:text-white text-[25px]"})})]}),(0,r.jsx)("hr",{}),(0,r.jsxs)("div",{className:"my-15",children:[s.sideNavLinks.map((e,a)=>"dropdown"!==e.type?e.newTab?(0,r.jsx)("a",{href:e.path,target:"_blank",rel:"noopener noreferrer",className:"text-[16px] block my-3 flex-wrap",children:e.label},e.path):(0,r.jsx)(N.e9,{href:e.path,passHref:!0,className:"text-[16px] block my-3",children:e.label},a):(0,r.jsx)(j,{label:e.label,openDD:d,setOpenDD:()=>m(!d)},a)),null]}),(0,r.jsx)("hr",{}),(0,r.jsx)("div",{className:"my-5",children:s.socials&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{className:"font-light",children:"Подписаться : "})," ",s.socials.map(e=>(0,r.jsx)("a",{href:e.link,target:"_blank",rel:"noopener noreferrer",className:"text-[28px] inline-block mr-5 mt-2",children:e.icon},e.link)),(0,r.jsx)("hr",{className:"mt-5"})]})}),(0,r.jsxs)("div",{className:"mt-5 mb-4",children:[(0,r.jsxs)("p",{className:"mb-2 font-light",children:["Переключиться на ",c===i.yU.LIGHT?"тёмную":"светлую"," тему :"]}),(0,r.jsx)("button",{name:"theme-switch","aria-label":"theme-switch",className:(0,h.GF)(n().theme_switch,"dark:text-white text-black"),onClick:()=>l(),children:c===i.yU.DARK?(0,r.jsx)(b.UD2,{className:"text-2xl"}):(0,r.jsx)(b.mox,{className:"text-lg"})})]}),(0,r.jsx)("hr",{}),(0,r.jsx)("div",{className:"my-5",children:(0,r.jsx)("p",{className:"text-sm font-light dark:text-gray-400 text-gray-500 mb-1",children:"Copyright \xa9 2024"})})]})]})},k=t(3235),y=t.n(k),F=t(18),S=t(1437),C=t(1421),T=t(724),G=t.n(T),L=e=>{let{article:a,path:t}=e;return(0,r.jsx)("div",{className:"w-full lg:w-1/3 md:w-1/2 px-3 mb-10",children:(0,r.jsx)(m.default,{href:t,passHref:!0,children:(0,r.jsxs)("div",{className:(0,h.GF)(G().article_card,"px-[15px] py-[10px] border-b-[5px] border-blue-600 dark:bg-slate-800 dark:text-white bg-white text-black drop-shadow-lg"),children:[(0,r.jsx)("p",{className:(0,h.GF)(G().article_card__date,"font-medium text-xs mt-3 mb-2"),children:a.date}),(0,r.jsx)(m.default,{href:t,passHref:!0,children:(0,r.jsx)("h1",{className:(0,h.GF)(G().article_card__title,"text-[22px] font-bold my-0"),children:a.articleTitle})}),(0,r.jsx)(S.Z,{tags:a.tags}),(0,r.jsxs)("div",{className:"flex items-center mt-3",children:[(0,r.jsxs)("div",{className:"flex items-center",children:[(0,r.jsx)(C.Z,{author:a.author,className:"w-[40px] h-[40px] mr-3 text-xl"}),(0,r.jsx)(m.default,{href:"/blog?author="+a.author.name,passHref:!0,className:(0,h.GF)(G().author_name,"text-sm font-medium"),children:a.author.name})]}),(0,r.jsx)(F.Z,{category:a.category})]})]})})})},E=t(7571),D=e=>{let{closeSearch:a}=e,[t,s]=(0,x.useState)(""),[l,i]=(0,x.useState)([]),c=()=>{i([...E.a].filter(e=>e.preview.tags.split(",").join().indexOf(t.toLocaleLowerCase())>=0||e.preview.articleTitle.indexOf(t.toLocaleLowerCase())>=0))};return(0,r.jsx)("div",{className:(0,h.GF)("bg-slate-100 text-black dark:bg-slate-900 dark:text-white",null===y()||void 0===y()?void 0:y().search_container),children:(0,r.jsxs)("div",{className:"container mx-auto",children:[(0,r.jsxs)("div",{className:"px-3",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center md:pt-10 pt-5",children:[(0,r.jsx)("h1",{className:"text-[45px] font-bold",children:"Search"}),(0,r.jsx)("button",{name:"search-button","aria-label":"search button",type:"button",className:y().search_close_icon,onClick:a,children:(0,r.jsx)(w.lTq,{className:"text-slate-800 dark:text-white text-4xl"})})]}),(0,r.jsx)("div",{className:"mb-[40px] mt-3",children:(0,r.jsx)("input",{className:"text-[20px] w-full bg-inherit border-b border-gray-400 p-2 dark:text-white text-black",placeholder:"Enter keywords and seperate with commas",value:t,onChange:e=>s(e.target.value),onKeyPress:e=>"Enter"===e.key&&c()})})]}),(null==l?void 0:l.length)>0&&(0,r.jsx)("div",{className:"flex flex-wrap",children:(null==l?void 0:l.length)>0&&(null==l?void 0:l.map((e,a)=>(0,r.jsx)(L,{article:e.preview,path:e.path},a)))})]})})},A=t(5991),H=()=>{let e=window.location.href,a="http://twitter.com/share?text=Check out this article!! &url=".concat(e,"&hashtags=webdevelopment,javacript,javascriptdaily,webdevelopmenttutorial,tutorial"),t="https://www.facebook.com/sharer/sharer.php?u=".concat(e),s="https://www.linkedin.com/shareArticle?mini=true&url=".concat(e,"&title=Check out this article!!&source=LinkedIn"),l=e=>{(0,A.gB)({action:"share_clicked",event_category:"click",label:e,value:null})},[i,c]=(0,x.useState)(!1);return(0,x.useEffect)(()=>{i&&setTimeout(()=>{c(!1)},2e3)},[i]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"flex flex-wrap items-center",children:[(0,r.jsx)("a",{className:"mr-3","aria-label":"facebook-share",href:t,onClick:()=>(window.open(t,"popup","width=300,height=500"),l("facebook_share_clicked"),!1),target:"popup",children:(0,r.jsx)(u.s5I,{className:"text-[30px]"})}),(0,r.jsx)("a",{className:"mr-3","aria-label":"twitter-share",href:a,onClick:()=>(window.open(a,"popup","width=600,height=500"),l("twitter_share_clicked"),!1),target:"popup",children:(0,r.jsx)(u.wod,{className:"text-[30px]"})}),(0,r.jsx)("a",{className:"mr-3","aria-label":"linkedin-share",href:s,onClick:()=>(window.open(s,"popup","width=500,height=500"),l("linkedin_share_clicked"),!1),target:"popup",children:(0,r.jsx)(b.NQh,{className:"text-[23px]"})}),(0,r.jsx)("button",{className:"mr-3",name:"copy-link","aria-label":"copy-link",onClick:()=>{navigator&&(navigator.clipboard.writeText(e),c(!0)),l("copy_clipboard_clicked")},children:(0,r.jsx)(b.Gzp,{className:"text-[30px]"})})]}),(0,r.jsxs)("div",{className:(0,h.GF)("bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded fixed flex transition-all right-[10px]",i?"md:bottom-10 sm:bottom-[0px] opacity-100":"-bottom-20 opacity-0"),role:"alert",children:[(0,r.jsx)("strong",{className:"font-bold",children:"Link Copied"}),(0,r.jsx)("span",{className:"pl-5",children:(0,r.jsx)(b.C7Q,{className:"pt-1 text-[18px] cursor-pointer"})})]})]})},P=e=>{let{closeModal:a,openShareModal:t=!1}=e;return(0,r.jsxs)("div",{className:(0,h.GF)("transition-all fixed h-screen w-screen flex items-center justify-center left-0 z-20 top-0",t?"pointer-events-auto opacity-100":"pointer-events-none opacity-0"),children:[(0,r.jsx)("div",{className:"absolute top-0 left-0 w-screen h-screen bg-black opacity-50",onClick:a}),(0,r.jsxs)("div",{className:(0,h.GF)("bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded lg:w-1/6 mx-3 w-full relative z-10 transition-all",t?"top-0":"top-10"),children:[(0,r.jsxs)("div",{className:"flex border-gray-300 pb-2 mb-3 border-b",children:[(0,r.jsx)("p",{className:"  font-medium w-full",children:"Share:"}),(0,r.jsx)("span",{className:"pl-5",onClick:a,children:(0,r.jsx)(b.C7Q,{className:"pt-1 text-[18px] cursor-pointer"})})]}),(0,r.jsx)(H,{})]})]})},B=()=>{let{theme:e,setTheme:a}=(0,p.F)(),[t,s]=(0,x.useState)(!1),[c,o]=(0,x.useState)(!1),[d,m]=(0,x.useState)(!1),[b,u]=(0,x.useState)(!1);(0,x.useEffect)(()=>(d&&(0,h.vd)(),()=>{(0,h.Ep)()}),[d]);let _=()=>{a("dark"===e?"light":"dark")},[j,N]=(0,x.useState)(!1),w=0;(0,x.useEffect)(()=>(s("tablet"===(0,h.l7)()||"mobile"===(0,h.l7)()),window.onscroll=()=>{let e=window.pageYOffset||document.documentElement.scrollTop,a=window.scrollY;a>0&&e>w?N(!0):a>50&&e<w&&N(!1),w=e<=0?0:e},()=>{N(!1)}),[]);let k=()=>{m(!0)},y=()=>{o(!c)},F=()=>{(0,h.uk)()||u(!0)};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("nav",{className:(0,h.GF)(n().navbar,"bg-white  dark:bg-slate-900 dark:text-white text-black"),children:t?(0,r.jsx)(g,{openSearch:k,changeTheme:_,toggleSideMenu:y,openSidebar:c,navSetup:l.vf,onShareClick:F}):(()=>{switch(l.vf.type){case i.Ce.DEFAULT:return(0,r.jsx)(g,{openSearch:k,changeTheme:_,toggleSideMenu:y,openSidebar:c,navSetup:l.vf,onShareClick:F});case i.Ce.CENTERED:return(0,r.jsx)(f,{openSearch:k,changeTheme:_,toggleSideMenu:y,openSidebar:c,navSetup:l.vf,onShareClick:F});default:return(0,r.jsx)(g,{openSearch:k,changeTheme:_,toggleSideMenu:y,openSidebar:c,navSetup:l.vf,onShareClick:F})}})()}),(0,r.jsx)(v,{openSidebar:c,closeNavSidebar:()=>o(!1),navSetup:l.vf,changeTheme:_}),d&&(0,r.jsx)(D,{closeSearch:()=>m(!1)}),(0,r.jsx)(P,{closeModal:()=>u(!1),openShareModal:b})]})},I=t(2216),M=t.n(I),q=t(8547),Z=t(94),R=t.n(Z),O=e=>{let{headerData:a}=e;return(0,r.jsxs)("div",{className:"mb-[30px]",children:[(0,r.jsx)("h1",{className:(0,h.GF)(R().articleTitle,"text-center text-2xl md:text-4xl font-medium mt-[20px] mb-[5px]"),children:a.articleTitle}),(0,r.jsxs)("div",{className:(0,h.GF)("mb-[10px] mt-[15px] text-[14px] font-medium",R().centered_article_header_author),children:[(0,r.jsxs)("p",{className:"my-0 mx-[30px] font-medium",children:[a.author.name,a.category&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("span",{className:"px-1 font-light",children:"в"}),(0,r.jsx)(d(),{href:"/blog?category="+a.category,passHref:!0,legacyBehavior:!0,children:a.category})]})]}),(0,r.jsx)("p",{className:"my-0",children:a.date})]}),(0,r.jsx)(S.Z,{tags:a.tags,center:!0})]})},z=e=>{let{headerData:a}=e;return(0,r.jsxs)("div",{className:"mb-[30px]",children:[(0,r.jsxs)("div",{className:"mb-[10px] flex items-center mt-[15px]",children:[(0,r.jsx)(C.Z,{author:a.author,className:"w-[60px] h-[60px] mr-3 text-xl"}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"flex text-[16px] md:text-[20px] items-center",children:[(0,r.jsx)("p",{className:(0,h.GF)(R().article_header_author_name,"font-medium my-0"),children:a.author.name}),a.category&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{className:"px-2 dark:text-gray-400 text-gray-500 my-0",children:"в"}),(0,r.jsx)("p",{className:"font-medium my-0",children:(0,r.jsx)(d(),{href:"/blog?category="+a.category,passHref:!0,legacyBehavior:!0,children:a.category})})]})]}),(0,r.jsx)("p",{className:"text-xs dark:text-gray-400 text-gray-500 my-0 mt-1",children:a.date})]})]}),(0,r.jsx)("h1",{className:"text-2xl md:text-4xl font-semibold mt-[20px] mb-[5px]",children:a.articleTitle}),(0,r.jsx)(S.Z,{tags:a.tags})]})},U=e=>{let{centered:a=!1,ARTICLE_DETAILS:t}=e;return a?(0,r.jsx)(O,{headerData:t.preview}):(0,r.jsx)(z,{headerData:t.preview})},K=e=>{var a;let{author:t,relatedArticles:s,articleGrid:l=!1}=e,i="bg-white dark:bg-slate-800 dark:border-none border-slate-100 shadow-lg border md:rounded-[8px] px-[15px] py-[10px] mb-[30px] overflow-hidden";return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:i,children:[(0,r.jsxs)("div",{className:"flex items-center",children:[(0,r.jsx)(C.Z,{author:t,className:"w-[60px] h-[60px] mr-3 text-xl"}),(0,r.jsxs)("div",{className:"font-semibold",children:[(0,r.jsx)("p",{className:"text-[20px]  mb-0 mt-0",children:t.name}),(0,r.jsx)("p",{className:"text-xs mt-0 mb-0",children:t.designation})]})]}),(0,r.jsx)("p",{className:"text-[16px] mt-2",children:t.bio}),(null===(a=t.social)||void 0===a?void 0:a.length)&&(0,r.jsx)("div",{className:"flex items-center flex-wrap mt-3",children:t.social.map((e,a)=>(0,r.jsx)("a",{href:e.link,target:"_blank",className:"mr-[15px] text-[32px]",rel:"noopener noreferrer",children:e.icon},a))})]}),(0,h.ds)()&&(0,r.jsxs)("div",{className:i,children:[(0,r.jsx)("p",{className:"border-b border-gray-300 pb-2 mb-3 font-medium w-full",children:"Поделиться"}),(0,r.jsx)(H,{})]}),s.length&&(0,r.jsxs)("div",{className:i,children:[(0,r.jsx)("p",{className:"border-b border-gray-300 pb-2 mb-3 font-medium w-full",children:"Другие статьи"}),(0,r.jsxs)("div",{className:l?"flex flex-wrap":"",children:[s.slice(0,3).map((e,a)=>(0,r.jsx)(d(),{href:(0,h.b7)(e.path),passHref:!0,legacyBehavior:!0,children:(0,r.jsx)("div",{className:(0,h.GF)("mb-3 cursor-pointer",l?"lg:w-1/3 md:w-1/2 w-full md:pr-2":"w-full"),children:(0,r.jsxs)("div",{className:" rounded-[3px] dark:bg-slate-800 border border-slate-200 dark:border-slate-900 flex items-center overflow-hidden shadow-lg hover:shadow-md ",children:[(0,r.jsx)("div",{className:"object-cover shrink-0",children:(0,r.jsx)("img",{src:(0,h.zS)(e.preview.thumbnail),className:"w-[120px] h-[70px] mr-2 object-cover",alt:e.preview.articleTitle})}),(0,r.jsx)("div",{className:"pr-1 text-[16px] hover:text-blue-500 font-semibold",children:e.preview.articleTitle})]})},e.path)},a)),s.length>3?(0,r.jsx)(m.default,{href:"/blog?author="+t.name,passHref:!0,className:"block text-sm py-3 px-2 text-center dark:bg-slate-900 bg-blue-500 rounded text-white font-bold hover:!text-blue-900 dark:hover:!text-slate-400 transition-all",children:(0,r.jsxs)("p",{children:["Все статьи от автора: ",t.name]})}):null]})]})]})},Q=e=>{let{children:a}=e,t=(0,h.q6)(),s=t.preview.author,l=E.a.filter(e=>e.preview.author===s);return(0,r.jsx)("section",{className:(0,h.GF)(M().centered_article_wrapper,"dark:bg-slate-900 dark:text-white"),children:(0,r.jsxs)("div",{className:"container px-0 md:px-[15px] pt-[50px] pb-[50px]",children:[(0,r.jsxs)("article",{className:(0,h.GF)(M().article_content,"pb-[30px] px-3 bg-white dark:bg-slate-800 dark:border-none dark:drop-shadow-lg dark:text-white pt-10 md:pt-0 mx-auto font-regular text-lg leading-relaxed"),children:[(0,r.jsx)(U,{ARTICLE_DETAILS:t,centered:!0}),a]}),(0,r.jsx)(q.default,{}),(0,r.jsx)("div",{className:(0,h.GF)(M().author_and_more,"mx-auto"),children:(0,r.jsx)(K,{author:s,relatedArticles:l,articleGrid:!0})})]})})},W=e=>{let{children:a,ads:t}=e,s=(0,h.q6)(),l=s.preview.author,i=E.a.filter(e=>e.preview.author===l);return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("section",{className:(0,h.GF)(M().withSidebar_article_wrapper,"dark:bg-slate-900 dark:text-white"),children:(0,r.jsxs)("div",{className:"container px-0 md:px-[15px] lg:flex pb-[50px] pt-[50px]",children:[(0,r.jsxs)("article",{className:(0,h.GF)(M().article_content,"pb-[20px] px-3 text-black bg-white dark:bg-slate-800 dark:border-none dark:drop-shadow-lg dark:text-white pt-10 md:pt-0 font-regular text-lg leading-relaxed"),children:[(0,r.jsx)(U,{ARTICLE_DETAILS:s}),a]}),(0,r.jsxs)("div",{className:M().article_sidebar_wrapper,children:[(0,r.jsx)(K,{author:l,relatedArticles:i}),t&&t.length?(0,r.jsx)("div",{className:"flex flex-wrap",children:t.map((e,a)=>(0,r.jsx)("div",{dangerouslySetInnerHTML:{__html:"".concat(e)}},a))}):null]})]})})})},Y=e=>{let{children:a}=e;return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{className:"dark:bg-slate-900 dark:text-white bg-slate-100 text-black pb-[20px] md:min-h-screen font-regular text-lg leading-relaxed",children:a})})},J=e=>{let{children:a,PAGE_SEO:t,blogwithsidebar:i=!1,blogcentered:c=!1,home:n=!1,ads:o=[]}=e,d=(0,h.q6)(),x={};return x=d&&d.seo?(0,h.bF)({...d.seo}):t?(0,h.bF)({...l.aT,...t}):(0,h.bF)({...l.aT}),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.PB,{...x}),(0,r.jsx)(B,{}),i?(0,r.jsx)(W,{children:a,ads:o}):c?(0,r.jsx)(Q,{children:a}):(0,r.jsx)(Y,{children:a})]})}},724:function(e){e.exports={article_card:"ArticleCard_article_card__YqXyn",featured_article:"ArticleCard_featured_article__QPbDI",featured_article__image:"ArticleCard_featured_article__image__aG2gw",author_img:"ArticleCard_author_img__0qI6m"}},94:function(e){e.exports={article_header_author_img:"ArticleHeader_article_header_author_img__812nN",articleTitle:"ArticleHeader_articleTitle__3L1Bi",centered_article_header_author:"ArticleHeader_centered_article_header_author___gRtE"}},4089:function(e){e.exports={shadow:"Navbar_shadow__OExRc",logo:"Navbar_logo__l1Z_s",navbar:"Navbar_navbar__W_ouQ",search_icon_wrapper:"Navbar_search_icon_wrapper__1a_rL",theme_switch:"Navbar_theme_switch__q7F_Z",scrolled:"Navbar_scrolled__vS8N4",mobileBurgerToggle:"Navbar_mobileBurgerToggle__Bj_52",nav_sidebar_wrapper:"Navbar_nav_sidebar_wrapper__M0KaI",open:"Navbar_open__4s5So"}},3235:function(e){e.exports={search_close_icon:"Search_search_close_icon__TqHMh",search_container:"Search_search_container__TSwIg"}},3270:function(e){e.exports={section_seperator_line:"Seperator_section_seperator_line__gdWIB",section_seperator_dots:"Seperator_section_seperator_dots__SPoOD"}},2216:function(e){e.exports={withSidebar_article_wrapper:"PageLayout_withSidebar_article_wrapper__887B7",centered_article_wrapper:"PageLayout_centered_article_wrapper__gS3Af",article_content:"PageLayout_article_content__4dnq3",author_and_more:"PageLayout_author_and_more__wxN3W",article_sidebar_wrapper:"PageLayout_article_sidebar_wrapper__gMbiV",more_from_author:"PageLayout_more_from_author__Cb3tP",sidebar_author_details:"PageLayout_sidebar_author_details__VG9Z3",author:"PageLayout_author__tShKu",author_img:"PageLayout_author_img__qLrM1",more_from_author__articles:"PageLayout_more_from_author__articles__uOj3T",article_image:"PageLayout_article_image__icrOv",article_title:"PageLayout_article_title__Ud_5S"}}}]);