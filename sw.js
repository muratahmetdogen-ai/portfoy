const C='portfoy-v39',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','70-kilit-kasa.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('message',e=>{if(e.data==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 e.respondWith((async()=>{const c=await caches.open(C);
  if(r.mode==='navigate'){try{const res=await fetch(r,{cache:'no-store'});if(res.ok)c.put(r,res.clone());return res}catch(x){const h=await c.match(r,{ignoreSearch:true});if(h)return h;throw x}}
  const hit=await c.match(r,{ignoreSearch:true});
  const net=fetch(r).then(res=>{if(res.ok)c.put(r,res.clone());return res}).catch(()=>hit);
  return hit||net})())});
