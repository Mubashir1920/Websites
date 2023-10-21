//Storage Controller 

const StorageCtrl = (function(){

    //Public Methods
    return {
        storeitem : function(item){

            let Items;

            //Check For ITems in Ls
            if ( localStorage.getItem('Items') === null ){
                //Set array to empty
                items = [];
                //push item to array
                items.push(item)
                // set item to local storge
                localStorage.setItem('Items' , JSON.stringify(items))

                
            }else{
                //If there is any then pull it out
                let items = JSON.parse(localStorage.getItem('Items'))
                //Push the new item
                items.push(item);
                //Set To ls
                localStorage.setItem('Items' , JSON.stringify(items))
            }
            

        },



        getItemsFromStorage: function(){
            let items;
            if(localStorage.getItem('Items') === null){
              items = [];
            } else {
              items = JSON.parse(localStorage.getItem('Items'));
            }
            return items;
        },


        updatefromstorage : function(updateditem){
            let items = JSON.parse(localStorage.getItem('Items'))

            items.forEach(function(item , index){
                if(updateditem.id === item.id){
                    items.splice(index , 1 ,updateditem)
                }
            });
            localStorage.setItem("Items",JSON.stringify(items))



        },


        deletefromstorage : function(item){

            let items = JSON.parse(localStorage.getItem('Items'))

            items.forEach(function(item , index){
                if(item.id === item.id){
                    items.splice(index , 1 )
                }
            });
            localStorage.setItem("Items",JSON.stringify(items))


        },


        clearstorage : function(){

            localStorage.clear();

        }






    }



})()




//ITEM CONTROLLER
const Itemctrl = (function (){      
    
    //Item Constructor
    const Item = function(id, name , calories){
        this.id = id ;
        this.name = name ; 
        this.calorie = calories ;
    }


    //Data structure / State

    const Data ={
        // Items : [
        //     // {id:0 , name : 'Bread' ,  calories : 300} ,
        //     // {id:1 , name : 'BrawnBread' ,  calories : 900},
        //     // {id:2 , name : 'MilkBread' ,  calories : 500}
        // ],

        Items : StorageCtrl.getItemsFromStorage(),
        currentItem : null, 
        totalcalorie : 0
    }

    //Public Methods
    return{
        logdata : function(){
            return Data;
        },

        additem : function(name , calorie){
            let ID 
            if (Data.Items.length > 0 ){
                ID = Data.Items.length + 1;
            }else{
                ID = 0;
            }

            calorie = parseInt(calorie);

            NewItem = new Item(ID , name , calorie)

            Data.Items.push(NewItem)

            return NewItem;
            
        },

        deleteItem : function(id){

            let ids = Data.Items.map(function(item){
                return item.id
            })
            //Get Index 
            const index = ids.indexOf(id)


            Data.Items.splice(index , 1)

        },

        getitembyid : function(id){
            let found = null ;

            Data.Items.forEach(function(item){
                if(item.id === id)
                {
                    found = item
                }

            })
            return found;
        },


        upadteitem :function(name , calorie){
            calorie = parseInt(calorie);
            let found = null

            Data.Items.forEach(function(item){
                if(item.id === Data.currentItem.id){
                    item.name = name;
                    item.calorie = calorie;
                    found = item

                }


            })
            return found;
        },

        clearItems : function(){
            Data.Items = [];

        },

        getcurrentitem : function(){

            return Data.currentItem;
        },

        setcurrentitem : function(item){
            Data.currentItem= item;
        },

        gettotalcalories : function(){

            let total = 0 ;

            Data.Items.forEach(function(item){
                total += item.calorie;

            })

            Data.totalcalorie = total

            return Data.totalcalorie 
        },

        getitems: function(){
            return Data.Items;
        }
    }
    
    
    
})();



//UI CONTROLLER 
const UIctrl = (function (){


    const UISelectors = {
        Itemlist : '#item-list' ,
        listitems : '#item-list li',
        addbtn :    '.add-btn',
        deletebtn : '.delete-btn',
        editbtn : '.update-btn',
        backbtn : '.back-btn',
        clearbtn : '.clear-btn',
        itemname : '#item-name',
        caloriecount : '#item-calories',
        totalcalories : '.total-calories'
    }
    




    //Public Methods
    return{

        populateItems : function(items){
          
            
            let htmlStr ='';
            items.forEach(item => {
                htmlStr += `
                    <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong> <em>${item.calorie} Calories</em>
                    <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                    </a>
                    </li>
                `
            });

            document.querySelector(UISelectors.Itemlist).innerHTML = htmlStr;
        },

        getiteminput : function(){
            return{
                name :   document.querySelector(UISelectors.itemname).value,
                calorie :    document.querySelector(UISelectors.caloriecount).value,
            }    
        },

        addlistitem : function(item){
             //DIsplay List

           document.querySelector(UISelectors.Itemlist).style.display ='block';
            

            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`

            li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calorie} Calories</em>
            <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
            </a>`
            

            document.querySelector(UISelectors.Itemlist).insertAdjacentElement('beforeend', li);



        },


        updateitemlist : function(item){

            let listitems = document.querySelectorAll(UISelectors.listitems);

            listitems = Array.from(listitems);

            listitems.forEach(function(listitem){
                const itemid = listitem.getAttribute('id');

                if(itemid === `item-${item.id}`){
                    document.querySelector(`#${itemid}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calorie} Calories</em>
                    <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                    </a>`
                }
            })


        },

        deleteallitemsfromui : function(){
            let listitems = document.querySelectorAll(UISelectors.listitems)

            listitems = Array.from(listitems);

            listitems.forEach(function(item){
                item.remove();
            })
        },


        deletelistitem : function(id){
            let itemID = `#item-${id}`
            let item = document.querySelector(itemID);
            item.remove();
        },

        showtotalcalories : function(total){
            document.querySelector(UISelectors.totalcalories).textContent = total

        },


        additemtoform : function(){
            document.querySelector(UISelectors.itemname).value = Itemctrl.getcurrentitem().name
            document.querySelector(UISelectors.caloriecount).value = Itemctrl.getcurrentitem().calorie

            UIctrl.showeditstate();
        },

        hidelist : function(){
            document.querySelector(UISelectors.Itemlist).style.display ='none';


        },

        clearinput : function(){
            document.querySelector(UISelectors.itemname).value =''
            document.querySelector(UISelectors.caloriecount).value =''
        },

        cleareditstate : function(){
            UIctrl.clearinput();
            document.querySelector(UISelectors.editbtn).style.display ='none';
            document.querySelector(UISelectors.deletebtn).style.display ='none';
            document.querySelector(UISelectors.backbtn).style.display ='none';
            document.querySelector(UISelectors.addbtn).style.display ='inline';
            

        },

        showeditstate : function(){
            document.querySelector(UISelectors.editbtn).style.display ='inline';
            document.querySelector(UISelectors.deletebtn).style.display ='inline';
            document.querySelector(UISelectors.backbtn).style.display ='inline';
            document.querySelector(UISelectors.addbtn).style.display ='none';


        },
        getselectors : function(){
            return  UISelectors;
        }



    }

})();




//APP CONTROLLER
const App = (function (Itemctrl,UIctrl, StorageCtrl){
    //Load Event Listeners
    const loadeventlisteners = function(){
        const UIselectors = UIctrl.getselectors();

        
        //add item event
        document.querySelector(UIselectors.addbtn).addEventListener('click' , Itemaddsubmit)


        //Disable Enter Key
        document.addEventListener('keypress',function(e){
            if(e.keycode === 13 || e.which === 13){
                e.preventDefault();
                return false;
            }

        });

        //Edit Item Submit 
        document.querySelector(UIselectors.Itemlist).addEventListener('click' , itemeditsubmit)

        //UPdate item event 
        document.querySelector(UIselectors.editbtn).addEventListener('click' , itemupdatesubmit)
        
        
        //BAck item event 
        document.querySelector(UIselectors.backbtn).addEventListener('click' , UIctrl.cleareditstate);
        
        
        //Delete item event 
        document.querySelector(UIselectors.deletebtn).addEventListener('click' , itemdeletesubmit);
        
        
        //Clear item event 
        document.querySelector(UIselectors.clearbtn).addEventListener('click' , clearitemsclick);
        
        
        
    }
    
    //add item submit 
    const Itemaddsubmit = function(e){


        //GEt Form INput From UI controller
        const input = UIctrl.getiteminput();


        //Check For VAlidity
        if(input.name !== '' && input.calorie !== ''){
            // console.log('hello')

            //Add Item 
            const newitem = Itemctrl.additem(input.name , input.calorie);
            

            //Add item to UI
            UIctrl.addlistitem(newitem);

            //Get Total Calories
            const totalcalories = Itemctrl.gettotalcalories();

            //Show Total Calories to UI
            UIctrl.showtotalcalories(totalcalories);

            //Store to ls
            StorageCtrl.storeitem(newitem)

            //Clear Input Fielda
            UIctrl.clearinput();
            
        }


        e.preventDefault();
    }


    //Item Edit Submit
    const itemeditsubmit = function(e){
        
        if (e.target.classList.contains('edit-item')) {
            
            //GEt Id of Item
            const listid = e.target.parentNode.parentNode.id;

            // Break into an array
            const listIdArr = listid.split('-');

            // Get the actual id
            const id = parseInt(listIdArr[1]);
            
            //GEt the Item
            const itemtoedit = Itemctrl.getitembyid(id);

            //Set Current Item
            Itemctrl.setcurrentitem(itemtoedit);

            

            //Add item to form
            UIctrl.additemtoform();




        }

        e.preventDefault();
    }

    //Update Item 
    const itemupdatesubmit = function(e){


        //GEt ITem INput 
        const input = UIctrl.getiteminput();

        //UPdated item
        const updateditem = Itemctrl.upadteitem(input.name , input.calorie)


        //update the UI
        UIctrl.updateitemlist(updateditem);


        //Get Total Calories
        const totalcalories = Itemctrl.gettotalcalories();

        //Show Total Calories to UI
        UIctrl.showtotalcalories(totalcalories);

        //Update from Local Storage
        StorageCtrl.updatefromstorage(updateditem);


        //Clear Edit State
        UIctrl.cleareditstate();
    

        e.preventDefault();
    }

    //Delet an Item 
    const itemdeletesubmit = function(e){

        //Get Current Item
        const currentitem = Itemctrl.getcurrentitem();

        //Delete from Data structure
        Itemctrl.deleteItem(currentitem.id);

        //Delete from UI 
        UIctrl.deletelistitem(currentitem.id);

        //Get Total Calories
        const totalcalories = Itemctrl.gettotalcalories();

        //Show Total Calories to UI
        UIctrl.showtotalcalories(totalcalories);

        //Delete from Local Storage
       StorageCtrl.deletefromstorage(currentitem)
 
 
        //Clear Edit State
        UIctrl.cleareditstate();



        e.preventDefault();
    }
    //Clear All Items
    const clearitemsclick = function(e){

        //Delete from Data Structure
        Itemctrl.clearItems();
        
        //Get Total Calories
        const totalcalories = Itemctrl.gettotalcalories();

        //Show Total Calories to UI
        UIctrl.showtotalcalories(totalcalories);
        

        //Delet from UI
        UIctrl.deleteallitemsfromui();


        //Clear From Storage
        StorageCtrl.clearstorage();

        //Hide list
        UIctrl.hidelist();




        e.preventDefault();
    }




    //Public Methods
    return{
        init : () =>{

            // Set Initial  Button State
            UIctrl.cleareditstate();

            //Get Items From Data Struucture
            const items = Itemctrl.getitems();

            if(items.length === 0){
                UIctrl.hidelist();
            }else{

                //Populate Items using UI
                UIctrl.populateItems(items);

            }
            
            //Get Total Calories
            const totalcalories = Itemctrl.gettotalcalories();

            //Show Total Calories to UI
            UIctrl.showtotalcalories(totalcalories);

            //load event listeners
            loadeventlisteners();

        }
    }
    

})(Itemctrl, UIctrl , StorageCtrl);

App.init();
