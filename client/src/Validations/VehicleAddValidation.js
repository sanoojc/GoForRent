import * as Yup from 'yup'
export const VehicleValidationSchema=Yup.object().shape({
    hubId: Yup.string().trim().required('Hub is required'),
    vehicleName: Yup.string().trim().required('Vehicle name is required'),
    brand: Yup.string().trim().required('Brand is required'),
    vehicleNumber: Yup.string().trim().required('Vehicle Number is required'),
    year: Yup.number().required('Year is required'),
    classOfVehicle: Yup.string().trim().required('Class is required'),
    bodyType: Yup.string().trim().required('Body type is required'),
    transmission: Yup.string().trim().required('Transmission type is required'),
    fuelType: Yup.string().trim().required('Fuel type is required'),
    noOfSeats: Yup.number().required('Seat capcity is required'),
    rent: Yup.string().trim().required('Rent amount is required'),

})