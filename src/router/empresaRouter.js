import express from 'express'
import EmpresaController from '../controller/empresaController.js'

const router = express.Router()

router.post('/empresa/cadastro', EmpresaController.cadastrarEmpresa)

router.get('/empresa/consulta', EmpresaController.consultarEmpresa)

router.put('/empresa/atualizar/:id', EmpresaController.atualizarEmpresa)

router.delete('/empresa/deletar/:id', EmpresaController.deletarEmpresa)

export default router;