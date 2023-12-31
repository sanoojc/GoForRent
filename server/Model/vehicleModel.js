import mongoose from "mongoose";
const vehicleSchema=mongoose.Schema({
    hubId:{
        type:String,
    },
    vehicleName:{
        type:String,
        require:true
    },
    vehicleNumber:{
        type:String,
        require:true,
    },
    brand:{
        type:String,
        require:true
    },
    year:{
        type:Number,
        require:true
    },
    classOfVehicle:{
        type:String,
        enum:[
            'Premium','Vintage','Normal'
        ]
    },
    bodyType:{
        type:String,
        enum:['Hatchback','Sedan','Suv','Coupe','Sports car'],
        require:true
    },
    transmission:{
        type:String,
        enum:['Automatic','Manual','AMT'],
        require:true
    },
    fuelType:{
        type:String,
        enum:[
            'Petrol',
            'Diesel',
            'EV'
        ],
        require:true
    },
    noOfSeats:{
        type:Number,
        require:true
    },
    images:{
        type:Array,
        require:true
    },
    rent:{
        type:Number
    },
    review:{
        type:String,
    },
    list:{
        type:Boolean,
        default:true
    }
})

const vehicleModel=mongoose.model('vehicle',vehicleSchema)
export default vehicleModel