const itemsEl=document.querySelector("#checkoutItems"),summaryEl=document.querySelector("#summaryLines"),totalEl=document.querySelector("#grandTotal");
const draft=JSON.parse(localStorage.getItem("kantinku_order_draft")||"null");
let cart=draft?.cart?.length ? draft.cart : getCart();
const draftDiscount=Number(draft?.discount||0);
const draftPromo=draft?.promo||null;
function renderCheckout(){if(!cart.length){itemsEl.innerHTML='<div class="empty"><div>🛒</div><h3>Keranjang kosong</h3><p><a href="index.html">Kembali memilih menu</a></p></div>';summaryEl.innerHTML="";totalEl.textContent="Rp 0";return}
itemsEl.innerHTML=cart.map(x=>{const p=PRODUCTS.find(p=>p.id===x.id);return `<div class="checkout-item"><img src="${p.image}"><div><b>${p.name}</b><small>${money(p.price)} · ${x.qty} porsi</small></div><strong>${money(p.price*x.qty)}</strong></div>`}).join("");
summaryEl.innerHTML=cart.map(x=>{const p=PRODUCTS.find(p=>p.id===x.id);return `<div><span>${p.name} × ${x.qty}</span><b>${money(p.price*x.qty)}</b></div>`}).join("");
const subtotal=cart.reduce((s,x)=>{const p=PRODUCTS.find(p=>p.id===x.id);return s+(p?p.price*x.qty:0)},0);
const discount=(draftPromo==="HEMAT3" && draftDiscount>0) ? Math.min(draftDiscount,subtotal) : 0;
if(discount){
  summaryEl.insertAdjacentHTML("beforeend", `<div><span>Promo ${draftPromo}</span><b style="color:#16a34a">− ${money(discount)}</b></div>`);
}
totalEl.textContent=money(subtotal-discount)}
document.querySelector("#payBtn").onclick=()=>{if(!cart.length){showToast("Keranjang masih kosong");return}const subtotal=cart.reduce((s,x)=>{const p=PRODUCTS.find(p=>p.id===x.id);return s+(p?p.price*x.qty:0)},0);const discount=(draftPromo==="HEMAT3"&&draftDiscount>0)?Math.min(draftDiscount,subtotal):0;const order={cart,total:subtotal-discount,subtotal,discount,promo:draftPromo,name:document.querySelector("#buyerName").value,kelas:document.querySelector("#buyerClass").value,pickup:document.querySelector("#pickup").value,note:document.querySelector("#orderNote").value};localStorage.setItem("kantinku_order",JSON.stringify(order));location.href="payment.html"};renderCheckout();