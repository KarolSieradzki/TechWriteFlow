import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolio-not-found',
  templateUrl: './portfolio-not-found.component.html',
  styleUrl: './portfolio-not-found.component.scss'
})
export class PortfolioNotFoundComponent {
 
  text: string = "portfolio does not exist or is private";
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
