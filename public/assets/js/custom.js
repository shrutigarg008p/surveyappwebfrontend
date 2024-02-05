// document.addEventListener("DOMContentLoaded", function() {
//     var requiredInputs = document.querySelectorAll("input[required]");
   
//     requiredInputs.forEach(function(input) {
     
//       input.oninvalid = function(e) {
//         e.preventDefault();
//         var lang = e.target.getAttribute('data-lang');
//         var message = lang === 'hi' ? "कृपया इस फ़ील्ड को भरें" : "Please fill out this field";
//         var value = e.target.value; 
//         if(value === ''){
//           e.target.setCustomValidity(message); 
//         }else{
//           e.target.setCustomValidity(''); 
//         }
//         e.target.reportValidity()
//       };
  
//       // input.oninput = function(e) {
//       //   e.target.setCustomValidity("");
//       //   e.target.reportValidity();
//       // };
      
//     });
//   });





