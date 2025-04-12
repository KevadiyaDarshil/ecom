
var PM = require("../model/prodmodel")

exports.catsearch = async (req, res) => {

    try {
        var data = req.params.catid
        console.log(data);


        var prod = await PM.find({ cat_name: data })


        res.status(200).json({

            status: 'success',
            message: 'prod found',
            data: prod
        })
    } catch (error) {
        res.status(200).json({
            status: 'fail',
            message: error.message
        })
    }

}


exports.search = async (req, res) => {

   const { query } = req.body;  // Destructure query, page, and limit from request body

    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    } 
    

    try {
        // Perform a full-text search with MongoDB's $text operator
        const articles = await AM.find({
            $text: { $search: query }, // Full-text search using MongoDB
        })
            // Sort by publishedAt in descending order (most recent articles first)

        if (articles.length == 0) throw new Error("no any news");

        res.status(200).json({ data: articles });
    } catch (err) {
        res.status(500).json({ error: 'Failed to search news by keyword', message: err.message });
    }
}
