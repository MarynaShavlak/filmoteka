function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},a={},s=t.parcelRequired76b;null==s&&((s=function(e){if(e in r)return r[e].exports;if(e in a){var t=a[e];delete a[e];var s={id:e,exports:{}};return r[e]=s,t.call(s.exports,s,s.exports),s.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){a[e]=t},t.parcelRequired76b=s),s("5rZAK"),s("9kkEh"),s("7Y9D8");var i=s("7bdJN"),n=s("gjiCh"),o=s("2Opyx"),l=s("5rZAK");s("ffjl9");const d=document.querySelector(".js-library-btn--watched"),u=document.querySelector(".js-library-btn--queue"),c=document.querySelector(".movie-list");async function v(){if((0,n.spinnerStart)(),setTimeout(n.spinnerStop,500),u.style.background="transparent",u.style.borderColor="#ffffff",d.style.background="#ff6b01",d.style.borderColor="#ff6b01",null===l.auth.currentUser)return void(c.innerHTML="<p class='no-movies'>It seems you haven't watched any movie. You should try, it's fun🎭</p>");const e=await(0,l.readAllUserData)(l.auth.currentUser.uid);if(void 0===e.userDataWatch)return void(c.innerHTML="<p class='no-movies'>It seems you haven't watched any movie. You should try, it's fun🎭</p>");if(1===Object.keys(e).length)return void(c.innerHTML="<p>It seems you haven't watched any movie. You should try, it's fun🎭</p>");const t=e.userDataWatch.map((e=>(0,i.renderMoviesLibrary)(e))).join("");c.innerHTML=t}async function f(){if((0,n.spinnerStart)(),setTimeout(n.spinnerStop,500),u.style.background="#ff6b01",u.style.borderColor="#ff6b01",d.style.background="transparent",d.style.borderColor="#ffffff",null===l.auth.currentUser)return void(c.innerHTML="<p class='no-movies'>The queue is empty. Add all Harry Potter movies - you won't regret this✨</p>");const e=await(0,l.readAllUserData)(l.auth.currentUser.uid);if(void 0===e.userDataQueue)return void(c.innerHTML="<p class='no-movies'>The queue is empty. Add all Harry Potter movies - you won't regret this✨</p>");if(1===Object.keys(e).length)return void(c.innerHTML="<p>The queue is empty. Add all Harry Potter movies - you won't regret this✨</p>");const t=e.userDataQueue.map((e=>(0,i.renderMoviesLibrary)(e))).join("");c.innerHTML=t}!async function(){let e=Math.floor(100*Math.random()+1);try{const t="https://image.tmdb.org/t/p/original";c.innerHTML="";const r=await(0,o.default)(e),a=`<h3 class='library-gallery-recomend'>RECOMMENDATIONS</h3><div class='library-gallery__default'><img class='library-gallery__default-poster' data-id='${r.results[1].id}' src=${t}${r.results[1].poster_path}>\n    <div><p class='library-gallery__default__title'>${r.results[1].title}</p>\n    <p class='library-gallery__default-overview'>${r.results[1].overview}</p></div>\n    </div>\n    \n    <div class='library-gallery__default'><img class='library-gallery__default-poster' src=${t}${r.results[2].poster_path} data-id='${r.results[2].id}'>\n    <div><p class='library-gallery__default__title'>${r.results[2].title}</p>\n    <p class='library-gallery__default-overview'>${r.results[2].overview}</p></div>\n    </div>\n    \n    <div class='library-gallery__default'><img class='library-gallery__default-poster' src=${t}${r.results[3].poster_path} data-id='${r.results[3].id}'>\n    <div><p class='library-gallery__default__title'>${r.results[3].title}</p>\n    <p class='library-gallery__default-overview'>${r.results[3].overview}</p></div>\n    </div>`;c.innerHTML=a}catch(e){console.log(e)}}(),d.addEventListener("click",v),u.addEventListener("click",f),s("ak03H");n=s("gjiCh");s("kMp2Z");l=s("5rZAK");var y=s("krGWQ"),m=s("7Y9D8"),h=s("1jYKa"),p=s("37v9V");const{modal:g,overflow:w,closeBtn:_,innerModal:b,body:L,sectionLibrary:T}=y.refs;let U,E;async function M(){if(null===l.auth.currentUser)U=[],E=[];else{const e=await(0,l.readAllUserData)(l.auth.currentUser.uid),t=await(0,l.readAllUserData)(l.auth.currentUser.uid);U=e.userDataQueue||[],E=t.userDataWatch||[]}}async function k(){if(null===l.auth.currentUser){const e=localStorage.getItem("currentFilmList");return JSON.parse(e)}try{const e=await(0,l.currentFilmList)(l.auth.currentUser.uid);return e.currentFilmList||[]}catch{return[]}}async function S(e){if("IMG"===e.target.nodeName||"SPAN"===e.target.nodeName){b.innerHTML="",g.classList.remove("hidden-movie-modal"),w.classList.remove("hidden-movie-modal"),w.classList.add("overflow-height"),T.removeEventListener("click",S),document.addEventListener("keydown",A),_.addEventListener("click",O),w.addEventListener("click",D);const t="IMG"===e.target.nodeName?e.target.dataset.id:e.target.closest("li").dataset.id;await async function(e){if(null===l.auth.currentUser){const t=k(),r=await(0,h.renderModal)(t,e,E,U);b.innerHTML=r}else{await M();const t=await k(),r=await(0,h.renderModal)(t,e,E,U);b.innerHTML=r}}(t);const r=window.scrollY;L.style.position="fixed",L.style.top=`-${r}px`;const a=document.querySelector(".modal__btn-watched"),s=document.querySelector(".modal__btn-queue"),i=document.querySelector(".movie-modal__btn-watch-trailer");null!==l.auth.currentUser?(a.addEventListener("click",q),s.addEventListener("click",H)):(a.setAttribute("disabled","disabled"),s.setAttribute("disabled","disabled")),i.addEventListener("click",p.onTrailerBtnClick)}}function D(e){e.currentTarget===e.target&&O()}function A(e){"Escape"===e.code&&O()}function O(){g.classList.add("hidden-movie-modal"),w.classList.add("hidden-movie-modal"),w.classList.remove("overflow-height"),T.addEventListener("click",S),document.removeEventListener("keydown",O),_.removeEventListener("click",O),w.removeEventListener("click",D);const e=L.style.top;L.style.position="",L.style.top="",window.scrollTo(0,-1*parseInt(e||"0"))}async function q(t){const r=document.querySelector(".movie-modal__main"),a={poster_path:r.dataset.poster,title:r.dataset.title,genre_ids:r.dataset.genres,release_date:r.dataset.date,vote_average:r.dataset.votes,id:r.dataset.id},s=E.some((e=>e.id===a.id));if("ADD TO WATCHED"===t.target.innerText){if(!s){if(E.push(a),null===l.auth.currentUser){localStorage.setItem("movieWatched",JSON.stringify(E)),t.target.innerText="Remove from watched";JSON.parse(localStorage.getItem("movieWatched"))}else{await(0,l.writeUserDataWatch)(l.auth.currentUser.uid,E),t.target.innerText="Remove from watched";(await(0,l.readAllUserData)(l.auth.currentUser.uid)).userDataWatch}v(),e(m).Notify.success("Added to watched!")}}else"REMOVE FROM WATCHED"===t.target.innerText&&(E=E.filter((e=>e.id!==a.id)),null===l.auth.currentUser?localStorage.setItem("movieWatched",JSON.stringify(E)):await(0,l.writeUserDataWatch)(l.auth.currentUser.uid,E),t.target.innerText="Add to watched",v(),e(m).Notify.success("Removed from watched!"))}async function H(t){const r=document.querySelector(".movie-modal__main"),a={poster_path:r.dataset.poster,title:r.dataset.title,genre_ids:r.dataset.genres,release_date:r.dataset.date,vote_average:r.dataset.votes,id:r.dataset.id},s=U.some((e=>e.id===a.id));"ADD TO QUEUE"===t.target.innerText?s||(U.push(a),null===l.auth.currentUser?localStorage.setItem("movieQueue",JSON.stringify(U)):await(0,l.writeUserDataQueue)(l.auth.currentUser.uid,U),t.target.innerText="Remove from queue",f(),e(m).Notify.success("Added to queue!")):"REMOVE FROM QUEUE"===t.target.innerText&&(U=U.filter((e=>e.id!==a.id)),null===l.auth.currentUser?localStorage.setItem("movieQueue",JSON.stringify(U)):await(0,l.writeUserDataQueue)(l.auth.currentUser.uid,U),t.target.innerText="Add to queue",f(),e(m).Notify.success("Removed from queue!"))}setTimeout((()=>{M()}),2500),T.addEventListener("click",S),s("9kkEh"),(0,n.spinnerStart)(),setTimeout(n.spinnerStop,1e3);
//# sourceMappingURL=library.ad3c4bc4.js.map
