// get the elements
let bookmark_name_inp = document.getElementById("bookmark-name");
let bookmark_url_inp = document.getElementById("bookmark-url");
let add_bookmark_btn = document.getElementById("add-bookmark");
let bookmark_list = document.getElementById("bookmark-list");

// add events
add_bookmark_btn.addEventListener("click", addBookMark);

// set the bookmark_list from local storage
let bookMarks = JSON.parse(window.localStorage.getItem("bookMarks")) || [];
bookMarks.forEach((el) => {
  bookmark_list.innerHTML += `
        <li>
        <a target="_blank" href="${el.url}">${el.name}</a><button>Remove</button>
        </li>
    `;
});

let remove_buttons = document.querySelectorAll("#bookmark-list li button");
remove_buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.remove();
    bookMarks.splice(btn.parentElement.getAttribute("data-index"), "1");
    window.localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
  });
});

// Functions
function addBookMark() {
  if (bookmark_name_inp.value !== "" && bookmark_url_inp.value !== "") {
    let bookMarkName = bookmark_name_inp.value.trim();
    let bookMarkUrl = bookmark_url_inp.value.trim();

    let bookMarks = JSON.parse(window.localStorage.getItem("bookMarks")) || [];
    bookMarks.push({ name: bookMarkName, url: bookMarkUrl });

    bookmark_list.innerHTML = "";

    bookMarks.forEach((el, i) => {
      bookmark_list.innerHTML += `
        <li data-index="${i}">
        <a target="_blank" href="${el.url}">${el.name}</a><button>Remove</button>
        </li>
    `;
    });

    bookmark_name_inp.value = "";
    bookmark_url_inp.value = "";

    // Handle remove bookMark buttons
    let remove_buttons = document.querySelectorAll("#bookmark-list li button");
    remove_buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.parentElement.remove();
        bookMarks.splice(btn.parentElement.getAttribute("data-index"), 1);
        window.localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
      });
    });

    window.localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
  }
}
