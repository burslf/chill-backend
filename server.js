const {app, server} = require('./app');
const port = process.env.PORT || 3001;
const dbConnection = require('./config/dbConnection')

async function connectToDatabaseAndStartServer() {
    try{
        await dbConnection.connectToDbServer();
        server.listen(port, () => {
            console.log(`App listening at http://localhost:${port}`);
        })
    }catch(e){
        console.log("Can't connect to database: " + e);
    }
}

connectToDatabaseAndStartServer();