from django.db import models
from datetime import date
from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser

class Tarefa(models.Model):
    tarefa = models.CharField(max_length=200)
    descricao = models.TextField(null=True, blank=True)
    data = models.DateField()
    prioridade = models.CharField(max_length=10, choices=[('alta', 'Alta'), ('media', 'Media'), ('baixa', 'Baixa')])

    def __str__(self):
        return self.tarefa
    
class Edital(models.Model):
    edital = models.CharField(max_length=100)
    data = models.DateField()
    Usuario = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, null=False) 
    
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
    numQuestoes = models.IntegerField(max_length=3, default=0)
    acertos = models.IntegerField(max_length=3, default=0)
    erros = models.IntegerField(max_length=3, default=0)
    periodo = models.DateField()
    Conteudo = models.ForeignKey(Conteudo, null = False, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.numQuestoes} questões no conteúdo {self.Conteudo.nomeConteudo}'
    

