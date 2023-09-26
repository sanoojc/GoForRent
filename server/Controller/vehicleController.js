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
        const{hubId,vehicleName,brand,year,classOfVehicle,bodyType,transmission,fuelType,noOfSeats,rent,vehicleNumber}=req.body.details
        const {images}=req.body
        if(hubId.trim()===''||vehicleName.trim()===''||brand.trim()===''||classOfVehicle.trim()===''||bodyType.trim()===''||transmission.trim()===''||fuelType.trim()===''||rent.trim()===''||vehicleNumber.trim()===''){
            return res.status(400).json({error:true,mesage:"enter all fields"})
        }
        if(hubId&&vehicleName&&brand&&year&&classOfVehicle&&bodyType&&transmission&&fuelType&&noOfSeats&&rent&&images&&vehicleNumber){
            const vehicle=new vehicleModel({hubId,vehicleName,brand,year,classOfVehicle,bodyType,vehicleNumber,transmission,fuelType,noOfSeats,rent,images})//............
            vehicle.save()
            res.status(200).json({error:false,message:'vehicle added'})
    
        }else{
            res.status(400).json({error:true,message:'cannot get all fields'})
        }
    }catch(err){
        console.log(err)
    }
}
export async function editVehicle(req,res){
    try{
    const {id}=req.query
    const {details,images}=req.body
    if(details.hubId.trim()===''||details.vehicleName.trim()===''||details.brand.trim()===''||details.year.trim()===''||details.classOfVehicle.trim()===''||details.bodyType.trim()===''||details.transmission.trim()===''||details.fuelType.trim()===''||details.noOfSeats.trim()===''||details.vehicleNumber.trim()===''||details.rent.trim()===''){
        return res.json({error:true,message:'fill all fields'})
    }else{
        if(images){
            const vehicle=await vehicleModel.findByIdAndUpdate({_id:id},{$set:{
                hubId:details.hubId,
                vehicleName:details.vehicleName,
                brand:details.brand,
                year:details.year,
                classOfVehicle:details.classOfVehicle,
                bodyType:details.bodyType,
                vehicleNumber:details.vehicleNumber,
                transmission:details.transmission,
                fuelType:details.fuelType,
                noOfSeats:details.noOfSeats,
                rent:details.noOfSeats,
                images
                //............
            }})
            return res.json({error:false,message:'vehicle edited',vehicle})
        }
        else{
            const vehicle=await vehicleModel.findByIdAndUpdate({_id:id},{$set:{
                hubId:details.hubId,
                vehicleName:details.vehicleName,
                brand:details.brand,
                year:details.year,
                classOfVehicle:details.classOfVehicle,
                bodyType:details.bodyType,
                vehicleNumber:details.vehicleNumber,
                transmission:details.transmission,
                fuelType:details.fuelType,
                noOfSeats:details.noOfSeats,
                rent:details.noOfSeats,
            }})
            return res.json({error:false,message:'vehicle edited',vehicle})
        }
    }
}catch(err){
    console.log(err)
}
}