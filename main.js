var formID = document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteURL').value;

    document.getElementById('myForm').reset();


    let bookmark = {
        name: siteName,
        url: siteUrl
    };

    // Check whether the bookmark is empty or not
    if(localStorage.getItem('bookmarks') === null){
    	let bookmarks = [];
    	bookmarks.push(bookmark);

    	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    } else {
		// Get bookmarks from localStorage
		let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

	fetchBookmarks();

    /*** Prevent the default behavior of the button ***/
    e.preventDefault(); 

}

function deleteBookmark(url){
	// Get bookmarks from localStorage 
	let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	
	for(let i =0; i<bookmarks.length; i++){
		if(bookmarks[i].url == url){
			// Remove from the array first
			bookmarks.splice(i,1);
		}
	}
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	fetchBookmarks();


}


function fetchBookmarks() {
	// Get bookmarks from localStorage 
	let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	let bookmarksRes = document.getElementById('bookmarksResult');
	bookmarksRes.innerHTML = "";
	for (let i=0; i<bookmarks.length; i++) {
		let name = bookmarks[i].name;
		let url = bookmarks[i].url;

		bookmarksRes.innerHTML += '<div class="jumbotron other">'+'<h4>' + name +
			'<a href="' + url + '" class="btn btn-light ml-3 btn-sm links" target="_blank">Visit</a>'+
			'<a href="#" onclick="deleteBookmark(\''+url+'\');" class="links btn btn-danger ml-2 btn-sm">Delete</a>' +
			'</h4></div>';


	}

}