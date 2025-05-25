
# Postman Tests para a API da Loja de Jogos

## Configuração Inicial
1. Importe o arquivo `setup.sql` no MySQL Workbench para criar o banco e as tabelas
2. Configure o arquivo `.env` com suas credenciais de banco de dados
3. Inicie o servidor: `node src/server.js`

## Testes para API

### 1. GET - Listar todos os jogos
- **Método**: GET
- **URL**: `http://localhost:8080/api/games`
- **Resultado esperado**: Lista de todos os jogos cadastrados

### 2. GET - Buscar jogo por ID
- **Método**: GET
- **URL**: `http://localhost:8080/api/games/1`
- **Resultado esperado**: Detalhes do jogo com código 1

### 3. POST - Adicionar novo jogo
- **Método**: POST
- **URL**: `http://localhost:8080/api/games`
- **Headers**: Content-Type: application/json
- **Body**:
```json
{
  "nome": "Novo Jogo Teste",
  "genero": "Aventura",
  "classificacao": 14,
  "preco": 149.90,
  "quantidade": 10,
  "descricao": "Um jogo para teste da API"
}
```
- **Resultado esperado**: Objeto do jogo criado com ID

### 4. PUT - Atualizar jogo existente
- **Método**: PUT
- **URL**: `http://localhost:8080/api/games/1`
- **Headers**: Content-Type: application/json
- **Body**:
```json
{
  "nome": "Jogo Atualizado",
  "genero": "Aventura",
  "classificacao": 14,
  "preco": 179.90,
  "quantidade": 8,
  "descricao": "Descrição atualizada do jogo"
}
```
- **Resultado esperado**: Objeto do jogo atualizado

### 5. DELETE - Excluir jogo
- **Método**: DELETE
- **URL**: `http://localhost:8080/api/games/2`
- **Resultado esperado**: Mensagem confirmando a exclusão

## Observações importantes
- Verifique se o servidor está rodando na porta correta (8080)
- Certifique-se que o ID do jogo existe no banco antes de tentar atualizar ou excluir
- Para o PUT e DELETE, confira se está incluindo o ID do jogo na URL
