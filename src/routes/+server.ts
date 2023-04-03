import {
	SECRET_PHOREST_AUTH_NAME,
	SECRET_PHOREST_AUTH_PASSWORD,
	SECRET_WITH_TREATMENT,
	SECRET_WITHOUT_TREATMENT,
	SECRET_BRANCH_IDS,
	SECRET_BUSINESS_ID
} from '$env/static/private';
import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const { branchId, serviceId } = getBranchAndServiceId(
		url.searchParams.get('storename'),
		url.searchParams.get('with_treatment')
	);
	const monday = new Date(url.searchParams.get('monday'));
	const sunday = new Date(url.searchParams.get('sunday'));

	const response = await fetch(
		`https://platform.phorest.com/third-party-api-server/api/business/${SECRET_BUSINESS_ID}/branch/${branchId}/appointments/availability`,
		{
			method: 'POST',
			headers: {
				Authorization: `Basic ${btoa(
					`${SECRET_PHOREST_AUTH_NAME}:${SECRET_PHOREST_AUTH_PASSWORD}`
				)}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				clientServiceSelections: [
					{
						serviceSelections: [
							{
								serviceId: serviceId
							}
						]
					}
				],
				endTime: sunday,
				startTime: monday
			})
		}
	);

	const { data } = await response.json();
	return json(data);
};

export const POST = async ({ request }) => {
	const { data } = await request.json();
	const { branchId, serviceId } = getBranchAndServiceId(data.storename, data.with_treatment);
	const start = new Date(data.startTime);
	const end = new Date(data.endTime);

	try {
		const response = await fetch(
			`https://platform.phorest.com/third-party-api-server/api/business/${SECRET_BUSINESS_ID}/branch/${branchId}/booking`,
			{
				method: 'POST',
				headers: {
					Authorization: `Basic ${btoa(
						`${SECRET_PHOREST_AUTH_NAME}:${SECRET_PHOREST_AUTH_PASSWORD}`
					)}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					bookingStatus: 'ACTIVE',
					clientAppointmentSchedules: [
						{
							clientId: data.clientId,
							serviceSchedules: [
								{
									serviceId: serviceId,
									staffId: data.staffId,
									startTime: start,
									endTime: end
								}
							]
						}
					],
					clientId: data.clientId,
					note: data.message
				})
			}
		);
		const response_data = await response.json();
		if (response_data.statusCode) {
			return json({ ok: false, status: 500, message: response_data });
		} else {
			return json({ ok: true, status: 200, message: response_data });
		}
	} catch (error) {
		return json({ ok: false, status: 500, message: error });
	}
};

function getBranchAndServiceId(storename: string, with_treatment: string) {
	const branch_info = JSON.parse(SECRET_BRANCH_IDS);
	const branchId = branch_info[storename];
	let serviceId = SECRET_WITHOUT_TREATMENT;
	if (with_treatment === 'true') {
		serviceId = SECRET_WITH_TREATMENT;
	}
	return { branchId, serviceId };
}
