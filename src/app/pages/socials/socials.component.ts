import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateDirective, TranslatePipe } from '@wawjs/ngx-translate';

@Component({
	imports: [NgOptimizedImage, TranslateDirective, TranslatePipe],
	templateUrl: './socials.component.html',
	styleUrl: './socials.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialsComponent {}
