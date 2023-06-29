# iCarSell

O iCarSell é uma aplicação de concessionária de carros que oferece uma ampla gama de recursos para proporcionar aos usuários uma experiência completa na compra e venda de veículos. Com funcionalidades abrangentes, o iCarSell torna o processo de negociação de carros fácil e conveniente.

---

$~$

## Principais recursos

- **Autenticação e Gerenciamento de Perfil:** Os usuários podem criar uma conta no iCarSell com facilidade, fazer login, redefinir suas senhas e gerenciar suas informações de perfil. Além disso, eles têm a liberdade de editar ou excluir seus perfis a qualquer momento.

- **Compra de Carros:** O iCarSell oferece uma ampla seleção de carros disponíveis para compra. Os usuários podem explorar veículos de diferentes marcas, modelos, anos, quilometragens e muito mais. Cada carro possui uma página detalhada com fotos, descrição completa, preço e informações de contato do vendedor.

- **Anúncio de Carros:** Para aqueles que desejam vender seu próprio veículo, o iCarSell permite criar anúncios personalizados. Os usuários podem cadastrar carros para venda, fornecendo detalhes completos, incluindo fotos, descrição, preço e informações de contato. Eles também têm a flexibilidade de editar ou excluir seus anúncios conforme necessário.

- **Gerenciamento de Anúncios:** O iCarSell oferece uma área dedicada para o gerenciamento dos anúncios. Os usuários podem visualizar todos os anúncios que cadastraram, realizar edições quando necessário ou removê-los quando o veículo for vendido.

- **Comentários:** Os usuários têm a capacidade de interagir uns com os outros por meio de comentários. Eles podem deixar feedback, fazer perguntas ou fornecer informações adicionais em relação aos carros anunciados. Além disso, é possível editar ou excluir seus próprios comentários.

---

$~$

## Tecnologias utilizadas

O iCarSell é desenvolvido utilizando as seguintes tecnologias:

- bcryptjs
- cors
- dotenv
- express
- express-async-errors
- jsonwebtoken
- multer
- nodemailer
- pg
- pg-format
- pg-hstore
- reflect-metadata
- typeorm
- uuid
- zod

---

## Iniciando a api

- Depois de fazer o clone api, abra ela no editor de código da sua escolha, abra o terminal e rode o comando `yarn` para baixar as dependências da api.

- Para rodar a api, insera o comando `yarn start` no terminal.

- Pronto, a api já esta rodando e pronta para fazer as suas requisição.

---

$~$

## EndPoints

- A API tem um total de 5 rotas que são divididas em 14 endPoints - podendo fazer login, resetar senha, cadastrar, editar e excluir perfil, cadastrar, editar e excluir anúncios, cadastrar, editar e excluir comentários.

- O url base da API é "https://i-car-sell-web.onrender.com"

$~$

[![Run in Insomnia](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=iCarSell&uri=https%3A%2F%2Fraw.githubusercontent.com%2FICarSell%2FDocInsomniabutton%2Fmain%2Fdoc%2520insomnia%2520button)

---

$~$

## Lista de Anúncios (Rota que não precisa de autenticação)

- Nessa aplicação o usuário sem fazer login ou se cadastrar pode ver os anúncios já cadastrados na plataforma, na API podemos acessar a lista dessa forma:

`GET /announcements - FORMATO DA RESPOSTA`

$~$

- O retorno desta rota será uma lista com todos os anúncios com o seu respectivo usuário

`CASO DÊ TUDO CERTO, A RESPOSTA SERÁ ASSIM - STATUS 200:`

$~$

```javascript
[
{
	"mark": "ford",
	"model": "ecosport freestyle plus 1.5 flex 5p aut.",
	"year": "2019",
	"mileage": "626262",
	"color": "Preto",
	"fuel": "Gasolina / Etanol",
	"priceFipe": "84580",
	"price": "45.000",
	"description": "Carro 10",
	"imgCover": {
		    "id": "36c4ff6e-278a-4ec3-a8be-ce8e4c3fbddb",
		    "fileName": "1687789259462-907667310.jpg",
		    "path": "public\\uploads\\1687789259462-907667310.jpg"
	},
	"isActive": true,
	"user": {
		    "name": "example",
		    "email": "example@example.com",
		    "cpf": "12345678910",
		    "phone": "123456789",
		    "dateOfBirth": 11/11/11,
		    "description": "Uma descrição do usuário",
		    "isSeller": true,
		    "id": "3ad667c0-a4ce-4cff-a1fe-28fdb62f876d"
	},
	"id": "191c00bd-3eb0-409b-9811-5f172a41b033"
	},
	{
	"mark": "hyundai",
	"model": "creta attitude 1.6 16v flex mec.",
	"year": "2021",
	"mileage": "5.000",
	"color": "Vermelho",
	"fuel": "Gasolina / Etanol",
	"priceFipe": "97207",
	"price": "50.000",
	"description": "Vermelha",
	"imgCover": { // Imagem de capa do anúncio
		    "id": "54586e1d-accf-4c76-8448-a7886b6f8b64",
		    "fileName": "1687799365678-685778512.png",
		    "path": "public\\uploads\\1687799365678-685778512.png"
	},
	"isActive": true,
	"user": {
		    "name": "example",
		    "email": "example@example.com",
		    "cpf": "12345678910",
		    "phone": "123456789",
		    "dateOfBirth": 11/11/11,
		    "description": "Uma descrição do usuário",
		    "isSeller": true, //se o usuário é vendedor
		    "id": "3ad667c0-a4ce-4cff-a1fe-28fdb62f876d"
	},
	"id": "450d25d0-421e-426d-9ce6-dde076905bb2"
},
...
]
```

$~$

`CASO DÊ ERRO, FORMATO DA RESPOSTA - 400:`

```json
{
  "message": "Nenhum anúncio foi encontrado"
}
```

$~$

## Busca de um anúncio por id (Rota que não precisa de autenticação)

`GET /announcement/id - FORMATO DA RESPOSTA`

$~$

- O retorno desta rota será um objeto com o anúncio e seu respectivo usuário, assim como todos os comentários que foram feitos para este anúncio.

`CASO DÊ TUDO CERTO, A RESPOSTA SERÁ ASSIM - STATUS 200:`

$~$

```javascript
{
"mark": "ford",
"model": "ecosport freestyle plus 1.5 flex 5p aut.",
"year": "2019",
"mileage": "626.262",
"color": "Preto",
"priceFipe": "84580",
"fuel": "Gasolina / Etanol",
"price": "45.000",
"description": "Carro 10",
"imgCover": { // Imagem  de capa do anúncio
	"fileName": "1687789259462-907667310.jpg",
	"path": "public\\uploads\\1687789259462-907667310.jpg"
},
"gallery": [ // Lista com todas as imagens de galeria
	{
	"fileName": "1687789259462-443189491.png",
	"path": "public\\uploads\\1687789259462-443189491.png"
	},
	{
	"fileName": "1687789259489-790365258.png",
	"path": "public\\uploads\\1687789259489-790365258.png"
	},
	{
	"fileName": "1687789259498-111753184.png",
	"path": "public\\uploads\\1687789259498-111753184.png"
	},
	{
	"fileName": "1687789259510-92505429.jpg",
	"path": "public\\uploads\\1687789259510-92505429.jpg"
	},
	{
	"fileName": "1687789259509-695840688.jpg",
	"path": "public\\uploads\\1687789259509-695840688.jpg"
	},
	{
	"fileName": "1687789259509-428068248.jpg",
	"path": "public\\uploads\\1687789259509-428068248.jpg"
	}
],
"isActive": true,
"id": "191c00bd-3eb0-409b-9811-5f172a41b033",
"user": {
	"name": "example",
	"email": "example@example.com",
	"cpf": "12345678910",
	"phone": "123456789",
	"dateOfBirth": 11/11/11,
	"description": "Uma descrição do usuário",
	"isSeller": true, //se o usuário é vendedor
	"id": "3ad667c0-a4ce-4cff-a1fe-28fdb62f876d"
},
"comments": [] // lista com todos os comentários sobre o anúncio
}
```

$~$

`CASO DÊ ERRO, FORMATO DA RESPOSTA - 404:`

```javascript
{
"message": "Announcement not found"
}
```

---

## Rotas de usuário (Rota que não precisa de autenticação)

$~$

- Para a criação de um usuário:

`POST /user - FORMATO DA REQUISIÇÃO`

```javascript
{
"name": "example",
"email": "example@gmail.com",
"password": "*******",
"cpf": "12312312312",
"phone": "123456789",
"dateOfBirth": 12 // dateOfBirth é apenas o dia do aniversario
"description":"Eu gosto de carros",
"isSeller": true //isSeller é para definir se ele é venderdor ou não
"address": {
	"zipCode": "123456789",
	"city": "SP",
	"state": "estado tal",
	"street": "rua tal",
	"number": "123",
	"complement": "casa"
	}
}
```

$~$

`CASO DÊ TUDO CERTO, A RESPOSTA SERÁ ASSIM - STATUS 201`

```javascript
{
"name": "example",
"email": "example@gmail.com",
"cpf": "12312312312",
"phone": "123456789",
"dateOfBirth": 12,
"description": "Eu gosto de carros",
"isSeller": true,
"address": {
	"zipCode": "123456789",
	"state": "estado tal",
	"city": "SP",
	"street": "rua tal",
	"number": "123",
	"complement": "casa",
	"id": "2465b6aa-6beb-4ba5-825a-fb96eefebef1"
},
"id": "cc3480b6-8e0b-45cc-877a-4ac2bd8d54bb"
}
```

$~$

`CASO ALGO DE ERRADO - STATUS 409`

- Esse erro ocorre quando já existe um email que já está cadastrado no banco de dados

```javascript
{
"message": "Email already exists"
}
```

$~$

`CASO ALGO DE ERRADO - STATUS 409`

- Esse erro ocorre quando já existe um cpf que já está cadastrado no banco de dados

```javascript
{
"message": "CPF already exists"
}
```

---

$~$

- Para pegar as informações de um usuário:

`GET /user/:id - FORMATO DA REQUISIÇÃO`

$~$

`CASO DÊ TUDO CERTO, A RESPOSTA SERÁ ASSIM - STATUS 200`

```javascript
{
"id": "cc3480b6-8e0b-45cc-877a-4ac2bd8d54bb",
"name": "example",
"email": "example@gmail.com",
"cpf": "12312312312",
"phone": "123456789",
"dateOfBirth": 12,
"description": "Eu gosto de carros",
"isSeller": true,
"resetToken": null,
"resetTokenExpiration": null,
"address": {
	"id": "2465b6aa-6beb-4ba5-825a-fb96eefebef1",
	"zipCode": "123456789",
	"state": "estado tal",
	"city": "SP",
	"street": "rua tal",
	"number": "123",
	"complement": "casa"
},
"announcement": []
}
```

$~$

`CASO ALGO DE ERRADO - STATUS 404`

```javascript
{
"message": "invalid UUID"
}
```

$~$

---

## Login

`POST /login - FORMATO DA REQUISIÇÃO`

```javascript
{
"email": "example@gmail.com",
"password": "*******"
}
```

`CASO DÊ TUDO CERTO, A RESPOSTA SERÁ ASSIM - STATUS 200`

```javascript
{
"userId": "2465b6aa-6beb-4ba5-825a-fb96eefebef1",
"token": "<TOKEN_DE_AUTENTICAÇÃO>"
}
```

`CASO ALGO DE ERRADO - STATUS 400`

```javascript
{
"message": "Invalid email"
}
```

`CASO ALGO DE ERRADO - STATUS 401`

```javascript
{
"message": "Invalid credentials"
}
```

---

$~$

## Rotas de recuperação de senha (Rota que não precisa de autenticação)

$~$

`PATCH /forgot-password - FORMATO DA REQUISIÇÃO`

- Será enviado um email de solicitação para atualizar senha

```javascript
{
"email": "exemplo@gmail.com"
}
```

$~$

`CASO DÊ TUDO CERTO, A RESPOSTA SERÁ ASSIM - STATUS 200`

```javascript
{
"message": "E-mail de recuperação de senha enviado."
}
```

$~$

`CASO DÊ ERRADO, A RESPOSTA SERÁ ASSIM - STATUS 400`

```javascript
{
"message": "Erro ao processar a solicitação."
}
```

$~$

`PATCH /reset-password/:id - FORMATO DA REQUISIÇÃO`

- Atualização de senha

```javascript
{
"password": "senhaAtualizada"
}
```

$~$

`CASO DÊ TUDO CERTO, A RESPOSTA SERÁ ASSIM - STATUS 200`

```javascript
{
"message": "Senha redefinida com sucesso."
}
```

$~$

`CASO DÊ ERRADO, A RESPOSTA SERÁ ASSIM - STATUS 400`

```javascript
{
"message": "Erro ao processar a solicitação."
}
```

---

## Rotas que necessitam de autorização

- Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

      `Authorization: Bearer {token}`

- Após o usuário estar logado, ele deve conseguir cadastrar os seus anúncios e comentários.

---

## Rotas de user (Rota que precisa de autenticação)

$~$

`PATCH /user - FORMATO DA REQUISIÇÃO`

- Pata atualiza o usuário é necessário apenas do token, o id do usuário se encontra lá, e apenas essas chaves podem ser alteradas:

```javascript
{
"name": "new example",
"email": "example2@gmail.com",
"cpf": "12312312317",
"phone": "123456789",
"dateOfBirth": 12,
"description":"Eu gosto de carros"
}
```

$~$

`CASO DÊ TUDO CERTO, A RESPOSTA SERÁ ASSIM - STATUS 200:`

```javascript
{
"name": "new example",
"email": "example2@gmail.com",
"cpf": "12312312317",
"phone": "123456789",
"dateOfBirth": 12,
"description": "Eu gosto de carros",
"isSeller": true,
"id": "cc3480b6-8e0b-45cc-877a-4ac2bd8d54bb"
}
```

$~$

`CASO ALGO DE ERRADO - STATUS 409`

- Esse erro ocorre quando já existe um email que já está cadastrado no banco de dados

```javascript
{
"message": "Email already exists"
}
```

$~$

`CASO ALGO DE ERRADO - STATUS 409`

- Esse erro ocorre quando já existe um cpf que já está cadastrado no banco de dados

```javascript
{
"message": "CPF already exists"
}
```

## Rota de atualização de endereço (Rota que precisa de autenticação)

$~$

`PATCH /address/:id - FORMATO DA REQUISIÇÃO`

- Atualiza o endereço

```javascript

{
"zipCode": "12345678",
"state": "MG",
"city": "cidade atualizada",
"street": "rua atualizada",
"number": "10",
"complement": "Apt 5B"
}

```

$~$

`CASO DÊ TUDO CERTO, A RESPOSTA SERÁ ASSIM - STATUS 200:`

```javascript

{
"zipCode": "12345678",
"state": "MG",
"city": "cidade atualizada",
"street": "rua atualizada",
"number": "10",
"complement": "Apt 5B"
}

```

$~$

`CASO DÊ ERRADO, A RESPOSTA SERÁ ASSIM - STATUS 404:`

```javascript
{
"message": "address not found"
}
```

---

$~$

---

`DELETE /user/:id - FORMATO DA REQUISIÇÃO`

- Para Deletar um usuário é necessário passar o id pela URL

`CASO DÊ TUDO CERTO, A RESPOSTA SERÁ ASSIM - STATUS 204:`

```javascript
NO CONTENT
```

$~$

`CASO ALGO DE ERRADO - STATUS 404`

```javascript
{
"message": "User not exist!"
}
```

$~$

---

## Rotas de anúncio (Rota que precisa de autenticação)

$~$

`POST /announcement - FORMATO DA REQUISIÇÃO`

- Nesta rota é necessario o uso deste `"Content-Type": "multipart/form-data"` junto do `Authorization: Bearer {token}` no headers da requisição, pois sera enviado imagens junto ao body.

- Body da requisição:

$~$

```javascript
{
"mark": "chevrolet",
"model": "prisma",
"year": "2021",
"mileage": "55.555",
"color": "azul",
"priceFipe": "85.100",
"fuel": "gasolina",
"price": "50.000",
"description": "kafnkjlnavjbevljçnvjhnvd",
"imgCover": {`Arquivo de imagem`},
"gallery": [`Arquivos de imagens`],
"isActive": true,
}
```

$~$

`CASO DÊ TUDO CERTO, A RESPOSTA SERÁ ASSIM - STATUS 201:`

```javascript
{
"mark": "chevrolet",
"model": "prisma",
"year": "2021",
"mileage": "55.555",
"color": "azul",
"priceFipe": "85.100",
"fuel": "gasolina",
"price": "50.000",
"description": "descrição",
"imgCover": {
	"fileName": "1687354251850-390140664.jpg",
	"path": "public\\uploads\\1687354251850-390140664.jpg"
},
"gallery": [
	{
	"fileName": "1687354251903-462250218.jpg",
	"path": "public\\uploads\\1687354251903-462250218.jpg"
	}
],
"isActive": true,
"id": "0f695153-c914-4f37-9e64-e50ca9385087"
}
```

`PATCH /announcement/:id - FORMATO DA REQUISIÇÃO`

- Nesta rota é necessario o uso deste `"Content-Type": "multipart/form-data"` junto do `Authorization: Bearer {token}` no headers da requisição caso seja enviado imagens no form, senão so passar o `Authorization: Bearer {token}` no headers.

$~$

- Body da requisição caso seja aditado com alguma imagem:

```javascript
{
"mark": "chevrolet",
"model": "prisma",
"year": "2021",
"mileage": "55.555",
"color": "azul",
"priceFipe": "85.100",
"fuel": "gasolina",
"price": "50.000",
"description": "descrição",
"imgCover": {`Arquivo de imagem`},
"gallery": [`Arquivos de imagens`],
"isActive": true,
}
```

$~$

- Body da requisição sem imagens:

```javascript
{
"mark": "chevrolet",
"model": "prisma",
"year": "2021",
"mileage": "55.555",
"color": "azul",
"priceFipe": "85.100",
"fuel": "gasolina",
"price": "50.000",
"description": "descrição",
"isActive": true,
}
```

$~$

`CASO DÊ TUDO CERTO, A RESPOSTA SERÁ ASSIM - STATUS 200:`

```javascript
{
"mark": "chevrolet",
"model": "prisma",
"year": "2021",
"mileage": "55.555",
"color": "azul",
"priceFipe": "85.100",
"fuel": "gasolina",
"price": "50.000",
"description": "descrição",
"imgCover": {
	"fileName": "1687354251850-390140664.jpg",
	"path": "public\\uploads\\1687354251850-390140664.jpg"
	},
"gallery": [
	{
	"fileName": "1687354251903-462250218.jpg",
	"path": "public\\uploads\\1687354251903-462250218.jpg"
	}
],
"isActive": true,
"id": "0f695153-c914-4f37-9e64-e50ca9385087"
}
```

`DELETE /announcement/:id - FORMATO DA REQUISIÇÃO`

- Nesta rota não é necessário passar body na requisição.

$~$

`CASO DÊ TUDO CERTO, A RESPOSTA SERÁ ASSIM - STATUS 204`

```javascript
NO CONTENT
```

---

$~$

## Rotas de comentários (Rota que precisa de autenticação)

`POST /comments/:AnnouncementId - FORMATO DA REQUISIÇÃO`

- Nesta rota é necessário o uso do queryParams `"Announcement ID"` junto do `Authorization: Bearer {token}` no headers da requisição, pois é necessário informar o ID do announcement que deseja realizar um comentário

- Body da requisição:

```javascript
"comments": "ola"
```

`CASO DÊ TUDO CERTO, A RESPOSTA SERÁ ASSIM - STATUS 201`

```javascript
{
"comments": "ola",
"id": 4,
"createdAt": "2023-06-27T03:00:00.000Z",
"user": {
	"name": "diego andre",
	"email": "diegodocanto@gmail.com",
	"cpf": "123123133",
	"phone": "123456789",
	"dateOfBirth": 13,
	"description": "avjdlanvkjlanvanvdabvjdabvcjxbcjxgcejavgduvbadjlvbd",
	"isSeller": true,
	"id": "c695fa1a-99f7-443a-8e53-4ce5fba0b017"
}
}

```

### Possíveis erros:

`UUID Invalido - 404`:

```javascript
{
"message": "invalid UUID"
}
```

`Announcement não encontrado - 404`:

```javascript
{
"message": "Anúncio não encontrado!"
}
```

`Falta de token - 401`:

```javascript
{
"message": "Missing bearer token"
}
```

`DELETE /comments/:commentId - FORMATO DA REQUISIÇÃO`

- Nesta rota é necessário o uso do queryParams `"Comment ID"` junto do `Authorization: Bearer {token}` no headers da requisição, pois é necessário informar o ID do announcement que deseja deletar um comentário

- Não é necessário um BODY na requisição!

`CASO DÊ TUDO CERTO, A RESPOSTA SERÁ ASSIM - STATUS 204:`

```javascript
204 - No Content
```

### Possíveis erros:

`Comment não existe - 404`:

```javascript
{
"message": "Comment not exist!"
}
```

`Falta de token - 401`:

```javascript
{
"message": "Missing bearer token"
}
```

`PATCH /comments/:commentId - FORMATO DA REQUISIÇÃO`

- Nesta rota é necessário o uso do queryParams `"Comment ID"` junto do `Authorization: Bearer {token}` no headers da requisição, pois é necessário informar o ID do announcement que deseja alterar um comentário

- Body da requisição:

```javascript
{
"comments": "gostaria de saber mais"
}
```

`CASO DÊ TUDO CERTO, A RESPOSTA SERÁ ASSIM - STATUS 200:`

```javascript
{
"comments": "gostaria de saber mais",
"id": 2,
"createdAt": "2023-06-28T00:03:49.666Z"
}
```

### Possíveis erros:

`Comment não existe - 404:`

```javascript
{
"message": "Comment not exist!"
}
```

`Falta de token - 401:`

```javascript
{
"message": "Missing bearer token"
}
```
