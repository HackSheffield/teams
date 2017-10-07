# GitHub Organization Visualiser

Include the following scss as a fix for Bootstrap 4's card columns:

     .card-columns {
       @include media-breakpoint-only(xl) {
         column-count: 5;
       }
       @include media-breakpoint-only(lg) {
         column-count: 4;
       }
       @include media-breakpoint-only(md) {
         column-count: 3;
       }
       @include media-breakpoint-only(sm) {
         column-count: 2;
       }
     } 
