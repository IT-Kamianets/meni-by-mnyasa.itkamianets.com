import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateDirective } from '@wawjs/ngx-translate';

@Component({
	imports: [RouterLink, TranslateDirective],
	templateUrl: './navigation.component.html',
	styleUrl: './navigation.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
	protected readonly navItems = [
		{ label: 'Articles', icon: 'article', route: '/articles' },
		{ label: 'Reviews', icon: 'rate_review', route: '/reviews' },
		{ label: 'Events', icon: 'event', route: '/events' },
		{ label: 'Jobs', icon: 'work', route: '/jobs' },
	];
}
