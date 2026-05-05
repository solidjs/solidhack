function i(e,t={}){const{revalidate:n,...o}=t,s=new Headers(o.headers);void 0!==n&&s.set("X-Revalidate",n.toString()),s.set("Content-Type","application/json");const a=new Response(JSON.stringify(e),{...o,headers:s});return a.customBody=()=>e,a}export{i};
//# sourceMappingURL=response-CbUr9JDj.mjs.map
