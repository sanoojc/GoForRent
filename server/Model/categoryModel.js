import mongoose from "mongoose"

const categorySchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    image:{
        type:String
    },
    items:{
        type:Array
    },
    list:{
        type:Boolean,
        require:true
    }
})
const categoryModel=mongoose.model('categories',categorySchema)
export default categoryModel