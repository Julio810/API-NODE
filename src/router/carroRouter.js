import express from 'express'
import CarroController from "../controller/carroController.js";

const router = express.Router()

router.post('/cadastrar/carro', CarroController.cadastrarCarro)

router.get('/buscar/carro', CarroController.buscarCarros)

router.put('/atualizar/carro', CarroController.atualizarCarros)

router.delete('/deletar/carro/:id', CarroController.deletarCarros)

export default router