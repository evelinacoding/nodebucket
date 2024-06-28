"use strict";(self.webpackChunknodebucket=self.webpackChunknodebucket||[]).push([[919],{4919:(Z,c,r)=>{r.r(c),r.d(c,{SecurityModule:()=>S});var l=r(6814),a=r(2129),t=r(4769);let p=(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-security"]],decls:1,vars:0,template:function(n,s){1&n&&t._UZ(0,"router-outlet")},dependencies:[a.lC],encapsulation:2})}return e})();var o=r(95),f=r(459),g=r(9862);let m=(()=>{class e{constructor(i){this.http=i}findEmployeeById(i){return this.http.get("/api/employees/"+i)}static#t=this.\u0275fac=function(n){return new(n||e)(t.LFG(g.eN))};static#e=this.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function h(e,u){if(1&e&&(t.TgZ(0,"div",16),t._uU(1),t.qZA()),2&e){const i=t.oxw();t.xp6(1),t.hij(" ",i.errorMessage," ")}}function y(e,u){1&e&&(t.TgZ(0,"span"),t._uU(1,"Sign in"),t.qZA())}function v(e,u){1&e&&(t.TgZ(0,"div"),t._UZ(1,"span",17),t._uU(2," Loading... "),t.qZA())}const b=[{path:"",component:p,title:"Nodebucket: Security",children:[{path:"signin",component:(()=>{class e{constructor(i,n,s,d,C){this.fb=i,this.router=n,this.cookieService=s,this.secService=d,this.route=C,this.isLoading=!1,this.signinForm=this.fb.group({empId:[null,o.kI.compose([o.kI.required,o.kI.pattern("^[0-9]*$")])]}),this.sessionUser={},this.errorMessage=""}signin(){this.isLoading=!0,console.log("signinForm",this.signinForm.value);const i=this.signinForm.controls.empId.value;if(!i||isNaN(parseInt(i,10)))return this.errorMessage="The employee ID you entered is invalid, please try again.",void(this.isLoading=!1);this.secService.findEmployeeById(i).subscribe({next:n=>{console.log("employee",n),this.sessionUser=n,this.cookieService.set("session_user",i,1),this.cookieService.set("session_name",`${n.firstName} ${n.lastName}`,1),this.isLoading=!1,this.router.navigate(["/tasks"])},error:n=>{this.isLoading=!1,this.errorMessage=n.error.message?n.error.message:n.message}})}static#t=this.\u0275fac=function(n){return new(n||e)(t.Y36(o.qu),t.Y36(a.F0),t.Y36(f.N),t.Y36(m),t.Y36(a.gz))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-signin"]],decls:20,vars:4,consts:[[1,"box"],[1,"row","justify-content-center","nt-5"],["src","../../assets/gryffindor-symbol.jpg",1,"col-12","col-md-6","d-flex","justify-content-center","align-items-center","box"],[1,"col-12","col-md-6","d-flex","justify-content-center","align-items-center","box"],[1,"sign-in"],["class","alert alert-danger","role","alert",4,"ngIf"],[1,"card-body"],[1,"display-1","card-title","text-center"],[3,"formGroup","ngSubmit"],[1,"mb-4"],["for","empId",1,"form-label"],["type","text","id","empId","formControlName","empId",1,"form-control"],[1,"d-grid"],["type","submit",1,"btn","btn-lg"],[4,"ngIf"],["routerLink","/",1,"text-dark","text-underline-hover"],["role","alert",1,"alert","alert-danger"],["role","status","aria-hidden","true",1,"spinner-border","spinner-border-sm"]],template:function(n,s){1&n&&(t.TgZ(0,"div",0)(1,"div",1),t._UZ(2,"img",2),t.TgZ(3,"div",3)(4,"div",4),t.YNc(5,h,2,1,"div",5),t.TgZ(6,"div",6)(7,"h1",7),t._uU(8,"Sign In"),t.qZA(),t.TgZ(9,"form",8),t.NdJ("ngSubmit",function(){return s.signin(),s.signinForm.reset()}),t.TgZ(10,"div",9)(11,"label",10),t._uU(12,"Employee ID:"),t.qZA(),t._UZ(13,"input",11),t.qZA(),t.TgZ(14,"div",12)(15,"button",13),t.YNc(16,y,2,0,"span",14),t.YNc(17,v,3,0,"div",14),t.qZA()()()(),t.TgZ(18,"a",15),t._uU(19,"Return"),t.qZA()()()()()),2&n&&(t.xp6(5),t.Q6J("ngIf",s.errorMessage),t.xp6(4),t.Q6J("formGroup",s.signinForm),t.xp6(7),t.Q6J("ngIf",!s.isLoading),t.xp6(1),t.Q6J("ngIf",s.isLoading))},dependencies:[l.O5,a.rH,o._Y,o.Fj,o.JJ,o.JL,o.sg,o.u],styles:[".box[_ngcontent-%COMP%]{background-color:#511817}h1[_ngcontent-%COMP%]{color:#fba33a;font-size:100px;font-family:Potter-font,serif;text-shadow:12px 12px 15px #511817}.sign-in[_ngcontent-%COMP%]{background-color:#94230b;padding:100px}.form-label[_ngcontent-%COMP%]{color:#fff;font-size:30px;font-family:Open-Sauce,sans-serif}.form-control[_ngcontent-%COMP%]{height:50px}input[_ngcontent-%COMP%]{font-size:20px}.alert[_ngcontent-%COMP%]{color:#fba33a;font-size:20px;background-color:#000;width:auto}.remove-padding[_ngcontent-%COMP%]{padding:0}button[_ngcontent-%COMP%]{background-color:#511817;color:#fff;font-size:20px;font-family:Open-Sauce,sans-serif}"]})}return e})(),title:"Nodebucket: Signin"}]}];let x=(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275mod=t.oAB({type:e});static#n=this.\u0275inj=t.cJS({imports:[a.Bz.forChild(b),a.Bz]})}return e})(),S=(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275mod=t.oAB({type:e});static#n=this.\u0275inj=t.cJS({imports:[l.ez,x,o.u5,o.UX,g.JF,a.Bz]})}return e})()}}]);