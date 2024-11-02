// store/store.js
export class Store {
    constructor() {
        this.dbName = "CadastroDB";
        this.storeName = "cadastros";
        this.db = null;
        this.listeners = [];
        this.dbInitialized = false; // Controle de inicialização
        this.initDB();
    }

    initDB() {
        const request = indexedDB.open(this.dbName, 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(this.storeName)) {
                db.createObjectStore(this.storeName, { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = (event) => {
          this.db = event.target.result;
          this.dbInitialized = true; // Marca como inicializado
          this.notifyListeners();
          console.log("Banco de dados inicializado com sucesso.");
        };

        request.onerror = (event) => {
          console.error("Erro ao abrir o banco de dados:", event.target.errorCode);
        };
    }

    async waitForDB() {
        // Aguarda até que o banco de dados esteja inicializado
        while (!this.dbInitialized) {
          await new Promise(resolve => setTimeout(resolve, 100)); // Espera 100ms antes de checar novamente
        }
    }

    async notifyListeners() {
        await this.waitForDB(); // Garante a inicialização
        this.getAllCadastros().then((cadastros) => {
          this.listeners.forEach((listener) => listener({ cadastros }));
        });
    }

    subscribe(listener) {
        this.listeners.push(listener);
        this.notifyListeners();
    }

    async addCadastro(cadastro) {
        await this.waitForDB();
        const transaction = this.db.transaction([this.storeName], "readwrite");
        const store = transaction.objectStore(this.storeName);
        store.add(cadastro);

        transaction.oncomplete = () => this.notifyListeners();
    }

    async updateCadastro(id, updatedCadastro) {
        await this.waitForDB();
        const transaction = this.db.transaction([this.storeName], "readwrite");
        const store = transaction.objectStore(this.storeName);
        const request = store.get(id);

        request.onsuccess = (event) => {
          const data = event.target.result;
          if (data) {
            Object.assign(data, updatedCadastro);
            store.put(data);
            transaction.oncomplete = () => this.notifyListeners();
            console.log("Cadastro atualizado com sucesso.");
          }
        };
    }

    async deleteCadastro(id) {
        await this.waitForDB();
        const transaction = this.db.transaction([this.storeName], "readwrite");
        const store = transaction.objectStore(this.storeName);
        store.delete(id);
        transaction.oncomplete = () => this.notifyListeners();
        console.log("Cadastro Deletado com sucesso.")
    }

    async getAllCadastros() {
        await this.waitForDB();
        return new Promise((resolve, reject) => {
          const transaction = this.db.transaction([this.storeName], "readonly");
          const store = transaction.objectStore(this.storeName);
          const request = store.getAll();

          request.onsuccess = (event) => resolve(event.target.result);
          console.log(request.onsuccess, "Todos os cadastros puxados com sucesso.")
          request.onerror = (event) => reject(event.target.errorCode);
        });
    }

    async getCadastroById(id) {
        await this.waitForDB();
        return new Promise((resolve, reject) => {
          const transaction = this.db.transaction([this.storeName], "readonly");
          const store = transaction.objectStore(this.storeName);
          const request = store.get(id);

          request.onsuccess = (event) => resolve(event.target.result);
          request.onerror = (event) => reject(event.target.errorCode);
        });
    }
}

export const store = new Store();
