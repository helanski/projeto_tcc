from django.http import HttpResponse
from django.conf import settings
import os
from django.shortcuts import redirect, render

# PÁGINAS
# Função para servir a página base
def serve_base(request):
    file_path = os.path.join(settings.BASE_DIR, 'core', 'templates', 'base.html')
    with open(file_path, 'r') as f:
        html_content = f.read()
    return HttpResponse(html_content)

# Função para servir a página addedital
def serve_addedital(request):
    file_path = os.path.join(settings.BASE_DIR, 'core', 'templates', 'addedital.html')
    with open(file_path, 'r') as f:
        html_content = f.read()
    return HttpResponse(html_content)

# Função para servir a página adddisciplina
def serve_adddisciplina(request):
    file_path = os.path.join(settings.BASE_DIR, 'core', 'templates', 'adddisciplina.html')
    with open(file_path, 'r') as f:
        html_content = f.read()
    return HttpResponse(html_content)

# Função para servir a página atividades
def serve_atividades(request):
    file_path = os.path.join(settings.BASE_DIR, 'core', 'templates', 'atividades.html')
    with open(file_path, 'r') as f:
        html_content = f.read()
    return HttpResponse(html_content)

# Função para servir a página desempenho
def serve_desempenho(request):
    file_path = os.path.join(settings.BASE_DIR, 'core', 'templates', 'desempenho.html')
    with open(file_path, 'r') as f:
        html_content = f.read()
    return HttpResponse(html_content)


# FORMULÁRIOS

# cadastro de tarefas
from .models import Tarefa
from .forms import TarefaForm

def base(request):
    if request.method == 'POST':
        form = TarefaForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('base')  # Redireciona para a própria página após salvar
    else:
        form = TarefaForm()

    # Recupera todas as tarefas para exibir na tabela
    tarefas = Tarefa.objects.all()
    return render(request, 'base.html', {'form': form, 'tarefas': tarefas})



