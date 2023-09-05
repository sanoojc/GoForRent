import vehicleModel from "../Model/vehicleModel.js"

export async function getVehicle(req,res){
    try{
        const name=req.query.name??''
        const vehicles=await vehicleModel.find({ vehicleName: new RegExp(name, "i") }).lean()
        return res.json({error:false,vehicles:vehicles})
    }catch(err){
        console.log(err)
    }
}
export async function listVehicle(req,res){
    try{
        const id=req.query.id
        if(id){
           const vehicle=await vehicleModel.findOne({_id:id})
           if(vehicle){
            if(vehicle.list){
                const Vehicle=await vehicleModel.findByIdAndUpdate({_id:id},{$set:{list:false}})
                return res.json({error:false,message:'vehicle unlisted',vehicle:Vehicle})
    
            }else{
                const Vehicle=await vehicleModel.findByIdAndUpdate({_id:id},{$set:{list:true}})
                return res.json({error:false,message:'vehicle listed',vehicle:Vehicle})
    
            }
           }else{
            return res.json({error:true,mesage:'vehicle not found'})
           }
        }
    }
    catch(err){
        console.log(err)
    }

}
export async function addVehicle(req,res){
    try{
        const{hubId,vehicleName,brand,year,classOfVehicle,bodyType,transmission,fuelType,noOfSeats,rent}=req.body.details
        const {images}=req.body
        if(hubId.trim()===''||vehicleName.trim()===''||brand.trim()===''||classOfVehicle.trim()===''||bodyType.trim()===''||transmission.trim()===''||fuelType.trim()===''||rent.trim()===''){
            return res.status(400).json({error:true,mesage:"enter all fields"})
        }
        if(hubId&&vehicleName&&brand&&year&&classOfVehicle&&bodyType&&transmission&&fuelType&&noOfSeats&&rent&&images){
            const vehicle=new vehicleModel({hubId,vehicleName,brand,year,classOfVehicle,bodyType,transmission,fuelType,noOfSeats,rent,images})
            vehicle.save()
            res.status(200).json({error:false,message:'vehicle added'})
    
        }else{
            res.status(400).json({error:true,message:'cannot get all fields'})
        }
    }catch(err){
        console.log(err)
    }
}