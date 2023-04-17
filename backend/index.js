import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

// const pool = mysql.createPool({
//     host:"localhost",
//     user:"root",
//     password:"MySQL2Hugo!",
//     database:"anime"
// })

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"MySQL2Hugo!",
    database:"anime"
})

app.use(express.json())
app.use(cors())


db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données : ' + err.stack);
        return;
    }

    console.log('Connecté à la base de données avec l\'ID ' + db.threadId);
});

app.get("/", (req, res)=>{
    res.json("Message from the backend")
})


app.get("/citations", (req, res)=>{
    const q = "SELECT * FROM citation"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/citation", (req, res) => {
    const q = "INSERT INTO citation (`text`,`image`) VALUES (?)";
    const values = [
        req.body.text,
        req.body.image,
    ];

    db.query(q,[values], (err,data) => {
        if(err) return res.json(err)
        return res.json("Une citation a été créée avec succès")
    })
});


app.delete("/citation/:id", (req, res)=>{
    const citationId = req.params.id;
    const q = "DELETE FROM citation WHERE id = ?";

    db.query(q, [citationId], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Une citation supprimée avec succès");
    });
});

app.put("/citation/:id", (req, res)=>{
    const citationId = req.params.id;
    const q = "UPDATE citation SET `text` = ?,`image` = ? WHERE id = ?";

    const values =[
        req.body.text,
        req.body.image,
    ]

    db.query(q, [...values, citationId], (err, data)=>{
        if(err) return res.json(err);
        return res.json("La citation a été modifiée avec succès");
    });
});


//Version
app.get("/versions", (req, res)=>{
    const q = "SELECT * FROM version";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/version/:id", (req, res)=>{
    const versionId = req.params.id;
    const q = "SELECT * FROM version WHERE id = ?";
    db.query(q, [versionId], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/version", (req, res) => {
    const q = "INSERT INTO version (`content`, `date`) VALUES (?)";
    const values = [
        req.body.content,
        req.body.date,
    ];

    db.query(q,[values], (err,data) => {
        if(err) return res.json(err)
        return res.json("Une version a été créée avec succès")
    })
});

app.put("/version/:id", (req, res)=>{
    const versionId = req.params.id;
    const q = "UPDATE version SET `content` = ?,`date` = ? WHERE id = ?";

    const values =[
        req.body.content,
        req.body.date,
    ]

    db.query(q, [...values, versionId], (err, data)=>{
        if(err) return res.json(err);
        return res.json("La version a été modifiée avec succès");
    });
});

app.delete("/version/:id", (req, res)=>{
    const versionId = req.params.id;
    const q = "DELETE FROM version WHERE id = ?";

    db.query(q, [versionId], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Une version supprimée avec succès");
    });
});


app.listen(8800, ()=>{
    console.log("Connected to backend !! Listening on port 8800")
})