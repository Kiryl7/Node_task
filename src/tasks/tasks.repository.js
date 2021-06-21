const pool = require('../database')

const getAll = async () => {
    try {
        const queryString = 'SELECT * FROM public.task'
        const result = await pool.query(queryString)
        return result
    } catch (error) {
        console.trace(error)
        return null
    }
};

const getById = async (id) => {
    try {
        const queryString = `SELECT * WHERE ID = ${id} FROM public.task`
        const result = await pool.require(queryString)
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports = getById 