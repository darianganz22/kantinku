const PRODUCTS=[
{id:1,name:"seblak",category:"Makanan",price:15000,sold:68,rating:4.9,image:"assets/products/seblak.webp"},
{id:2,name:"Ayam Geprek",category:"Makanan",price:16000,sold:54,rating:4.8,image:"https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=700&q=85"},
{id:3,name:"Mie Goreng",category:"Makanan",price:12000,sold:51,rating:4.7,image:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=85"},
{id:4,name:"Es Teh Manis",category:"Minuman",price:5000,sold:47,rating:4.9,image:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=700&q=85"},
{id:5,name:"Es Jeruk",category:"Minuman",price:7000,sold:39,rating:4.8,image:"https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=700&q=85"},
{id:6,name:"Bakso Kuah",category:"Makanan",price:14000,sold:35,rating:4.7,image:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=700&q=85"},
{id:7,name:"Roti Bakar Coklat",category:"Camilan",price:10000,sold:29,rating:4.6,image:"https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=700&q=85"},
{id:8,name:"Air Mineral",category:"Minuman",price:4000,sold:25,rating:4.8,image:"https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=700&q=85"},
{id:9,name:"Paket Kenyang",category:"Paket Hemat",price:20000,sold:22,rating:4.9,image:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=85"},
{id:10,name:"Pisang Coklat",category:"Camilan",price:8000,sold:21,rating:4.7,image:"https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=700&q=85"}];
const money=n=>"Rp "+Number(n||0).toLocaleString("id-ID");
function getCart(){return JSON.parse(localStorage.getItem("kantinku_cart")||"[]")}
function saveCart(c){localStorage.setItem("kantinku_cart",JSON.stringify(c))}
function cartTotal(){return getCart().reduce((s,x)=>{const p=PRODUCTS.find(p=>p.id==x.id);return s+(p?p.price*x.qty:0)},0)}
function updateCartBadge(){const el=document.querySelector("#cartCount");if(el)el.textContent=getCart().reduce((s,x)=>s+x.qty,0)}
function showToast(text){const t=document.querySelector("#toast");if(!t)return;t.textContent=text;t.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove("show"),2200)}
updateCartBadge();