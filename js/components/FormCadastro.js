// components/FormCadastro.js
import { store } from '../store/store.js';

export default class FormCadastro {
    constructor() {
        this.form = document.getElementById('cadastro-form');
        this.nameInput = document.getElementById('nome');
        this.ageInput = document.getElementById('idade');
        this.emailInput = document.getElementById('email');
        this.idInput = document.getElementById('id'); // Campo oculto para armazenar o ID
        this.submitButton = document.querySelector('button[type="submit"]');
        this.isEditing = false;
        this.preventSubmit = false; // Flag para evitar submissão duplicada
        this.isSubmitting = false; // Flag para garantir uma única submissão por vez

        // console.log('FormCadastro inicializado');

        // Remove qualquer listener existente e adiciona o submit handler
        this.form.removeEventListener('submit', this.handleSubmit.bind(this));
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.isSubmitting) {
            // console.log("Submissão já em andamento");
            return;
        }
        this.isSubmitting = true; // Marca a submissão como em andamento

        if (this.preventSubmit) {
            // console.log("Submissão evitada devido à flag preventSubmit ativa");
            this.isSubmitting = false;
            return;
        }

        this.submitButton.disabled = true;
        this.preventSubmit = true;

        const nome = this.nameInput.value.trim();
        const idade = parseInt(this.ageInput.value);
        const email = this.emailInput.value.trim();
        const id = this.idInput.value ? parseInt(this.idInput.value) : null;

        // console.log(`Dados do formulário - Nome: ${nome}, Idade: ${idade}, Email: ${email}, ID: ${id}`);

        if (!nome || isNaN(idade) || !email) {
            // alert("Todos os campos são obrigatórios.");
            // console.error('Validação falhou - campos faltando');
            this.submitButton.disabled = false;
            this.preventSubmit = false;
            this.isSubmitting = false;
            return;
        }

        if (id) {
            // console.log('Atualizando cadastro');
            store.updateCadastro(id, { nome, idade, email })
                .then(() => {
                    // console.log('Cadastro atualizado com sucesso');
                    this.clearFormFields(); // Limpa o formulário sem reset completo
                })
                .catch((error) => {
                    console.error('Erro ao atualizar cadastro:', error);
                    this.submitButton.disabled = false;
                    this.preventSubmit = false;
                    this.isSubmitting = false;
                });
        } else {
            // console.log('Adicionando novo cadastro');
            store.addCadastro({ nome, idade, email })
                .then(() => {
                    // console.log('Cadastro adicionado com sucesso');
                    this.clearFormFields(); // Limpa o formulário após criação
                })
                .catch((error) => {
                    console.error('Erro ao adicionar cadastro:', error);
                    this.submitButton.disabled = false;
                    this.preventSubmit = false;
                    this.isSubmitting = false;
                });
        }
    }

    clearFormFields() {
        this.nameInput.value = '';
        this.ageInput.value = '';
        this.emailInput.value = '';
        this.idInput.value = '';
        this.submitButton.textContent = 'Cadastrar';
        this.isEditing = false;
        this.preventSubmit = false;
        this.isSubmitting = false; // Libera a flag de submissão após limpar o formulário
        this.submitButton.disabled = false;
        // console.log('Campos do formulário limpos e flags resetadas');
    }

    editCadastro(id) {
        // console.log(`Editando cadastro com ID: ${id}`);
        store.getCadastroById(id)
            .then((cadastro) => {
                if (cadastro) {
                    const { nome, idade, email } = cadastro;
                    this.nameInput.value = nome;
                    this.ageInput.value = idade;
                    this.emailInput.value = email;
                    this.idInput.value = id; // Define o ID no campo oculto

                    this.isEditing = true;
                    this.submitButton.textContent = 'Atualizar';
                    // console.log('Dados do cadastro carregados no formulário');
                } else {
                    console.error('Cadastro não encontrado');
                }
            })
            .catch((error) => {
                console.error('Erro ao buscar cadastro:', error);
            });
    }
}
