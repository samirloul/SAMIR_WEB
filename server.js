import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import axios from 'axios';
import rateLimit from 'express-rate-limit';

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
    console.log("POST request ontvangen op /submit-form");
    console.log(req.body); // Log de request body voor debuggen

    if (!name || !email || !question) {
        return res.status(400).json({ message: "Alle velden zijn verplicht." });
    }

    // ✅ Email HTML stijl behouden
    const emailContent = `
<div style="font-family: Arial, sans-serif; background-color: #000 !important; color: #fff !important; padding: 20px; text-align: center;">
    <h2 style="color: #fff; font-size: 28px;">LoulServices</h2>
    <h1 style="color: #ffffff; font-size: 36px;">You asked it.<br>We made it.</h1>

    <img src="https://i0.wp.com/www.toonsarah-travels.blog/wp-content/uploads/2023/03/001-feature-14-012-P1040585-Cayena-Beach-Villas.jpg?resize=1536%2C1152&ssl=1" 
         alt="City Night Image" 
         style="width: 100%; max-width: 600px; border-radius: 8px;">

    <p style="font-size: 18px; margin-top: 20px;">
        <strong><i>Thank you for your message! 🎉</i></strong>
    </p>

    <p style="font-size: 16px; color: #ccc;">
        I have received your request and will respond as soon as possible.
    </p>

    <p style="font-size: 18px; font-style: italic; color: #ffcc00;">
        Passion, Creativity, Growth
    </p>

    <p style="font-size: 16px; color: #ccc;">
        These three words shape my world, but creativity knows no limits.
    </p>

    <hr style="margin-top: 20px; border-color: #444;">

    <div style="margin-top: 20px;">
        <a href="https://www.facebook.com/profile.php?id=100013006902063" target="_blank" style="margin: 0 10px;">
            <img src="https://img.icons8.com/color/50/facebook.png" width="30" alt="Facebook">
        </a>
        <a href="https://www.instagram.com/samirloul/" target="_blank" style="margin: 0 10px;">
            <img src="https://img.icons8.com/color/50/instagram-new.png" width="30" alt="Instagram">
        </a>
        <a href="https://www.snapchat.com/add/samir631s" target="_blank" style="margin: 0 10px;">
            <img src="https://img.icons8.com/color/50/snapchat.png" width="30" alt="Snapchat">
        </a>
        <a href="https://www.tiktok.com/@samirloul1" target="_blank" style="margin: 0 10px;">
            <img src="https://img.icons8.com/color/50/tiktok.png" width="30" alt="TikTok">
        </a>
        <a href="https://x.com/samir_loul" target="_blank" style="margin: 0 10px;">
            <img src="https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000" width="30" alt="X (Twitter)">
        </a>
    </div>

    <p style="margin-top: 20px;">
        <a href="https://samirloul.github.io/SAMIR_WEB/" target="_blank" 
        style="color: #ffcc00; font-size: 18px; text-decoration: none;">
            🌍 Visit my website
        </a>
    </p>

    <p style="margin-top: 20px; font-size: 14px; color: #777;">
        LoulServices <br> Netherlands, Utrecht <br>
        <a href="mailto:sameerloul476@gmail.com" style="color: #ffcc00;">sameerloul476@gmail.com</a>
    </p>
</div>
    `;

    try {
        // ✅ Verstuur e-mail via Brevo API
        await axios.post('https://api.brevo.com/v3/smtp/email', {
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

        res.json({ message: "Je bericht is verzonden!" });

    } catch (error) {
        console.error("Fout bij verzenden via Brevo:", error);
        res.status(500).json({ message: "Er is iets misgegaan bij het verzenden van je bericht." });
    }
});

// ✅ Route om de website weer te geven
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

// ✅ Server starten
const PORT = process.env.PORT || 8080; // Moet PORT gebruiken van Railway
app.listen(PORT, () => {
    console.log(`Server draait op poort ${PORT}`);
});
