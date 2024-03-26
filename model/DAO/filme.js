/******************************************************************************************
// Objetivo: Criar a interação do banco de dados MySql para fazer o CRUD de Filmes
// Data: 30-01-24
// Autor: Yasmin Targino
// Versao: 1.0.1.24
 *****************************************************************************************/

// import das funções que estão em outro arquivo
var funcoesParaUso = require('../../controller/funcoes.js')

// inserir um novo filme

// import da biblioteca do Prisma Client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

const insertFilme = async function(dadosFilme) {

    // script sql para inserir no BD
    try {

        let sql;

        if (dadosFilme.data_relancamento == null) {
            sql = `INSERT INTO tbl_filme (
                nome,
                sinopse,
                data_lancamento,
                data_relancamento,
                duracao,
                foto_capa,
                valor_unitario
                ) values (
                    '${dadosFilme.nome}', 
                    '${dadosFilme.sinopse}',
                    '${dadosFilme.data_lancamento}', 
                     null,                    
                    '${dadosFilme.duracao}', 
                    '${dadosFilme.foto_capa}',
                    '${dadosFilme.valor_unitario}'
            )`;
        } else {

            sql = `INSERT INTO tbl_filme (
        nome,
        sinopse,
        data_lancamento,
        data_relancamento,
        duracao,
        foto_capa,
        valor_unitario
        ) values (
            '${dadosFilme.nome}', 
            '${dadosFilme.sinopse}',
            '${dadosFilme.data_lancamento}', 
            '${dadosFilme.data_relancamento}',
            '${dadosFilme.duracao}', 
            '${dadosFilme.foto_capa}',
            '${dadosFilme.valor_unitario}'
    )`;
        }

        console.log(funcoesParaUso.pegarIdBD())

        // executa o script sql no BD 
        // OBS:PRECISA USAR O COMANDO: {[( EXECUTE )]}E NAO O QUERY
        let result = await prisma.$executeRawUnsafe(sql)

        //validação para ver se o insert funcionou no BD
        if (result)
            return true
        else
            return false


    } catch (error) {
        return false
    }
}

// atualizar um filme filtrando ele por id
const updateFilme = async function(id) {

}

// deletar um filme filtrando ele por id
const deleteFilme = async function(id) {
    try {

        // sql script para listar os filmes por id
        let sql = `DELETE * FROM tbl_filme WHERE id =${id}`

        // $queryRawUnsafe(sql) -> encaminha só a variável
        // $queryRaw('SELECT * FROM tbl_filme') -> encaminha o script

        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes
    } catch (error) {
        return false
    }
}

// listar todos os filmes que existem na tabela
const selectAllFilmes = async function() {

    // sql script para listar tds os filmes que existem
    let sql = 'SELECT * FROM tbl_filme ORDER BY id DESC'

    // $queryRawUnsafe(sql) -> encaminha apenas a variável
    // $queryRaw('SELECT * FROM tbl_filme') -> encaminha o script

    let rsFilmes = await prisma.$queryRawUnsafe(sql)

    // tratamento de dados para retornar dados ou false
    if (rsFilmes.length > 0)
        return rsFilmes
    else
        return false

}

// listar um filme por id
const selectByIdFilme = async function(id) {

    try {

        // sql script para listar os filmes por id
        let sql = `SELECT * FROM tbl_filme WHERE id =${id}`

        // $queryRawUnsafe(sql) -> encaminha apenas a variável
        // $queryRaw('SELECT * FROM tbl_filme') -> encaminha o script

        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes
    } catch (error) {
        return false
    }
}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme
}