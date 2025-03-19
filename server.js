import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import axios from 'axios';
import rateLimit from 'express-rate-limit';

// Configuratie van environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const upload = multer();

// Rate limiter om spam te voorkomen
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 10, 
    message: "Te veel aanvragen, probeer later opnieuw."
});
app.use(limiter);

// ✅ Contactformulier route met Brevo API
app.post('/submit-form', upload.none(), async (req, res) => {
    console.log("✅ POST request ontvangen op /submit-form");
    console.log("📩 Request body:", req.body); // 🔍 Debugging

    const { name, email, question } = req.body;

    if (!name || !email || !question) {
        console.error("❌ Fout: Niet alle velden zijn ingevuld");
        return res.status(400).json({ message: "Alle velden zijn verplicht." });
    }

    // ✅ Email HTML stijl behouden
    const emailContent = `
<div style="font-family: Arial, sans-serif; background-color: #000 !important; color: #fff !important; padding: 20px; text-align: center;">
    <h2 style="color: #fff; font-size: 28px;">LoulServices</h2>
    <h1 style="color: #ffffff; font-size: 36px;">You asked it.<br>We made it.</h1>

    <p style="font-size: 18px; margin-top: 20px;">
        <strong><i>Thank you for your message! 🎉</i></strong>
    </p>

    <p style="font-size: 16px; color: #ccc;">
        I have received your request and will respond as soon as possible.
    </p>

    <hr style="margin-top: 20px; border-color: #444;">

    <p style="margin-top: 20px; font-size: 14px; color: #777;">
        LoulServices <br> Netherlands, Utrecht <br>
        <a href="mailto:sameerloul476@gmail.com" style="color: #ffcc00;">sameerloul476@gmail.com</a>
    </p>
</div>
    `;

    try {
        // ✅ Verstuur e-mail via Brevo API
        const response = await axios.post('https://api.brevo.com/v3/smtp/email', {
            sender: { name: "Samir Loul", email: "sameerloul2010@gmail.com" },
            to: [{ email: email }],
            subject: "You asked it. We made it. ✅",
            htmlContent: emailContent
        }, {
            headers: {
                'api-key': process.env.BREVO_API_KEY,
                'Content-Type': 'application/json'
            }
        });
    
        console.log("📨 E-mail verzonden met respons:", response.data); // 🔍 Log API response
        res.json({ message: "Je bericht is verzonden!" });
    
    } catch (error) {
        console.error("❌ Fout bij verzenden via Brevo:", error.response?.data || error.message);
        res.status(500).json({ message: "Er is iets misgegaan bij het verzenden van je bericht." });
    }
    
});

// ✅ Route om de website weer te geven
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

// ✅ Server starten
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 Server draait op poort ${PORT}`);
});
