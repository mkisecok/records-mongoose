const getController = ( (req, res) => 
{
    const { id } = req.params;

    res.status(200).send('Get an Order with ProductId ' + id );
});

module.exports = getController;
