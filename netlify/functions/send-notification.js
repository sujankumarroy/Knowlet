import webpush from 'web-push';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_DATABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

webpush.setVapidDetails(
    'mailto:konwlet.official@gmail.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

export default async () => {
    try {
        const { data, error } = await supabase
            .from("subscriptions")
            .select("subscription");

        if (error) {
            return new Response(JSON.stringify({ success: false, error }), { status: 500 });
        }

        const payload = JSON.stringify({
            title: "Test Notification",
            body: "Check latest notes now 👀"
        });

        for (let row of data) {
            try {
                await webpush.sendNotification(row.subscription, payload);
            } catch (err) {
                console.error("Push failed:", err);
            }
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
    }
};
