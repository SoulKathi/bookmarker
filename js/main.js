// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e){
  // Get form values
  var siteName =document.getElementById('siteName').value;
  var siteUrl =document.getElementById('siteUrl').value;
  var siteDescription =document.getElementById('siteDescription').value;

  if(!validateForm(siteName, siteUrl)){
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl,
    description: siteDescription
  }

  /*
    // Local Storage Test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
  */

  // Test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null){
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('myForm').reset();

  // Re-fetch bookmarks
  fetchBookmarks();

  // Prevent form from submitting
  e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through the bookmarks
  for(var i =0;i < bookmarks.length;i++){
    if(bookmarks[i].url == url){
      //if(bookmarks[i].name ==name){
        // Remove from array
        bookmarks.splice(i, 1);
      //}
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks(){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  // Build output
  bookmarksResults.innerHTML = '';
  if(bookmarks.length==0){
    bookmarksResults.innerHTML = '<div class="well"><h3>There are no bookmarks yet. Please add some bookmarks.</h3></div>';
  }else{
    for(var i = 0; i < bookmarks.length; i++){
      var name = bookmarks[i].name;
      var url = bookmarks[i].url;
      var description = bookmarks[i].description;

      var ret = '';
      ret +='<div class="well">'+'<h3>'+name+
            ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
            ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> </h3>';
            if(description.length!=0){
              ret +='<b>Description:</b> '+description+'';
            }
            ret +='</div>';
      bookmarksResults.innerHTML +=ret;
    }
  }
}

// Validate Form
function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}
