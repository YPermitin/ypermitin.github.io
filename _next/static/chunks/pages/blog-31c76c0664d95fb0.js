(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9195,1465],{7801:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog",function(){return a(8957)}])},8957:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return f}});var r=a(5893),n=a(3907),i=a(7571),s=a(1163),l=a(9305),o=a(4275),c=a(1358),p=a.n(c),u=a(7294),d=a(7771),g=e=>{let{articlesPerPage:t=6}=e,{category:a,author:c}=(0,s.useRouter)().query,g=i.a.filter(e=>e.preview.category===a),f=i.a.filter(e=>e.preview.author.name===c),[b,m]=(0,u.useState)(i.a);(0,u.useEffect)(()=>{m(a?g:c?f:i.a)},[a,c]);let[h,v]=(0,u.useState)(b),[x,y]=(0,u.useState)(0),[C,k]=(0,u.useState)(0);return(0,u.useEffect)(()=>{let e=C+t;v(b.slice(C,e)),y(Math.ceil(b.length/t))},[C,t,b]),(0,r.jsx)(l.Xg,{home:!0,children:(0,r.jsxs)("div",{className:(0,o.GF)("container mt-10 md:pt-0 px-0 md:px-3",a?"pt-10":"pt-14"),children:[a||c?(0,r.jsxs)("h1",{className:"px-2 mb-[30px] text-[45px] font-bold",style:{textTransform:"capitalize"},children:[a||c,(0,r.jsx)("hr",{className:"mt-[10px]"})]}):null,(0,r.jsx)("div",{className:"flex flex-wrap",children:h?h.map((e,t)=>(0,r.jsx)(n.Z,{article:e.preview,path:e.path},t)):null}),(0,r.jsx)(p(),{breakLabel:"...",nextLabel:(0,r.jsx)(d.rYR,{}),onPageChange:e=>{k(e.selected*t%b.length)},pageRangeDisplayed:1,pageCount:x,previousLabel:(0,r.jsx)(d.FtK,{}),containerClassName:"pagination",activeClassName:"active"})]})})},f=()=>(0,r.jsx)(g,{articlesPerPage:6})},3907:function(e,t,a){"use strict";var r=a(5893),n=a(1465),i=a(4275),s=a(724),l=a.n(s),o=a(1421),c=a(18),p=a(1437),u=a(5675),d=a.n(u);t.Z=e=>{let{article:t,path:a}=e,s=window.location.origin?window.location.origin:"";return(0,r.jsx)("div",{className:"w-full lg:w-1/3 md:w-1/2 md:px-[15px] px-2 mb-[30px]",children:(0,r.jsxs)(n.default,{href:(0,i.b7)(a),passHref:!0,className:(0,i.GF)(l().article_card,"border-b-[5px] border-blue-500 dark:bg-slate-800 dark:text-white dark:drop-shadow-lg flex flex-col justify-between"),children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"rounded-t-[4px] overflow-hidden h-[200px] relative",children:(0,r.jsx)(d(),{src:(0,i.zS)(t.thumbnail),alt:t.articleTitle,layout:"fill",quality:100,objectFit:"cover",loader:e=>{let{src:t,width:a,quality:r}=e;return"".concat(s).concat(t,"?w=").concat(a,"&q=").concat(r||75)}})}),(0,r.jsxs)("div",{className:"d-block px-[15px] py-0",children:[(0,r.jsx)("p",{className:"font-normal text-xs pt-3 mb-0 md:mb-3",children:t.date}),(0,r.jsx)(n.default,{href:(0,i.b7)(a),passHref:!0,children:(0,r.jsx)("h1",{className:"text-[22px] font-bold cursor-pointer tracking-wide hover:text-blue-600",children:t.articleTitle})}),(0,r.jsxs)("p",{className:(0,i.GF)(l().article_card__intro,"text-sm font-normal mt-2 md:mt-1"),children:[t.shortIntro.slice(0,100)," ..."]}),(0,r.jsx)(p.Z,{tags:t.tags})]})]}),(0,r.jsxs)("div",{className:(0,i.GF)(l().article_card_footer,"mt-4 mb-3 flex items-center px-3"),children:[(0,r.jsxs)("div",{className:"flex items-center",children:[(0,r.jsx)(o.Z,{author:t.author,className:"w-[40px] h-[40px] mr-3 text-xl"}),(0,r.jsx)(n.default,{href:"/blog?author="+t.author.name,passHref:!0,className:(0,i.GF)(l().author_name,"text-sm font-medium"),children:t.author.name})]}),(0,r.jsx)(c.Z,{category:t.category})]})]})})}},1465:function(e,t,a){"use strict";a.r(t);var r=a(5893),n=a(1664),i=a.n(n),s=a(4275);t.default=e=>{let{href:t,passHref:a=!0,newTab:n=!1,external:l=!1,children:o,className:c}=e;return(0,r.jsx)(r.Fragment,{children:n||l?(0,r.jsx)("a",{href:(0,s.b7)(t),className:c,target:"_blank",rel:"noopener noreferrer",children:o}):(0,r.jsx)(i(),{href:(0,s.b7)(t),passHref:a,className:(0,s.GF)("cursor-pointer hover:text-blue-500",c),children:o})})}},18:function(e,t,a){"use strict";var r=a(5893),n=a(1465);t.Z=e=>{let{category:t}=e;return(0,r.jsx)(r.Fragment,{children:t&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{className:"text-[14px] md:text-[16px] px-2 font-normal",children:"в"}),(0,r.jsx)("p",{className:"font-medium text-[14px] md:text-[16px]",children:(0,r.jsx)(n.default,{href:"/blog?category="+t,children:t})})]})})}},1437:function(e,t,a){"use strict";var r=a(5893),n=a(4275);t.Z=e=>{let{tags:t,center:a=!1}=e;return(0,r.jsx)("div",{className:(0,n.GF)("md:mt-2 flex flex-wrap",a&&"justify-center"),children:t.split(",").map((e,t)=>(0,r.jsxs)("p",{className:"text-[12px] font-normal mr-2 mb-1 inline-block text-gray-500 dark:text-gray-400",children:["#",e.trim()]},t))})}},1421:function(e,t,a){"use strict";var r=a(5893),n=a(4275);t.Z=e=>{let{author:t,className:a}=e;return(0,r.jsx)("div",{className:(0,n.GF)("flex items-center justify-center shadow-xl rounded-full overflow-hidden bg-blue-500 shrink-0",a),children:t.profilePic?(0,r.jsx)("img",{src:t.profilePic,alt:t.name,width:"100%"}):(0,r.jsx)("p",{className:"text-center font-medium text-white",children:t.name[0]})})}},9305:function(e,t,a){"use strict";a.d(t,{Ee:function(){return l},Xg:function(){return i},Y7:function(){return u},aV:function(){return c},e9:function(){return p},o_:function(){return d},ty:function(){return o},xv:function(){return s}});var r=a(5152),n=a.n(r);let i=n()(()=>Promise.all([a.e(4838),a.e(4738),a.e(1664),a.e(7167)]).then(a.bind(a,7167)),{loadableGenerated:{webpack:()=>[7167]}}),s=n()(()=>a.e(9179).then(a.bind(a,9179)),{loadableGenerated:{webpack:()=>[9179]}}),l=n()(()=>a.e(1974).then(a.bind(a,1974)),{loadableGenerated:{webpack:()=>[1974]}}),o=n()(()=>a.e(8547).then(a.bind(a,8547)),{loadableGenerated:{webpack:()=>[8547]}}),c=n()(()=>a.e(6806).then(a.bind(a,6806)),{loadableGenerated:{webpack:()=>[6806]}}),p=n()(()=>Promise.all([a.e(1664),a.e(1465)]).then(a.bind(a,1465)),{loadableGenerated:{webpack:()=>[1465]}});n()(()=>a.e(567).then(a.bind(a,567)),{loadableGenerated:{webpack:()=>[567]}});let u=n()(()=>Promise.all([a.e(2004),a.e(4139)]).then(a.bind(a,4139)),{loadableGenerated:{webpack:()=>[4139]}}),d=n()(()=>Promise.all([a.e(3811),a.e(7472),a.e(584),a.e(7870)]).then(a.bind(a,7870)),{loadableGenerated:{webpack:()=>[7870]}})},724:function(e){e.exports={article_card:"ArticleCard_article_card__YqXyn",featured_article:"ArticleCard_featured_article__QPbDI",featured_article__image:"ArticleCard_featured_article__image__aG2gw",author_img:"ArticleCard_author_img__0qI6m"}},1358:function(e,t,a){var r;e.exports=(r=a(7294),(()=>{var e={703:(e,t,a)=>{"use strict";var r=a(414);function n(){}function i(){}i.resetWarningCache=n,e.exports=function(){function e(e,t,a,n,i,s){if(s!==r){var l=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function t(){return e}e.isRequired=e;var a={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:n};return a.PropTypes=a,a}},697:(e,t,a)=>{e.exports=a(703)()},414:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},98:e=>{"use strict";e.exports=r}},t={};function a(r){var n=t[r];if(void 0!==n)return n.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,a),i.exports}a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};return(()=>{"use strict";a.r(n),a.d(n,{default:()=>v});var e=a(98),t=a.n(e),r=a(697),i=a.n(r);function s(){return(s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}var l=function(e){var a=e.pageClassName,r=e.pageLinkClassName,n=e.page,i=e.selected,l=e.activeClassName,o=e.activeLinkClassName,c=e.getEventListener,p=e.pageSelectedHandler,u=e.href,d=e.extraAriaContext,g=e.pageLabelBuilder,f=e.rel,b=e.ariaLabel||"Page "+n+(d?" "+d:""),m=null;return i&&(m="page",b=e.ariaLabel||"Page "+n+" is your current page",a=void 0!==a?a+" "+l:l,void 0!==r?void 0!==o&&(r=r+" "+o):r=o),t().createElement("li",{className:a},t().createElement("a",s({rel:f,role:u?void 0:"button",className:r,href:u,tabIndex:i?"-1":"0","aria-label":b,"aria-current":m,onKeyPress:p},c(p)),g(n)))};function o(){return(o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}l.propTypes={pageSelectedHandler:i().func.isRequired,selected:i().bool.isRequired,pageClassName:i().string,pageLinkClassName:i().string,activeClassName:i().string,activeLinkClassName:i().string,extraAriaContext:i().string,href:i().string,ariaLabel:i().string,page:i().number.isRequired,getEventListener:i().func.isRequired,pageLabelBuilder:i().func.isRequired,rel:i().string};var c=function(e){var a=e.breakLabel,r=e.breakAriaLabel,n=e.breakClassName,i=e.breakLinkClassName,s=e.breakHandler,l=e.getEventListener;return t().createElement("li",{className:n||"break"},t().createElement("a",o({className:i,role:"button",tabIndex:"0","aria-label":r,onKeyPress:s},l(s)),a))};function p(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return null!=e?e:t}function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(){return(d=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function g(e,t){return(g=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function f(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}c.propTypes={breakLabel:i().oneOfType([i().string,i().node]),breakAriaLabel:i().string,breakClassName:i().string,breakLinkClassName:i().string,breakHandler:i().func.isRequired,getEventListener:i().func.isRequired};var h=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&g(e,t)}(i,e);var a,r,n=(r=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}(),function(){var e,t=b(i);if(r){var a=b(this).constructor;e=Reflect.construct(t,arguments,a)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===u(t)||"function"==typeof t))return t;if(void 0!==t)throw TypeError("Derived constructors may only return object or undefined");return f(e)}(this,e)});function i(e){var a,r;return function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,i),m(f(a=n.call(this,e)),"handlePreviousPage",function(e){var t=a.state.selected;a.handleClick(e,null,t>0?t-1:void 0,{isPrevious:!0})}),m(f(a),"handleNextPage",function(e){var t=a.state.selected,r=a.props.pageCount;a.handleClick(e,null,t<r-1?t+1:void 0,{isNext:!0})}),m(f(a),"handlePageSelected",function(e,t){if(a.state.selected===e)return a.callActiveCallback(e),void a.handleClick(t,null,void 0,{isActive:!0});a.handleClick(t,null,e)}),m(f(a),"handlePageChange",function(e){a.state.selected!==e&&(a.setState({selected:e}),a.callCallback(e))}),m(f(a),"getEventListener",function(e){return m({},a.props.eventListener,e)}),m(f(a),"handleClick",function(e,t,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},i=n.isPrevious,s=n.isNext,l=n.isBreak,o=n.isActive;e.preventDefault?e.preventDefault():e.returnValue=!1;var c=a.state.selected,p=a.props.onClick,u=r;if(p){var d=p({index:t,selected:c,nextSelectedPage:r,event:e,isPrevious:void 0!==i&&i,isNext:void 0!==s&&s,isBreak:void 0!==l&&l,isActive:void 0!==o&&o});if(!1===d)return;Number.isInteger(d)&&(u=d)}void 0!==u&&a.handlePageChange(u)}),m(f(a),"handleBreakClick",function(e,t){var r=a.state.selected;a.handleClick(t,e,r<e?a.getForwardJump():a.getBackwardJump(),{isBreak:!0})}),m(f(a),"callCallback",function(e){void 0!==a.props.onPageChange&&"function"==typeof a.props.onPageChange&&a.props.onPageChange({selected:e})}),m(f(a),"callActiveCallback",function(e){void 0!==a.props.onPageActive&&"function"==typeof a.props.onPageActive&&a.props.onPageActive({selected:e})}),m(f(a),"getElementPageRel",function(e){var t=a.state.selected,r=a.props,n=r.nextPageRel,i=r.prevPageRel,s=r.selectedPageRel;return t-1===e?i:t===e?s:t+1===e?n:void 0}),m(f(a),"pagination",function(){var e=[],r=a.props,n=r.pageRangeDisplayed,i=r.pageCount,s=r.marginPagesDisplayed,l=r.breakLabel,o=r.breakClassName,p=r.breakLinkClassName,u=r.breakAriaLabels,d=a.state.selected;if(i<=n)for(var g=0;g<i;g++)e.push(a.getPageElement(g));else{var f=n/2,b=n-f;d>i-n/2?f=n-(b=i-d):d<n/2&&(b=n-(f=d));var m,h,v=function(e){return a.getPageElement(e)},x=[];for(m=0;m<i;m++){var y=m+1;if(y<=s)x.push({type:"page",index:m,display:v(m)});else if(y>i-s)x.push({type:"page",index:m,display:v(m)});else if(m>=d-f&&m<=d+(0===d&&n>1?b-1:b))x.push({type:"page",index:m,display:v(m)});else if(l&&x.length>0&&x[x.length-1].display!==h&&(n>0||s>0)){var C=m<d?u.backward:u.forward;h=t().createElement(c,{key:m,breakAriaLabel:C,breakLabel:l,breakClassName:o,breakLinkClassName:p,breakHandler:a.handleBreakClick.bind(null,m),getEventListener:a.getEventListener}),x.push({type:"break",index:m,display:h})}}x.forEach(function(t,a){var r=t;"break"===t.type&&x[a-1]&&"page"===x[a-1].type&&x[a+1]&&"page"===x[a+1].type&&x[a+1].index-x[a-1].index<=2&&(r={type:"page",index:t.index,display:v(t.index)}),e.push(r.display)})}return e}),void 0!==e.initialPage&&void 0!==e.forcePage&&console.warn("(react-paginate): Both initialPage (".concat(e.initialPage,") and forcePage (").concat(e.forcePage,") props are provided, which is discouraged.")+" Use exclusively forcePage prop for a controlled component.\nSee https://reactjs.org/docs/forms.html#controlled-components"),r=e.initialPage?e.initialPage:e.forcePage?e.forcePage:0,a.state={selected:r},a}return a=[{key:"componentDidMount",value:function(){var e=this.props,t=e.initialPage,a=e.disableInitialCallback,r=e.extraAriaContext,n=e.pageCount,i=e.forcePage;void 0===t||a||this.callCallback(t),r&&console.warn("DEPRECATED (react-paginate): The extraAriaContext prop is deprecated. You should now use the ariaLabelBuilder instead."),Number.isInteger(n)||console.warn("(react-paginate): The pageCount prop value provided is not an integer (".concat(n,"). Did you forget a Math.ceil()?")),void 0!==t&&t>n-1&&console.warn("(react-paginate): The initialPage prop provided is greater than the maximum page index from pageCount prop (".concat(t," > ").concat(n-1,").")),void 0!==i&&i>n-1&&console.warn("(react-paginate): The forcePage prop provided is greater than the maximum page index from pageCount prop (".concat(i," > ").concat(n-1,")."))}},{key:"componentDidUpdate",value:function(e){void 0!==this.props.forcePage&&this.props.forcePage!==e.forcePage&&(this.props.forcePage>this.props.pageCount-1&&console.warn("(react-paginate): The forcePage prop provided is greater than the maximum page index from pageCount prop (".concat(this.props.forcePage," > ").concat(this.props.pageCount-1,").")),this.setState({selected:this.props.forcePage})),Number.isInteger(e.pageCount)&&!Number.isInteger(this.props.pageCount)&&console.warn("(react-paginate): The pageCount prop value provided is not an integer (".concat(this.props.pageCount,"). Did you forget a Math.ceil()?"))}},{key:"getForwardJump",value:function(){var e=this.state.selected,t=this.props,a=t.pageCount,r=e+t.pageRangeDisplayed;return r>=a?a-1:r}},{key:"getBackwardJump",value:function(){var e=this.state.selected-this.props.pageRangeDisplayed;return e<0?0:e}},{key:"getElementHref",value:function(e){var t=this.props,a=t.hrefBuilder,r=t.pageCount,n=t.hrefAllControls;if(a)return n||e>=0&&e<r?a(e+1,r,this.state.selected):void 0}},{key:"ariaLabelBuilder",value:function(e){var t=e===this.state.selected;if(this.props.ariaLabelBuilder&&e>=0&&e<this.props.pageCount){var a=this.props.ariaLabelBuilder(e+1,t);return this.props.extraAriaContext&&!t&&(a=a+" "+this.props.extraAriaContext),a}}},{key:"getPageElement",value:function(e){var a=this.state.selected,r=this.props,n=r.pageClassName,i=r.pageLinkClassName,s=r.activeClassName,o=r.activeLinkClassName,c=r.extraAriaContext,p=r.pageLabelBuilder;return t().createElement(l,{key:e,pageSelectedHandler:this.handlePageSelected.bind(null,e),selected:a===e,rel:this.getElementPageRel(e),pageClassName:n,pageLinkClassName:i,activeClassName:s,activeLinkClassName:o,extraAriaContext:c,href:this.getElementHref(e),ariaLabel:this.ariaLabelBuilder(e),page:e+1,pageLabelBuilder:p,getEventListener:this.getEventListener})}},{key:"render",value:function(){var e=this.props.renderOnZeroPageCount;if(0===this.props.pageCount&&void 0!==e)return e?e(this.props):e;var a=this.props,r=a.disabledClassName,n=a.disabledLinkClassName,i=a.pageCount,s=a.className,l=a.containerClassName,o=a.previousLabel,c=a.previousClassName,u=a.previousLinkClassName,g=a.previousAriaLabel,f=a.prevRel,b=a.nextLabel,m=a.nextClassName,h=a.nextLinkClassName,v=a.nextAriaLabel,x=a.nextRel,y=this.state.selected,C=0===y,k=y===i-1,P="".concat(p(c)).concat(C?" ".concat(p(r)):""),N="".concat(p(m)).concat(k?" ".concat(p(r)):""),L="".concat(p(u)).concat(C?" ".concat(p(n)):""),w="".concat(p(h)).concat(k?" ".concat(p(n)):"");return t().createElement("ul",{className:s||l,role:"navigation","aria-label":"Pagination"},t().createElement("li",{className:P},t().createElement("a",d({className:L,href:this.getElementHref(y-1),tabIndex:C?"-1":"0",role:"button",onKeyPress:this.handlePreviousPage,"aria-disabled":C?"true":"false","aria-label":g,rel:f},this.getEventListener(this.handlePreviousPage)),o)),this.pagination(),t().createElement("li",{className:N},t().createElement("a",d({className:w,href:this.getElementHref(y+1),tabIndex:k?"-1":"0",role:"button",onKeyPress:this.handleNextPage,"aria-disabled":k?"true":"false","aria-label":v,rel:x},this.getEventListener(this.handleNextPage)),b)))}}],function(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(i.prototype,a),Object.defineProperty(i,"prototype",{writable:!1}),i}(e.Component);m(h,"propTypes",{pageCount:i().number.isRequired,pageRangeDisplayed:i().number,marginPagesDisplayed:i().number,previousLabel:i().node,previousAriaLabel:i().string,prevPageRel:i().string,prevRel:i().string,nextLabel:i().node,nextAriaLabel:i().string,nextPageRel:i().string,nextRel:i().string,breakLabel:i().oneOfType([i().string,i().node]),breakAriaLabels:i().shape({forward:i().string,backward:i().string}),hrefBuilder:i().func,hrefAllControls:i().bool,onPageChange:i().func,onPageActive:i().func,onClick:i().func,initialPage:i().number,forcePage:i().number,disableInitialCallback:i().bool,containerClassName:i().string,className:i().string,pageClassName:i().string,pageLinkClassName:i().string,pageLabelBuilder:i().func,activeClassName:i().string,activeLinkClassName:i().string,previousClassName:i().string,nextClassName:i().string,previousLinkClassName:i().string,nextLinkClassName:i().string,disabledClassName:i().string,disabledLinkClassName:i().string,breakClassName:i().string,breakLinkClassName:i().string,extraAriaContext:i().string,ariaLabelBuilder:i().func,eventListener:i().string,renderOnZeroPageCount:i().func,selectedPageRel:i().string}),m(h,"defaultProps",{pageRangeDisplayed:2,marginPagesDisplayed:3,activeClassName:"selected",previousLabel:"Previous",previousClassName:"previous",previousAriaLabel:"Previous page",prevPageRel:"prev",prevRel:"prev",nextLabel:"Next",nextClassName:"next",nextAriaLabel:"Next page",nextPageRel:"next",nextRel:"next",breakLabel:"...",breakAriaLabels:{forward:"Jump forward",backward:"Jump backward"},disabledClassName:"disabled",disableInitialCallback:!1,pageLabelBuilder:function(e){return e},eventListener:"onClick",renderOnZeroPageCount:void 0,selectedPageRel:"canonical",hrefAllControls:!1});let v=h})(),n})())}},function(e){e.O(0,[1664,1486,2888,9774,179],function(){return e(e.s=7801)}),_N_E=e.O()}]);