import webpush from 'web-push';
import { createClient } from '@supabase/supabase-js';

const supabaseClient = createClient(
    process.env.SUPABASE_DATABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

webpush.setVapidDetails(
    'mailto:konwlet.official@gmail.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

export default async (request) => {

    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: defaultHeader()
        });
    }

    try {
        const { title, body, icon, badge, image, tag, url } = await request.json();

        const { data, error } = await supabaseClient
            .from("subscriptions")
            .select("subscription");

        if (error) {
            return new Response(JSON.stringify({ success: false, error }), { status: 500 });
        }

        const payload = JSON.stringify({ title, body, icon, badge, image, tag, url });

        for (let row of data) {
            try {
                await webpush.sendNotification(row.subscription, payload);
            } catch (err) {
                console.error("Push failed:", err);

                // 🔥 REMOVE INVALID SUBSCRIPTION
                if (err.statusCode === 410 || err.statusCode === 404) {
                    await supabaseClient
                        .from("subscriptions")
                        .delete()
                        .eq("id", row.subscription.endpoint);
                }
            }
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
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
