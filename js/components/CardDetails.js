// components/CardDetails.js
import { store } from '../store/store.js';
import FormCadastro from './FormCadastro.js';

export default class CardDetails {
    constructor(cadastro) {
        this.cadastro = cadastro;
    }

    render() {
        // Seleciona o contêiner principal
        const container = document.getElementById('card-details-container');

        // Limpa o conteúdo anterior do contêiner para evitar duplicações
        container.innerHTML = '';

        // Cria o card de detalhes
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-details');
        cardContainer.setAttribute('data-id', this.cadastro.id);

        const nome = document.createElement('h2');
        nome.textContent = `Nome: ${this.cadastro.nome}`;
        cardContainer.appendChild(nome);

        const idade = document.createElement('p');
        idade.textContent = `Idade: ${this.cadastro.idade}`;
        cardContainer.appendChild(idade);

        const email = document.createElement('p');
        email.textContent = `Email: ${this.cadastro.email}`;
        cardContainer.appendChild(email);

        const actionButtons = document.createElement('div');
        actionButtons.classList.add('action-buttons');

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', () => {
            const formCadastro = new FormCadastro();
            formCadastro.editCadastro(this.cadastro.id);
            this.closeCard();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => {
            store.deleteCadastro(this.cadastro.id);
            this.closeCard();
        });

        const closeButton = document.createElement('button');
        closeButton.textContent = 'X';
        closeButton.classList.add('close-btn');
        closeButton.addEventListener('click', () => this.closeCard());

        actionButtons.appendChild(editButton);
        actionButtons.appendChild(deleteButton);
        actionButtons.appendChild(closeButton);

        cardContainer.appendChild(actionButtons);

        // Adiciona o card ao contêiner correto
        container.appendChild(cardContainer);

        // Garante que o contêiner esteja visível
        container.style.display = 'block';
    }

    closeCard() {
        // Limpa o conteúdo do contêiner e o oculta
        const container = document.getElementById('card-details-container');
        container.innerHTML = '';
        container.style.display = 'none';
    }
}
