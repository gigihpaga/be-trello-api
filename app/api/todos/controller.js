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
    getAll: async (req, res, next) => {
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
                ok: true,
                status: 200,
                statusText: 'OK',
                message: 'Success get all data',
                response: { data: result },
            });
        } catch (err) {
            // res.status(500).json({
            //     status: 500,
            //     message: 'INTERNAL SERVER ERROR',
            // });
            next(err);
            // console.log(err.message);
        }
    },
    /**
     * @method `create()` insert data ke table todos.
     * ```sql
     * insert into table.todos (name) values (req.body.name)
     * ```
     */
    create: async (req, res, next) => {
        try {
            const { name } = req.body;
            const result = await Todos.create({ name });
            res.status(201).json({
                ok: true,
                status: 201,
                statusText: 'Created',
                message: 'Success create data',
                response: { data: { id: result.id, name: result.name } },
            });
        } catch (err) {
            next(err);
        }
    },
    /**
     * @method `getOne()` menampilkan 1 data todos berdasarkan id.
     * ```sql
     * select [id, name] from table.todos where table.todos.id = req.params.id
     * ```
     */
    getOne: async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await Todos.findOne({
                attributes: ['id', 'name'],
                where: { id },
            });
            if (result?._options?.attributes?.length > 0) {
                // jika ketemu, maka update name berdasarkan id
                res.status(200).json({
                    ok: true,
                    status: 200,
                    statusText: 'OK',
                    message: 'Success get data',
                    response: { data: result },
                });
            } else {
                // jika tidak ada data berdasarkan id, maka response 404
                res.status(404).json({
                    ok: false,
                    status: 404,
                    statusText: 'Not Found',
                    // eslint-disable-next-line quotes
                    message: "Could't find the data according the request",
                    response: { data: '' },
                });
                // throw new Error('Gagal tidak ada data'); // ini contoh untuk melempar error ke catch()
            }
        } catch (err) {
            next(err);
        }
    },
    /**
     * @method `update()` update data ke table todos berdasarkan id.
     * ```sql
     * update table.todos set (name = req.body.name) where table.todos.id = req.params.id
     * ```
     */
    update: async (req, res, next) => {
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
                .catch((err) => {
                    // return null;
                    console.log('ini di catch : ', err.message);
                    throw new Error(err);
                });

            if (findData) {
                // jika ketemu, maka update name berdasarkan id
                findData
                    .update({ name })
                    .then(() => {
                        res.status(200).json({
                            ok: true,
                            status: 200,
                            statusText: 'OK',
                            message: 'Success update data',
                            response: { data: findData },
                        });
                    })
                    .catch((err) => {
                        throw new Error(`Failed when updating data, ${err}`);
                    });
            } else {
                // jika tidak ada data berdasarkan id, maka response 404
                res.status(404).json({
                    ok: false,
                    status: 404,
                    statusText: 'Not Found',
                    message: 'No data updated',
                });
            }
        } catch (error) {
            next(error);
        }
    },
    /**
     * @method `destroy()` delete data table todos berdasarkan id.
     * ```sql
     * delete table.todos where table.todos.id = req.params.id
     * ```
     */
    destroy: async (req, res, next) => {
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
                .catch((err) => {
                    // return Promise.reject(new Error(err));
                    throw new Error(err);
                });
            if (findData?._options?.attributes?.length > 0) {
                // jika ketemu, maka delete data berdasarkan id
                findData
                    .destroy({
                        where: { id },
                    })
                    .then(() => {
                        res.status(200).json({
                            ok: true,
                            status: 200,
                            statusText: 'OK',
                            message: 'Success delete data',
                            response: { data: findData },
                        });
                    })
                    .catch((err) => {
                        throw new Error(`Failed when trying to delete data, ${err}`);
                    });
            } else {
                // jika tidak ada data berdasarkan id, maka response 404
                res.status(404).json({
                    ok: false,
                    status: 404,
                    statusText: 'Not Found',
                    message: 'No data is deleted',
                });
            }
        } catch (error) {
            next(error);
        }
    },
};
