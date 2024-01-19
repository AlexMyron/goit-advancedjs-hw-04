import{a as f,i as c,S as m}from"./assets/vendor-bad0427b.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const h=40;let d="",l=1;f.defaults.baseURL="https://pixabay.com/api/";f.defaults.params={key:"22046149-41a2515b5a783e6a5f4bfbfcc",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:h};async function g({query:r,isLoadMore:o=!1}){return l=o?l+1:1,d=r??d,await f.get("",{params:{q:d,page:l}})}const a={form:document.querySelector(".js-search-form"),gallery:document.querySelector(".js-list"),loadMoreButton:document.querySelector(".js-load-more")};let u,p;c.settings({timeout:5e3,resetOnHover:!0,icon:"material-icons",transitionIn:"flipInX",transitionOut:"flipOutX",position:"center"});function y(r){return r.map(({webformatURL:o,tags:s,likes:i,views:e,comments:t,downloads:n,largeImageURL:b})=>`<a class="photo-card" aria-role="button" href="${b}">
          <div class="card-thumb">
            <img src="${o}" class="card-image" alt="${s}" height="250" loading="lazy" />
          </div>
          <div class="info">
            <p class="info-item">
              <b>Likes</b> ${i}
            </p>
            <p class="info-item">
              <b>Views</b> ${e}
            </p>
            <p class="info-item">
              <b>Comments</b> ${t}
            </p>
            <p class="info-item">
              <b>Downloads</b> ${n}
            </p>
          </div>
        </a>`).join("")}async function L(r){r.preventDefault(),a.gallery.innerHTML="",a.loadMoreButton.classList.add("hidden");const o=r.target.elements.searchQuery.value,{data:s}=await g({query:o});if(!(s!=null&&s.hits.length))return c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again."});c.success({message:`Hooray! We found ${s.totalHits} totalHits images`,messageColor:"#fff",backgroundColor:"#c139f6"}),a.gallery.insertAdjacentHTML("beforeend",y(s.hits));const{height:i}=a.gallery.firstElementChild.getBoundingClientRect();p=i,a.loadMoreButton.classList.remove("hidden"),u=new m(".js-list a")}async function v(){const{data:r}=await g({query:null,isLoadMore:!0});if(r.totalHits<=l*h)return a.loadMoreButton.classList.add("hidden"),c.error({title:"Error",message:"We're sorry, but you've reached the end of search results."});u.destroy(),a.gallery.insertAdjacentHTML("beforeend",y(r.hits)),u=new m(".js-list a"),window.scrollBy({top:p*2,behavior:"smooth"})}a.form.addEventListener("submit",L);a.loadMoreButton.addEventListener("click",v);
//# sourceMappingURL=commonHelpers.js.map
