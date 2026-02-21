import EmpresaService from "../service/empresaService.js"

class EmpresaController {
    static async cadastrarEmpresa(req, res) {
        try {
            const cadastro = req.body

            const resultado = await EmpresaService.cadastrarEmpresa(cadastro)

            res.status(201).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async consultarEmpresa(req, res) {
        try {
            const { nome, estado, cnpj, page = 1, limit = 10 } = req.query

            const filtros = { nome, estado, cnpj }

            const resultado = await EmpresaService.consultarEmpresa(
                filtros,
                Number(page),
                Number(limit)
            )

            res.status(200).json(resultado)
        } catch (error) {
            throw error
        }
    }
    static async atualizarEmpresa(req, res) {
        try {
            const { id } = req.params
            const atualizar = req.body

            const resultado = await EmpresaService.atualizarEmpresa(id, atualizar)

            res.status(200).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async deletarEmpresa(req, res) {
        try {
            const deletar = req.params.id

            const resultado = await EmpresaService.deletarEmpresa(deletar)

            res.status(200).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

export default EmpresaController;