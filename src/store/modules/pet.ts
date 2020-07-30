import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";
import store from "@/store";
import { Pet, PetStatusEnum } from "@/api-client";
import { petApi } from "../api";

type Status = typeof PetStatusEnum[keyof typeof PetStatusEnum];

// Type Guard
function isPet(arg: any): arg is Pet {
  return (
    arg !== null &&
    "category" in arg &&
    "name" in arg &&
    "photoUrls" in arg &&
    "tags" in arg &&
    "status" in arg
  );
}

@Module({
  dynamic: true,
  namespaced: true,
  name: "Pets",
  store
})
class Pets extends VuexModule {
  private pets: Pet[] = [];
  private _pet: Pet | null = null;

  public get allPet(): Pet[] {
    return this.pets;
  }

  public get pet() {
    return this._pet;
  }

  @Mutation
  private setPets(pets: Pet | Pet[]) {
    if (isPet(pets)) {
      this.pets.push(pets);
    } else {
      this.pets.splice(0);
      this.pets.push(...pets);
    }
  }

  @Mutation
  private setPet(pet: Pet) {
    this._pet = pet;
  }

  @Action({ commit: "setPets", rawError: true })
  public async findPetsByStatus(status: Array<Status>) {
    const response = await petApi.findPetsByStatus(status);
    return response.data;
  }

  @Action({ commit: "setPet", rawError: true })
  async getPetById(id: number) {
    const response = await petApi.getPetById(id);
    return response.data;
  }

  @Action({ commit: "setPets", rawError: true })
  public async addPet(pet: Pet) {
    await petApi.addPet(pet);
    return pet;
  }

  @Action({ rawError: true })
  public async updatePet(pet: Pet) {
    await petApi.updatePet(pet);
  }

  @Action({ rawError: true })
  async deletePet(id: number) {
    await petApi.deletePet(id);
  }
}

export default getModule(Pets);
