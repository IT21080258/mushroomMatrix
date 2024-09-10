const mongoose = require('mongoose')
const productSchema =mongoose.Schema(
    {
        image:{
            type:String,
            required: false
        },
        Growshed_Code:{
            type:String,
            required: false            
        },
        Rank_Number:{
            type:String,
            required: false               
        },
        Contaminated:{
            type:String,
            require:false
        }
    },
    {
        timestamps:true
    }
)

const Product = mongoose.model('Contamination',productSchema);
module.exports=Product;
