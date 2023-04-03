import {
	SECRET_PHOREST_AUTH_NAME,
	SECRET_PHOREST_AUTH_PASSWORD,
	SECRET_BUSINESS_ID,
	SECRET_MAILHOST,
	SECRET_MAILPORT,
	SECRET_MAIL_PASSWORDS
} from '$env/static/private';
import { fail } from '@sveltejs/kit';
import { render } from 'svelte-email';
import Booking_Confirmation from '$lib/emails/booking_confirmation.svelte';
import nodemailer from 'nodemailer';

export const actions = {
	async default({ request, fetch }) {
		const form_data = await request.formData();
		console.log('form data: ', form_data);
		//create customer
		const { clientId, err } = await create_customer(form_data);

		form_data.set('clientId', clientId);
		const data = Object.fromEntries(form_data);
		if (err) {
			return fail(403, { data, err });
		}

		await send_email(data);

		//create reservation
		const reservation_response = await fetch('/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ data })
		});
		const reservation_response_json = await reservation_response.json();

		if (!reservation_response_json.ok) {
			return { success: false, data };
		}
		return { success: true };
	}
};

async function create_customer(data) {
	// check if email is already registered
	const client_response = await fetch(
		`https://platform.phorest.com/third-party-api-server/api/business/${SECRET_BUSINESS_ID}/client?email=${data.get(
			'email'
		)}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Basic ${btoa(
					`${SECRET_PHOREST_AUTH_NAME}:${SECRET_PHOREST_AUTH_PASSWORD}`
				)}`,
				'Content-Type': 'application/json'
			}
		}
	);
	const client = await client_response.json();
	// if yes, return
	if (client.page.size > 0) {
		return { err: 'email already exists' };
	}

	const response = await fetch(
		'https://platform.phorest.com/third-party-api-server/api/business/QOR5AOtguWS6upmO84Dikw/client',
		{
			method: 'POST',
			headers: {
				Authorization: `Basic ${btoa(
					`${SECRET_PHOREST_AUTH_NAME}:${SECRET_PHOREST_AUTH_PASSWORD}`
				)}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: data.get('email'),
				emailReminderConsent: true,
				firstName: data.get('firstname'),
				lastName: data.get('lastname'),
				mobile: data.get('phone'),
				smsReminderConsent: true
			})
		}
	);
	const json = await response.json();
	return { clientId: json.clientId, err: json.errorCode };
}

async function send_email(data) {
	const appointment_time = new Date(data.startTime);
	const day = appointment_time.toLocaleDateString('de-DE', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	const time = appointment_time.toLocaleTimeString('de-DE', { hour: 'numeric', minute: 'numeric' });
	const mail_user = data.storename + '@glattt.com';
	const mail_pass = JSON.parse(SECRET_MAIL_PASSWORDS)[data.storename];

	console.log('mail_user', mail_user);
	console.log('mail_pass', mail_pass);

	console.log('day', day, 'time', time);
	const transporter = nodemailer.createTransport({
		host: SECRET_MAILHOST,
		port: SECRET_MAILPORT,
		secure: true,
		auth: {
			user: mail_user,
			pass: mail_pass
		}
	});

	const emailHtml = render({
		template: Booking_Confirmation,
		props: {
			firstname: data.firstname,
			lastname: data.lastname,
			day: day,
			time: time,
			store_info: data.store_info
		}
	});

	transporter.sendMail({
		from: mail_user,
		to: data.email,
		subject: `Dein Termin bei glattt Bremen am ${day} um ${time} Uhr wurde gebucht!`,
		html: emailHtml
	});

	transporter.sendMail({
		from: mail_user,
		to: mail_user,
		subject: `Dein Termin bei glattt Bremen am ${day} um ${time} Uhr wurde gebucht!`,
		html: emailHtml
	});

	return Promise.resolve;
}
