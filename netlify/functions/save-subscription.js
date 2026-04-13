import { createClient } from '@supabase/supabase-js';

const supabaseClient = createClient(
    process.env.SUPABASE_DATABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

export default async (request) => {

    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: defaultHeader()
        });
    }

    try {
        const subscription = await request.json();

        if (!subscription?.endpoint) {
            return new Response(
                JSON.stringify({ success: false, error: "Invalid subscription" }),
                { status: 400, headers: defaultHeader() }
            );
        }

        const id = subscription.endpoint; // unique id

        const { error } = await supabaseClient
            .from("subscriptions")
            .upsert({
                id,
                subscription
            });

        if (error) {
            return new Response(
                JSON.stringify({ success: false, error: error.message }),
                { status: 500, headers: defaultHeader() }
            );
        }

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: defaultHeader() }
        );

    } catch (err) {
        return new Response(
            JSON.stringify({ success: false, error: err.message }),
            { status: 500, headers: defaultHeader() }
        );
    }
};

function defaultHeader() {
    return {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };
}
