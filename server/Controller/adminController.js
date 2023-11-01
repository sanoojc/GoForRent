import adminModel from '../Model/adminModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import userModel from '../Model/userModel.js'
import hubModel from '../Model/hubModel.js'
import categoryModel from '../Model/categoryModel.js'
import bookingModel from '../Model/bookingModel.js'
import vehicleModel from '../Model/vehicleModel.js'

var salt = bcrypt.genSaltSync(10)

export async function login(req, res) {
    try {
        const { email, password } = req.body
        const admin = await adminModel.findOne({ email })
        if (admin) {
            if (!bcrypt.compareSync(password, admin.password)) {
                return res.json({ error: true, login: false, message: "wrong Password" })
            }
            if (admin.role === 'admin') {
                const token = jwt.sign({ id: admin._id, }, 'myjwtsecretkey')
                admin.password = ''
                res.json({ error: false, token: token, login: true, admin: admin })
            }
        } else {
            return res.json({ error: true, login: false, message: "admin not found" })
        }
    } catch (err) {
        return res.json({ error: true, message: 'internal server error' })
    }
}
export async function validateAdmin(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.json({ login: false, error: true, message: "no token" });
        }
        const verifiedJWT = jwt.verify(token, process.env.jwt_key)
        const admin = await adminModel.findById(verifiedJWT.id, { password: 0 });
        if (!admin) {
            return res.json({ error: true, login: false });
        }
        return res.json({ error: false, admin, login: true, message: 'successfully logged in' });
    } catch (err) {
        res.json({ login: false, error: err });
    }
}
//HUB
export async function getHub(req, res) {
    try {
        let name = req.query.name
        if (name == null || name == "undefined") {
            name = ''
        }
        const hub = await hubModel.find({ hubName: new RegExp(name, "i") }).lean()
        return res.json({ error: false, message: 'sucess', hub: hub })
    } catch (err) {
        return res.json({ error: true, message: 'internal server error' })
    }
}
export async function addHub(req, res) {
    try {
        let { hubName, longitude, latitude } = req.body
        const hub = await hubModel.findOne({ hubName: new RegExp(hubName, "i") })
        hubName = hubName.charAt(0).toUpperCase() + hubName.slice(1).toLowerCase()
        if (hub) {
            return res.json({ error: true, message: 'hub already added' })
        } else {
            const newHub = new hubModel({ hubName, longitude, latitude })
            newHub.save()
            return res.json({ error: false, message: 'hub sucessfully added' })
        }
    } catch (err) {
        return res.json({ error: true, message: 'internal server error' })
    }
}
export async function editHub(req, res) {
    try {
        const id = req.query.id
        const hub = await hubModel.findByIdAndUpdate({ id }, { $set: { hubName, longitude, latitude } })
        if (hub) {
            return res.json({ error: false, message: 'updated' })
        } else {
            return res.json({ error: true, message: 'something went wrong' })
        }
    } catch (err) {
        return res.json({ error: true, message: 'internal server error' })
    }
}
export async function listHub(req, res) {
    try {
        const id = req.query.id
        let hub = await hubModel.findById({ _id: id })
        if (hub) {
            if (hub.list) {
                hub = await hubModel.findByIdAndUpdate(id, { $set: { list: false } })
                return res.json({ error: false, message: 'unlisted' })
            } else {
                hub = await hubModel.findByIdAndUpdate(id, { $set: { list: true } })
                return res.json({ error: false, message: 'unlisted' })
            }
        } else {
            return res.json({ error: true, message: 'Hub not found' })
        }
    } catch (err) {
        return res.json({ error: true, message: 'internal server error' })
    }
}
//USERS
export async function getUsers(req, res) {
    try {
        const name = req.query.name ?? ''
        const users = await userModel.find({ name: new RegExp(name, "i") }).lean()
        return res.json({ error: false, user: users })
    } catch (err) {
        return res.json({ error: true, message: 'internal server error' })
    }
}
export async function banUser(req, res) {
    try {
        const id = req.params.id
        let user = await userModel.findById({ _id: id })
        if (user) {
            if (user.ban) {
                user = await userModel.findByIdAndUpdate(id, { $set: { ban: false } })
                return res.json({ error: false, user: user, message: "user unbanned" })
            } else {
                user = await userModel.findByIdAndUpdate(id, { $set: { ban: true } })
                return res.json({ error: false, user: user, messsage: 'user banned' })
            }
        } else {
            return res.json({ error: true, message: 'user not found' })
        }
    } catch (err) {
        return res.json({ error: true, message: 'internal server error' })
    }
}
//CATEGORY
export async function fetchCategory(req, res) {
    try {
        const categories = await categoryModel.find()
        return res.json({ error: false, message: 'sucess', categories })
    } catch (err) {
        return res.json({ error: true, message: 'internal server error' })
    }
}
export async function addCategory(req, res) {
    const { data } = req.body
    if (data) {
        const category = await categoryModel.findOne({ name: new RegExp(data, "i") })
        if (category) {
            return res.json({ error: true, message: 'category already exists' })
        } else {
            const category = new categoryModel({ name: data })
            category.save()
            return res.json({ error: false, message: 'sucess' })
        }
    }
    return res.json({ error: true, message: 'field is empty' })
}
export async function findCategory(req, res) {
    try {
        const { id } = req.query
        const category = await categoryModel.findById(id)
        return res.json({ error: false, message: 'sucess', category })
    } catch (err) {
        return res.json({ error: true, message: 'internal server error' })
    }
}
export async function addCategoryItem(req, res) {
    try {
        let { id, item } = req.query
        if (item.trim() !== '') {
            const category = await categoryModel.findById(id)
            item = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
            let ifItem = category.items.includes(item)
            if (ifItem) {
                return res.json({ error: true, message: 'Item already added' })
            } else {
                category.items.push(item)
                await category.save()
                return res.json({ error: false, message: 'Sucess' })
            }

        } else {
            return res.json({ error: true, message: 'Field is empty' })
        }
    } catch (err) {
        return res.json({ error: true, message: 'internal server error' })
    }


}
// BOOKINGS
export async function getBookings(req, res) {
    try {
        const name = req.query.name ?? ""
        const bookings = await bookingModel.find().populate('userId').lean()
        res.json({ error: false, message: 'sucess', bookings })
    } catch (err) {
        return res.json({ error: true, message: 'internal server error' })
    }
}
export async function changeBookingStatus(req, res) {
    try {
        const booking = await bookingModel.findByIdAndUpdate({ _id: req.query.id }, { $set: { paymentStatus: req.body.status } })
        if (booking) {
            return res.json({ error: false, message: 'sucess', booking })
        } else {
            return res.json({ error: true, message: 'error in fetching booking' })

        }
    } catch (err) {
        return res.json({ error: true, message: 'internal server error' })
    }

}

// DASHBOARD
export async function fetchDashboardData(req, res) {
    try {
        const users = await userModel.find().lean()
        const vehicles = await vehicleModel.find().lean()
        const bookings = await bookingModel.find().lean()
        const hubs = await hubModel.find().lean()
        return res.json({ error: false, message: 'sucess', users, vehicles, bookings, hubs })
    }
    catch (err) {
        return res.json({ error: true, message: 'internal server error' })
    }
}

// sales report
export async function salesReport(req, res) {
    try {
        let startDate = new Date(new Date().setDate(new Date().getDate() - 8));
        let endDate = new Date();
        let filter = req.query.filter ?? ""
        if (req.query.startDate) startDate = new Date(req.query.startDate);
        if (req.query.endDate) endDate = new Date(req.query.endDate);
        const currentDate = new Date();
        startDate.setHours(0,0,0,0)
        endDate.setHours(24,0,0,0)
        switch (req.query.filter) {
            case 'thisYear':
                startDate = new Date(currentDate.getFullYear(), 0, 1);
                endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
                break;
            case 'lastYear':
                startDate = new Date(currentDate.getFullYear() - 1, 0, 1);
                endDate = new Date(currentDate.getFullYear() - 1, 11, 31);
                break;
            case 'thisMonth':
                startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
                break;
            case 'lastMonth':
                startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
                endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                break;
            default:
                if (!req.query.filter && !req.query.startDate) filter = "lastWeek";
            }
        let salesCount = 0;
        let completedBookings;
        let salesSum = 0
        let result
        if (req.query.startDate || req.query.endDate || req.query.filter) {
            if (req.query.startDate) {
                startDate = new Date(startDate);
            }
            if (req.query.endDate) {
                endDate = new Date(endDate);
            }
            if (req.query.filter) {
                filter = req.query.filter;
            }
            const query = {};
            query.toDate= { $gte: startDate, $lte: endDate };
            const bookings = await bookingModel.find(query).sort({ date: -1 }).lean();
            salesCount = bookings.length;
            completedBookings = bookings.filter(item => item.paymentStatus === "Completed");
            completedBookings.forEach((item) =>{
                salesSum = item.totalAmount+salesSum
                console.log(item)
            });
            console.log(salesSum);
        }
        else {
            console.log("else case");
            completedBookings = await bookingModel.find({ paymentStatus: "Completed" }).lean();
         
            completedBookings = completedBookings.map((booking) => {
                booking.toDate = new Date(booking.date).toLocaleString();
                return booking;
            });
            salesCount=await bookingModel.countDocuments({ 'paymentStatus': 'Completed' });
            result=await bookingModel.aggregate([
                {
                    $match: { 'paymentStatus': 'Completed' }
                },
                {
                    $unwind: "$paymentStatus"
                },
                {
                    $match: { 'paymentStatus': 'Completed' }
                },
                {
                    $group: { _id: null, totalPrice: { $sum: '$total' } }
                }
            ]);
            salesSum = result[0]?.totalPrice ?? 0
        }
        const users = await bookingModel.distinct('address.name')
        const userCount = users.length
        for (const i of completedBookings) {
            i.dispatch = new Date(i.dispatch).toLocaleDateString()    
        }
        console.log(salesSum)
        console.log(startDate,endDate,'dates....');
        res.json({ userCount, salesCount, salesSum, completedBookings })
    } catch (error) {
        console.log(error)
        res.status(404)
        throw new Error("cant get")
    }
}