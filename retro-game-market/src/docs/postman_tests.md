
# Postman Tests para a API da Loja de Jogos

## Configuração Inicial
1. Importe o arquivo `src/database/setup.sql` no MySQL Workbench para criar o banco `loja_games` e suas tabelas
2. Configure o arquivo `.env` com suas credenciais de banco de dados
3. Inicie o servidor: `node src/server.js`

## Estrutura do Banco de Dados
- **Banco**: `loja_games`
- **Tabela principal**: `jogos` (com campos: id, nome, genero, classificacao, disponibilidade, preco, quantidade)


## Testes para API

### 1. GET - Listar todos os jogos
- **Método**: GET
- **URL**: `http://localhost:8080/api/games`
- **Resultado esperado**: Lista de todos os jogos da tabela `jogos`

### 2. GET - Buscar jogo por ID
- **Método**: GET
- **URL**: `http://localhost:8080/api/games/1`
- **Resultado esperado**: Detalhes do jogo com ID 1

### 3. POST - Adicionar novo jogo
- **Método**: POST
- **URL**: `http://localhost:8080/api/games`
- **Headers**: Content-Type: application/json
- **Body**:
```json
{
  "nome": "Novo Jogo Teste",
  "genero": "Aventura",
  "classificacao": "14",
  "preco": 149.90,
  "quantidade": 10,
  "disponibilidade": "Disponível"
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

## Dados de Exemplo
O script `setup.sql` já inclui alguns jogos de exemplo na tabela `jogos`:
- The Legend of Adventure (ID: 1)
- Space Warriors (ID: 2)
- Racing Champions (ID: 3)
- Strategy Masters (ID: 4)

## Observações importantes
- Verifique se o servidor está rodando na porta 8080
- O banco `loja_games` deve estar criado e configurado
- Certifique-se que o ID do jogo existe no banco antes de tentar atualizar ou excluir
- Use os IDs dos jogos de exemplo para testar as operações PUT e DELETE
