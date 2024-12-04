// Captura os parâmetros da URL
const params = new URLSearchParams(window.location.search);
const nomeEdital = params.get('vestibular');
const nomeConteudo = params.get('conteudo');

// Atualiza o breadcrumb
document.addEventListener("DOMContentLoaded", function () {
    const breadcrumbEditals = document.getElementById("breadcrumb-editals");
    const breadcrumbDisciplinas = document.getElementById("breadcrumb-disciplinas");
    const breadcrumbConteudo = document.getElementById("breadcrumb-content");

    if (nomeEdital) {
        breadcrumbEditals.textContent = nomeEdital;
    }
    if (nomeConteudo) {
        breadcrumbConteudo.textContent = nomeConteudo;
    }
});

// exibir que está salvo
document.getElementById('btnSave').addEventListener('click', function () {
  alert('Progresso salvo com sucesso!!')
});

// Função para redirecionar para a página de desempenho
document.getElementById('btnDesempenho').addEventListener('click', function () {
  // Nome do edital (capturado da URL)
  const params = new URLSearchParams(window.location.search);
  const vestibular = params.get('vestibular');

  // Nome do conteúdo (capturado da URL)
  const conteudo = params.get('conteudo');

  // Redireciona para a página de desempenho com os parâmetros do edital e conteúdo
  window.location.href = `/desempenho/?vestibular=${encodeURIComponent(vestibular)}&conteudo=${encodeURIComponent(conteudo)}`;
});

  