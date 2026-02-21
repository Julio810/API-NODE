import PessoasService from "../service/pessoasService.js"

class PessoasController {
    static async cadastrarPessoas(req, res) {
        try {
            const criarPessoa = req.body

            const resultado = await PessoasService.cadastrarPessoas(criarPessoa)

            res.status(201).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async consultarPessoas(req, res) {
        try {
            const { nome, idade, email, cpf, page = 1, limit = 10 } = req.query

            const filtros = { nome, idade, email, cpf }

            const resultado = await PessoasService.consultarPessoas(
                filtros,
                Number(page),
                Number(limit)
            )

            res.status(200).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async atualizarPessoas(req, res) {
        try {
            const { id } = req.params
            const atualizarPessoas = req.body

            const resultado = await PessoasService.atualizarPessoas(id, atualizarPessoas)

            res.status(200).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async deletarPessoas(req, res) {
        try {
            const { id } = req.params

            const resultado = await PessoasService.deletarPessoas(id)

            res.status(200).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

export default PessoasController;