import express from 'express'
import ProdutoController from '../controller/produtoController.js'

const router = express.Router()

router.post('/cadastro/produto', ProdutoController.cadastrarProduto)

router.get('/consultar/produto', ProdutoController.consultarProdutos)

router.put('/atualizar/produto/:id', ProdutoController.atualizarProduto)

router.delete('/deletar/produto/:id', ProdutoController.deletarProduto)

export default router;