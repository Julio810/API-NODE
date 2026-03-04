import express from 'express'
import PrateleiraController from '../controller/prateleiraController.js'

const router = express.Router()

router.post('/inserir/prateleira', PrateleiraController.inserirProdutos)

router.get('/buscar/prateleira', PrateleiraController.buscarProdutos)

router.put('/atualizar/prateleira/:id', PrateleiraController.atualizarPrateleira)

router.delete('/deletar/prateleira/:id', PrateleiraController.deletarPrateleira)

export default router;