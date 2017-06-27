function loadData(event){
  var qContent = $("#quoteContent");
  var qAuthor = $("#quoteAuthor");
  qContent.text("");
  qAuthor.text("");
  var url = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?';

  //set timeout if no data is received
  var quoteRequestTimeout = setTimeout(function(){
    qContent.text("Failed to get your quote, please check back later! :(");
  },8000);

  // $('cite').remove();
  $.ajax({
    url: url,
    dataType:'jsonp',
    success: function(data){
      var qObject = data;
      var contentString = data.quoteText;
      var authorString = data.quoteAuthor;
      //set contents of id quoteContent if the content is received and author is received
      if (contentString !== "" && authorString !== "") {
        $(".blockquote").animate({
          opacity: 0
          },500,
          function(){
            $(this).animate({
              opacity: 1
            },500);
          qContent.text(contentString);
          qAuthor.text("- " + authorString);
        });
      }
      //set contents of authior unknown if no author
      else if (contentString !== "" && authorString === "") {
        var errString = "- Unknown";
        $(".blockquote").animate({
          opacity: 0
          },500,
          function(){
            $(this).animate({
              opacity: 1
            },500);
          qContent.text(contentString);
          qAuthor.text(errString);
        });
      }
      var link = "https://twitter.com/intent/tweet?hashtags=quotes,FCC&related=freecodecamp&text=";
      link += encodeURIComponent('"' + contentString.trim() + ' ' + authorString.trim());
      $(".tweet").attr("href", link);
      //clear the setTimeout quoteRequestTimeout when the data is received
      clearTimeout(quoteRequestTimeout);
    }
  });
};
$(document).ready(function(){
  $("#quoteButton").on("click",loadData);
  $(".tweet").attr("href", "https://twitter.com/intent/tweet?hashtags=quotes,FCC&related=freecodecamp&text=" + encodeURIComponent('"Welcome to my random quote generator!" - Kinder'));
});
