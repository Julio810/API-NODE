import express from "express"
import PessoasController from "../controller/pessoasController.js"

const router = express.Router()

router.post('/pessoas/cadastro', PessoasController.cadastrarPessoas)

router.get('/pessoas/consulta', PessoasController.consultarPessoas)

router.put('/pessoas/atualizar/:id', PessoasController.atualizarPessoas)

router.delete('/pessoas/deletar/:id', PessoasController.deletarPessoas)

export default router;