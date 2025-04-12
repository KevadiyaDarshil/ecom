
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
    console.log(query);

    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        // Perform a full-text search with MongoDB's $text operator
        const prod = await PM.find({
            $text: { $search: query }, // Full-text search using MongoDB
        })

        if (prod.length == 0) throw new Error("no any product");

        res.status(200).json({ data: prod });
    } catch (err) {
        res.status(500).json({ error: 'Failed to search news by keyword', message: err.message });
    }
}
