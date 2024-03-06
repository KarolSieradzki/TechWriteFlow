import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss'
})
export class CreateProjectComponent {
  projectName: string | null = null;
  projectDate: Date | null = null;
  projectDescription: string | null = null;
  projectPhoto: Blob | null = null!;
  editorContent: any = '';
  @ViewChild('new-proj-editor') editor0a1b!: ElementRef;


  editorConf={
    base_url: '/tinymce', // Root for resources
    suffix: '.min', // Suffix to use when loading resources
  }

  constructor(
  ){
    this.projectDate = new Date();
  }

  save(){
    console.log(this.projectName)
    console.log(this.projectDate)
    console.log(this.projectDescription)
    console.log(this.projectPhoto)
    console.log(this.editorContent)

  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.projectDate = event.value;
  }

  imageReady(blob: Blob){
    this.projectPhoto = blob;
  }
}
