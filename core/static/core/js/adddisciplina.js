 // Captura o parâmetro "vestibular" da URL
 const params = new URLSearchParams(window.location.search);
 const vestibular = params.get('vestibular');

 // Atualiza o breadcrumb
 document.addEventListener("DOMContentLoaded", function () {
     const breadcrumbEditals = document.getElementById("breadcrumb-editals");
     if (vestibular) {
         breadcrumbEditals.textContent = vestibular;
     }
 });

// Função para adicionar a disciplina, conteúdo e descrição
document.getElementById('addButton').addEventListener('click', function() {
    // Pegando os valores dos inputs
    const disciplina = document.getElementById('disciplinaInput').value;
    const conteudo = document.getElementById('conteudoInput').value.trim();
    const descricao = document.getElementById('descricaoInput').value.trim();

    // Validação básica
    if (disciplina === '' || conteudo === '' || descricao === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Criando a nova linha da tabela
    const tr = document.createElement('tr');

    // Definindo as células
    const tdDisciplina = document.createElement('td');
    const tdConteudo = document.createElement('td');
    const tdDescricao = document.createElement('td');
    const tdActions = document.createElement('td');

    // Atribuindo os valores nas células
    tdDisciplina.textContent = disciplina;
    tdConteudo.textContent = conteudo;
    tdDescricao.textContent = descricao;

    // Botões de ação: editar, excluir e acessar atividades
    tdActions.innerHTML = `
        <button class="btn btn-warning btn-sm edit-btn"><i class="fas fa-edit"></i> Editar</button>
        <button class="btn btn-danger btn-sm delete-btn"><i class="fas fa-trash-alt"></i> Excluir</button>
        <button class="btn btn-info btn-sm" id="acessarAtividadesBtn">Acessar Atividades</button>
    `;

    // Adicionando a nova linha na tabela
    const disciplinasList = document.getElementById('disciplinasList');
    disciplinasList.appendChild(tr);

    // Adicionando as células à linha
    tr.appendChild(tdDisciplina);
    tr.appendChild(tdConteudo);
    tr.appendChild(tdDescricao);
    tr.appendChild(tdActions);

    // Função para excluir a linha
    tdActions.querySelector('.delete-btn').addEventListener('click', function() {
        tr.remove();
    });

    // Função para editar a linha
    tdActions.querySelector('.edit-btn').addEventListener('click', function() {
        const inputConteudo = document.createElement('input');
        const inputDescricao = document.createElement('input');
        inputConteudo.value = tdConteudo.textContent;
        inputDescricao.value = tdDescricao.textContent;

        tdConteudo.textContent = '';
        tdDescricao.textContent = '';
        tdConteudo.appendChild(inputConteudo);
        tdDescricao.appendChild(inputDescricao);

        // Salva a edição ao perder o foco ou ao pressionar Enter
        inputConteudo.addEventListener('blur', function() {
            tdConteudo.textContent = inputConteudo.value.trim() || tdConteudo.textContent;
        });

        inputDescricao.addEventListener('blur', function() {
            tdDescricao.textContent = inputDescricao.value.trim() || tdDescricao.textContent;
        });

        inputConteudo.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                tdConteudo.textContent = inputConteudo.value.trim() || tdConteudo.textContent;
            }
        });

        inputDescricao.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                tdDescricao.textContent = inputDescricao.value.trim() || tdDescricao.textContent;
            }
        });
    });

// Função para acessar as atividades
tdActions.querySelector('#acessarAtividadesBtn').addEventListener('click', function() {
    // Captura o nome do edital (vestibular) da URL
    const nomeEdital = vestibular;
    // Captura o nome do conteúdo diretamente da linha da tabela
    const nomeConteudo = tdConteudo.textContent;

    // Abre a página de atividades passando o nome do edital e do conteúdo via URL
    const url = `/atividades/?vestibular=${encodeURIComponent(nomeEdital)}&conteudo=${encodeURIComponent(nomeConteudo)}`;
    window.open(url, '_blank');
});

    // Limpa os campos após adicionar
    document.getElementById('disciplinaInput').value = '';
    document.getElementById('conteudoInput').value = '';
    document.getElementById('descricaoInput').value = '';
});

