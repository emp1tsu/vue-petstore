// import {
//   VuexModule,
//   Module,
//   Mutation,
//   Action,
//   getModule
// } from "vuex-module-decorators";
// import store from "@/store";
//
// @Module({
//   dynamic: true,
//   namespaced: true,
//   name: "Pets",
//   store
// })
// class Pets extends VuexModule {
//   public Pets = {};
//
//   public get isLogged(): boolean {
//     return this.user !== null;
//   }
//
//   @Mutation
//   _setUser(user: any) {
//     this.user = user;
//   }
//
//   @Action({ commit: "setUser" })
//   setUser(user: any) {
//     return user;
//   }
// }
//
// export default getModule(Users);
