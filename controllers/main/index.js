export const main = async (req, res) => {
    //const { * } = req.params;

    return res
        .status(200)
        .json({
            status: true,
            message: "Weather API Up :)",
            github: "https://github.com/ramazansancar/weatherApi"
        });
};

export const healthCheck = async (req, res) => {
    return res
        .status(200)
        .json({
            status: true,
            data: "ok",
        })
}