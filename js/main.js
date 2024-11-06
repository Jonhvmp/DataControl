// main.js
import FormCadastro from './components/FormCadastro.js';
import ListRegisters from './components/ListRegisters.js';
import { store } from './store/store.js';

// Função principal que inicializa a aplicação
function init() {
    // Inicializa o formulário de cadastro
    const form = new FormCadastro();

    // Inicializa a listagem dos cadastros
    ListRegisters();

    // Observa alterações no estado para re-renderizar a lista de cadastros
    store.subscribe(() => {
        ListRegisters();
    });
}

// Função para alternar entre temas claro e escuro
function toggleTheme() {
    const body = document.body;
    const themeButtonIcon = document.querySelector('#themeButton i');

    if (body.classList.contains('dark-theme')) {
        // Muda para tema claro
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');

        // Atualiza o ícone para o sol (indicando modo claro)
        themeButtonIcon.classList.remove('ph-moon');
        themeButtonIcon.classList.add('ph-sun');
    } else {
        // Muda para tema escuro
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');

        // Atualiza o ícone para a lua (modo escuro)
        themeButtonIcon.classList.remove('ph-sun');
        themeButtonIcon.classList.add('ph-moon');
    }
}

// Verifica a preferência salva no localStorage ao carregar a página
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeButtonIcon = document.querySelector('#themeButton i');

    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeButtonIcon.classList.add('ph-moon');
    } else {
        body.classList.add('light-theme');
        themeButtonIcon.classList.add('ph-sun');
    }
}

// Evento para o botão de tema
document.getElementById('themeButton').addEventListener('click', toggleTheme);

// função de exportar os dados em csv
function displayExportMessage(message, isError = true) {
    const exportMessageDiv = document.getElementById('exportMessage');
    exportMessageDiv.innerHTML = `<p>${message}</p>`;
    exportMessageDiv.style.color = isError ? 'red' : 'green'; // Vermelho para erros, verde para sucesso
    exportMessageDiv.style.border = isError ? '1px solid red' : '1px solid green';
    exportMessageDiv.style.display = 'flex';

    // Oculta a mensagem após alguns segundos
    setTimeout(() => {
        exportMessageDiv.style.display = 'none';
    }, 3000);
}

async function exportToCSV() {
    const cadastros = await store.getAllCadastros();
    if (cadastros.length === 0) {
        displayExportMessage("Não há dados para exportar.", true);
        return;
    }

    const header = ["Nome", "Idade", "Email"];
    const rows = cadastros.map(cadastro => [cadastro.nome, cadastro.idade, cadastro.email]);

    let csvContent = header.join(",") + "\n";
    rows.forEach(row => {
        csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "cadastros.csv";
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    displayExportMessage("Dados exportados com sucesso!", false);
}

// Evento no botão de exportar
document.getElementById('exportButton').addEventListener('click', exportToCSV);

// Quando o DOM estiver carregado, inicializa a aplicação
document.addEventListener('DOMContentLoaded', () => {
    init();
    loadTheme();
});
