!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},a=t.parcelRequired76b;null==a&&((a=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var a={id:e,exports:{}};return r[e]=a,t.call(a.exports,a,a.exports),a.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){n[e]=t},t.parcelRequired76b=a),a("9t7bQ"),a("387si");var s=a("bpxeT"),i=a("2TvXO");a("6JpON");var u=a("a9ZY8"),o=a("kvC6y"),c=a("asGRZ"),l=a("9t7bQ");a("2xDiJ");var d=document.querySelector(".js-library-btn--watched"),p=document.querySelector(".js-library-btn--queue"),f=document.querySelector(".movie-list");function v(){return(v=e(s)(e(i).mark((function t(){var r,n,a,s;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return 1,100,r=Math.floor(100*Math.random()+1),e.prev=3,n="https://image.tmdb.org/t/p/original",f.innerHTML="",e.next=8,(0,c.default)(r);case 8:a=e.sent,s="<h3 class='library-gallery-recomend'>RECOMMENDATIONS</h3><div class='library-gallery__default'><img class='library-gallery__default-poster' data-id='".concat(a.results[1].id,"' src=").concat(n).concat(a.results[1].poster_path,">\n    <div><p class='library-gallery__default__title'>").concat(a.results[1].title,"</p>\n    <p class='library-gallery__default-overview'>").concat(a.results[1].overview,"</p></div>\n    </div>\n    \n    <div class='library-gallery__default'><img class='library-gallery__default-poster' src=").concat(n).concat(a.results[2].poster_path," data-id='").concat(a.results[2].id,"'>\n    <div><p class='library-gallery__default__title'>").concat(a.results[2].title,"</p>\n    <p class='library-gallery__default-overview'>").concat(a.results[2].overview,"</p></div>\n    </div>\n    \n    <div class='library-gallery__default'><img class='library-gallery__default-poster' src=").concat(n).concat(a.results[3].poster_path," data-id='").concat(a.results[3].id,"'>\n    <div><p class='library-gallery__default__title'>").concat(a.results[3].title,"</p>\n    <p class='library-gallery__default-overview'>").concat(a.results[3].overview,"</p></div>\n    </div>"),f.innerHTML=s,e.next=16;break;case 13:e.prev=13,e.t0=e.catch(3),console.log(e.t0);case 16:case"end":return e.stop()}}),t,null,[[3,13]])})))).apply(this,arguments)}function h(){return y.apply(this,arguments)}function y(){return(y=e(s)(e(i).mark((function t(){var r,n;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((0,o.spinnerStart)(),setTimeout(o.spinnerStop,500),p.style.background="transparent",p.style.borderColor="#ffffff",d.style.background="#ff6b01",d.style.borderColor="#ff6b01",null!==l.auth.currentUser){e.next=9;break}return f.innerHTML="<p class='no-movies'>It seems you haven't watched any movie. You should try, it's fun🎭</p>",e.abrupt("return");case 9:return e.next=11,(0,l.readAllUserData)(l.auth.currentUser.uid);case 11:if(void 0!==(r=e.sent).userDataWatch){e.next=15;break}return f.innerHTML="<p class='no-movies'>It seems you haven't watched any movie. You should try, it's fun🎭</p>",e.abrupt("return");case 15:if(1!==Object.keys(r).length){e.next=18;break}return f.innerHTML="<p>It seems you haven't watched any movie. You should try, it's fun🎭</p>",e.abrupt("return");case 18:n=r.userDataWatch.map((function(e){return(0,u.renderMoviesLibrary)(e)})).join(""),f.innerHTML=n;case 20:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function m(){return b.apply(this,arguments)}function b(){return(b=e(s)(e(i).mark((function t(){var r,n;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((0,o.spinnerStart)(),setTimeout(o.spinnerStop,500),p.style.background="#ff6b01",p.style.borderColor="#ff6b01",d.style.background="transparent",d.style.borderColor="#ffffff",null!==l.auth.currentUser){e.next=9;break}return f.innerHTML="<p class='no-movies'>The queue is empty. Add all Harry Potter movies - you won't regret this✨</p>",e.abrupt("return");case 9:return e.next=11,(0,l.readAllUserData)(l.auth.currentUser.uid);case 11:if(void 0!==(r=e.sent).userDataQueue){e.next=15;break}return f.innerHTML="<p class='no-movies'>The queue is empty. Add all Harry Potter movies - you won't regret this✨</p>",e.abrupt("return");case 15:if(1!==Object.keys(r).length){e.next=18;break}return f.innerHTML="<p>The queue is empty. Add all Harry Potter movies - you won't regret this✨</p>",e.abrupt("return");case 18:n=r.userDataQueue.map((function(e){return(0,u.renderMoviesLibrary)(e)})).join(""),f.innerHTML=n;case 20:case"end":return e.stop()}}),t)})))).apply(this,arguments)}!function(){v.apply(this,arguments)}(),d.addEventListener("click",h),p.addEventListener("click",m),a("iSEZc");o=a("kvC6y");a("9S1Ph");s=a("bpxeT"),i=a("2TvXO"),l=a("9t7bQ");var g,x,k=a("4Nugj"),w=a("6JpON"),_=a("h9dm7"),T=a("cDXQO"),L=k.refs.modal,U=k.refs.overflow,E=k.refs.closeBtn,M=k.refs.innerModal,S=k.refs.body,D=k.refs.sectionLibrary;function O(){return N.apply(this,arguments)}function N(){return(N=e(s)(e(i).mark((function t(){var r,n;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==l.auth.currentUser){e.next=4;break}console.log(l.auth),g=[],x=[],e.next=12;break;case 4:return e.next=6,(0,l.readAllUserData)(l.auth.currentUser.uid);case 6:return r=e.sent,e.next=9,(0,l.readAllUserData)(l.auth.currentUser.uid);case 9:n=e.sent,g=r.userDataQueue||[],x=n.userDataWatch||[];case 12:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function A(){return q.apply(this,arguments)}function q(){return(q=e(s)(e(i).mark((function t(){var r,n,a,s;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==l.auth.currentUser){e.next=6;break}return r=localStorage.getItem("currentFilmList"),n=JSON.parse(r),e.abrupt("return",n);case 6:return e.prev=6,e.next=9,(0,l.currentFilmList)(l.auth.currentUser.uid);case 9:return a=e.sent,console.log(a),s=a.currentFilmList||[],e.abrupt("return",s);case 15:return e.prev=15,e.t0=e.catch(6),e.abrupt("return",[]);case 18:case"end":return e.stop()}}),t,null,[[6,15]])})))).apply(this,arguments)}function H(e){return I.apply(this,arguments)}function I(){return(I=e(s)(e(i).mark((function t(r){var n,a,s,u,o;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("IMG"!==r.target.nodeName&&"SPAN"!==r.target.nodeName){e.next=20;break}return M.innerHTML="",L.classList.remove("hidden-movie-modal"),U.classList.remove("hidden-movie-modal"),U.classList.add("overflow-height"),D.removeEventListener("click",H),document.addEventListener("keydown",R),E.addEventListener("click",C),U.addEventListener("click",Q),n="IMG"===r.target.nodeName?r.target.dataset.id:r.target.closest("li").dataset.id,e.next=12,W(n);case 12:a=window.scrollY,S.style.position="fixed",S.style.top="-".concat(a,"px"),s=document.querySelector(".modal__btn-watched"),u=document.querySelector(".modal__btn-queue"),o=document.querySelector(".movie-modal__btn-watch-trailer"),null!==l.auth.currentUser?(s.addEventListener("click",j),u.addEventListener("click",P)):(s.setAttribute("disabled","disabled"),u.setAttribute("disabled","disabled")),o.addEventListener("click",T.onTrailerBtnClick);case 20:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function Q(e){e.currentTarget===e.target&&C()}function R(e){"Escape"===e.code&&C()}function C(){L.classList.add("hidden-movie-modal"),U.classList.add("hidden-movie-modal"),U.classList.remove("overflow-height"),D.addEventListener("click",H),document.removeEventListener("keydown",C),E.removeEventListener("click",C),U.removeEventListener("click",Q);var e=S.style.top;S.style.position="",S.style.top="",window.scrollTo(0,-1*parseInt(e||"0"))}function W(e){return J.apply(this,arguments)}function J(){return(J=e(s)(e(i).mark((function t(r){var n,a,s,u;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==l.auth.currentUser){e.next=8;break}return n=A(),e.next=4,(0,_.renderModal)(n,r,x,g);case 4:a=e.sent,M.innerHTML=a,e.next=17;break;case 8:return e.next=10,O();case 10:return e.next=12,A();case 12:return s=e.sent,e.next=15,(0,_.renderModal)(s,r,x,g);case 15:u=e.sent,M.innerHTML=u;case 17:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function j(e){return F.apply(this,arguments)}function F(){return(F=e(s)(e(i).mark((function t(r){var n,a,s,u;return e(i).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=document.querySelector(".movie-modal__main"),a={poster_path:n.dataset.poster,title:n.dataset.title,genre_ids:n.dataset.genres,release_date:n.dataset.date,vote_average:n.dataset.votes,id:n.dataset.id},s=x.some((function(e){return e.id===a.id})),"ADD TO WATCHED"!==r.target.innerText){t.next=21;break}if(s){t.next=19;break}if(x.push(a),null!==l.auth.currentUser){t.next=10;break}localStorage.setItem("movieWatched",JSON.stringify(x)),r.target.innerText="Remove from watched",JSON.parse(localStorage.getItem("movieWatched")),t.next=17;break;case 10:return t.next=12,(0,l.writeUserDataWatch)(l.auth.currentUser.uid,x);case 12:return r.target.innerText="Remove from watched",t.next=15,(0,l.readAllUserData)(l.auth.currentUser.uid);case 15:u=t.sent,u.userDataWatch||[];case 17:h(),e(w).Notify.success("Added to watched!");case 19:t.next=32;break;case 21:if("REMOVE FROM WATCHED"!==r.target.innerText){t.next=32;break}if(x=x.filter((function(e){return e.id!==a.id})),null!==l.auth.currentUser){t.next=27;break}localStorage.setItem("movieWatched",JSON.stringify(x)),t.next=29;break;case 27:return t.next=29,(0,l.writeUserDataWatch)(l.auth.currentUser.uid,x);case 29:r.target.innerText="Add to watched",h(),e(w).Notify.success("Removed from watched!");case 32:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function P(e){return Y.apply(this,arguments)}function Y(){return(Y=e(s)(e(i).mark((function t(r){var n,a,s;return e(i).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=document.querySelector(".movie-modal__main"),a={poster_path:n.dataset.poster,title:n.dataset.title,genre_ids:n.dataset.genres,release_date:n.dataset.date,vote_average:n.dataset.votes,id:n.dataset.id},s=g.some((function(e){return e.id===a.id})),"ADD TO QUEUE"!==r.target.innerText){t.next=17;break}if(s){t.next=15;break}if(g.push(a),null!==l.auth.currentUser){t.next=10;break}localStorage.setItem("movieQueue",JSON.stringify(g)),t.next=12;break;case 10:return t.next=12,(0,l.writeUserDataQueue)(l.auth.currentUser.uid,g);case 12:r.target.innerText="Remove from queue",m(),e(w).Notify.success("Added to queue!");case 15:t.next=28;break;case 17:if("REMOVE FROM QUEUE"!==r.target.innerText){t.next=28;break}if(g=g.filter((function(e){return e.id!==a.id})),null!==l.auth.currentUser){t.next=23;break}localStorage.setItem("movieQueue",JSON.stringify(g)),t.next=25;break;case 23:return t.next=25,(0,l.writeUserDataQueue)(l.auth.currentUser.uid,g);case 25:r.target.innerText="Add to queue",m(),e(w).Notify.success("Removed from queue!");case 28:case"end":return t.stop()}}),t)})))).apply(this,arguments)}setTimeout((function(){O()}),2500),D.addEventListener("click",H),a("387si"),(0,o.spinnerStart)(),setTimeout(o.spinnerStop,1e3)}();
//# sourceMappingURL=library.9c9d9685.js.map
