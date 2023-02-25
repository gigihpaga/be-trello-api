const { Items } = require('../../db/models');

module.exports = {
    /**
     * @method `getAll()` menampilkan semua data items.
     * ```sql
     * select [id, name] from table.items join table.items
     * ```
     * setiap data Items mempunya banyak data Items
     */
    getAll: async (req, res, next) => {
        try {
            // table Items
            const result = await Items.findAll({
                // memilih attribute apa saja yang perlud ditampilkan
                attributes: ['id', 'todoId', 'name'],
            });
            res.status(200).json({
                ok: true,
                status: 200,
                statusText: 'OK',
                message: 'Success get all data',
                response: { data: result },
            });
        } catch (err) {
            next(err);
        }
    },
    /**
     * @method `create()` insert data ke table items.
     * ```sql
     * insert into table.items (name) values (req.body.name)
     * ```
     */
    create: async (req, res, next) => {
        try {
            const { name, todoId } = req.body;
            const result = await Items.create({ name, todoId });
            res.status(201).json({
                ok: true,
                status: 201,
                statusText: 'Created',
                message: 'Success create data',
                response: { data: { id: result.id, todoId: result.todoId, name: result.name } },
            });
        } catch (err) {
            next(err);
        }
    },
    /**
     * @method `getOne()` menampilkan 1 data items berdasarkan id.
     * ```sql
     * select [id, name] from table.items where table.items.id = req.params.id
     * ```
     */
    getOne: async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await Items.findOne({
                attributes: ['id', 'todoId', 'name'],
                where: { id },
            });
            if (result?._options?.attributes?.length > 0) {
                // jika ketemu, maka beri respon api sesui data yang di cari
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
            }
        } catch (err) {
            next(err);
        }
    },
    /**
     * @method `update()` update data ke table items berdasarkan id.
     * ```sql
     * update table.items set (name = req.body.name) where table.items.id = req.params.id
     * ```
     */
    update: async (req, res, next) => {
        const { id } = req.params;
        const { name, todoId } = req.body;
        try {
            // cari berdasarkan id
            const findData = await Items.findOne({
                attributes: ['id', 'name'],
                where: { id },
            })
                .then((item) => {
                    return item;
                })
                .catch((err) => {
                    // return null;
                    throw new Error(err);
                });
            // cek apakah data yang di cari itu mempunya i attribute ? jika ada berarti terdapat ada sesuai dengan param id
            if (findData?._options?.attributes?.length > 0) {
                // jika ketemu, maka update name berdasarkan id
                findData
                    .update({ name, todoId })
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
        } catch (err) {
            next(err);
        }
    },
    /**
     * @method `destroy()` delete data table items berdasarkan id.
     * ```sql
     * delete table.items where table.items.id = req.params.id
     * ```
     */
    destroy: async (req, res, next) => {
        const { id } = req.params;
        try {
            // cari berdasarkan id
            const findData = await Items.findOne({
                attributes: ['id', 'todoId', 'name'],
                where: { id },
            })
                .then((item) => {
                    return item;
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
                        // dicustom errornya agar pesan saat error tidak terlalu detail, karena untuk di tampilkan di API
                        let { message } = err;
                        message = 'Something went wrong, there was an error deleting data';
                        next({ message });
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
        } catch (err) {
            next(err);
        }
    },
    /**
     * @method `move()` 📚 update data table items.todoId berdasarkan items.id.
     *
     * ```sql
     * update table items set (items.todoId = req.body.targetTodoId) where items.id = req.params.id
     * ```
     *
     * @postman --`penggunaan`
     *
     * + destination : http://localhost:3000/api/v1/:id/move
     * + method : PUT
     *
     * + request :
     * ```js
     * # "Path Variables"
     *  key = id : 5
     *
     * # "Body"
     * + Raw
     * + Type JSON
     *
     * # "Example request body"
     * {
     *      "targetTodoId": 12
     * }
     * ```
     * ♻️ contoh request API diatas akan hit ke url : http://localhost:3000/api/v1/5/move dan akan mengeksekusi query SQL seperti dibawah ini :
     * ```sql
     * update table items set (items.todoId = 12) where items.id = 5
     * ```
     */
    updateTodoId: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { targetTodoId } = req.body;
            // select data item berdasarkan id
            const result = await Items.findOne({
                attributes: ['id', 'name', 'todoId', 'updatedAt'],
                where: { id },
            })
                .then((item) => {
                    return item;
                })
                .catch((err) => {
                    // lempar ke catch kalau terjadi error saat select ke DB
                    throw new Error(err);
                });
            // cek apakah hasil dari select DB diatas mempunyai attribute ?
            // kalo iya berarti menemukan data, kalo tidak berarti tidak menemukan data
            if (result?._options?.attributes?.length > 0) {
                // jika ketemu, maka ubah properti todoId pada object result sesui dengan value req.body
                // ubah properti todoId (field) sesuai dengan value dari body
                result.todoId = targetTodoId;
                // dari object result yang todoId nya sudah diubah,
                // lalu simpan berubahan tersebut (proses update data ke table)
                await result
                    .save()
                    .then((newResult) => {
                        // jika berhasil update kirim respon API
                        res.status(200).json({
                            ok: true,
                            status: 200,
                            statusText: 'OK',
                            message: 'Success update or move data',
                            response: { data: newResult },
                        });
                    })
                    .catch((err) => {
                        // dicustom errornya agar pesan saat error tidak terlalu detail, karena untuk di tampilkan di API
                        let { message } = err;
                        message = 'Something went wrong, Failed when updating data';
                        next({ message });
                    });
            } else {
                // jika tidak ada data berdasarkan id, maka kirim response 404
                res.status(404).json({
                    ok: false,
                    status: 404,
                    statusText: 'Not Found',
                    message: 'No data updated',
                });
            }
        } catch (err) {
            // jika ada error luar dari proses yang ada di try{ },
            // lempar error tersebut ke app.js agar errornya menjadi respon API
            next(err);
        }
    },
};
