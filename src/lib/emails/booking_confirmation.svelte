<script>
	import { Button, Hr, Html, Text } from 'svelte-email';

	export let firstname = 'Gay';
	export let lastname = 'Coksuka';
	export let day = '01.01.2021';
	export let time = '12:00';
	export let with_treatment = true;
	export let store_info;
	store_info = JSON.parse(store_info);
</script>

<Html lang="de">
	{#if with_treatment}
		<div style="color:#808080;font-family:Segoe UI, Arial, sans-serif;">
			<h1>Hallo {firstname}</h1>
			<p>Dein Termin wurde gebucht!</p>
			<br />
			<p>Vielen Dank für Deine Buchung eines</p>
			<ul>
				<li>gratis Beratungsgesprächs</li>
				<li>mit anschließender Behandlung</li>
			</ul>
			<p>
				bei Deinem glattt Institut für dauerhafte Haarentfernung in {store_info.name.split(' ')[1]}.
				Die Adresse ist:
				<a style="color:#E7B53A" href={store_info.location.gmaps}>{store_info.location.address}</a>
			</p>
			<br />
			<p>
				Bitte beachte vor Deinem Termin unsere Behandlungshinweise: <a
					style="color:#E7B53A"
					href="https://www.glattt.com/behandlung">https://www.glattt.com/behandlung</a
				>
			</p>
			<br />
			<p>Eine Sitzung kostet pro Körperzone 49,99 €. Meistens benötigst Du 9 Sitzungen.</p>
			<p>
				Die Details unserer Preise findest Du hier: <a
					style="color:#E7B53A"
					href="https://www.glattt.com/preise">https://www.glattt.com/preise</a
				>
			</p>
			<br />
			<p>
				Bei irgendwelchen Fragen, melde Dich gerne bei uns unter <a
					style="color:#E7B53A"
					href={store_info.phone.link}>{store_info.phone.number}</a
				>
			</p>
			<br />
			<p>Wir freuen uns sehr auf Dich!</p>
			<p>Dein Team glattt</p>
		</div>
	{:else}
		<div style="color:#808080;font-family:Segoe UI, Arial, sans-serif;">
			<p>Dein Termin wurde gebucht!</p>
			<br />
			<p>Vielen Dank für Deine Buchung eines</p>
			<ul>
				<li>gratis Beratungsgesprächs</li>
				<li>mit anschließender Behandlung</li>
			</ul>
			<p>
				bei Deinem glattt Institut für dauerhafte Haarentfernung in Bremen. Die Adresse ist: <a
					style="color:#E7B53A"
					href={store_info.location.gmaps}>{store_info.location.address}</a
				>
			</p>
			<br />
			<p>
				Bitte beachte vor Deinem Termin unsere Behandlungshinweise: <a
					style="color:#E7B53A"
					href="https://www.glattt.com/behandlung">https://www.glattt.com/behandlung</a
				>
			</p>
			<br />
			<p>Eine Sitzung kostet pro Körperzone 49,99 €. Meistens benötigst Du 9 Sitzungen.</p>
			<p>
				Die Details unserer Preise findest Du hier: <a
					style="color:#E7B53A"
					href="https://www.glattt.com/preise">https://www.glattt.com/preise</a
				>
			</p>
			<br />
			<p>
				Bei irgendwelchen Fragen, melde Dich gerne bei uns unter <a
					style="color:#E7B53A"
					href={store_info.phone.link}>{store_info.phone.number}</a
				>
			</p>
			<br />
			<p>Wir freuen uns sehr auf Dich!</p>
			<p>Dein Team glattt</p>
		</div>
	{/if}
	<div style="color:#808080;font-family:Segoe UI, Arial, sans-serif;">
		<br /><br />
		<h3 style="color:#E7B53A;font-weight:semibold">
			glattt Institut für dauerhafte Haarentfernung
		</h3>
		<p>
			Tel: <a style="color:#E7B53A" href={store_info.phone.link}>{store_info.phone.number}</a>
		</p>
		<p>
			WhatsApp: <a style="color:#E7B53A" href={store_info.whatsapp.link}
				>{store_info.whatsapp.number}</a
			>
		</p>
		<p>
			E-Mail: <a
				style="color:#E7B53A"
				href="mailto:{store_info.name.split(
					' '
				)[1]}@glattt.com?subject=Termin von {firstname} {lastname} am {day} um {time} Uhr"
				>{store_info.name.split(' ')[1]}@glattt.com</a
			>
		</p>
		<p>Web: <a style="color:#E7B53A" href="https://www.glattt.com">www.glattt.com</a></p>
		<p>
			Adresse: <a style="color:#E7B53A" href={store_info.location.gmaps}
				>{store_info.location.address}</a
			>
		</p>
		<br />
		<hr />
		<p>
			Labrado & Schlüter GmbH - Sitz: Altstädter Kirchstr. 10 | 33602 Bielefeld | Deutschland -
			Amtsgericht Bielefeld HRB 42341 | Geschäftsführende Gesellschafter: Maren Schlüter, Alberto
			Labrado Losada
		</p>
		<br />
		<p>
			Diese E-Mail und eventuelle Anlagen können vertrauliche und/oder rechtlich geschützte
			Informationen enthalten. Wenn Sie nicht der richtige Adressat sind oder diese E-Mail
			irrtümlich erhalten haben, informieren Sie bitte sofort den Absender und vernichten Sie diese
			E-Mail. Das unerlaubte Kopieren sowie die unbefugte Weitergabe dieser E-Mail sind nicht
			gestattet.
		</p>
		<br />
		<hr />
	</div>
</Html>
