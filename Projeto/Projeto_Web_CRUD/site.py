from flask import Flask, render_template, request
import requests
import json

# Fazer o site iniciar
app = Flask(__name__)

#Linkar com o Banco de Dados
#-----------------------------------------------------------------------------------------------------------------------
link = "https://pets-c745b-default-rtdb.firebaseio.com/"
#-----------------------------------------------------------------------------------------------------------------------


#Metodo POST -> Criar(C)
#-----------------------------------------------------------------------------------------------------------------------
# dados = {'Nome': 'Couto', 'Idade': 22, 'Sexo': 'M', 'Cor': 'Marrom', 'Comida Favorita': 'Largatas', 'Peso e Tamanho Geral': '560g', 'Tipo de Água Favorita': 'Água-Doce', 'Tel para adoção': '(31)887799'}
# req = requests.post(f'{link}/Pets/Axolotes/.json', data=json.dumps(dados))
# print(req)
# print(req.text)
#-----------------------------------------------------------------------------------------------------------------------


#Metodo GET -> Pegar(R)
#-----------------------------------------------------------------------------------------------------------------------
# req = requests.get(f'{link}/Pets/.json')
# print(req)
# print(req.text)
# dic_req = req.json()
# print(dic_req['Axolotes'])
#-----------------------------------------------------------------------------------------------------------------------


#Metodo PATCH -> Editar(U)
#-----------------------------------------------------------------------------------------------------------------------
# dados = {'Cor': 'Preto'}
# req = requests.patch(f'{link}/Pets/Axolotes/-Nphl4vewHHP2rFlXoaU/.json', data=json.dumps(dados))
# print(req)
# print(req.text)
#-----------------------------------------------------------------------------------------------------------------------


#Metodo DELETE -> Deletar(D)
#-----------------------------------------------------------------------------------------------------------------------
#Procurando o ID para Deleta-lo:
# requisicao = requests.get(f'{link}/Pets/Axolotes.json')
# print(requisicao)
# dic_requisicao = requisicao.json()
#
# for id in dic_requisicao:
#     nome = dic_requisicao[id]['Nome']
#     if nome == "Couto":
#         print(id)
#         id_Nome = id
#
# #Deletar:
# req = requests.delete(f'{link}/Pets/Axolotes/{id_Nome}/.json')
# print(req)
# print(req.text)
#-----------------------------------------------------------------------------------------------------------------------



#Criação das paginas( Routes(Link) + Função(O que vamos exibir) + Template(HTML $ CSS) )
@app.route('/')
def homepage():
    return render_template("homepage.html")

@app.route('/perfilhamento')
def perfilhamento():
    return render_template("perfilhamento.html")

@app.route('/sobrenos')
def sobrenos():
    return render_template("sobrenos.html")

@app.route('/contatos')
def contatos():
    return render_template("contatos.html")

# ---------------------------------------------------------------------------------------------------------------------
# ---------------------------------------------------------------------------------------------------------------------
# ---------------------------------------------------------------------------------------------------------------------

@app.route('/adocao_caes')
def adocao_caes():
    req = requests.get(f'{link}/Pets/Cães.json')
    print(req)
    dic_req = req.json()
    print(dic_req)

    return render_template("adocao_caes.html", dados=dic_req)

@app.route('/adocao_gatos')
def adocao_gatos():
    req = requests.get(f'{link}/Pets/Gatos.json')
    print(req)
    dic_req = req.json()

    return render_template("adocao_gatos.html", dados=dic_req)

@app.route('/adocao_coelhos')
def adocao_coelhos():
    req = requests.get(f'{link}/Pets/Coelhos.json')
    print(req)
    dic_req = req.json()

    return render_template("adocao_coelhos.html", dados=dic_req)

@app.route('/adocao_hamsters')
def adocao_hamsters():
    req = requests.get(f'{link}/Pets/Hamsters.json')
    print(req)
    dic_req = req.json()

    return render_template("adocao_hamsters.html", dados=dic_req)

@app.route('/adocao_furoes')
def adocao_furoes():
    req = requests.get(f'{link}/Pets/Furões.json')
    print(req)
    dic_req = req.json()

    return render_template("adocao_furoes.html", dados=dic_req)

@app.route('/adocao_axolotes')
def adocao_axolotes():
    req = requests.get(f'{link}/Pets/Axolotes.json')
    print(req)
    dic_req = req.json()

    return render_template("adocao_axolotes.html", dados=dic_req)

@app.route('/adocao_chinchilas')
def adocao_chinchilas():
    req = requests.get(f'{link}/Pets/Chinchilas.json')
    print(req)
    dic_req = req.json()

    return render_template("adocao_chinchilas.html", dados=dic_req)

# ---------------------------------------------------------------------------------------------------------------------
# ---------------------------------------------------------------------------------------------------------------------
# ---------------------------------------------------------------------------------------------------------------------
# ---------------------------------------------CRUD Axolotes-----------------------------------------------------------
@app.route('/adicionarTabelas_Axolotes', methods=['POST'])
def adicionarTabelas_Axolotes():
    nome_pet = request.form.get('nome_pet')
    idade_pet = request.form.get('idade_pet')
    sexo_pet = request.form.get('sexo_pet')
    cor_pet = request.form.get('cor_pet')
    comida_favorito_pet = request.form.get('comida_favorito_pet')
    peso_tamanho_pet = request.form.get('peso_tamanho_pet')
    agua_favorita_pet = request.form.get('agua_favorita_pet')
    telefone_pet = request.form.get('telefone_pet')

    # Crie um dicionário apenas com os valores não nulos e não vazios
    dados = {
        'Nome': nome_pet,
        'Idade': idade_pet,
        'Sexo': sexo_pet,
        'Cor': cor_pet,
        'Comida Favorita': comida_favorito_pet,
        'Peso e Tamanho Geral': peso_tamanho_pet,
        'Tipo de Água Favorita': agua_favorita_pet,
        'Tel para adoção': telefone_pet
    }

    # Remova os pares chave-valor com valores nulos ou vazios
    dados = {chave: valor for chave, valor in dados.items() if valor is not None and valor != ''}

    # Verifique se há pelo menos um campo não nulo
    if dados:
        print(dados)
        req = requests.post(f'{link}/Pets/Axolotes/.json', data=json.dumps(dados))
        print(req)
    else:
        print("Erro: Todos os campos são nulos ou vazios. Nenhum dado será adicionado ao banco de dados.")
        return "Erro: Todos os campos são nulos ou vazios. Nenhum dado será adicionado ao banco de dados."


@app.route('/deletarPet_Axolote', methods=['POST'])
def deletar_pet_axolote():
    pet_id = request.form.get('petId')

    req = requests.delete(f'{link}/Pets/Axolotes/{pet_id}/.json')
    print(req)
    print(req.text)

    return 'Pet deletado com sucesso!'


@app.route('/atualizarPet_Axolote', methods=['POST'])
def atualizar_pet_axolote():
    pet_id = request.form.get('petId')

    print(pet_id)

    dados = {
        'Nome': request.form.get('nome'),
        'Idade': request.form.get('idade'),
        'Sexo': request.form.get('sexo'),
        'Cor': request.form.get('cor'),
        'Comida Favorito': request.form.get('comida_favorito'),
        'Peso Tamanho': request.form.get('peso_tamanho'),
        'Tipo de Água Favorita': request.form.get('agua_favorita'),
        'Tel para adoção': request.form.get('telefone')
    }

    # Remova os pares chave-valor com valores nulos ou vazios
    dados = {chave: valor for chave, valor in dados.items() if valor is not None and valor != ''}

    req = requests.patch(f'{link}/Pets/Axolotes/{pet_id}/.json', data=json.dumps(dados))
    print(req)
    print(req.text)

    return 'Pet atualizado com sucesso!'

# ---------------------------------------------------------------------------------------------------------------------
# ---------------------------------------------CRUD Cães----------------------------------------------------------------
@app.route('/adicionarTabelas_Caes', methods=['POST'])
def adicionarTabelas_Caes():
    nome_pet = request.form.get('nome_pet')
    idade_pet = request.form.get('idade_pet')
    sexo_pet = request.form.get('sexo_pet')
    personalidade_pet = request.form.get('personalidade_pet')
    brinquedo_favorito_pet = request.form.get('brinquedo_favorito_pet')
    vacinas_ausentes_pet = request.form.get('vacinas_ausentes_pet')
    condicao_especial_pet = request.form.get('condicao_especial_pet')
    telefone_pet = request.form.get('telefone_pet')

    # Crie um dicionário apenas com os valores não nulos e não vazios
    dados = {
        'Nome': nome_pet,
        'Idade': idade_pet,
        'Sexo': sexo_pet,
        'Personalidade': personalidade_pet,
        'Brinquedo Favorito': brinquedo_favorito_pet,
        'Vacinas Ausentes': vacinas_ausentes_pet,
        'Condição Especial': condicao_especial_pet,
        'Tel para adoção': telefone_pet
    }

    # Remova os pares chave-valor com valores nulos ou vazios
    dados = {chave: valor for chave, valor in dados.items() if valor is not None and valor != ''}

    # Verifique se há pelo menos um campo não nulo
    if dados:
        print(dados)
        req = requests.post(f'{link}/Pets/Cães/.json', data=json.dumps(dados))
        print(req)
    else:
        print("Erro: Todos os campos são nulos ou vazios. Nenhum dado será adicionado ao banco de dados.")
        return "Erro: Todos os campos são nulos ou vazios. Nenhum dado será adicionado ao banco de dados."


@app.route('/deletarPet_Caes', methods=['POST'])
def deletarPet_Caes():
    pet_id = request.form.get('petId')

    req = requests.delete(f'{link}/Pets/Cães/{pet_id}/.json')
    print(req)
    print(req.text)

    return 'Pet deletado com sucesso!'


@app.route('/atualizarPet_Caes', methods=['POST'])
def atualizarPet_Caes():
    pet_id = request.form.get('petId')

    print(pet_id)

    dados = {
        'Nome': request.form.get('nome'),
        'Idade': request.form.get('idade'),
        'Sexo': request.form.get('sexo'),
        'Personalidade': request.form.get('personalidade'),
        'Brinquedo Favorito': request.form.get('brinquedo_favorito'),
        'Vacinas Ausentes': request.form.get('vacinas_ausentes'),
        'Condição Especial': request.form.get('condicao_especial'),
        'Tel para adoção': request.form.get('telefone')
    }

    # Remova os pares chave-valor com valores nulos ou vazios
    dados = {chave: valor for chave, valor in dados.items() if valor is not None and valor != ''}

    req = requests.patch(f'{link}/Pets/Cães/{pet_id}/.json', data=json.dumps(dados))
    print(req)
    print(req.text)

    return 'Pet atualizado com sucesso!'

# ---------------------------------------------------------------------------------------------------------------------
# ---------------------------------------------CRUD Chinchilas---------------------------------------------------------
@app.route('/adicionarTabelas_Chinchilas', methods=['POST'])
def adicionarTabelas_Chinchilas():
    nome_pet = request.form.get('nome_pet')
    idade_pet = request.form.get('idade_pet')
    sexo_pet = request.form.get('sexo_pet')
    cor_pelo_pet = request.form.get('cor_pelo_pet')
    comida_favorito_pet = request.form.get('comida_favorito_pet')
    peso_tamanho_pet = request.form.get('peso_tamanho_pet')
    condicao_especial_pet = request.form.get('condicao_especial_pet')
    telefone_pet = request.form.get('telefone_pet')

    # Crie um dicionário apenas com os valores não nulos e não vazios
    dados = {
        'Nome': nome_pet,
        'Idade': idade_pet,
        'Sexo': sexo_pet,
        'Cor do Pelo': cor_pelo_pet,
        'Comida Favorita': comida_favorito_pet,
        'Peso Tamanho': peso_tamanho_pet,
        'Condição Especial': condicao_especial_pet,
        'Tel para adoção': telefone_pet
    }

    # Remova os pares chave-valor com valores nulos ou vazios
    dados = {chave: valor for chave, valor in dados.items() if valor is not None and valor != ''}

    # Verifique se há pelo menos um campo não nulo
    if dados:
        print(dados)
        req = requests.post(f'{link}/Pets/Chinchilas/.json', data=json.dumps(dados))
        print(req)
    else:
        print("Erro: Todos os campos são nulos ou vazios. Nenhum dado será adicionado ao banco de dados.")
        return "Erro: Todos os campos são nulos ou vazios. Nenhum dado será adicionado ao banco de dados."


@app.route('/deletarPet_Chinchilas', methods=['POST'])
def deletarPet_Chinchilas():
    pet_id = request.form.get('petId')

    req = requests.delete(f'{link}/Pets/Chinchilas/{pet_id}/.json')
    print(req)
    print(req.text)

    return 'Pet deletado com sucesso!'


@app.route('/atualizarPet_Chinchilas', methods=['POST'])
def atualizarPet_Chinchilas():
    pet_id = request.form.get('petId')

    print(pet_id)

    dados = {
        'Nome': request.form.get('nome'),
        'Idade': request.form.get('idade'),
        'Sexo': request.form.get('sexo'),
        'Cor do Pelo': request.form.get('cor_pelo'),
        'Comida Favorito': request.form.get('comida_favorito'),
        'Peso Tamanho': request.form.get('peso_tamanho'),
        'Condição Especial': request.form.get('condicao_especial'),
        'Tel para adoção': request.form.get('telefone')
    }

    # Remova os pares chave-valor com valores nulos ou vazios
    dados = {chave: valor for chave, valor in dados.items() if valor is not None and valor != ''}

    req = requests.patch(f'{link}/Pets/Chinchilas/{pet_id}/.json', data=json.dumps(dados))
    print(req)
    print(req.text)

    return 'Pet atualizado com sucesso!'

# ---------------------------------------------------------------------------------------------------------------------
# ---------------------------------------------CRUD Coelhos------------------------------------------------------------
@app.route('/adicionarTabelas_Coelhos', methods=['POST'])
def adicionarTabelas_Coelhos():
    nome_pet = request.form.get('nome_pet')
    idade_pet = request.form.get('idade_pet')
    sexo_pet = request.form.get('sexo_pet')
    tamanho_orelha_pet = request.form.get('tamanho_orelha_pet')
    brinquedo_favorito_pet = request.form.get('brinquedo_favorito_pet')
    peso_tamanho_pet = request.form.get('peso_tamanho_pet')
    condicao_especial_pet = request.form.get('condicao_especial_pet')
    telefone_pet = request.form.get('telefone_pet')

    # Crie um dicionário apenas com os valores não nulos e não vazios
    dados = {
        'Nome': nome_pet,
        'Idade': idade_pet,
        'Sexo': sexo_pet,
        'Tamanho das Orelhas': tamanho_orelha_pet,
        'Brinquedo Favorito': brinquedo_favorito_pet,
        'Peso Tamanho': peso_tamanho_pet,
        'Condição Especial': condicao_especial_pet,
        'Tel para adoção': telefone_pet
    }

    # Remova os pares chave-valor com valores nulos ou vazios
    dados = {chave: valor for chave, valor in dados.items() if valor is not None and valor != ''}

    # Verifique se há pelo menos um campo não nulo
    if dados:
        print(dados)
        req = requests.post(f'{link}/Pets/Coelhos/.json', data=json.dumps(dados))
        print(req)
    else:
        print("Erro: Todos os campos são nulos ou vazios. Nenhum dado será adicionado ao banco de dados.")
        return "Erro: Todos os campos são nulos ou vazios. Nenhum dado será adicionado ao banco de dados."


@app.route('/deletarPet_Coelhos', methods=['POST'])
def deletarPet_Coelhos():
    pet_id = request.form.get('petId')

    req = requests.delete(f'{link}/Pets/Coelhos/{pet_id}/.json')
    print(req)
    print(req.text)

    return 'Pet deletado com sucesso!'


@app.route('/atualizarPet_Coelhos', methods=['POST'])
def atualizarPet_Coelhos():
    pet_id = request.form.get('petId')

    print(pet_id)

    dados = {
        'Nome': request.form.get('nome'),
        'Idade': request.form.get('idade'),
        'Sexo': request.form.get('sexo'),
        'Tamanho das Orelhas': request.form.get('tamanho_orelha'),
        'Brinquedo Favorito': request.form.get('brinquedo_favorito'),
        'Peso Tamanho': request.form.get('peso_tamanho'),
        'Condição Especial': request.form.get('condicao_especial'),
        'Tel para adoção': request.form.get('telefone')
    }

    # Remova os pares chave-valor com valores nulos ou vazios
    dados = {chave: valor for chave, valor in dados.items() if valor is not None and valor != ''}

    req = requests.patch(f'{link}/Pets/Coelhos/{pet_id}/.json', data=json.dumps(dados))
    print(req)
    print(req.text)

    return 'Pet atualizado com sucesso!'

# ---------------------------------------------------------------------------------------------------------------------
# ---------------------------------------------CRUD Furões-------------------------------------------------------------
@app.route('/adicionarTabelas_Furoes', methods=['POST'])
def adicionarTabelas_Furoes():
    nome_pet = request.form.get('nome_pet')
    idade_pet = request.form.get('idade_pet')
    sexo_pet = request.form.get('sexo_pet')
    cor_pelo_pet = request.form.get('cor_pelo_pet')
    comida_favorito_pet = request.form.get('comida_favorito_pet')
    peso_tamanho_pet = request.form.get('peso_tamanho_pet')
    condicao_especial_pet = request.form.get('condicao_especial_pet')
    telefone_pet = request.form.get('telefone_pet')

    # Crie um dicionário apenas com os valores não nulos e não vazios
    dados = {
        'Nome': nome_pet,
        'Idade': idade_pet,
        'Sexo': sexo_pet,
        'Cor do Pelo': cor_pelo_pet,
        'Comida Favorita': comida_favorito_pet,
        'Peso Tamanho': peso_tamanho_pet,
        'Condição Especial': condicao_especial_pet,
        'Tel para adoção': telefone_pet
    }

    # Remova os pares chave-valor com valores nulos ou vazios
    dados = {chave: valor for chave, valor in dados.items() if valor is not None and valor != ''}

    # Verifique se há pelo menos um campo não nulo
    if dados:
        print(dados)
        req = requests.post(f'{link}/Pets/Furões/.json', data=json.dumps(dados))
        print(req)
    else:
        print("Erro: Todos os campos são nulos ou vazios. Nenhum dado será adicionado ao banco de dados.")
        return "Erro: Todos os campos são nulos ou vazios. Nenhum dado será adicionado ao banco de dados."


@app.route('/deletarPet_Furoes', methods=['POST'])
def deletarPet_Furoes():
    pet_id = request.form.get('petId')

    req = requests.delete(f'{link}/Pets/Furões/{pet_id}/.json')
    print(req)
    print(req.text)

    return 'Pet deletado com sucesso!'


@app.route('/atualizarPet_Furoes', methods=['POST'])
def atualizarPet_Furoes():
    pet_id = request.form.get('petId')

    print(pet_id)

    dados = {
        'Nome': request.form.get('nome'),
        'Idade': request.form.get('idade'),
        'Sexo': request.form.get('sexo'),
        'Cor do Pelo': request.form.get('cor_pelo'),
        'Comida Favorito': request.form.get('comida_favorito'),
        'Peso Tamanho': request.form.get('peso_tamanho'),
        'Condição Especial': request.form.get('condicao_especial'),
        'Tel para adoção': request.form.get('telefone')
    }

    # Remova os pares chave-valor com valores nulos ou vazios
    dados = {chave: valor for chave, valor in dados.items() if valor is not None and valor != ''}

    req = requests.patch(f'{link}/Pets/Furões/{pet_id}/.json', data=json.dumps(dados))
    print(req)
    print(req.text)

    return 'Pet atualizado com sucesso!'

# ---------------------------------------------------------------------------------------------------------------------
# ---------------------------------------------CRUD Gatos--------------------------------------------------------------
@app.route('/adicionarTabelas_Gatos', methods=['POST'])
def adicionarTabelas_Gatos():
    nome_pet = request.form.get('nome_pet')
    idade_pet = request.form.get('idade_pet')
    sexo_pet = request.form.get('sexo_pet')
    personalidade_pet = request.form.get('personalidade_pet')
    brinquedo_favorito_pet = request.form.get('brinquedo_favorito_pet')
    vacinas_ausentes_pet = request.form.get('vacinas_ausentes_pet')
    condicao_especial_pet = request.form.get('condicao_especial_pet')
    telefone_pet = request.form.get('telefone_pet')

    # Crie um dicionário apenas com os valores não nulos e não vazios
    dados = {
        'Nome': nome_pet,
        'Idade': idade_pet,
        'Sexo': sexo_pet,
        'Personalidade': personalidade_pet,
        'Brinquedo Favorito': brinquedo_favorito_pet,
        'Vacinas Ausentes': vacinas_ausentes_pet,
        'Condição Especial': condicao_especial_pet,
        'Tel para adoção': telefone_pet
    }

    # Remova os pares chave-valor com valores nulos ou vazios
    dados = {chave: valor for chave, valor in dados.items() if valor is not None and valor != ''}

    # Verifique se há pelo menos um campo não nulo
    if dados:
        print(dados)
        req = requests.post(f'{link}/Pets/Gatos/.json', data=json.dumps(dados))
        print(req)
    else:
        print("Erro: Todos os campos são nulos ou vazios. Nenhum dado será adicionado ao banco de dados.")
        return "Erro: Todos os campos são nulos ou vazios. Nenhum dado será adicionado ao banco de dados."


@app.route('/deletarPet_Gatos', methods=['POST'])
def deletarPet_Gatos():
    pet_id = request.form.get('petId')

    req = requests.delete(f'{link}/Pets/Gatos/{pet_id}/.json')
    print(req)
    print(req.text)

    return 'Pet deletado com sucesso!'


@app.route('/atualizarPet_Gatos', methods=['POST'])
def atualizarPet_Gatos():
    pet_id = request.form.get('petId')

    print(pet_id)

    dados = {
        'Nome': request.form.get('nome'),
        'Idade': request.form.get('idade'),
        'Sexo': request.form.get('sexo'),
        'Personalidade': request.form.get('personalidade'),
        'Brinquedo Favorito': request.form.get('brinquedo_favorito'),
        'Vacinas Ausentes': request.form.get('vacinas_ausentes'),
        'Condição Especial': request.form.get('condicao_especial'),
        'Tel para adoção': request.form.get('telefone')
    }

    # Remova os pares chave-valor com valores nulos ou vazios
    dados = {chave: valor for chave, valor in dados.items() if valor is not None and valor != ''}

    req = requests.patch(f'{link}/Pets/Gatos/{pet_id}/.json', data=json.dumps(dados))
    print(req)
    print(req.text)

    return 'Pet atualizado com sucesso!'

# ---------------------------------------------------------------------------------------------------------------------
# ---------------------------------------------CRUD Hamsters-----------------------------------------------------------
@app.route('/adicionarTabelas_Hamsters', methods=['POST'])
def adicionarTabelas_Hamsters():
    nome_pet = request.form.get('nome_pet')
    idade_pet = request.form.get('idade_pet')
    sexo_pet = request.form.get('sexo_pet')
    cor_pelo_pet = request.form.get('cor_pelo_pet')
    comida_favorito_pet = request.form.get('comida_favorito_pet')
    peso_tamanho_pet = request.form.get('peso_tamanho_pet')
    condicao_especial_pet = request.form.get('condicao_especial_pet')
    telefone_pet = request.form.get('telefone_pet')

    # Crie um dicionário apenas com os valores não nulos e não vazios
    dados = {
        'Nome': nome_pet,
        'Idade': idade_pet,
        'Sexo': sexo_pet,
        'Cor do Pelo': cor_pelo_pet,
        'Comida Favorita': comida_favorito_pet,
        'Peso Tamanho': peso_tamanho_pet,
        'Condição Especial': condicao_especial_pet,
        'Tel para adoção': telefone_pet
    }

    # Remova os pares chave-valor com valores nulos ou vazios
    dados = {chave: valor for chave, valor in dados.items() if valor is not None and valor != ''}

    # Verifique se há pelo menos um campo não nulo
    if dados:
        print(dados)
        req = requests.post(f'{link}/Pets/Hamsters/.json', data=json.dumps(dados))
        print(req)
    else:
        print("Erro: Todos os campos são nulos ou vazios. Nenhum dado será adicionado ao banco de dados.")
        return "Erro: Todos os campos são nulos ou vazios. Nenhum dado será adicionado ao banco de dados."


@app.route('/deletarPet_Hamsters', methods=['POST'])
def deletarPet_Hamsters():
    pet_id = request.form.get('petId')

    req = requests.delete(f'{link}/Pets/Hamsters/{pet_id}/.json')
    print(req)
    print(req.text)

    return 'Pet deletado com sucesso!'


@app.route('/atualizarPet_Hamsters', methods=['POST'])
def atualizarPet_Hamsters():
    pet_id = request.form.get('petId')

    print(pet_id)

    dados = {
        'Nome': request.form.get('nome'),
        'Idade': request.form.get('idade'),
        'Sexo': request.form.get('sexo'),
        'Cor do Pelo': request.form.get('cor_pelo'),
        'Comida Favorito': request.form.get('comida_favorito'),
        'Peso Tamanho': request.form.get('peso_tamanho'),
        'Condição Especial': request.form.get('condicao_especial'),
        'Tel para adoção': request.form.get('telefone')
    }

    # Remova os pares chave-valor com valores nulos ou vazios
    dados = {chave: valor for chave, valor in dados.items() if valor is not None and valor != ''}

    req = requests.patch(f'{link}/Pets/Hamsters/{pet_id}/.json', data=json.dumps(dados))
    print(req)
    print(req.text)

    return 'Pet atualizado com sucesso!'


# Deixar o site no ar
if __name__ == "__main__":
    app.run(debug=True) #Estamos criando o site e ativando o debugar, ou seja, vai rodar o site com modificações