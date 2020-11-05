// scheme-model
const db = require('../data/db-config');

module.exports = {
    find() {
        return db('schemes')
    },
    findById(id) {
        const response = new Promise((resolve, reject)=>{
            if (db('schemes').where({id}).first()) {
                resolve(db('schemes').where({id}).first())
            } else {
                reject(null)
            }
        })
        return response;
    },
    findSteps(id) {
        return db('steps')
        .join('schemes', 'steps.scheme_id', 'schemes.id')
        .select('steps.step_number', 'steps.instructions', 'schemes.scheme_name')
        .where({'schemes.id': id}).orderBy('step_number')
    },
    async add(scheme) {
    const [id] = await db('schemes').insert(scheme);
    return db('schemes').where({id}).first();
    },
    update(changes, id) {
        const promise = new Promise (async (resolve, reject)=>{
            const num = await db('schemes').where({id}).update(changes);
            if (num) {
                resolve(db('schemes').where({id}).first())
            } else {
                reject(null)
            }
        })
        return promise;
    },
    remove(id) {
        const promise = new Promise(async(resolve, reject)=>{
            const user = await db('schemes').where({id}).first();
            if (user) {
                const num = await db('schemes').where({id}).del();
                if (num) {
                    resolve(user)
                } else {
                    reject(null)
                }
            } else {
                reject(null)
            }
        })
        return promise
    },
    async addStep(step, id) {
        console.log(step)
        const steps = await db('steps').where({scheme_id: id});
        const [newId] = await db('steps').insert({...step, scheme_id: id, step_number: steps.length + 1});
        if (newId) {
            console.log('good')
            return db('steps').where({id: newId}).first()
        } else {
            console.log('bad')
            return Promise.reject(null)
        }
    }
}