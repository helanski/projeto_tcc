from django.db import models
from datetime import date
from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser

class Tarefa(models.Model):
    nome_tarefa = models.CharField(max_length=255)
    descricao = models.CharField(max_length=500, null=True, blank=True)
    data = models.DateField()
    prioridade = models.CharField(max_length=20, choices=[('alta', 'Alta'), ('media', 'Média'), ('baixa', 'Baixa')])

    def __str__(self):
        return self.nome_tarefa
    
class Edital(models.Model):
    titulo = models.CharField(max_length=255, default=0)

    def __str__(self):
        return self.titulo
    
class Disciplina(models.Model):
    nomeDisciplina = models.CharField(max_length=100, null=False)
    ProvaVestibular = models.ForeignKey(Edital, null=False, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.nomeDisciplina

class Conteudo(models.Model):
    nomeConteudo = models.CharField(max_length=100, null=False)
    Disciplina = models.ForeignKey(Disciplina, null=False, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.nomeConteudo
    
class desempenhoConteudo(models.Model):
    numQuestoes = models.IntegerField(default=0)
    acertos = models.IntegerField(default=0)
    erros = models.IntegerField(default=0)
    periodo = models.DateField()
    Conteudo = models.ForeignKey(Conteudo, null = False, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.numQuestoes} questões no conteúdo {self.Conteudo.nomeConteudo}'
    

