from django import forms
from .models import Edital, Disciplina, Conteudo, Tarefa, desempenhoConteudo

# form para as tarefas na tela de início
class TarefaForm(forms.ModelForm):
    class Meta:
        model = Tarefa
        fields = ['nome_tarefa', 'descricao', 'data', 'prioridade']
        
