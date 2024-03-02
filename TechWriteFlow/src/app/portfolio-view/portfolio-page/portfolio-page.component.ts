import { Component } from '@angular/core';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { ActivatedRoute } from '@angular/router';
import { Portfolio } from '../../shared/firestore-models/portfolio.model';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.scss'
})
export class PortfolioPageComponent {

  alias:string = null!;
  portfolioExist: boolean = false;
  portfolioPublic: boolean = false;
  portfolioLoaded: boolean = false
  portfolio: Portfolio = null!;

  constructor(
    private portfolioService: PortfolioService,
    private route:ActivatedRoute,
  ){
    this.alias = this.route.snapshot.params['uid'];

    portfolioService.portfolioExist(this.alias).then((exist)=>{
      this.portfolioExist = exist;
      if(exist){
        portfolioService.getPortfolioByAlias(this.alias).then((portfolio)=>{
          this.portfolio = portfolio!;
          this.portfolioPublic = (portfolio?.public)?true:false;
          this.portfolioLoaded = true;
        })
      }
    })
  }

  

}
