// main.js
import FormCadastro from './components/FormCadastro.js';
import ListRegisters from './components/ListRegisters.js';
import { store } from './store/store.js';
import '../css/global.css';

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

// Adiciona evento para o botão de tema
document.getElementById('themeButton').addEventListener('click', toggleTheme);

// Quando o DOM estiver carregado, inicializa a aplicação
document.addEventListener('DOMContentLoaded', () => {
    init();
    loadTheme();
});
