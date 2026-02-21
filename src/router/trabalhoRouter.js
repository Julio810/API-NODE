import express from "express"
import TrabalhoController from "../controller/trabalhoController.js"

const router = express.Router()

router.post('/trabalho/cadastro', TrabalhoController.cadastrarProfissao)

router.get('/trabalho/consulta', TrabalhoController.consultarProfissoes)

router.put('/trabalho/atualizar/:id', TrabalhoController.atualizarProfssiao)

router.delete('/trabalho/deletar/:id', TrabalhoController.deletarProfissao)

export default router;