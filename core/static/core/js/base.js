// Contador global de ID para as tarefas
let taskId = 1;

// Função para adicionar a tarefa
document.getElementById('addButton').addEventListener('click', function () {
    // Pegando os valores dos inputs
    const taskInput = document.getElementById('taskInput').value.trim();
    const descriptionInput = document.getElementById('descriptionInput').value.trim();
    const dateInput = document.getElementById('dateInput').value;
    const prioritySelect = document.getElementById('prioritySelect').value;

    // Validando se o campo de tarefa está vazio
    if (taskInput === '') {
        alert('Por favor, insira uma tarefa');
        return;
    }

    // Validando se o campo de data está vazio
    if (dateInput === '') {
        alert('Por favor, insira uma data');
        return;
    }

    // Criando a nova linha da tabela
    const tr = document.createElement('tr');

    // Definindo os valores das colunas
    const tdId = document.createElement('td');
    const tdTask = document.createElement('td');
    const tdDescription = document.createElement('td');
    const tdDate = document.createElement('td');
    const tdPriority = document.createElement('td');
    const tdActions = document.createElement('td');

    // Atribuindo os valores às colunas
    tdId.textContent = taskId++; // Incrementa o ID a cada nova tarefa
    tdTask.textContent = taskInput; // Nome da tarefa
    tdDescription.textContent = descriptionInput || 'Sem descricao'; // Descrição da tarefa
    tdDate.textContent = formatISODateToBR(dateInput) // Formata a data para o formato brasileiro
    tdPriority.textContent = prioritySelect.charAt(0).toUpperCase() + prioritySelect.slice(1); // Prioridade formatada

    // Botões de ação: editar, excluir e concluir
    tdActions.innerHTML = `
        <button class="btn btn-warning btn-sm edit-btn"><i class="fas fa-edit"></i></button>
        <button class="btn btn-danger btn-sm delete-btn"><i class="fas fa-trash-alt"></i></button>
        <button class="btn btn-success btn-sm done-btn"><i class="fas fa-check"></i></button>
    `;

    // Adicionando as células à linha
    tr.appendChild(tdId);
    tr.appendChild(tdTask);
    tr.appendChild(tdDescription);
    tr.appendChild(tdDate);
    tr.appendChild(tdPriority);
    tr.appendChild(tdActions);

    // Adicionando a nova linha na tabela
    const taskList = document.getElementById('taskList');
    taskList.appendChild(tr);

    // Função para excluir a tarefa
    tdActions.querySelector('.delete-btn').addEventListener('click', function () {
        tr.remove();
    });

     
    // Função para editar a tarefa
    tdActions.querySelector('.edit-btn').addEventListener('click', function () {
        // Substituir o conteúdo das células por inputs editáveis
        tdTask.innerHTML = `<input type="text" class="form-control" value="${tdTask.textContent}">`;
        tdDescription.innerHTML = `<input type="text" class="form-control" value="${tdDescription.textContent}">`;
        tdDate.innerHTML = `<input type="date" class="form-control" value="${convertBRDateToISO(tdDate.textContent)}">`; // Converte para o formato ISO
        tdPriority.innerHTML = `
            <select class="form-select">
                <option value="Alta" ${tdPriority.textContent === 'Alta' ? 'selected' : ''}>Alta</option>
                <option value="Média" ${tdPriority.textContent === 'Média' ? 'selected' : ''}>Média</option>
                <option value="Baixa" ${tdPriority.textContent === 'Baixa' ? 'selected' : ''}>Baixa</option>
            </select>
        `;

        // Alterando o botão de edição para salvar
        const editButton = tdActions.querySelector('.edit-btn');
        editButton.innerHTML = '<i class="fas fa-save"></i>';
        editButton.classList.remove('btn-warning');
        editButton.classList.add('btn-primary');

        // Função para salvar as alterações
        editButton.addEventListener('click', function () {
            tdTask.textContent = tdTask.querySelector('input').value.trim() || 'Sem nome';
            tdDescription.textContent = tdDescription.querySelector('input').value.trim() || 'Sem descrição';
            tdDate.textContent = formatISODateToBR(tdDate.querySelector('input').value); // Exibe no formato brasileiro
            tdPriority.textContent = tdPriority.querySelector('select').value;

            // Restaurar o botão de salvar para editar
            editButton.innerHTML = '<i class="fas fa-edit"></i>';
            editButton.classList.remove('btn-primary');
            editButton.classList.add('btn-warning');
        });

        // Salvar a edição ao perder o foco (blur)
        tdTask.querySelector('input').addEventListener('blur', function () {
            tdTask.textContent = tdTask.querySelector('input').value.trim() || 'Sem nome';
        });

        tdDescription.querySelector('input').addEventListener('blur', function () {
            tdDescription.textContent = tdDescription.querySelector('input').value.trim() || 'Sem descrição';
        });

        tdDate.querySelector('input').addEventListener('blur', function () {
            tdDate.textContent = formatISODateToBR(tdDate.querySelector('input').value);
        });

        tdPriority.querySelector('select').addEventListener('blur', function () {
            tdPriority.textContent = tdPriority.querySelector('select').value;
        });

        // Salvar a edição ao pressionar Enter
        tdTask.querySelector('input').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                tdTask.textContent = tdTask.querySelector('input').value.trim() || 'Sem nome';
            }
        });

        tdDescription.querySelector('input').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                tdDescription.textContent = tdDescription.querySelector('input').value.trim() || 'Sem descrição';
            }
        });

        tdDate.querySelector('input').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                tdDate.textContent = formatISODateToBR(tdDate.querySelector('input').value);
            }
        });

        tdPriority.querySelector('select').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                tdPriority.textContent = tdPriority.querySelector('select').value;
            }
        });
    });

// Função para concluir a tarefa
tdActions.querySelector('.done-btn').addEventListener('click', function () {
    // Riscando a tarefa
    tr.style.textDecoration = 'line-through';

    // Desabilitando os botões de editar e concluir
    tdActions.querySelector('.edit-btn').disabled = true;
    tdActions.querySelector('.done-btn').disabled = true;

    // Alterando o estilo dos botões desabilitados
    tdActions.querySelector('.edit-btn').classList.add('disabled');
    tdActions.querySelector('.done-btn').classList.add('disabled');
});

// Limpa os inputs após adicionar
document.getElementById('taskInput').value = '';
document.getElementById('descriptionInput').value = '';
document.getElementById('dateInput').value = '';
});

// Função auxiliar para converter data ISO para formato brasileiro (dd/mm/yyyy)
function formatISODateToBR(isoDate) {
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
}

// Função auxiliar para converter data brasileira (dd/mm/yyyy) para ISO (yyyy-mm-dd)
function convertBRDateToISO(brDate) {
    const [day, month, year] = brDate.split('/');
    return `${year}-${month}-${day}`;
}
