"use strict";(self.webpackChunknewsfront=self.webpackChunknewsfront||[]).push([[371],{4871:(g,d,o)=>{o.d(d,{F:()=>i});var s=o(4946);let i=(()=>{class e{setData(a){this.data=a}getData(){return this.data}}return e.\u0275fac=function(a){return new(a||e)},e.\u0275prov=s.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},1371:(g,d,o)=>{o.r(d),o.d(d,{ShareddiscoverModule:()=>C});var s=o(6814),i=o(4670),e=o(4946),l=o(8789),a=o(4871);function h(t,c){if(1&t){const n=e.EpF();e.TgZ(0,"div",5),e.NdJ("click",function(){const v=e.CHM(n).$implicit,u=e.oxw(2);return e.KtG(u.sendData(v.id))}),e.TgZ(1,"p",6),e.NdJ("click",function(){const v=e.CHM(n).$implicit,u=e.oxw(2);return e.KtG(u.sendData(v.id))}),e._uU(2),e.qZA()()}if(2&t){const n=c.$implicit;e.Udp("background",n.color),e.xp6(2),e.Oqu(n.name)}}function m(t,c){if(1&t&&(e.TgZ(0,"div",3),e.YNc(1,h,3,3,"div",4),e.qZA()),2&t){const n=e.oxw();e.xp6(1),e.Q6J("ngForOf",n.cats)}}const f=[{path:"discover-news",component:(()=>{class t{constructor(n,r,p){this.apiService=n,this.router=r,this.sharedService=p}ngOnInit(){this.apiService.getCategories().subscribe(n=>{this.cats=n,console.log(n)})}getDocID(n){this.apiService.getNewsByCategory(n).subscribe(r=>{console.log("clicked",r),this.router.navigate(["/cat-news"])})}sendData(n){localStorage.setItem("id",n),console.log(n),this.sharedService.setData(n),this.router.navigate(["/cat-news"])}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(l.s),e.Y36(i.F0),e.Y36(a.F))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-dicovernews"]],decls:5,vars:1,consts:[[1,"news"],[1,"n-h"],["class","news-data",4,"ngIf"],[1,"news-data"],["class","news-cat",3,"background","click",4,"ngFor","ngForOf"],[1,"news-cat",3,"click"],[3,"click"]],template:function(n,r){1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"h2"),e._uU(3," You Can Browse Through different news types "),e.qZA()(),e.YNc(4,m,2,1,"div",2),e.qZA()),2&n&&(e.xp6(4),e.Q6J("ngIf",r.cats))},dependencies:[s.sg,s.O5],styles:[".news[_ngcontent-%COMP%]{width:100%;display:grid;justify-items:center;padding-top:30px}.news-data[_ngcontent-%COMP%]{width:60%}.news-cat[_ngcontent-%COMP%]{display:inline-block;margin:20px;background-color:brown;color:#fff;padding:0 30px;border-radius:15px;cursor:pointer}@media screen and (orientation: portrait){.news-data[_ngcontent-%COMP%]{width:86%}.news-cat[_ngcontent-%COMP%]{margin:10px;padding:0 10px}.n-h[_ngcontent-%COMP%]{width:100%;display:grid;justify-items:center;text-align:center}}"]}),t})()},{path:"",loadChildren:()=>o.e(376).then(o.bind(o,4376)).then(t=>t.CategorynewsModule)}];let w=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[i.Bz.forChild(f),i.Bz]}),t})(),C=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[s.ez,w]}),t})()}}]);