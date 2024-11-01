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

        console.log('FormCadastro initialized');
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.preventSubmit) {
            // Evita submissão se a flag estiver ativa
            console.log("Submission prevented");
            return;
        }

        console.log('Form submit event triggered');

        const nome = this.nameInput.value.trim();
        const idade = parseInt(this.ageInput.value);
        const email = this.emailInput.value.trim();
        const id = this.idInput.value ? parseInt(this.idInput.value) : null;

        console.log(`Form data - Nome: ${nome}, Idade: ${idade}, Email: ${email}, ID: ${id}`);

        // Validação dos campos
        if (!nome || !idade || !email) {
            alert("Todos os campos são obrigatórios.");
            console.error('Validation failed - missing fields');
            return;
        }

        // Verifica se estamos editando (ID preenchido) ou criando um novo cadastro
        if (id) {
            console.log('Updating cadastro');
            store.updateCadastro(id, { nome, idade, email })
                .then(() => {
                    console.log('Cadastro updated successfully');
                })
                .catch((error) => {
                    console.error('Error updating cadastro:', error);
                });
            this.idInput.value = ''; // Limpa o ID após a atualização
            this.submitButton.textContent = 'Cadastrar';
        } else {
            console.log('Adding new cadastro');
            store.addCadastro({ nome, idade, email })
                .then(() => {
                    console.log('Cadastro added successfully');
                })
                .catch((error) => {
                    console.error('Error adding cadastro:', error);
                });
        }

        this.isEditing = false;
        this.form.reset();
        this.preventSubmit = true; // Ativa a flag para evitar nova submissão com dados vazios
        setTimeout(() => this.preventSubmit = false, 100); // Reseta a flag após um breve delay
        console.log('Form reset');
    }

    editCadastro(id) {
        console.log(`Editing cadastro with ID: ${id}`);
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
                    console.log('Cadastro data loaded into form');
                } else {
                    console.error('Cadastro not found');
                }
            })
            .catch((error) => {
                console.error('Error fetching cadastro:', error);
            });
    }
}
