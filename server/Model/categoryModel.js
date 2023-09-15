import mongoose from "mongoose"

const categorySchema=mongoose.Schema({
    name:{
        type:String,
        require:true
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