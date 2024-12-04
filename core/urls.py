from django.urls import path
from . import views

urlpatterns = [
    # telas 
    path('', views.serve_base, name='base'),
    path('base/', views.serve_base, name='base'),
    path('addedital/', views.serve_addedital, name='addedital'),
    path('adddisciplina/', views.serve_adddisciplina, name='adddisciplina'),
    path('atividades/', views.serve_atividades, name='atividades'),
    path('desempenho/', views.serve_desempenho, name='desempenho'),
    
    # formulários pro banco de dados
    
]