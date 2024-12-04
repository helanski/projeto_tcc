// breadcrumb
// Captura os parâmetros da URL
const params = new URLSearchParams(window.location.search);
const vestibular = params.get('vestibular'); // Nome do edital
const conteudo = params.get('conteudo');    // Nome do conteúdo

// Atualiza os links e textos do breadcrumb
document.addEventListener("DOMContentLoaded", function () {
    // Nome do edital
    const breadcrumbEdital = document.getElementById('breadcrumb-edital');
    breadcrumbEdital.textContent = vestibular || 'Edital';
    breadcrumbEdital.href = `disciplinas.html?vestibular=${encodeURIComponent(vestibular)}`;

    // Nome do conteúdo
    const breadcrumbConteudo = document.getElementById('breadcrumb-conteudo');
    breadcrumbConteudo.textContent = conteudo || 'Conteúdo';
    breadcrumbConteudo.href = `atividades.html?vestibular=${encodeURIComponent(vestibular)}&conteudo=${encodeURIComponent(conteudo)}`;
});
   
   
   // Inicializando o gráfico
    const desempenhoChart = new Chart(document.getElementById('desempenhoChart'), {
        type: 'bar',
        data: {
          labels: [],
          datasets: [{
            label: 'Porcentagem de Acertos',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Desempenho nas Questões'
            }
          },
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });
  
      // Função para adicionar dados à tabela
      document.getElementById('desempenhoForm').addEventListener('submit', function(e) {
        e.preventDefault();
  
        // Obter os valores dos campos
        const total = document.getElementById('totalQuestões').value;
        const acertos = document.getElementById('acertos').value;
        const erros = document.getElementById('erros').value;
  
        // Calcular porcentagem de acertos
        const porcentagem = (acertos / total) * 100;
  
        // Adicionar os dados à tabela
        const tabela = document.getElementById('tabelaDesempenho').getElementsByTagName('tbody')[0];
        const novaLinha = tabela.insertRow();
        novaLinha.innerHTML = `
          <td>${total}</td>
          <td>${acertos}</td>
          <td>${erros}</td>
          <td>${porcentagem.toFixed(2)}%</td>
          <td><button class="btn btn-danger btn-sm" onclick="deletarLinha(this)">Excluir</button></td>
        `;
  
        // Atualizar o gráfico
        const labels = desempenhoChart.data.labels;
        const data = desempenhoChart.data.datasets[0].data;
        labels.push(`Lista ${labels.length + 1}`);
        data.push(porcentagem);
  
        desempenhoChart.update();
  
        // Limpar campos
        document.getElementById('desempenhoForm').reset();
      });
  
      // Função para excluir uma linha da tabela
      function deletarLinha(button) {
        const row = button.closest('tr');
        const index = row.rowIndex - 1;
        row.remove();
        
        // Remover dados do gráfico
        desempenhoChart.data.labels.splice(index, 1);
        desempenhoChart.data.datasets[0].data.splice(index, 1);
        desempenhoChart.update();
      }