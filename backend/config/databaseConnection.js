import mongoose from "mongoose";

const databaseConnection = async () => {

    try {

        const connect =
            await mongoose.connect(
                process.env.MONGODB_URI,
                {
                    dbName:
                        process.env.DB_NAME
                }
            );

        console.log(
            `Database connected successfully to ${connect.connection.host}`
        );

    } catch (error) {

        console.error(
            `Database connection failed: ${error.message}`
        );

        process.exit(1);
    }
};

export {
    databaseConnection
};