import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './database';
import { start } from 'repl';
import Url from './models/url';
import { nanoid } from 'nanoid';
import { url } from 'inspector';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;
const mongoUri = process.env.MONGO_URI

app.use(cors());
app.use(express.json());

app.get('/:shortCode', async (req, res) => {
    try {
        const { shortCode } = req.params;

        const urlEntry = await Url.findOne({ shortCode });
        console.log(urlEntry);
        if (urlEntry) {
            urlEntry.clicks++;
            await urlEntry.save();
            res.redirect(urlEntry.originalUrl);
        } else {
            res.status(404).json({ error: `No URL found for ${shortCode}` });
        }
    } catch (e) {
        res.status(500).json({ error: `idk bro, ${e}`});
    }
});

app.post('/api/shorten', async (req, res) => {
    const { originalUrl } = req.body;

    console.log('Got request');

    if(!originalUrl){
        res.status(400).json({ message: 'Original URL is required' });
        return; 
    }

    const shortCode = nanoid(7);

    const newUrl = new Url({
        originalUrl: originalUrl,
        shortCode: shortCode,
    });

    try {
        const savedUrl = await newUrl.save();
        res.status(201).json(savedUrl);
    } catch (e) {
        res.status(500).json({ message: 'Error saving to database', error: e});
    }
});

async function startServer() {
    try{
        await connectToDatabase(mongoUri as string);
        app.listen(PORT, () => {
            console.log(`Server is running on ${mongoUri}:${PORT}`);
        });
    } catch (e) {
        console.error('Failed to start server: ', e);
        process.exit(1);
    }
}

startServer();