export const testPostController = (req, res) => {
    const {name} = req.body;
    res.status(200).send(`Hello ${name}, this is a test post route`);
};
