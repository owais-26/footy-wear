// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../../models/Product";
import connectDb from "../../../middleware/mongoose";

const handler = async (req,res) =>{
    let products = await Product.find()
    let kits = {}
    for (let item of products){
        if(item.title in kits){
            if(!kits[item.title].color.includes(item.color) && item.availableQty > 0){
                kits[item.title].color.push(item.color);
            }
            if(!kits[item.title].size.includes(item.size) && item.availableQty > 0){
                kits[item.title].size.push(item.size);
            }
        }
        else{
            kits[item.title]= JSON.parse(JSON.stringify(item))
            if(item.availableQty > 0){
                kits[item.title].color = [item.color]
                kits[item.title].size = [item.size]
            }
        }
    }
    res.status(200).json({kits})

}
export default connectDb(handler)