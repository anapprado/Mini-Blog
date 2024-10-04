
document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-list');
    const postForm = document.getElementById('post-form');
    const postTitle = document.getElementById('post-title');
    const postDate = document.getElementById('post-date');
    const postContent = document.getElementById('post-content');
    const clearStorageBtn = document.getElementById('clear-storage'); // Seleciona o botão de limpar

    const initialBooks = [
        {
            id: 1,
            title: "As Alegrias de Programar",
            content: "Descubra a emoção de transformar ideias em realidade através do código.",
            publishedOn: "2023-06-15"
        },
        {
            id: 2,
            title: "Dominando o CSS: A Chave para um Design Web Deslumbrante",
            content: "Desbloqueie o poder do CSS e transforme suas páginas web em obras-primas visuais.",
            publishedOn: "2023-07-01"
        },
        {
            id: 3,
            title: "Explorando as Maravilhas do React.js",
            content: "Descubra o poder do React.js e construa interfaces de usuário dinâmicas e interativas.",
            publishedOn: "2023-07-15"
        }
    ];

    function renderPosts() {   
            postsContainer.innerHTML = ''; 
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <small>Published on: ${post.publishedOn}</small>
                `;
                postsContainer.appendChild(postElement);
            });

        }

    function getStoredPosts() { // função para obter postagens armazenadas
        const storedPosts = localStorage.getItem('posts');// Tenta obter o valor associado à chave 'posts' no localStorage.
        if (storedPosts) { // Verifica se existe algum valor armazenado sob a chave 'posts'.
            return JSON.parse(storedPosts);// Se existir, converte a string JSON de volta para um array de objetos e retorna.
        } else {
            localStorage.setItem('posts', JSON.stringify(initialBooks));// Se não existir, armazena a lista inicial (initialBooks) como uma string JSON no localStorage.
            return initialBooks;// Retorna a lista inicial de livros.
        }
    }

    let posts = getStoredPosts();// Chama a função getStoredPosts para inicializar a variável posts com os livros armazenados no localStorage ou com a lista inicial.

   

    function savePostsToStorage() {
        localStorage.setItem('posts', JSON.stringify(posts));// Converte o array de objetos 'posts' para uma string JSON e armazena no localStorage.
    }

    function addNewPost(e) {
        e.preventDefault(); // Previne o comportamento padrão de envio do formulário.

        const newPost = {
            id: posts.length + 1,// Define o ID do novo livro como o próximo número na lista.
            title: postTitle.value,// Atribui o valor do campo de título do formulário.
            content: postContent.value,// Atribui o valor do campo de conteúdo do formulário.
            publishedOn: postDate.value// Atribui o valor do campo de data do formulário.
        };

        posts.push(newPost);// Adiciona o novo livro ao array 'posts'.
        savePostsToStorage();// Salva a lista atualizada no localStorage.
        renderPosts();// Re-renderiza a lista de livros na página.
        postForm.reset();// Limpa o formulário após o envio.
    }

    function clearStorage() {
        localStorage.clear(); // Limpa todo o localStorage
        posts = initialBooks; // Reseta o array de posts para os livros iniciais
        renderPosts(); // Re-renderiza a lista de posts
    }

    postForm.addEventListener('submit', addNewPost);
    
    clearStorageBtn.addEventListener('click', clearStorage); // Adiciona o evento ao botão de limpar

    renderPosts();
});