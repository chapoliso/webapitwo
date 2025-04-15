import express from 'express';

const app = express();
const port = 3000;

const usuarios = [
    { nome: 'Ana Clara', cidade: 'Crato' },
    { nome: 'Breno Lima', cidade: 'Juazeiro do Norte' },
    { nome: 'Claudio Crispim', cidade: 'Crato' },
    { nome: 'Natalia', cidade: 'Crato' },
    { nome: 'Emilly', cidade: 'Moreilândia' },
    { nome: 'Tataiane', cidade: 'Moreilândia' },
    { nome: 'Emanuell', cidade: 'Moreilândia' },
    { nome: 'Duda', cidade: 'Caririmirim' },
    { nome: 'Junior', cidade: 'Caririmirim' },
    { nome: 'Igor', cidade: 'Caririmirim' }
]; 

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

app.get('/usuario/todos', (req, res) => {
    try {
        res.json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.get('/usuario/cidade/:cidade', (req, res) => {
    const cidadeParam = req.params.cidade.toLowerCase();
    const filtrados = usuarios.filter(usuarios => usuarios.cidade.toLowerCase() === cidadeParam);
    res.json(filtrados);
});

app.get('/usuario/sorteado', (req, res) => {
    try {
        const indiceSorteado = Math.floor(Math.random() * usuarios.length);
        res.json(usuarios[indiceSorteado]);
    } catch (error) {
        console.error('Erro ao sortear usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

export default app;