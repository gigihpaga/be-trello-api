const { where } = require('sequelize');
const { Todos, Items } = require('../../db/models');

module.exports = {
    /**
     * @method `getAll()` menampilkan semua data todos.
     * ```sql
     * select [id, name] from table.todos join table.items
     * ```
     * setiap data Todos mempunya banyak data Items
     */
    getAll: async (req, res) => {
        try {
            // table Todos
            const result = await Todos.findAll({
                // memilih attribute apa saja yang perlud ditampilkan
                attributes: ['id', 'name'],
                // join ke table Items
                include: {
                    model: Items,
                    attributes: ['id', 'name', 'todoId'],
                },
            });
            res.status(200).json({
                status: 200,
                message: 'Success',
                data: result,
            });
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: 'INTERNAL SERVER ERROR',
            });
            console.log(err.message);
        }
    },
    /**
     * @method `create()` insert data ke table todos.
     * ```sql
     * insert into table.todos (name) values (req.body.name)
     * ```
     */
    create: async (req, res) => {
        try {
            const { name } = req.body;
            const result = await Todos.create({ name });
            res.status(201).json({
                status: 201,
                message: 'Success create data',
                data: { id: result.id, name: result.name },
            });
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: 'INTERNAL SERVER ERROR',
            });
            console.log(err.message);
        }
    },
    /**
     * @method `getOne()` menampilkan 1 data todos berdasarkan id.
     * ```sql
     * select [id, name] from table.todos where table.todos.id = req.params.id
     * ```
     */
    getOne: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await Todos.findOne({
                attributes: ['id', 'name'],
                where: { id },
            });
            // console.log('hasil result: ', result?._options.attributes.length);
            // console.log('hasil result: ', result);
            if (result) {
                // jika ketemu, maka update name berdasarkan id
                res.status(200).json({
                    status: 200,
                    message: 'Succes',
                    data: result,
                });
                console.log('Sukses dapat nama : ', result.name);
            } else {
                // jika tidak ada data berdasarkan id, maka response 404
                res.status(200).json({
                    status: 200,
                    message: 'Tidak ada data yang ditemukan',
                });
                console.log('Gagal tidak ada data');
                // throw new Error('Gagal tidak ada data'); // ini contoh untuk melempar error ke catch()
            }
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: 'INTERNAL SERVER ERROR',
            });
            console.log(err);
        }
    },
    /**
     * @method `update()` update data ke table todos berdasarkan id.
     * ```sql
     * update table.todos set (name = req.body.name) where table.todos.id = req.params.id
     * ```
     */
    update: async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        try {
            // cari berdasarkan id
            const findData = await Todos.findOne({
                attributes: ['id', 'name'],
                where: { id },
            })
                .then((todo) => {
                    return todo;
                })
                .catch(() => {
                    return null;
                });

            if (findData) {
                // jika ketemu, maka update name berdasarkan id
                findData
                    .update({ name })
                    .then(() => {
                        res.status(200).json({
                            status: 200,
                            message: 'Success update data',
                            data: findData,
                        });
                        console.log('Sukses update data : ', findData.name);
                    })
                    .catch((err) => {
                        throw new Error(`Gagal saat update data, ${err}`);
                    });
            } else {
                // jika tidak ada data berdasarkan id, maka response 404
                res.status(404).json({
                    status: 404,
                    message: 'Tidak ada data yang diperbarui',
                });
                console.log('Gagal tidak ada');
            }
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: 'INTERNAL SERVER ERROR',
            });
            console.log(error);
        }
    },
    /**
     * @method `destroy()` delete data table todos berdasarkan id.
     * ```sql
     * delete table.todos where table.todos.id = req.params.id
     * ```
     */
    destroy: async (req, res) => {
        const { id } = req.params;
        try {
            // cari berdasarkan id
            const findData = await Todos.findOne({
                attributes: ['id', 'name'],
                where: { id },
            })
                .then((todo) => {
                    return todo;
                })
                .catch(() => {
                    return null;
                });
            if (findData) {
                // jika ketemu, maka delete data berdasarkan id
                findData
                    .destroy({
                        where: { id },
                    })
                    .then(() => {
                        res.status(200).json({
                            status: 200,
                            message: 'Success delete data',
                            data: findData,
                        });
                    })
                    .catch((err) => {
                        throw new Error(`Gagal saat delete data, ${err}`);
                    });
            } else {
                // jika tidak ada data berdasarkan id, maka response 404
                res.status(404).json({
                    status: 404,
                    message: 'Tidak ada data yang di delete',
                });
                console.log('Gagal tidak ada');
            }
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: 'INTERNAL SERVER ERROR',
            });
            console.log(error);
        }
    },
};
