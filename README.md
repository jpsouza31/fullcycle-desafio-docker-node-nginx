Segundo desafio do modulo Docker do curso full cycle 3.0

Para o desafio é necessário fazer o seguinte:
Nesse desafio você colocará em prática o que aprendemos em relação a utilização do nginx como proxy reverso. A idéia principal é que quando um usuário acesse o nginx, o mesmo fará uma chamada em nossa aplicação node.js. Essa aplicação por sua vez adicionará um registro em nosso banco de dados mysql, cadastrando um nome na tabela people.
O retorno da aplicação node.js para o nginx deverá ser:
<h1>Full Cycle Rocks!</h1>
- Lista de nomes cadastrada no banco de dados.
Gere o docker-compose de uma forma que basta apenas rodarmos: docker-compose up -d que tudo deverá estar funcionando e disponível na porta: 8080.
Suba tudo em um repositório e faça a entrega.

Para subir os containers, basta entrar no diretório e executar "docker-compose up --build"

Para inserir nos nomes na tabela people do banco MySQL, é só colocar como paremetro na URL da requisição, exemplo:
Para inserir o nome 'pedro' na tabela.
http://localhost:8080/pedro