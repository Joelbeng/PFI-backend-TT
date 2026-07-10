import { generateToken } from "../data/token.js";

export async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 
            message: "Faltan credenciales" 
        });
    }

    if (email === "admin@gmail.com" && password === "123456") {
        const token = generateToken({ id: 1, email: email });
        return res.json({ token: `Bearer: ${token}`  });
    }
    
        res.sendStatus(401);
    
}