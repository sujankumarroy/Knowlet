import { createClient } from '@supabase/supabase-js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const supabaseClient = createClient(process.env.SUPABASE_DATABASE_URL, process.env.SUPABASE_ANON_KEY);
const JWT_SECRET = process.env.JWT_SECRET;

export default async (request) => {
    
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
                "Access-Control-Allow-Credentials": "true",
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            }
        });
    }
    
    try {
        const cookies = request.headers.get('cookie');
        const { name, email, password } = await request.json();
        const id = getId(name);
        const hash = await bcrypt.hash(password, 10);

        if (!id || !name || !password || !hash) {
            return new Response(
                JSON.stringify({ success: false, error: { message: "Invalid name of Empty password"}}),
                { status: 500, headers: defaultHeader() }
            )
        }

        const user = { id, name, email, password: hash }
        const token = jwt.sign({ id, name, email }, JWT_SECRET);

        const { error } = await supabaseClient
            .from("users")
            .insert(user);

        if (error) {
            return new Response(
                JSON.stringify({ success: false, error: error }),
                { status: 500, headers: defaultHeader() }
            );
        }
        
        return new Response(
            JSON.stringify({ success: true, cookies }),
            {
                status: 200,
                headers: {
                    ...defaultHeader(),
                    "Access-Control-Allow-Credentials": "true",
                    'Set-Cookie': `token=${token}; Max-Age=3600; HttpOnly; SameSite=Lax; Path=/*`
                }
            }
        );
        
    } catch (err) {
        return new Response(
            JSON.stringify({ success: false, error: err }),
            { status: 500, headers: defaultHeader() }
        );
    }
};

function getId(name) {
    const firstName = name.split(' ')[0] || "";
    if (!firstName) return null;
    const specialChar = "@";
    const randomNumber = Math.floor(Math.random() * 9000 + 1000);
    const id = firstName + specialChar + randomNumber;
    return id;
}

function defaultHeader() {
    return {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
        "Access-Control-Allow-Credentials": "true"
    }
}