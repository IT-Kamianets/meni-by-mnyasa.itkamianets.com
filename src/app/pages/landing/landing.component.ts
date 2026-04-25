import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MenuItemComponent } from '../../components/menu-item/menu-item.component';
import { LanguageService } from '../../feature/language/language.service';
import { buildMenuGroups } from '../../feature/menu/menu-by-language.data';
import { MenuGroup, MenuSection } from '../../feature/menu/menu.data';

@Component({
	imports: [MenuItemComponent],
	templateUrl: './landing.component.html',
	styleUrl: './landing.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
	private readonly _languageService = inject(LanguageService);
	private readonly _viewportScroller = inject(ViewportScroller);

	protected readonly groups = computed(() => buildMenuGroups(this._languageService.language()));
	protected readonly selectedGroupId = signal('appetizers');
	protected readonly activeGroup = computed(
		() => this.groups().find((group) => group.id === this.selectedGroupId()) ?? this.groups()[0],
	);
	protected readonly activeSections = computed(() => this.activeGroup()?.sections ?? []);

	protected setGroup(groupId: string) {
	if (this.selectedGroupId() === groupId) {
		this.scrollToCategory(groupId);
		return;
	}

	this.selectedGroupId.set(groupId);

	setTimeout(() => {
		this.scrollToCategory(groupId);
	}, 0);
}

protected scrollToCategory(groupId: string) {
	const element = document.getElementById(groupId);

	if (!element) {
		return;
	}

	const y = element.getBoundingClientRect().top + window.scrollY - 90;

	window.scrollTo({
		top: y,
		behavior: 'smooth',
	});
}

	protected trackByGroup(_: number, group: MenuGroup) {
		return group.id;
	}

	protected trackBySection(_: number, section: MenuSection) {
		return section.id;
	}
}
