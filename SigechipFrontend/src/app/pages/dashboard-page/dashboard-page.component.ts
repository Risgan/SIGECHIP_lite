import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { BannerService } from '../../services/banner.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [PrimengModule, FormsModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DashboardPageComponent implements OnInit {

  banners: any[]=[]

  responsiveOptions: any[] = [
    { 
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(
    private readonly bannerService: BannerService
  ) {
    this.banners = [];
   }
  
  ngOnInit(): void {
    this.loadBanners();
  }

  private loadBanners(): void {

    this.banners = this.bannerService.getBanner();
      
  }

  test(){
    console.log(this.banners);
    
  }
}
