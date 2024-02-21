/* add your code here */
document.addEventListener('DOMContentLoaded', function() {
    const stock = JSON.parse(stockContent);
    const users = JSON.parse(userContent);

    /*set initial section display to none*/
    const detailSections = this.getElementsByClassName("Details");
    detailSections[0].style.display = "none";

    /*Generate the user list by looping through the objects in users.json and
    adding <li> elements to the user list <ul>. To make click processing easier,
    you will also want to add the id value of the user using the dataset property */
    for(let userinfo of users) {
        const li = document.createElement("li");
        const text = document.createTextNode(userinfo.user.lastname + ", " + userinfo.user.firstname);
        li.appendChild(text);
        li.dataset.id = userinfo.id;
        document.getElementsByTagName("ul")[0].appendChild(li);
    }

    /*Use event delegation to handle all click events in the user list. If a list item is
    clicked, then unhide the details <section> and display the user information in the user details form 
    and display their stock portfolio holdings in the portfolio
    section. This will require you to find the user in your array that matches the
    id value of the clicked thumbnail; you can do this via a simple loop or make
    use of the find() function*/

    document.getElementsByTagName("ul")[0].addEventListener("click", function(e) {
        if(e.target.tagName === "LI") {
            const userId = e.target.dataset.id;
            let user;

            detailSections[0].style.display = "block";
            let firstnameEntry = document.getElementById("firstname");
            let lastnameEntry = document.getElementById("lastname");
            let addressEntry = document.getElementById("address");
            let cityEntry = document.getElementById("city");
            let emailEntry = document.getElementById("email");

            for(let u of users) {
                if(u.id == userId) {
                    user = u;

                    //display user information in the user details form
                    firstnameEntry.value = user.user.firstname;
                    lastnameEntry.value = user.user.lastname;
                    addressEntry.value = user.user.address;
                    cityEntry.value = user.user.city;
                    emailEntry.value = user.user.email;

                    
                    //display their stock portfolio holdings in the portfolio section
                    let portfolioinfo = user.portfolio;
                    for (let ownedStock of portfolioinfo) {
                       
                    }
                    

                    break;
                }
            }
        }
    });

    


});
