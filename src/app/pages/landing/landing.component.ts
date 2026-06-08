import { ViewportScroller } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, computed, inject, signal } from '@angular/core';
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
export class LandingComponent implements AfterViewInit, OnDestroy {
	private readonly _languageService = inject(LanguageService);
	private readonly _viewportScroller = inject(ViewportScroller);
	private _observer: IntersectionObserver | null = null;

	protected readonly groups = computed(() => buildMenuGroups(this._languageService.language()));
	protected readonly selectedGroupId = signal('appetizers');
	protected readonly activeGroup = computed(
		() => this.groups().find((group) => group.id === this.selectedGroupId()) ?? this.groups()[0],
	);
	protected readonly activeSections = computed(() => this.activeGroup()?.sections ?? []);
	protected readonly activeSectionId = signal<string | null>(null);

	ngAfterViewInit() {
		this._initObserver();
	}

	ngOnDestroy() {
		this._observer?.disconnect();
	}

	private _initObserver() {
		this._observer?.disconnect();
		this._observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						this.activeSectionId.set(entry.target.id);
					}
				}
			},
			{ rootMargin: '-110px 0px -50% 0px', threshold: 0 },
		);

		document.querySelectorAll('[data-menu-section]').forEach((el) => this._observer!.observe(el));
	}

	protected setGroup(groupId: string) {
		if (this.selectedGroupId() === groupId) {
			this.scrollToCategory(groupId);
			return;
		}

		this.selectedGroupId.set(groupId);
		this.activeSectionId.set(null);

		setTimeout(() => {
			this.scrollToCategory(groupId);
			this._initObserver();
		}, 0);
	}

	protected selectSection(sectionId: string) {
		this.activeSectionId.set(sectionId);
		this.scrollToCategory(sectionId);
	}

	protected scrollToCategory(id: string) {
		const element = document.getElementById(id);

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
