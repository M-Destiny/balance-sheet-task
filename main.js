$(document).ready(function () {
    $.getJSON('./balance_sheet_data.json', function (data) {
        var parentData = data.filter(function (item) {
            return item.parent === "";
        });
        var tbody = $('#balance-sheet tbody');

        parentData.forEach(function (parentItem) {
            var parentRow = $('<tr>').addClass('parent').appendTo(tbody);
            $('<td>').text(parentItem.particulars).appendTo(parentRow);
            $('<td>').text(parentItem.cr).appendTo(parentRow);
            $('<td>').append($('<span>').addClass('toggle-sign').text('+')).appendTo(parentRow);

            var childData = data.filter(function (childItem) {
                return childItem.parent === parentItem.particulars;
            });

            if (childData.length > 0) {
                var childContainer = $('<tbody>').addClass('child').appendTo(parentRow);
                childData.forEach(function (childItem) {
                    var childRow = $('<tr> ').appendTo(childContainer);
                    $('<td>').text(childItem.particulars).appendTo(childRow);
                    $('<td>').text(childItem.cr).appendTo(childRow);

                    var subChildData = data.filter(function (subChildItem) {
                        return subChildItem.parent === childItem.particulars;
                    });

                    if (subChildData.length > 0) {
                        childRow.addClass('has-child');
                        $('<td>').addClass('toggle-sign').text('+').appendTo(childRow);
                        var subChildContainer = $('<tbody>').addClass('sub-child').appendTo(childRow);
                        subChildData.forEach(function (subChildItem) {
                            var subChildRow = $('<tr>').appendTo(subChildContainer);
                            $('<td>').text(subChildItem.particulars).appendTo(subChildRow);
                            $('<td>').text(subChildItem.cr).appendTo(subChildRow);
                        });
                    }
                });
            }
        });

        $('#balance-sheet').on('click', '.parent', function () {
            $(this).toggleClass('open');
            $(this).find('.child').toggleClass('open');
            $(this).find('.toggle-sign').text(function () {
                return $(this).text() === '+' ? '-' : '+';
            });
        });

        $('#balance-sheet').on('click', '.has-child .toggle-sign', function (event) {
            event.preventDefault();
            $(this).toggleClass('open');
            $(this).closest('.has-child').find('.sub-child').toggleClass('open');
            $(this).text(function () {
                return $(this).text() === '+' ? '-' : '+';
            });
        });
    });
});