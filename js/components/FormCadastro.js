// components/FormCadastro.js
import { store } from '../store/store.js';

export default class FormCadastro {
    constructor() {
        this.form = document.getElementById('cadastro-form');
        this.nameInput = document.getElementById('nome');
        this.ageInput = document.getElementById('idade');
        this.emailInput = document.getElementById('email');
        this.idInput = document.getElementById('id');

        // Verifica se o elemento de mensagem de erro já existe
        this.errorMessageDiv = document.querySelector('.error-message') || document.createElement('div');
        this.errorMessageDiv.className = 'error-message';

        // Insere o div de mensagem de erro apenas se ele ainda não estiver no DOM
        if (!document.querySelector('.error-message')) {
            this.form.parentElement.insertBefore(this.errorMessageDiv, this.form);
        }

        this.submitButton = document.querySelector('button[type="submit"]');
        this.isEditing = false;
        this.preventSubmit = false;
        this.isSubmitting = false;

        this.form.removeEventListener('submit', this.handleSubmit.bind(this));
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.clearErrorMessage(); // Limpa mensagens de erro anteriores

        if (this.isSubmitting) return;
        this.isSubmitting = true;
        if (this.preventSubmit) {
            this.isSubmitting = false;
            return;
        }

        this.submitButton.disabled = true;
        this.preventSubmit = true;

        const nome = this.nameInput.value.trim();
        const idade = parseInt(this.ageInput.value);
        const email = this.emailInput.value.trim();
        const id = this.idInput.value ? parseInt(this.idInput.value) : null;

        if (!nome || isNaN(idade) || !email) {
            this.displayErrorMessage("Todos os campos são obrigatórios.");
            this.submitButton.disabled = false;
            this.preventSubmit = false;
            this.isSubmitting = false;
            return;
        }

        try {
            const existingCadastro = await store.getCadastroByEmail(email);
            if (existingCadastro && (!id || existingCadastro.id !== id)) {
                this.displayErrorMessage("Este e-mail já está em uso.");
                this.submitButton.disabled = false;
                this.preventSubmit = false;
                this.isSubmitting = false;
                return;
            }

            if (id) {
                await store.updateCadastro(id, { nome, idade, email });
                this.clearFormFields();
            } else {
                await store.addCadastro({ nome, idade, email });
                this.clearFormFields();
            }
        } catch (error) {
            console.error('Erro ao processar o cadastro:', error);
            this.displayErrorMessage("Ocorreu um erro ao processar o cadastro.");
        }

        this.submitButton.disabled = false;
        this.preventSubmit = false;
        this.isSubmitting = false;
    }

    displayErrorMessage(message) {
        this.errorMessageDiv.innerHTML = `<p>${message}</p>`;
        this.errorMessageDiv.style.display = 'flex';
    }

    clearErrorMessage() {
        this.errorMessageDiv.textContent = '';
        this.errorMessageDiv.style.display = 'none';
    }

    clearFormFields() {
        this.nameInput.value = '';
        this.ageInput.value = '';
        this.emailInput.value = '';
        this.idInput.value = '';
        this.submitButton.textContent = 'Cadastrar';
        this.isEditing = false;
        this.preventSubmit = false;
        this.isSubmitting = false;
        this.submitButton.disabled = false;
    }

    editCadastro(id) {
        store.getCadastroById(id)
            .then((cadastro) => {
                if (cadastro) {
                    const { nome, idade, email } = cadastro;
                    this.nameInput.value = nome;
                    this.ageInput.value = idade;
                    this.emailInput.value = email;
                    this.idInput.value = id;
                    this.isEditing = true;
                    this.submitButton.textContent = 'Atualizar';
                } else {
                    console.error('Cadastro não encontrado');
                }
            })
            .catch((error) => {
                console.error('Erro ao buscar cadastro:', error);
            });
    }
}
