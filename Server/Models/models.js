const sequelize = require('../DB')
const {DataTypes,SchemaOptions} = require('sequelize')

const User = sequelize.define('user',{
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    email: {type: DataTypes.STRING, unique:true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
    city: {type: DataTypes.STRING},
})

const TokenSchema = sequelize.define('token',{
    id: {type: SchemaOptions},
    email: {type: DataTypes.STRING, unique:true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
    city: {type: DataTypes.STRING},
})

// const User = sequelize.define('user',{
//     id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
//     email: {type: DataTypes.STRING, unique:true},
//     password: {type: DataTypes.STRING},
//     role: {type: DataTypes.STRING, defaultValue: 'USER'},
//     city: {type: DataTypes.STRING},
// })
module.exports = {
    User
}