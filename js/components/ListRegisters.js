import CardDetails from './CardDetails.js';
import { store } from '../store/store.js';

async function ListRegisters() {
    const cadastros = await store.getAllCadastros(); // Aguarda a lista de cadastros
    const listContainer = document.getElementById('listContainer');
    const cardContainer = document.getElementById('card-details-container');

    listContainer.innerHTML = ''; // Limpa o contêiner de registros

    cadastros.forEach((cadastro) => {
        const item = document.createElement('div');
        item.textContent = `${cadastro.nome} - ${cadastro.email}`;

        item.addEventListener('click', () => {
            // Limpa o conteúdo do card para evitar duplicação
            cardContainer.innerHTML = '';

            // Renderiza o novo card e o anexa ao contêiner
            const card = new CardDetails(cadastro).render();

            // Garante que o card é um nó DOM antes de adicionar ao contêiner
            if (card instanceof Node) {
                cardContainer.appendChild(card); // Anexa o card
                cardContainer.style.display = 'block'; // Torna o contêiner visível
            } else {
                console.error("Erro: `render` em `CardDetails` não retornou um nó DOM válido.");
            }
        });

        listContainer.appendChild(item);
    });
}

export default ListRegisters;
