const sampleOrders=[
{code:"KN-824391",date:"28 Jul 2026 · 11:42",status:"Selesai",state:"done",total:27000,items:[{id:1,qty:1},{id:4,qty:1},{id:7,qty:1}]},
{code:"KN-713520",date:"25 Jul 2026 · 09:36",status:"Selesai",state:"done",total:31000,items:[{id:2,qty:1},{id:5,qty:1},{id:8,qty:2}]},
{code:"KN-602814",date:"22 Jul 2026 · 12:05",status:"Diproses",state:"process",total:20000,items:[{id:9,qty:1}]}
];
const list=document.querySelector("#historyList");
function renderHistory(filter="all"){
 const arr=filter==="all"?sampleOrders:sampleOrders.filter(o=>o.state===filter);
 if(!arr.length){list.innerHTML='<div class="empty-state"><div class="empty-icon">🧾</div><h3>Belum ada pesanan</h3><p>Pesanan yang kamu buat akan muncul di sini.</p></div>';return}
 list.innerHTML=arr.map(o=>`<article class="history-order">
 <div class="history-top"><div><b>${o.code}</b><small style="display:block;color:#9ca3af;font-size:8px;margin-top:4px">${o.date}</small></div><span class="status-pill ${o.state==="process"?"wait":""}">${o.status}</span></div>
 <div class="history-products">${o.items.map(x=>{const p=PRODUCTS.find(p=>p.id===x.id);return `<div class="history-product"><img src="${p.image}" alt=""><div><b>${p.name}</b><small>${x.qty} × ${money(p.price)}</small></div></div>`}).join("")}</div>
 <div class="history-bottom"><span>${o.items.reduce((s,x)=>s+x.qty,0)} item</span><strong>${money(o.total)}</strong><button class="outline-btn" onclick="location.href='order-status.html'">${o.state==="process"?"Lihat Pesanan":"Pesan Lagi"}</button></div>
 </article>`).join("");
}
document.querySelectorAll(".history-filter button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".history-filter button").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderHistory(b.dataset.filter)});renderHistory();