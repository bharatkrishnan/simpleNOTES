const date = new Date();
const tdate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
const time = date.getHours() + ':' + date.getMinutes();
const datetime = 'Saved on ' + tdate + ' at ' + time;
let varidno = 0
if (localStorage.getItem(varidno) == 0 || localStorage.length == 0) {
    varidno = 0;
    document.getElementById('empty').innerText = "No saved notes :("
}
else {
    varidno = parseInt(localStorage.getItem('varidno'))
    document.getElementById('savednotes').innerHTML = localStorage.getItem('loadcontent')

}

let submit = document.getElementById('submitnote');
let notes = document.getElementById('savednotes');

document.getElementById('note').addEventListener('blur', () => {
    document.getElementById('note').style.boxShadow = "none";
    document.getElementById('note').style.border = "none";
})
document.getElementById('note').addEventListener('focus', () => {
    document.getElementById('note').style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
    document.getElementById('note').style.border = "#91ebb3 1px solid";
})



// adding text to note div
submit.addEventListener('click', () => {
    let parentdiv = document.getElementById('savednotes')
    let content = document.getElementById('note');
    let div = document.createElement('div');
    if (content.value.trim().length == 0) {
        content.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        content.style.border = "red 1px solid";
        document.getElementsByName('note')[0].placeholder = "Cannot save empty note."
        setTimeout(function () {
            content.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
            content.style.border = "#91ebb3 1px solid"
            document.getElementsByName('note')[0].placeholder = "Enter a note ..."
        }, 1000)
        console.log('empty note')
        // window.alert('Cannot save empty note')
    }
    else {
        varidno += 1
        div.setAttribute('class', 'savednote');
        div.setAttribute('id', `note${varidno}`)
        div.textContent = content.value;
        notes.append(div);
        let date = document.createElement('div')
        date.setAttribute('id', 'datetime')
        date.innerHTML = datetime + `<button class="deletenote" id="${varidno}" onclick="divdelete(this.id)">Delete Note</button>`
        div.appendChild(date)
        document.getElementById('empty').innerText = "Total saved notes : " + varidno
        localStorage.setItem('varidno', varidno)
        localStorage.setItem('loadcontent', parentdiv.innerHTML)
    }
    content.value = ''


})

// deleting

let divdelete = (clicked) => {

    // let id = parseInt(event.target.id);
    let deletediv = document.getElementById(`note${clicked}`)
    deletediv.parentNode.removeChild(deletediv)
    varidno -= 1;
    let parentdiv = document.getElementById('savednotes')
    if (varidno == 0) {
        document.getElementById('empty').innerText = "No saved notes :("
    }
    else {
        document.getElementById('empty').innerText = "Total saved notes : " + varidno
    }
    localStorage.setItem('loadcontent', parentdiv.innerHTML)
    localStorage.setItem('varidno', varidno)
    console.log(clicked)
    console.log('delete')
}



// search function
let search = (value) => {

    let searchstring = value;
    let searchdiv = document.getElementsByClassName('savednote')

    Array.from(searchdiv).forEach((Element) => {
        let checkstring = (Element.firstChild.textContent).toLowerCase()


        if (!String(checkstring).includes(searchstring)) {

            Element.style.display = "none"

            console.log(Element)
            console.log((checkstring))
            console.log((searchstring))

        }
        else {
            Element.style.display = "inline-block"

        }

    })
}

// show function

let show = () => {
    if ((document.getElementById('searchbox').value) == '') {
        let searchdiv = document.getElementsByClassName('savednote')
        Array.from(searchdiv).forEach(element => {
            element.style.display = "inline-block"
        });
    }
}
document.getElementById('searchbox').addEventListener('input', e => {
    const value = e.target.value
    search(value)
})

// sticky navabr
window.onscroll = function () { myFunction() };

var navbar = document.getElementById("navbar");
var savednotes = document.getElementById("yournotes");
var navonscroll = document.getElementsByClassName("navlinks")


var sticky = navbar.offsetTop;
var savednotespos = savednotes.offsetTop;

function myFunction() {
    if (window.pageYOffset >= sticky && window.pageYOffset <= 460) {
        navbar.classList.add("sticky")

        for (var i = 0; i < navonscroll.length; i++) {
            navonscroll[i].classList.add("navlinksscrolled")
        }




    } else {
        navbar.classList.remove("sticky");
        for (var i = 0; i < navonscroll.length; i++) {
            navonscroll[i].classList.remove("navlinksscrolled")
        }

    }
}


//scroll 
function scrollToElement(id) {
    pageElement = (document.getElementById(id))
    var positionX = 0,
        positionY = 0;

    while (pageElement != null) {
        positionX += pageElement.offsetLeft;
        positionY += pageElement.offsetTop;
        pageElement = pageElement.offsetParent;
        window.scrollTo(positionX, positionY);
    }
}

