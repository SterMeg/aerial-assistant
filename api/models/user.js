const bcrypt = require('bcryptjs')
const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password') || user.isNew) {
        try {
            const hash = await bcrypt.hash(user.password, 10)
            user.password = hash
            next()
        } catch (e) {
            next(e)
        }
    } else {
        return next()
    }
})

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
}

module.exports = model('User', userSchema)