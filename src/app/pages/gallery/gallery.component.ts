import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TranslateDirective } from '@wawjs/ngx-translate';

interface GalleryPhoto {
	src: string;
	alt: string;
}

@Component({
	imports: [TranslateDirective],
	templateUrl: './gallery.component.html',
	styleUrl: './gallery.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
	protected readonly photos: GalleryPhoto[] = [
  { src: 'gallery/demo-1.webp', alt: 'Dish' },
  { src: 'gallery/demo-2.webp', alt: 'Dish' },
  { src: 'gallery/demo-3.webp', alt: 'Dish' },
  { src: 'gallery/demo-4.webp', alt: 'Dish' },
  { src: 'gallery/demo-5.webp', alt: 'Restaurant' },
  { src: 'gallery/demo-6.webp', alt: 'Interior' },
  { src: 'gallery/demo-7.webp', alt: 'Food' },
  { src: 'gallery/demo-8.webp', alt: 'Serving' },
  { src: 'gallery/demo-9.webp', alt: 'Grill' }
];

	protected readonly selectedPhoto = signal<GalleryPhoto | null>(null);

	protected openPhoto(photo: GalleryPhoto) {
		this.selectedPhoto.set(photo);
	}

	protected closePhoto() {
		this.selectedPhoto.set(null);
	}
}
