(function(){
var d=window.KISI,app=document.getElementById('app');
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var star='<svg viewBox="0 0 100 100" aria-hidden="true"><path fill="#f2c14e" d="M50 2l9.5 24.5L85 15 74 40.5 98 50 74 59.5 85 85 59.5 74 50 98 40.5 74 15 85 26 59.5 2 50 26 40.5 15 15 40.5 26z"/></svg>';
if(!d.mapel||!d.mapel.length){
app.innerHTML='<div class="empty">'+star+'<h2>Mohon maaf, kisi-kisi tidak tersedia</h2><p>Kisi-kisi ujian '+esc(d.kelas)+' belum diunggah. Silakan cek kembali nanti atau tanyakan kepada wali kelas.</p><a class="btn" href="index.html">Kembali ke beranda</a></div>';return}
var h='<div class="bar"><input id="q" type="search" placeholder="Cari mata pelajaran atau materi…" aria-label="Cari kisi-kisi"><button id="all" type="button">Buka semua</button><button onclick="print()" type="button">Cetak</button></div><div class="list" id="list">';
d.mapel.forEach(function(m){
var meta=[];if(m.bentuk)meta.push(m.bentuk);if(m.jumlah)meta.push(m.jumlah+' soal');if(m.waktu)meta.push(m.waktu);
h+='<details data-t="'+esc((m.nama+' '+(m.materi||[]).join(' ')).toLowerCase())+'"><summary><i class="dot"></i>'+esc(m.nama)+'</summary><div class="body">'+
(meta.length?'<div class="meta">'+meta.map(function(x){return'<span>'+esc(x)+'</span>'}).join('')+'</div>':'')+
'<ul>'+(m.materi||[]).map(function(x){return'<li>'+esc(x)+'</li>'}).join('')+'</ul>'+
(m.catatan?'<p class="note">'+esc(m.catatan)+'</p>':'')+'</div></details>'});
h+='</div><p id="none" hidden class="empty">Tidak ada hasil yang cocok.</p>';
app.innerHTML=h;
var q=document.getElementById('q'),items=[].slice.call(document.querySelectorAll('#list details'));
q.oninput=function(){var v=q.value.trim().toLowerCase(),n=0;items.forEach(function(e){var ok=e.dataset.t.indexOf(v)>-1;e.hidden=!ok;if(ok)n++;if(v&&ok)e.open=true});document.getElementById('none').hidden=n>0};
var open=false;document.getElementById('all').onclick=function(){open=!open;items.forEach(function(e){e.open=open});this.textContent=open?'Tutup semua':'Buka semua'};
})();
