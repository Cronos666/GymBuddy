class Food
{
  constructor(name, protein, fat, carbs, kcal)
  {
    this.name = name;
    this.protein = Number(protein);
    this.fat = Number(fat);
    this.carbs = Number(carbs);
    this.kcal = Number(kcal);
  }
 //getters
  get_name() {return this.name;} 
  get_protein() {return this.protein;} 
  get_fat() {return this.fat;} 
  get_carbs() {return this.carbs;} 
  get_kcal() {return this.kcal;} 
  get_str() 
  {
    return this.name+
           ' protein: '+this.protein+
           ' fat: '+this.fat+
           ' carbs: '+this.carbs+
           ' kcal: '+this.kcal;
  }  
}

function max_macro(db, max_kcal) 
{
  if (db.length === 0 || max_kcal === 0) 
  {
      result = [0, []];
  } else if (db[0].get_kcal() > max_kcal) {
      result = max_macro(db.slice(1), max_kcal);
  } else {
      let next_item = db[0];
      let [take_val, take_item] = max_macro(db.slice(1), max_kcal - next_item.get_kcal());
      take_val += next_item.get_protein();
      let [not_val, not_taken] = max_macro(db.slice(1), max_kcal);
      if (take_val > not_val) 
      {
          result = [take_val, take_item.concat(next_item)];
      } else {
          result = [not_val, not_taken];
      }
  }
  return result;
}
function pull_data()
{
  let n = document.forms["form1"]["data1"].value;
  let p = document.forms["form1"]["data2"].value;
  let f = document.forms["form1"]["data3"].value;
  let c = document.forms["form1"]["data4"].value;
  let k = document.forms["form1"]["data5"].value; 
  if (n == "" || p == "" || f == "" || c == "" || k == "")
  {
    alert("Fields can't be empty");
    return false;
  } else {
    return new Food(n, p, f, c, k);
  }
}
const db = [];
function do_the_thing()
{
  let x = pull_data()
  db.push(x);
  document.getElementById("out").innerHTML += x.get_str()+'<br>';
}
function calculate()
{
  let kalories = Number(document.forms["form1"]["data6"].value);
  let [x, y] = max_macro(db, kalories);
  
  document.getElementById("out").innerHTML = 'Total protein: '+x+'<br>Chosen items:<br>';
  for(let i=0; i<y.length; i++)
  {
    document.getElementById("out").innerHTML += y[i].get_str()+'<br>';
  }
}