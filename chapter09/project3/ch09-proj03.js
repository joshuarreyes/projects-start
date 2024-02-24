/* add your code here */
document.addEventListener('DOMContentLoaded', function() {
    const stock = JSON.parse(stockContent);
    const users = JSON.parse(userContent);

    /*set initial section display to none*/
    const detailSections = document.getElementsByClassName("Details");
    detailSections[0].style.display = "none";

    /*Generate the user list by looping through the objects in users.json and
    adding <li> elements to the user list <ul>. To make click processing easier,
    you will also want to add the id value of the user using the dataset property */
    for(let userinfo of users) {
        const li = document.createElement("li");
        const text = document.createTextNode(userinfo.user.lastname + ", " + userinfo.user.firstname);
        li.appendChild(text);
        li.dataset.id = userinfo.id;
        document.getElementById("userlist").appendChild(li);
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
            document.getElementsByClassName("StockDetails")[0].style.display = "none";

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
          
                        
                        const h3 = document.createElement("h3");
                        const h3_2 = document.createElement("h3");
                        const symbol = document.createTextNode(ownedStock.symbol);
                        const owned = document.createTextNode(ownedStock.owned);
                        const button = document.createElement("button");

                        h3.appendChild(symbol);
                        h3_2.appendChild(owned);
                        button.appendChild(document.createTextNode("View"));
                        button.dataset.symbol = ownedStock.symbol;
                        button.className = "viewButton";

                        document.getElementById("listPortfolio").appendChild(h3);
                        document.getElementById("listPortfolio").appendChild(h3_2);
                        document.getElementById("listPortfolio").appendChild(button);
                        
                        button.addEventListener("click", function(e) {
                            
                            if (e.target.className === "viewButton" && e.target.dataset.symbol == button.dataset.symbol) {
                                let imagesrc = "./logos/" + e.target.dataset.symbol + ".svg";
                                document.getElementById("logo").src = imagesrc;
                                document.getElementsByClassName("StockDetails")[0].style.display = "block";
                                
                                if (document.getElementById("stockName").firstChild != null) {
                                    document.getElementById("stockName").removeChild(document.getElementById("stockName").firstChild);
                                    document.getElementById("stockSector").removeChild(document.getElementById("stockSector").firstChild);
                                    document.getElementById("stockIndustry").removeChild(document.getElementById("stockIndustry").firstChild);
                                    document.getElementById("stockAddress").removeChild(document.getElementById("stockAddress").firstChild);
                                }

                                for (let stockinfo of stock) {
                                    if (stockinfo.symbol == e.target.dataset.symbol) {
                                        document.getElementById("stockName").appendChild(document.createTextNode(stockinfo.name));
                                        document.getElementById("stockSector").appendChild(document.createTextNode(stockinfo.sector));
                                        document.getElementById("stockIndustry").appendChild(document.createTextNode(stockinfo.subIndustry));
                                        document.getElementById("stockAddress").appendChild(document.createTextNode(stockinfo.address));
                                    }
                                }

                            }
                        });
                    }
                    

                    break;
                }
            }
        }
    });

    


});
