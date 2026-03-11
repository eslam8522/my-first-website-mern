const mongoose=require ('mongoose');
const mysech= new mongoose.Schema({
email: {type: String, required: true, unique: true},
password:  {type: String, required: true},
name: {type: String}
});

module.exports=mongoose.model("Mydbb", mysech);