function init_dl_dnd(dl_dnd, f = function(e){}){ 
   // enable li(s) to be draggable
   $("ul." + dl_dnd + " li").attr("draggable", "true");
   
   // capture start of dragging - the action starts here
   $("ul." + dl_dnd + " li").on('dragstart', function(e){
      li_id = "prefix_" + Date.now();
      li_id = $(e.delegateTarget).attr("id") == null ? li_id : $(e.delegateTarget).attr("id");
      $(e.delegateTarget).attr("id", li_id);
      e.originalEvent.dataTransfer.setData("source_li", li_id);
});

   // disable other dragover handlers
$("ul." + dl_dnd).on("dragover", function(e) {
  e.preventDefault();
});

   // disable other dragenter handlers
$("ul." + dl_dnd).on("dragenter", function(e) {
  e.preventDefault();
});

  //disable other dragover handlers
$($("ul." + dl_dnd).parent()).on("dragover", function(e) {
  e.preventDefault();
});

 //disable other dragenter handlers
$($("ul." + dl_dnd).parent()).on("dragenter", function(e) {
  e.preventDefault();
});


 // capture drop event - the actual action comes here
$($("ul." + dl_dnd).parent()).on('drop', function(e){

   var ul = $(e.delegateTarget).children("ul")[0];
   if($(ul).hasClass(dl_dnd)){
   var li_data = e.originalEvent.dataTransfer.getData('source_li');
   li_data = $("#" + li_data)[0];
   ul.append(li_data);
   }
   
   if (typeof f == "function") f(li_data);
   return false;        //we are done with drop event just exit safely now!
   
});


$("ul." + dl_dnd).on('drop', function(e){
   var li_data = e.originalEvent.dataTransfer.getData('source_li');
   li_data = $("#" + li_data)[0];
   var x = e.clientX;
   var y = e.clientY;
   var ul = e.delegateTarget;
   var li = e.target;  // assume target is li
   
   if(li.nodeName!= "UL" && li.nodeName != "LI"){ // keep believing we have an li under mouse
      li = $(li).closest("li")[0];
   }

   if(li.nodeName == "UL" && $(li).length > 0){ // despite of ul under mouse, we will insist to find li
      //find an li 30 pixels above   
      element_above = document.elementFromPoint(x, y-50);
      console.log("above :" + element_above);
      if(element_above.nodeName == "UL"){          // doubting that it is ul
         console.log("looks like no li above");
         // we will enquire for li 30px down otherwise assume ul is empty and append li in targetted ul
      }
      else if(element_above.nodeName == "LI"){      // or perhaps an li?
         console.log("Ahhh... found an li");
         suspected_li = element_above;
         if(suspected_li.closest("ul")[0] == e.delegateTarget){ // if li is under our targetted ul?
            console.log("Yeah! we were right!");
            li = suspected_li;
            li.before(li_data);
            if (typeof f == "function") f(li_data);
            return false; // drop event completed safely
         }
      }
      else{                                         //try to find an li above for one last time
         suspected_li = $(element_above).closest("li")[0];
         console.log("found an: " + suspected_li);
         if(suspected_li.closest("ul") == e.delegateTarget){ // if li is under our targetted ul?
            console.log("Hurrah!! hardwork brings fruit");
            li = suspected_li;
            li.before(li_data);
            if (typeof f == "function") f(li_data);
            return false; // drop event completed safely
         }
      }
   }

      if(li.nodeName != "li"){         // should we continue searching for an li 30px down?
      //find an li 30 pixels down
      element_below = document.elementFromPoint(x, y+50);
         console.log("below: " + element_below);
      if(element_below.nodeName == "UL"){          // doubting that it is ul
         console.log("looks like no li down here too");
         ul = element_below;
         ul.append(li_data);
         if (typeof f == "function") f(li_data);
         return false;        //we are done with drop event just exit safely now!
      }
      else if(element_below.nodeName == "LI"){      // or perhaps an li?
         console.log("Ahhh... found an li");
         suspected_li = element_below;
         if(suspected_li.closest("ul") == e.delegateTarget){ // if li is under our targetted ul?
            console.log("Yeah! we were right!");
            li = suspected_li;
            li.after(li_data); 
            if (typeof f == "function") f(li_data);
            return false; // drop event completed safely
         }
      }
      else{                                         //try to find an li above for one last time
         suspected_li = $(element_below).closest("li")[0];
         if(suspected_li.closest("ul") == e.delegateTarget){ // if li is under our targetted ul?
            console.log("Hurrah!! hardwork brings fruit");
            li = suspected_li;
            li.after(li_data);
            if (typeof f == "function") f(li_data);
            return false; // drop event completed successfully
         }


      }
   }

   console.log("li " + li.nodeName);
   

   li_d = $(li).height() + $(li).offset().top;    //translated depth of li in pixels


   if(li_d > y){
      li.before(li_data);
   }
   else{
      li.after(li_data);
   }

   if (typeof f == "function") f(li_data);
   return false; // always return false to avoid defaults of JS Events
   
});

}

