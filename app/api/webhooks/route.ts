import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from "@/lib/db";

export async function POST(req: Request) {

    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occurred -- no svix headers', {
            status: 400
        });
    }

    // Get the body
    const payload: unknown = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400
        });
    }

    if (evt.type === 'user.created') {
        let data = JSON.parse(body)?.data;
        let emailAddress = data.email_addresses[0].email_address;
        let fullName = data.first_name + ' ' + data.last_name;
        let avatarUrl = data.profile_image_url || data.image_url;
        let userId = data.id;
        // const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL_BE}/api/v1/social-auth`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         email: emailAddress,
        //         name: fullName,
        //         avatarUrl: avatarUrl,
        //         userId: userId,
        //     }),
        // });
        await db.users.create({
            data: {
                email: emailAddress,
                name: fullName,
                avatarUrl: avatarUrl,
                userId: userId,
            }
        });
        console.log('Account created');

    }

    return new Response('', { status: 200 });
}