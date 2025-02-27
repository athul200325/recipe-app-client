import { Component, Input } from '@angular/core';
import { ApiService } from '../../srvices/api.service';
import { RecipeModel } from '../model/recipeModel';
import { Router } from '@angular/router';

@Component({
    selector: 'app-manage-recipe',
    templateUrl: './manage-recipe.component.html',
    styleUrl: './manage-recipe.component.css',
    standalone: false
})
export class ManageRecipeComponent {

  @Input() id !: string
  recipeDetails:RecipeModel = {}
  cuisineArray:string[] = [
    "Italian", "Chinese", "Indian", "Mexican", "French", "Japanese", "Greek", "Thai", "Spanish", "Mediterranean"
  ]
  ingredients:any = []
  instructions:any = []
  mealArray:any = []
  mealTypeArry: string[] = [
    "Breakfast",
    "Brunch",
    "Lunch",
    "Dinner",
    "Snack",
    "Dessert",
    "Appetizer",
    "Side Dish",
    "Beverage",
  ];

  constructor(private api:ApiService, private router:Router){}

  ngOnInit(){
    this.getAllRecipes()
  }

  getAllRecipes(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      if(this.id){
        this.recipeDetails = res.find((item:any)=>item._id==this.id)
        this.ingredients = this.recipeDetails.ingredients
        this.instructions = this.recipeDetails.instructions
        this.mealArray = this.recipeDetails.mealType
      }
    })
  }

  addRecipe(){
    this.recipeDetails.ingredients = this.ingredients
    this.recipeDetails.instructions = this.instructions
    this.recipeDetails.mealType = this.mealArray
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType } = this.recipeDetails
    if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length>0){
      this.api.addRecipeAPI(this.recipeDetails).subscribe({
        next:(res:any)=>{
          alert("Recipe Added Successfully!")
          this.recipeDetails = {}
          this.ingredients = []
          this.instructions = []
          this.mealArray = []
          this.router.navigateByUrl("/admin/recipe-lsit")
        },
        error:(reason:any)=>{
          alert(reason.error)
          this.recipeDetails.name = ""
        }
      })
    }else{
      alert("Fill the form completely!!")
    }
  }

  addIngredients(ingredientInput:any){
    if(ingredientInput.value){
      this.ingredients.push(ingredientInput.value)
      ingredientInput.value = ""
    }
  }

  addInstructions(instrucctionInput:any){
    if(instrucctionInput.value){
      this.instructions.push(instrucctionInput.value)
      instrucctionInput.value = ""
    }
  }

  removeInstructions(value:string){
    this.instructions = this.instructions.filter((item:string)=>item!=value)
  }

  removeIngredients(value:string){
    this.ingredients = this.ingredients.filter((item:string)=>item!=value)
  }

 mealTypeSelect(event: any, mealType: string) {
  if (event.target.checked) {
    if (!this.mealArray.includes(mealType)) {
      this.mealArray.push(mealType);
    }
  } else {
    this.mealArray = this.mealArray.filter((item:string) => item !== mealType);
  }
}

removeMealType(mealType: string) {
  this.mealArray = this.mealArray.filter((item:String) => item !== mealType);
}

  updateRecipe(){
    this.recipeDetails.ingredients = this.ingredients
    this.recipeDetails.instructions = this.instructions
    this.recipeDetails.mealType = this.mealArray
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType } = this.recipeDetails
    if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length>0){
      this.api.updateRecipeAPI(this.id ,this.recipeDetails).subscribe((res:any)=>{
          alert("Recipe Updated Successfully!")
          this.recipeDetails = {}
          this.ingredients = []
          this.instructions = []
          this.mealArray = []
          this.router.navigateByUrl("/admin/recipe-list")
      })
    }else{
      alert("Fill the form completely!!")
    }
  }
}
