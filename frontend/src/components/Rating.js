import React from 'react'

function Rating({value,text,color}) {
    
         let stars = [];
         for (let index = 1; index <=5 ; index++) {
              
            stars.push(
             <span key={index}>
               <i style={{color}} className={
                   value >= index
                   ? 'fas fa-star'
                   : value >= index-0.5
                     ? 'fas fa-star-half-alt'
                     : 'far fa-star'
               }>
               </i>
             </span>  
            );
          
        }

        return (
           <div className="rating">
               {stars}
               <span className="mx-2 d-inline-block">
                   {text}
               </span>
           </div>
        )
        
    
}

export default Rating
