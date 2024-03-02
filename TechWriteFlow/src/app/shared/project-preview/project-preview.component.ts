import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.component.html',
  styleUrl: './project-preview.component.scss'
})
export class ProjectPreviewComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageURL: string = '';
  @Input() date: Date = new Date()

  constructor(){}
}
