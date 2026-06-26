// 1. Importamos o Express que acabamos de instalar
const express = require('express');

// 2. Inicializamos o servidor Express dentro da constante 'app'
const app = express();

// 3. Dizemos ao servidor para aceitar dados no formato JSON (padrão de mercado)
app.use(express.json());

// 4. Simulando um Banco de Dados na memória do computador (para começarmos simples!)
// Aqui vamos guardar os dados das lojas que os usuários criarem
let bancoDeDadosSimulado = {
    usuarios: [
        { id: 1, nome: "Claudio", plano: "gratuito" },
        { id: 2, nome: "Edu", plano: "pro" }
    ],
    sites: [
        { 
            subdominio: "lojadoclaudio", 
            donoId: 1, 
            titulo: "Minha Loja de Roupas", 
            corFundo: "#ff0000" 
        }
    ]
};

// 5. Rota Principal: O que acontece se alguém acessar o endereço do seu servidor?
app.get('/', (req, res) => {
    res.send('O cérebro do Criador de Sites está online e funcionando! 🚀');
});

// 6. Rota do Motor: Essa rota vai simular o site do cliente final sendo exibido!
// Se você acessar /site/lojadoclaudio, o sistema vai procurar os dados dela
app.get('/site/:subdominio', (req, res) => {
    const nomeDoSiteSolicitado = req.params.subdominio;
    
    // Procura no nosso "banco" se esse site existe
    const siteEncontrado = bancoDeDadosSimulado.sites.find(site => site.subdominio === nomeDoSiteSolicitado);

    if (!siteEncontrado) {
        return res.status(404).send('<h1>Erro 404: Esse site não existe na nossa plataforma!</h1>');
    }

    // Se achou, monta e devolve a página customizada com a cor de fundo que está salva!
    res.send(`
        <html>
            <head>
                <title>${siteEncontrado.titulo}</title>
            </head>
            <body style="background-color: ${siteEncontrado.corFundo}; color: #fff; font-family: sans-serif; text-align: center; padding-top: 50px;">
                <h1>Bem-vindo à loja: ${siteEncontrado.titulo}</h1>
                <p>Este site foi gerado dinamicamente com os dados do nosso banco!</p>
            </body>
        </html>
    `);
});

// 7. Ligando o servidor na porta 3000 do seu computador

// ROTA DO PAINEL: Aqui é onde o usuário clica em "Salvar" no painel dele
// Nós recebemos os dados que ele digitou e guardamos na nossa lista!
app.post('/criar-site', (req, res) => {
    // Pegamos os dados que o usuário enviou do formulário
    const { subdominio, titulo, corFundo, donoId } = req.body;

    // Validação simples: checa se ele preencheu tudo
    if (!subdominio || !titulo || !corFundo || !donoId) {
        return res.status(400).send({ erro: "Por favor, preencha todos os campos do site!" });
    }

    // Checa se já existe algum site usando esse mesmo subdomínio
    const jaExiste = bancoDeDadosSimulado.sites.some(site => site.subdominio === subdominio);
    if (jaExiste) {
        return res.status(400).send({ erro: "Esse subdomínio já está em uso por outra pessoa!" });
    }

    // Criamos o novo objeto do site
    const novoSite = { subdominio, donoId, titulo, corFundo };

    // "Salvamos" na nossa lista de sites
    bancoDeDadosSimulado.sites.push(novoSite);

    // Respondemos para o painel que deu tudo certo!
    res.status(201).send({
        mensagem: "Site criado com sucesso total! 🚀",
        url: `http://localhost:3000/site/${subdominio}`
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`--- Servidor rodando com sucesso na porta ${PORT} ---`);
});