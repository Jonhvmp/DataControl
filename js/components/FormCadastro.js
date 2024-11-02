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

        console.log('FormCadastro inicializado');
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.preventSubmit) {
            // Evita submissão se a flag estiver ativa
            console.log("Submissão evitada");
            return;
        }

        console.log('Evento de submissão do formulário disparado');

        const nome = this.nameInput.value.trim();
        const idade = parseInt(this.ageInput.value);
        const email = this.emailInput.value.trim();
        const id = this.idInput.value ? parseInt(this.idInput.value) : null;

        console.log(`Dados do formulário - Nome: ${nome}, Idade: ${idade}, Email: ${email}, ID: ${id}`);

        // Validação dos campos
        if (!nome || !idade || !email) {
            alert("Todos os campos são obrigatórios.");
            console.error('Validação falhou - campos faltando');
            return;
        }

        // Verifica se estamos editando (ID preenchido) ou criando um novo cadastro
        if (id) {
            console.log('Atualizando cadastro');
            store.updateCadastro(id, { nome, idade, email })
                .then(() => {
                    console.log('Cadastro atualizado com sucesso');
                })
                .catch((error) => {
                    console.error('Erro ao atualizar cadastro:', error);
                });
            this.idInput.value = ''; // Limpa o ID após a atualização
            this.submitButton.textContent = 'Cadastrar';
        } else {
            console.log('Adicionando novo cadastro');
            store.addCadastro({ nome, idade, email })
                .then(() => {
                    console.log('Cadastro adicionado com sucesso');
                })
                .catch((error) => {
                    console.error('Erro ao adicionar cadastro:', error);
                });
        }

        this.isEditing = false;
        this.form.reset();
        this.preventSubmit = true; // Ativa a flag para evitar nova submissão com dados vazios
        setTimeout(() => this.preventSubmit = false, 100); // Reseta a flag após um breve delay
        console.log('Formulário resetado');
    }

    editCadastro(id) {
        console.log(`Editando cadastro com ID: ${id}`);
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
                    console.log('Dados do cadastro carregados no formulário');
                } else {
                    console.error('Cadastro não encontrado');
                }
            })
            .catch((error) => {
                console.error('Erro ao buscar cadastro:', error);
            });
    }
}
