import TrabalhoService from "../service/trabalhoService.js"

class TrabalhoController {
    static async cadastrarProfissao(req, res) {
        try {
            const profissao = req.body

            const resultado = await TrabalhoService.cadastrarProfissao(profissao)

            res.status(201).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async consultarProfissoes(req, res) {
        try {
            const consulta = req.params

            const resultado = await TrabalhoService.consultarProfissoes(consulta)

            res.status(200).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async atualizarProfssiao(req, res) {
        try {
            const { id } = req.params
            const atualizarDados = req.body

            const resultado = await TrabalhoService.atualizarProfissao(id, atualizarDados)

            res.status(200).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async deletarProfissao(req, res) {
        try {
            const { id } = req.params

            const resultado = await TrabalhoService.deletarProfissao(id)

            res.status(200).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

export default TrabalhoController;