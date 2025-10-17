const booksUrl = "books.json";
const USER = "tusmocraft";
const PASS = "01tusmo02";

function login() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;
  if (u === USER && p === PASS) {
    document.getElementById("login").style.display = "none";
    document.getElementById("panel").style.display = "block";
    loadBooks();
  } else {
    document.getElementById("msg").textContent = "❌ Credenciales incorrectas";
  }
}

async function loadBooks() {
  const res = await fetch(booksUrl);
  const books = await res.json();
  const tbody = document.querySelector("#bookTable tbody");
  tbody.innerHTML = "";
  books.forEach(book => {
    const tr = document.createElement("tr");
    const embed = `<iframe src='viewer.html?id=${book.id}' width='100%' height='600' style='border:none;'></iframe>`;
    tr.innerHTML = `
      <td>${book.id}</td>
      <td>${book.title}</td>
      <td><a href='viewer.html?id=${book.id}' target='_blank'>Ver libro</a></td>
      <td><textarea readonly>${embed}</textarea></td>
    `;
    tbody.appendChild(tr);
  });
}
