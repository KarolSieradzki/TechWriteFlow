import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent implements OnInit{
  
  text: string = "404, page not found.";
  displayedText: string = "";
  private currentIndex: number = 0;

  ngOnInit(): void {
    this.typeNextLetter();
  }

  private typeNextLetter() {
    if (this.currentIndex < this.text.length) {
      this.displayedText += this.text[this.currentIndex++];
      setTimeout(() => this.typeNextLetter(), 100); 
    }
  }
}
