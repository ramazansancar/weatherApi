export const main = async (req, res) => {
    //const { * } = req.params;

    return res
        .status(200)
        .json({
            status: true,
            message: "Weather API Up :)",
        });
};

export const healtCheck = async (req, res) => {
    return res
        .status(200)
        .json({
            status: true,
            data: "ok",
        })
}