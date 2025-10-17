// admin.js - controla login, carga books.json y genera embed links
const ADMIN_USER = 'tusmocraft';
const ADMIN_PASS = '01tusmo02';

const loginArea = document.getElementById('login-area');
const panel = document.getElementById('panel');
const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');
const btnRefresh = document.getElementById('btnRefresh');
const booksTableBody = document.querySelector('#booksTable tbody');
const emptyNote = document.getElementById('emptyNote');

function showPanel(){ loginArea.classList.add('hidden'); panel.classList.remove('hidden'); }
function hidePanel(){ loginArea.classList.remove('hidden'); panel.classList.add('hidden'); }

btnLogin && btnLogin.addEventListener('click', ()=>{
  const u = document.getElementById('user').value.trim();
  const p = document.getElementById('pass').value.trim();
  if(u===ADMIN_USER && p===ADMIN_PASS){
    sessionStorage.setItem('bt_admin','1');
    showPanel();
    loadBooks();
  } else {
    alert('Credenciales incorrectas.');
  }
});

btnLogout && btnLogout.addEventListener('click', ()=>{
  sessionStorage.removeItem('bt_admin'); hidePanel();
});

btnRefresh && btnRefresh.addEventListener('click', loadBooks);

if(sessionStorage.getItem('bt_admin')){ showPanel(); loadBooks(); }

async function loadBooks(){
  booksTableBody.innerHTML=''; emptyNote.style.display='none';
  try{
    const res = await fetch('/pdfs/books.json', {cache:'no-store'});
    if(!res.ok) throw new Error('books.json no encontrado');
    const data = await res.json();
    if(!Array.isArray(data) || data.length===0){ emptyNote.style.display='block'; return; }
    data.forEach((b,idx)=>{
      const tr = document.createElement('tr');
      const id = b.id || `B-${idx+1}`;
      const title = b.title || b.file || 'Sin título';
      const file = b.file || '';
      const safeFile = encodeURIComponent(file);
      tr.innerHTML = `
        <td><span class="id-badge">${id}</span></td>
        <td>${escapeHtml(title)}</td>
        <td>${escapeHtml(file)}</td>
        <td class="actions">
          <button onclick="viewBook('${safeFile}')">Ver</button>
          <button onclick="copyEmbed('${safeFile}','${escapeHtml(title)}')">Copiar Embed</button>
        </td>
      `;
      booksTableBody.appendChild(tr);
    });
  }catch(err){ console.warn(err); emptyNote.style.display='block'; }
}

function viewBook(file){
  const path = `/viewer.html?file=${file}`;
  window.open(path,'_blank');
}

function copyEmbed(file, title){
  const decoded = decodeURIComponent(file);
  const url = `${location.origin}/viewer.html?file=${decoded}`;
  const iframe = `<iframe src="${url}" width="100%" height="600px" frameborder="0" allowfullscreen></iframe>`;
  navigator.clipboard?.writeText(iframe).then(()=>alert('Código embed copiado al portapapeles'))
    .catch(()=>prompt('Copia el embed manualmente', iframe));
}

function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",""":"&quot;","'":"&#39;"}[c])); }
