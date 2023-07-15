/* Table of Contents
1. Global Variables
2. Utility Functions
3. Page Functions
4. Test Functions
*/

function main() {
    createNav();
}


//1. Global Variables

//2. Utility Functions

//2. Utility Functions

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  function replaceHtml( html, targetID){
    /// find our target
    var i, tmp, elm, last, target = document.getElementById(targetID);
    /// create a temporary div or tr (to support tds)
    tmp = document.createElement(html.indexOf('<td')!=-1?'tr':'div');
    /// fill that div with our html, this generates our children
    tmp.innerHTML = html;
    /// step through the temporary div's children and insertBefore our target
    i = tmp.childNodes.length;
    /// the insertBefore method was more complicated than I first thought so I 
    /// have improved it. Have to be careful when dealing with child lists as  
    /// they are counted as live lists and so will update as and when you make
    /// changes. This is why it is best to work backwards when moving children 
    /// around, and why I'm assigning the elements I'm working with to `elm` 
    /// and `last`
    last = target;
    while(i--){
      target.parentNode.insertBefore((elm = tmp.childNodes[i]), last);
      last = elm;
    }
    /// remove the target.
    target.parentNode.removeChild(target);
  }

  function displayMessage(str) {
    replaceHtml("<h2 id='message'>" + str + "</h2>", "message");
  }

  //3. Page Functions
  function createNav() {
    replaceHtml("<div class='navMenu'> <a href='../' class='active'>Home</a><a href='../schedule/'>Schedule</a><a href='../fitness/'>Fitness</a><a href='../test/'>Test</a><a href='../war/'>War</a><div class='dot'></div></div>", "navbar")
  }

  //4. Test Functions

  main();