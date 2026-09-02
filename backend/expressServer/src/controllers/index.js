export async function handleSearch(req,res) {
    try {
        const query = req.query.query
        const result = await 
    } catch (err) {
        console.error(err)
        res.status(400).json({message:err.message})
    }
    
}