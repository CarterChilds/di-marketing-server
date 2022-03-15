const app = require("express")();
const port = 8200;


app.get("/api/test", (req, res) => {
    res.status(200).send("Working")
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));