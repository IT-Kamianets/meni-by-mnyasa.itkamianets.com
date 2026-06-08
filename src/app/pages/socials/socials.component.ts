import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TranslateDirective, TranslatePipe } from '@wawjs/ngx-translate';

type BookingStatus = 'idle' | 'loading' | 'success' | 'error';

@Component({
	imports: [NgOptimizedImage, TranslateDirective, TranslatePipe],
	templateUrl: './socials.component.html',
	styleUrl: './socials.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialsComponent {
	protected readonly showBookingForm = signal(false);
	protected readonly bookingName = signal('');
	protected readonly bookingPhone = signal('');
	protected readonly bookingStatus = signal<BookingStatus>('idle');

	protected openBookingForm() {
		this.bookingName.set('');
		this.bookingPhone.set('');
		this.bookingStatus.set('idle');
		this.showBookingForm.set(true);
	}

	protected closeBookingForm() {
		this.showBookingForm.set(false);
	}

	protected async submitBooking() {
		const name = this.bookingName().trim();
		const phone = this.bookingPhone().trim();

		if (!name || !phone) return;

		this.bookingStatus.set('loading');

		try {
			const res = await fetch('https://it.webart.work/api/telegram/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					slug: 'meni-by-mnyasa',
					message: `Meni by Mnyasa\nБронювання столика\nІм'я: ${name}\nТелефон: ${phone}`,
				}),
			});

			const data = await res.json();
			this.bookingStatus.set(data === true ? 'success' : 'error');
		} catch {
			this.bookingStatus.set('error');
		}
	}
}
