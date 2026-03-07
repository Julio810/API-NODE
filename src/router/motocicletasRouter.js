import express from "express"
import MotocicletaController from "../controller/motocicletasController.js"

const router = express.Router()

router.post('/cadastro/motocicletas', MotocicletaController.cadastrarMotocicleta)

router.get('/buscar/motocicletas', MotocicletaController.buscarMotocicletas)

router.put('/atualizar/motocicletas', MotocicletaController.atualizarMotocicleta)

router.delete('/deletar/motocicletas', MotocicletaController.deletarMotocicleta)

export default router;