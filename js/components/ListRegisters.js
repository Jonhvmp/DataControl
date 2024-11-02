// components/ListRegisters.js
import CardDetails from './CardDetails.js';
import { store } from '../store/store.js';

async function ListRegisters() {
    const cadastros = await store.getAllCadastros(); // Aguarda a lista de cadastros
    const listContainer = document.getElementById('listContainer');
    listContainer.innerHTML = '';

    cadastros.forEach((cadastro) => {
        const item = document.createElement('div');
        item.textContent = `${cadastro.nome} - ${cadastro.email}`;

        item.addEventListener('click', () => {
            const card = new CardDetails(cadastro).render();
            document.body.appendChild(card);
        });

        listContainer.appendChild(item);
    });
}

export default ListRegisters;
