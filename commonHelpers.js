import{a as f,i as c,S as m}from"./assets/vendor-bad0427b.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const g=40;let u="",l=1;f.defaults.baseURL="https://pixabay.com/api/";f.defaults.params={key:"22046149-41a2515b5a783e6a5f4bfbfcc",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:g};async function h({query:o,isLoadMore:t=!1}){return l=t?l+1:1,u=o??u,await f.get("",{params:{q:u,page:l}})}const s={form:document.querySelector(".js-search-form"),gallery:document.querySelector(".js-list"),loadMoreButton:document.querySelector(".js-load-more")};let d,p;c.settings({timeout:3e3,resetOnHover:!0,icon:"material-icons",transitionIn:"flipInX",transitionOut:"flipOutX",position:"center"});function y(o){return o.map(({webformatURL:t,tags:i,likes:a,views:e,comments:r,downloads:n,largeImageURL:L})=>`<a class="photo-card" aria-role="button" href="${L}">
          <div class="card-thumb">
            <img src="${t}" class="card-image" alt="${i}" height="250" loading="lazy" />
          </div>
          <div class="info">
            <p class="info-item">
              <b>Likes</b> ${a}
            </p>
            <p class="info-item">
              <b>Views</b> ${e}
            </p>
            <p class="info-item">
              <b>Comments</b> ${r}
            </p>
            <p class="info-item">
              <b>Downloads</b> ${n}
            </p>
          </div>
        </a>`).join("")}async function v(o){o.preventDefault(),s.gallery.innerHTML="",s.loadMoreButton.classList.add("hidden");const t=o.target.elements.searchQuery.value.trim();if(!t)return;const{data:{totalHits:i,hits:a}}=await h({query:t});if(!a.length)return c.error({title:"Error",message:`Sorry, there are no images matching your search query "${t}". Please try again.`});c.success({message:`Hooray! We found ${i} totalHits images`,messageColor:"#fff",backgroundColor:"#c139f6"}),s.gallery.insertAdjacentHTML("beforeend",y(a));const{height:e}=s.gallery.firstElementChild.getBoundingClientRect();p=e,b(i),d=new m(".js-list a")}async function M(){const{data:{totalHits:o,hits:t}}=await h({query:null,isLoadMore:!0});b(o),d.destroy(),s.gallery.insertAdjacentHTML("beforeend",y(t)),d=new m(".js-list a"),window.scrollBy({top:p*2,behavior:"smooth"})}function b(o){const t=Math.ceil(o/g)===l;s.loadMoreButton.classList.toggle("hidden",t),t&&c.error({message:"We're sorry, but you've reached the end of search results."})}s.form.addEventListener("submit",v);s.loadMoreButton.addEventListener("click",M);
//# sourceMappingURL=commonHelpers.js.map
