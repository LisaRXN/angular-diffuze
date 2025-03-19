import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-annonce-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './annonce-detail.component.html',
  styleUrl: './annonce-detail.component.scss'
})
export class AnnonceDetailComponent {

private route = inject(ActivatedRoute)
  loading: boolean = false;


  ngOnInit() {
    // this.loading = true;
    // this.route.paramMap
    //   .pipe(
    //     switchMap((params: ParamMap) => of(params.get("id"))))
    //   .subscribe((adId: string) => {
    //     this.adService.getAdById(adId).subscribe((ad: any) => {
    //       this.bien = ad;
    //       this.bien.photos = this.bien.photos.sort((a, b) => a.pos - b.pos);
    //       console.log(this.bien);
    //       this.center = {
    //         lat: parseFloat(this.bien.latitude),
    //         lng: parseFloat(this.bien.longitude),
    //       };
    //       this.loading = false;
    //     });
    //   });
  }


}
