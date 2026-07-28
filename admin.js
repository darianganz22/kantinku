const products = [
  {name:"seblak", category:"Makanan", price:15000, stock:24, sold:68, rating:4.9, image:"assets/products/seblak.webp"},
  {name:"Ayam Geprek", category:"Makanan", price:16000, stock:18, sold:54, rating:4.8, image:"https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80"},
  {name:"Mie Goreng", category:"Makanan", price:12000, stock:31, sold:51, rating:4.7, image:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"},
  {name:"Es Teh Manis", category:"Minuman", price:5000, stock:65, sold:47, rating:4.9, image:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80"},
  {name:"Es Jeruk", category:"Minuman", price:7000, stock:43, sold:39, rating:4.8, image:"https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80"},
  {name:"Bakso Kuah", category:"Makanan", price:14000, stock:22, sold:35, rating:4.7, image:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80"},
  {name:"Roti Bakar Coklat", category:"Camilan", price:10000, stock:16, sold:29, rating:4.6, image:"https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=600&q=80"},
  {name:"Air Mineral", category:"Minuman", price:4000, stock:80, sold:25, rating:4.8, image:"https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=600&q=80"}
];

const orders = [
  ["#KN-1086","Andi Ramadhan","seblak + Es Teh","Rp 20.000","QRIS","Diproses"],
  ["#KN-1085","Nabila Sari","Ayam Geprek + Air Mineral","Rp 21.000","GoPay","Siap Diambil"],
  ["#KN-1084","Rizky Fajar","Mie Goreng + Es Jeruk","Rp 19.000","DANA","Selesai"],
  ["#KN-1083","Salsa Putri","Bakso Kuah + Es Teh","Rp 19.000","OVO","Diproses"],
  ["#KN-1082","Bima Pratama","Roti Bakar + Es Jeruk","Rp 17.000","BCA","Selesai"],
  ["#KN-1081","Citra Lestari","seblak","Rp 15.000","QRIS","Selesai"]
];

const customers = [
  ["AR","Andi Ramadhan","TKJ","Rp 485.000"],["NS","Nabila Sari","XII AKL 1","Rp 412.000"],
  ["RF","Rizky Fajar","XI TKJ 1","Rp 368.000"],["SP","Salsa Putri","X RPL 1","Rp 295.000"],
  ["BP","Bima Pratama","XII RPL 2","Rp 277.000"],["CL","Citra Lestari","XI DKV 1","Rp 251.000"]
];

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const rupiah = n => "Rp " + Number(n).toLocaleString("id-ID");

function renderProducts(list=products){
  $("#productGrid").innerHTML = list.map((p,i)=>`
    <article class="product-card">
      <img src="${p.image}" alt="${p.name}">
      <div class="product-body">
        <span class="category">${p.category.toUpperCase()}</span>
        <h3>${p.name}</h3>
        <div class="price">${rupiah(p.price)}</div>
        <div class="product-meta"><span>★ ${p.rating}</span><span>${p.stock} stok · ${p.sold} terjual</span></div>
        <div class="product-actions"><button onclick="editProduct(${i})">Edit</button><button onclick="deleteProduct(${i})">Hapus</button></div>
      </div>
    </article>`).join("");
}
function renderOrders(list=orders){
  $("#ordersTable").innerHTML = list.map((o,i)=>`
    <tr><td><b>${o[0]}</b><small>Hari ini</small></td><td><div class="student"><span>${o[1].split(" ").map(x=>x[0]).slice(0,2).join("")}</span><b>${o[1]}</b></div></td><td>${o[2]}</td><td><b>${o[3]}</b></td><td><span class="pay">${o[4]}</span></td><td><span class="status ${o[5]==="Selesai"?"done":o[5]==="Siap Diambil"?"ready":"processing"}">${o[5]}</span></td><td><button class="dots" onclick="advanceOrder(${i})">•••</button></td></tr>`).join("");
}
function renderCustomers(){
  $("#customerList").innerHTML=customers.map(c=>`<div class="customer"><div class="avatar">${c[0]}</div><div class="customer-info"><b>${c[1]}</b><span>${c[2]} · Aktif</span></div><div class="customer-spend"><b>${c[3]}</b><span>Total belanja</span></div></div>`).join("");
}
function renderTickets(){
  $("#ticketList").innerHTML=[
    ["Nabila Sari","Pesanan sudah bisa diambil?","2 menit"],["Dimas Firmansyah","Pembayaran saya belum terverifikasi","8 menit"],["Aulia Salsabila","Ada menu yang tidak tersedia","15 menit"],["Raka Aditya","Mau ubah jumlah pesanan","26 menit"]
  ].map((t,i)=>`<div class="ticket ${i===0?"active":""}"><b>${t[0]}</b><span>${t[2]}</span><p>${t[1]}</p></div>`).join("");
}
function showToast(text="✓ Perubahan berhasil disimpan"){
  const t=$("#toast"); t.textContent=text; t.classList.add("show"); setTimeout(()=>t.classList.remove("show"),2200);
}
function openModal(){ $("#productModal").classList.add("show"); }
function closeModal(){ $("#productModal").classList.remove("show"); $("#productForm").reset(); }
function editProduct(i){ openModal(); const p=products[i]; $("#productForm").name.value=p.name; $("#productForm").price.value=p.price; $("#productForm").stock.value=p.stock; $("#productForm").image.value=p.image; showToast("Mode edit menu dibuka"); }
function deleteProduct(i){ if(confirm(`Hapus menu "${products[i].name}"?`)){products.splice(i,1);renderProducts();showToast("Menu berhasil dihapus");} }
function advanceOrder(i){ const next={Diproses:"Siap Diambil","Siap Diambil":"Selesai",Selesai:"Selesai"}; orders[i][5]=next[orders[i][5]];renderOrders();showToast("Status pesanan diperbarui"); }

const titles={dashboard:"Dashboard",orders:"Pesanan",products:"Menu Makanan",customers:"Pelanggan",payments:"Pembayaran",reviews:"Rating & Ulasan",support:"Customer Service",settings:"Pengaturan"};
function navigate(page){
  $$(".page").forEach(x=>x.classList.remove("active-page"));
  $("#"+page).classList.add("active-page");
  $$(".nav-item").forEach(x=>x.classList.toggle("active",x.dataset.page===page));
  $("#pageTitle").textContent=titles[page];
  if(window.innerWidth<801) $(".sidebar").classList.remove("open");
  window.scrollTo({top:0,behavior:"smooth"});
}
$$(".nav-item").forEach(btn=>btn.addEventListener("click",()=>navigate(btn.dataset.page)));
$$("[data-page-link]").forEach(btn=>btn.addEventListener("click",()=>navigate(btn.dataset.pageLink)));
$("#mobileMenu").addEventListener("click",()=>$(".sidebar").classList.toggle("open"));
$("#notificationBtn").addEventListener("click",()=>showToast("3 notifikasi pesanan baru"));
$("#logoutBtn").addEventListener("click",()=>{if(confirm("Keluar dari panel admin?"))showToast("Demo: proses logout dipanggil");});
$("#addProductBtn").addEventListener("click",openModal);
$("#addProductTop").addEventListener("click",()=>{navigate("products");openModal();});
$("#closeModal").addEventListener("click",closeModal);
$("#productModal").addEventListener("click",e=>{if(e.target.id==="productModal")closeModal();});
$("#productForm").addEventListener("submit",e=>{
  e.preventDefault(); const f=new FormData(e.target);
  products.unshift({name:f.get("name"),category:f.get("category"),price:Number(f.get("price")),stock:Number(f.get("stock")),sold:0,rating:5,image:f.get("image")||"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"});
  renderProducts();closeModal();showToast("✓ Menu baru berhasil ditambahkan");
});
$("#productSearch").addEventListener("input",e=>{const q=e.target.value.toLowerCase();renderProducts(products.filter(p=>p.name.toLowerCase().includes(q)))});
$("#categoryFilter").addEventListener("change",e=>{const q=e.target.value;renderProducts(q==="Semua Kategori"?products:products.filter(p=>p.category===q))});
$("#orderSearch").addEventListener("input",e=>{const q=e.target.value.toLowerCase();renderOrders(orders.filter(o=>o.join(" ").toLowerCase().includes(q)))});
$("#saveSettings").addEventListener("click",()=>showToast("✓ Pengaturan berhasil disimpan"));

renderProducts();renderOrders();renderCustomers();renderTickets();
