document.addEventListener("DOMContentLoaded", () => {
  // ---------------- TEMA DARK/LIGHT ----------------
  const toggleButton = document.querySelector("#toggle-theme");
  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      toggleButton.setAttribute("aria-label", "Alterar tema para claro");
    } else {
      toggleButton.setAttribute("aria-label", "Alterar tema para escuro");
    }
  });

  // ====== JS FAQ ======

  document.querySelectorAll(".faq-item").forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    const toggleFAQ = () => {
      const isExpanded = question.getAttribute("aria-expanded") === "true";

      // Fecha todos os outros FAQs
      document.querySelectorAll(".faq-item").forEach(otherItem => {
        const otherQuestion = otherItem.querySelector(".faq-question");
        const otherAnswer = otherItem.querySelector(".faq-answer");
        otherQuestion.setAttribute("aria-expanded", "false");
        otherAnswer.hidden = true;
      });

      // Abre ou fecha o clicado
      question.setAttribute("aria-expanded", !isExpanded);
      answer.hidden = isExpanded;
    };

    question.addEventListener("click", toggleFAQ);

    question.addEventListener("keypress", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleFAQ();
      }
    });
  });

  // ---------------- PRODUTOS ----------------
  const produtos = [
    { id: 1, titulo: "Seguro Auto", categoria: "Veículo", preco: 500, imagem: "../img/seguro-carro.jpg" },
    { id: 2, titulo: "Seguro Residencial", categoria: "Casa", preco: 300, imagem: "../img/seguro-casa.jpg" },
    { id: 3, titulo: "Seguro Viagem", categoria: "Viagem", preco: 200, imagem: "../img/seguro-viagem.jpg" },
    { id: 4, titulo: "Seguro Moto", categoria: "Veículo", preco: 350, imagem: "../img/seguro-moto.jpg" },
    { id: 5, titulo: "Seguro Vida", categoria: "Casa", preco: 400, imagem: "../img/seguro-vida.jpg" }
  ];

  const containerProdutos = document.querySelector("#container");
  const inputBusca = document.querySelector("#busca");
  const btnCategorias = document.querySelectorAll(".categoria-botoes button");
  const selectOrdenar = document.querySelector("#ordenar-preco");

  let termoBusca = "";
  let filtroCategoria = "";
  let ordemPreco = "";

  function renderCards(lista) {
    if (lista.length === 0) {
      containerProdutos.innerHTML = "<p>Nenhum produto encontrado.</p>";
      return;
    }
    containerProdutos.innerHTML = lista.map(item => `
      <div class="card">
        <img src="${item.imagem}" alt="${item.titulo}">
        <h2>${item.titulo}</h2>
        <p>Categoria: ${item.categoria}</p>
        <p>Preço: R$ ${item.preco}</p>
      </div>
    `).join("");
  }

  function debounce(fn, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  }

  inputBusca.addEventListener("input", debounce(() => {
    termoBusca = inputBusca.value.toLowerCase();
    applyFilters();
  }, 300));

  btnCategorias.forEach(btn => {
    btn.addEventListener("click", () => {
      btnCategorias.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filtroCategoria = btn.dataset.cat;
      applyFilters();
    });
  });

  selectOrdenar.addEventListener("change", () => {
    ordemPreco = selectOrdenar.value;
    applyFilters();
  });

  function applyFilters() {
    let lista = [...produtos];

    if (termoBusca) lista = lista.filter(p => p.titulo.toLowerCase().includes(termoBusca));
    if (filtroCategoria) lista = lista.filter(p => p.categoria === filtroCategoria);
    if (ordemPreco === "asc") lista.sort((a, b) => a.preco - b.preco);
    if (ordemPreco === "desc") lista.sort((a, b) => b.preco - a.preco);

    renderCards(lista);
  }

  renderCards(produtos);

  // ---------------- MATERIAS ----------------
  const materias = [
    { id: 1, titulo: "Como economizar sem abrir mão da proteção", descricao: "É possível ter um seguro que caiba no seu bolso! Compare preços, avalie coberturas essenciais e peça ajuda de um corretor para encontrar o melhor custo-benefício.", imagem: "../img/dinheiro.jpg", categoria: "Finanças" },
    { id: 2, titulo: "Por que ter um seguro é essencial hoje?", descricao: "Ter um seguro é mais do que uma proteção, é tranquilidade para o dia a dia. Ele garante que você não tenha surpresas financeiras em casos de acidentes, roubos ou imprevistos.", imagem: "../img/familia.jpg", categoria: "Seguros" },
    { id: 3, titulo: "Tipos de seguro e para que servem", descricao: "Existem vários tipos de seguro: de vida, automóvel, residencial e até para viagem. Cada um deles tem um papel importante na sua proteção financeira. Entenda qual faz mais sentido para você e descubra como escolher a melhor cobertura.", imagem: "../img/icones.jpg", categoria: "Seguros" },
    { id: 4, titulo: "Seguro de Vida não é só para idosos", descricao: "Muita gente acha que seguro de vida é só para quem já tem certa idade — mas contratar cedo significa pagar menos e garantir proteção para você e sua família em qualquer fase da vida.", imagem: "../img/casal.jpg", categoria: "Vida" },
    { id: 5, titulo: "Seguro Viagem: vale a pena?", descricao: "Um seguro viagem cobre despesas médicas, extravio de bagagem e até cancelamento de voo. É um investimento pequeno que pode evitar grandes prejuízos e dores de cabeça durante suas férias.", imagem: "../img/aeroporto.jpg", categoria: "Viagem" },
    { id: 6, titulo: "Seguro Residencial: proteção 24h", descricao: "Além de cobrir incêndios e roubos, o seguro residencial oferece serviços 24h, como chaveiro, eletricista e encanador. Um jeito prático e econômico de cuidar da sua casa.", imagem: "../img/seguro.jpg", categoria: "Residencial" }
  ];

  // ---------------- MATERIAS ----------------
  const containerMaterias = document.getElementById("materias");

  function renderMaterias(lista) {
    containerMaterias.innerHTML = "";
    lista.forEach(mat => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
      <img src="${mat.imagem}" alt="${mat.titulo}" loading="lazy">
      <h3>${mat.titulo}</h3>
      <p>${mat.descricao}</p>
      <span>${mat.categoria}</span>
    `;
      containerMaterias.appendChild(card);
    });
  }

  // Busca por título
  document.getElementById("buscaMaterias").addEventListener("input", e => {
    const termo = e.target.value.toLowerCase();
    renderMaterias(materias.filter(m => m.titulo.toLowerCase().includes(termo)));
  });

  // Filtros **somente das matérias**
  document.querySelectorAll("[data-cat-materia]").forEach(btn => {
    btn.addEventListener("click", e => {
      const cat = e.target.dataset.catMateria;
      if (cat === "todos") renderMaterias(materias);
      else renderMaterias(materias.filter(m => m.categoria === cat));
    });
  });

  // Inicial
  renderMaterias(materias);


  // ---------------- TO-DO LIST ----------------
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  const todoInput = document.querySelector("#todo-input");
  const addTodoBtn = document.querySelector("#add-todo");
  const todoList = document.querySelector("#todo-list");

  function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach(tarefa => {
      const li = document.createElement("li");
      li.className = tarefa.done ? "done" : "";
      li.innerHTML = `
        <span>${tarefa.titulo}</span>
        <div>
          <button class="button concluir">${tarefa.done ? "Desfazer" : "Concluir"}</button>
          <button class="remove">Remover</button>
        </div>
      `;
      li.querySelector(".concluir").addEventListener("click", () => {
        tarefa.done = !tarefa.done;
        salvarTodos();
      });
      li.querySelector(".remove").addEventListener("click", () => {
        todos = todos.filter(t => t.id !== tarefa.id);
        salvarTodos();
      });
      todoList.appendChild(li);
    });
  }

  function salvarTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  }

  addTodoBtn.addEventListener("click", () => {
    const titulo = todoInput.value.trim();
    if (!titulo) return;
    todos.push({ id: Date.now(), titulo, done: false });
    todoInput.value = "";
    salvarTodos();
  });

  renderTodos();
});
