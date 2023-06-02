
$(document).ready(function () {
    $.getJSON('./balance_sheet_data.json', function (data) {
      var parentData = data.filter(function (item) {
        return item.parent === "";
      });
      var balanceSheet = $('#balance-sheet');
  
      parentData.forEach(function (parentItem) {
        var parentElement = $('<div>').addClass('parent').appendTo(balanceSheet);
        $('<p>').text(parentItem.particulars).appendTo(parentElement);
  
        var childData = data.filter(function (childItem) {
          return childItem.parent === parentItem.particulars;
        });
  
        if (childData.length > 0) {
          var childList = $('<ul>').addClass('child').appendTo(parentElement);
  
          childData.forEach(function (childItem) {
            var childElement = $('<li>').text(childItem.particulars).appendTo(childList);
  
            var subChildData = data.filter(function (subChildItem) {
              return subChildItem.parent === childItem.particulars;
            });
  
            if (subChildData.length > 0) {
              var subChildList = $('<ul>').addClass('sub-child').appendTo(childElement);
  
              subChildData.forEach(function (subChildItem) {
                $('<li>').text(subChildItem.particulars).appendTo(subChildList);
              });
            }
  
            if (subChildData.length > 0) {
              childElement.addClass('has-child');
              $('<span>').addClass('toggle-sign').text('+').appendTo(childElement);
            }
          });
        }
  
        if (childData.length > 0) {
          parentElement.addClass('has-child');
          $('<span>').addClass('toggle-sign').text('+').appendTo(parentElement);
        }
      });
  
      $('#balance-sheet').on('click', '.parent', function (event) {
        if (!$(event.target).is('.toggle-sign')) {
          $(this).toggleClass('open');
          $(this).children('.child').slideToggle();
          $(this).find('.toggle-sign').text(function () {
            return $(this).text() === '+' ? '-' : '+';
          });
        }
      });
  
      $('#balance-sheet').on('click', '.has-child .toggle-sign', function (event) {
        event.stopPropagation();
        $(this).toggleClass('open');
        $(this).siblings('.sub-child').slideToggle();
        $(this).text(function () {
          return $(this).text() === '+' ? '-' : '+';
        });
      });
    });
  });
  